const express = require("express");
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { UserModel } = require("../Model/user.model");
const { auth } = require('../Middlewares/auth.middleware');
const { ListModel } = require("../Model/list.model");
userRouter.post("/register", async (req, res) => {
    const { username, email, password, country } = req.body;
    const user = await UserModel.findOne({ email })
    try {
        if (user) {
            res.status(201).send({ "msg": "Data is already present, Please SignIn" })
        }
        else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.status(202).send({ "msg": "Something went wrong, Please try again", "err": err })
                } else {
                    let user = new UserModel({ username, email, password: hash, country })
                    await user.save();
                    res.status(200).send({ "msg": "User is Registered" })
                }
            })
        }
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong", "err": error })
    }
})

userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    try {
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.status(201).send({ "msg": "Something went wrong" })
                }
                else {
                    let token = jwt.sign({ username: user.username, userId: user._id }, "users", { expiresIn: "1h" })
                    res.status(200).send({ "msg": "Login Successfully", "token": token, "userDetails": user })
                }
            })
        }
        else {
            res.status(202).send({ "msg": "Data is not present, Please Register" })
        }
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong, Please try again", "err": error })
    }
})

userRouter.patch("/update/:id", auth, async (req, res) => {
    const { id } = req.params;
    try {
        await UserModel.findByIdAndUpdate({ id }, req.body);
        res.status(200).send({ "message": "User data Updated" })
    } catch (error) {
        res.status(400).send({ "message": "Something went wrong", "err": error })
    }
})

userRouter.delete("/delete/:id", auth, async (req, res) => {
    const { id } = req.params;
    try {
        await UserModel.findByIdAndUpdate({ id }, req.body);
        res.status(200).send({ "message": "User data Deleted" })
    } catch (error) {
        res.status(400).send({ "message": "Something went wrong", "err": error })
    }
})

userRouter.get("/logout", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        let tkn = new ListModel({ token })
        await tkn.save();
        res.status(200).send({ "msg": "You are successfully logged out" })
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong", "err": error })
    }
})

module.exports = { userRouter };