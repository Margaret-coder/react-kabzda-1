const mongoose = require("mongoose")

// var like_id = mongoose.Types.ObjectId();
// var ObjectId = require('mongodb').ObjectID;
// likeIds: [{ type : mongoose.Types.ObjectId, ref: 'User' }]


const postSchema = mongoose.Schema({
    message: String,
    likesCount: Number,
    likeIds: [{type: String}]
})

module.exports = mongoose.model("Post", postSchema) 