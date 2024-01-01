const express = require("express");
const { PostModel } = require("../Model/post.model");
const { auth } = require("../Middlewares/auth.middleware");
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
    const { type, order } = req.query;
    try {
        let posts = await PostModel.find();
        if (type) {
            posts = await PostModel.find({ type })
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
        res.status(200).send(posts);
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
        await PostModel.findByIdAndDelete({ id });
        res.status(200).send({ "msg": "Post deleted successfully" })
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong", "err": error })
    }
})

postRouter.patch("/update/:id", auth, async (req, res) => {
    const { id } = req.params;
    try {
        await PostModel.findByIdAndUpdate({ id }, req.body);
        res.status(200).send({ "msg": "Post updated successfully" })
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong", "err": error })
    }
})

module.exports = { postRouter };