const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema;

const blogSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    content: {
        type: String,
    },
    writer: {
        type: ObjectId,
        ref: 'User'
    },
    likedBy: [{
        type: ObjectId,
        ref: 'User'
    }],
    comments:[{
         type: ObjectId,
         ref: 'Comment'
    }],
    featImage: {
        type: String
    },
    category:{
        type: ObjectId,
        ref: "Category",
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model("Blog", blogSchema)