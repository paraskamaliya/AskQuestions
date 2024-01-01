const { ListModel } = require("../Model/list.model");
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
        const tkn = await ListModel.findOne({ token });
        if (!tkn) {
            jwt.verify(token, "users", (err, decoded) => {
                if (err) {
                    res.status(202).send({ err: err.message });
                } else {
                    req.body.username = decoded.username;
                    req.body.userId = decoded.userId;
                    next();
                }
            });
        } else {
            res.status(201).send({ "msg": "Please Login" });
        }
    } else {
        res.status(400).send({ "message": "Please Login" });
    }
};

module.exports = { auth };