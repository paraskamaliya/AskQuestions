const { ListModel } = require("../Model/list.model");
const jwt = require('jsonwebtoken');
const admin = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
        const tkn = await ListModel.findOne({ token });
        if (!tkn) {
            jwt.verify(token, "users", (err, decoded) => {
                if (err) {
                    res.status(202).send({ err: err.message });
                } else {
                    if (!decoded.role.includes("admin")) {
                        return res.status(401).send({ "msg": "You are not authorized" })
                    }
                    req.user = decoded;
                    next();
                }
            });
        } else {
            res.status(201).send({ "msg": "Please Login" });
        }
    } else {
        res.status(400).send({ "message": "Please Login" });
    }
}
module.exports = admin;