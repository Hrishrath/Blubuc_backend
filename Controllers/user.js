const User = require("../Models/user");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user)
        {
            return res.status(400).json({
                error: "No user Found"
            })
        }
        req.profile = user;
        next();
    })
}



exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createAt = undefined;
    req.profile.updatedAt = undefined;

    return res.json(req.profile);
}


exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new:  true, useFindAndModify: false},
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error: "You are not authorized too perform this operation"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            res.json(user)
        }
    )
}



exports.getAllUsers = (req, res) => {
    User.find().exec((err, users) => {
        if(err || !users)
        {
            return res.status(400).json({
                error: "No user Found"
            })
        }
        res.json(users);
    })
}