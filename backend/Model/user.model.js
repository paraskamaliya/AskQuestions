const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    country: String,
    roles: Array
}, {
    versionKey: false
})
const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };