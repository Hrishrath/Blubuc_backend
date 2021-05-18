const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4} = require('uuid');
const ObjectId = mongoose.Schema();

const userSchema =  mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxLength: 15,
        trim: true
         },
    lastname:{
        type: String,
        required: false,
        maxLength: 15,
        trim: true
        },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo:{
        type: String,
        trim: true
    },
    encry_password:{
        type: String,
        required: true,
    },
   
    salt: String,

    role: {
        type: Number,
        default: 0,
    }

},{timestamps: true})


/////////////---Virtual field(password) creation---////////////////
    userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv4();
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    })


/////////////////---USER-SCHEMA METHODS---/////////////////////////
    userSchema.methods = {
        authenticate: function(plainPassword){
            return this.securePassword(plainPassword) === this.encry_password;
        },
        securePassword: function(plainPassword){
            if(!plainPassword){
                return "";
            }
            try {
                return crypto.createHmac('sha256', this.salt)
                .update(plainPassword)
                .digest('hex');
            } catch (error) {
                return "";
            }
        }
    }






module.exports = mongoose.model('User', userSchema)