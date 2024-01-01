const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title: String,
    description: String,
    type: String,
    username: String,
    userId: String,
    date: String,
    upvotes: Number,
    comments: Array
}, {
    versionKey: false
})
const PostModel = mongoose.model("post", postSchema);
module.exports = { PostModel };