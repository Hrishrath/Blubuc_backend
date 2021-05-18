const mongoose = require("mongoose");

const TagSchema = mongoose.Schema({
    tagName:{
        type: String,
        required: true
    }
})


module.exports =  mongoose.model("Tag", TagSchema)