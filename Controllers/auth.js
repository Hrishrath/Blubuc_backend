const User = require('../Models/user');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
require('dotenv').config();



exports.signup = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body)

    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                error: "SignUp failed"
            })
        }
        res.json(user);
    })
}


exports.signin = (req, res) =>{
    const{email, password} =  req.body;

    const errors = validationResult(req);


    if(!errors.isEmpty())
    {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne({email}).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "Account with this email does not exist"
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email & password do not match"
            })
        }

            //Creating token
        const token = jwt.sign({_id: user._id}, process.env.SECRET);
        //setting token into cookie
        res.cookie("token", token, {expire: new Date()+9999});
        //destructuring fields from user
        const {_id, name, email, role} = user;
        //sending response to front end
        return res.json({token, user:{_id, name, email, role}})
    })

}



exports.signout = (req, res) => {
    res.clearCookie("token");
    return res.json({
        message: "User Signout Successfully"
    })
}


//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
})


//custom Middlewares
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next(); 
}


exports.isAdmin = (req, res, next) => {
    if(!req.profile.role === 1)
    {
        return res.status(403).json({
            error: "You are not admin, Access Denied"
        })
    }
    next();
}