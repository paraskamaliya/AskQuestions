const express = require("express");
const adminRoute = express.Router();
const { UserModel } = require("../Model/user.model");
const { PostModel } = require("../Model/post.model");
const admin = require("../Middlewares/admin.middleware");
adminRoute.use(admin);

adminRoute.get('/', async (req, res) => {
    try {
        let users = await UserModel.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong", "err": error })
    }
})

adminRoute.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    try {
        let posts = await PostModel.find({ userId: id })
        res.status(200).send(posts);
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong", "err": error })
    }
})

adminRoute.patch('/updatequestion/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let updatedPost = await PostModel.findByIdAndUpdate({ _id: id });
        res.status(200).send(updatedPost)
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong", "err": error })
    }
})

adminRoute.delete('/deletequestion/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await PostModel.findByIdAndDelete({ _id: id });
        res.status(200).send({ "msg": "Post Deleted" })
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong", "err": error })
    }
})

module.exports = { adminRoute };