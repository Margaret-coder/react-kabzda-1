const mongoose = require("mongoose")

const schema = mongoose.Schema({
    message: String,
    likesCount: Number
})

module.exports = mongoose.model("Post", schema) 