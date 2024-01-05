const express = require("express");
const { PostModel } = require("../Model/post.model");
const { auth } = require("../Middlewares/auth.middleware");
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
    const { type, order, page, limit } = req.query;
    try {
        let query = {};
        if (type) {
            query.type = type;
        }
        const totalPosts = await PostModel.countDocuments(query);
        let posts = await PostModel.find(query).skip((page - 1) * limit).limit(parseInt(limit));
        if (order) {
            if (order == "asc") {
                posts.sort((a, b) => a.upvotes - b.upvotes);
            }
            else {
                posts.sort((a, b) => b.upvotes - a.upvotes);
            }
        }
        res.status(200).send({ posts, totalPosts });
    } catch (error) {
        res.status(400).send({ msg: "Something went wrong", err: error });
    }
});



postRouter.get("/user", auth, async (req, res) => {
    try {
        const posts = await PostModel.find({ userId: req.body.userId })
        res.status(200).send(posts);
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong", "err": error })
    }
})

postRouter.post("/add", auth, async (req, res) => {
    const { title, description, type, username, userId, date } = req.body;
    try {
        let post = new PostModel({ title, description, type, upvotes: 0, comments: [], username, userId, date })
        await post.save();
        res.status(200).send({ "msg": "Post is created", "postData": post })
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong", "err": error })
    }
})

postRouter.get("/:id", auth, async (req, res) => {
    const { id } = req.params;
    try {
        let post = await PostModel.findOne({ _id: id });
        res.status(200).send(post)
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong", "err": error })
    }
})

postRouter.delete("/delete/:id", auth, async (req, res) => {
    const { id } = req.params;
    try {
        await PostModel.findByIdAndDelete({ _id: id });
        res.status(200).send({ "msg": "Post deleted successfully" })
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong", "err": error })
    }
})

postRouter.patch("/update/:id", auth, async (req, res) => {
    const { id } = req.params;
    const { title, description, type, upvotes, comments } = req.body;
    try {
        await PostModel.findByIdAndUpdate({ _id: id }, { title, description, type, upvotes, comments });
        const post = await PostModel.findOne({ _id: id })
        res.status(200).send({ "msg": "Post updated successfully", postData: post })
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong", "err": error })
    }
})

module.exports = { postRouter };