const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors')
const mongoose = require("mongoose");
const { userRouter } = require('./Router/user.router')
const { postRouter } = require('./Router/post.router')
app.use(express.json());
app.use(cors());
app.use("/users", userRouter)
app.use("/posts", postRouter)
app.get("/", (req, res) => {
    res.send("Welcome to AskQuestions")
})

app.listen(process.env.PORT, async () => {
    try {
        const connection = mongoose.connect(process.env.mongoURL);
        console.log("Connected to DB")
    } catch (error) {
        console.log(error);
    }
})