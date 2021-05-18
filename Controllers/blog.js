
const Blog = require('../Models/blog');
const {validationResult} = require('express-validator');
const Comment = require('../Models/comment');
const { getUser } = require('./user');
const { mongoose } = require('mongoose');
const _ = require("lodash");


exports.getBlogById = (req, res, next, id) => {
    Blog.findById(id)
    .populate(
        {path:"comments", 
        populate: 
        {path: "user",
        select: {'name': 1, 'lastname':1, 'email':1}
        }}).exec((err, blog) => {
        if(err)
        {
            return res.status(400).json({
                error: "Blog not Found"
            })
        }
        req.blog = blog;
        next();
    })
} 

exports.getBlog = async (req, res) => {
    let blog = await req.blog;
return res.json(blog);
}


exports.createBlog = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({
            error: "Something Wrong, Blog not posted"
        })
    }

    const blog = new Blog(req.body);

    blog.save((err, blog) => {
        if(err){
            return res.status(400).json({
                error: "Failed to save blog"
            })
        }
        return res.json(blog);
    })
}


exports.getAllBlog = (req, res) => {
    Blog.find().exec((err, blogs) => {
        if(err){
            return res.status(400).json({
                error: "Blogs not found"
            })
        }
        return res.json(blogs);
    })
}


exports.deleteBlog = (req, res) => {
    Blog.findByIdAndDelete(req.blog._id).exec((err, blog) => {
        if(err){
            return res.status(400).json({
                error: "Something wrong, Deletion Failed"
            })
        }
        return res.json({
            message: `${req.blog._id} deleted successfully`
        })
    })
}

exports.updateBlog = (req, res) => {
 
    let blog = req.blog;

    blog = _.extend(blog, req.body)
    
    blog.save(
        (err, blog) => {
                    if(err)
                    {
                        return res.status(400).json({
                            error: "Something wrong, Updation failed"
                        })
                    }
                    return res.json({
                        message: `${req.blog._id} update successfully`
                    })
                }
    )

}


exports.updateLikeComment = (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({
            error: "Something Wrong, Blog not updated"
        })
    }

    let blog = req.blog;

    if(req.body.act == "like"){

        if(blog.likedBy.includes(req.profile._id))
        {
            blog.updateOne(
                {$pull: {
                    likedBy: req.profile._id 
                }},
                {new:  true, useFindAndModify: false},
                (err, blog) => {
                    if(err)
                    {
                        return res.status(400).json({
                            error: "Something wrong, Array Updation failed"
                        })
                    }
                    return res.json({
                        message: `${req.blog._id} update successfully`
                    })
                }
            )
           
        }
        else{
            blog.updateOne(
                {$push: {
                    likedBy: [req.profile._id]
                }},
                {new:  true, useFindAndModify: false},
                (err, blog) => {
                    if(err)
                    {
                        return res.status(400).json({
                            error: "Something wrong, Array Updation failed"
                        })
                    }
                    return res.json({
                        message: `${req.blog._id} update successfully`
                    })
                }
            )
        }

       
    }

    else if(req.body.act == "comment")
    {
        const comment = new Comment({commentBody:req.body.commentBody, user:req.profile._id});

        comment.save((err, com) => {
           if(err)
           {
               return res.status(400).json({
                   error: "Failed to submit Comment"
               })
           }
           
           blog.updateOne(
            {$push: {
                comments: [com._id]
            }},
            {new:  true, useFindAndModify: false},
            (err, blog) => {
                if(err)
                {
                    return res.status(400).json({
                        error: "Something wrong, Array Updation failed"
                    })
                }
                return res.json({
                    message: `Comment Submitted successfully`
                })
            }
        )
        
       })

    }

}



exports.getComments = (req, res) => {
  
}