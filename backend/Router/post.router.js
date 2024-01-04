const express = require("express");
const { PostModel } = require("../Model/post.model");
const { auth } = require("../Middlewares/auth.middleware");
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
    const { type, order, page, limit } = req.query;
    try {
        let posts = await PostModel.find();
        let totalPosts = posts.length;
        if (type) {
            posts = await PostModel.find({ type })
            totalPosts = posts.length;
        }
        if (order) {
            if (order == "asc") {
                posts.sort((a, b) => {
                    return a.upvotes - b.upvotes
                })
            }
            else {
                posts.sort((a, b) => {
                    return b.upvotes - a.upvotes
                })
            }
        }
        if (page && limit) {
            posts = await PostModel.find().skip((page - 1) * limit).limit(limit);
        }
        res.status(200).send({ posts, totalPosts });
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong", "err": error })
    }
})

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
    try {
        await PostModel.findByIdAndUpdate({ _id: id }, req.body);
        res.status(200).send({ "msg": "Post updated successfully" })
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong", "err": error })
    }
})

module.exports = { postRouter };