var mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

var CommentSchema = new mongoose.Schema({
   commentBody: { 
      type: String, 
      required: true 
    },
    user: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true});



module.exports =  mongoose.model('Comment', CommentSchema);
