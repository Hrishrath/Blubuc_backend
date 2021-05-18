const express = require("express");
const router = express.Router();

const {getBlogById, 
       createBlog, 
       getBlog, 
       getAllBlog, 
       deleteBlog, 
       updateBlog, 
       getAllUniqueCategories, 
       updateLikeComment,
       getComments
    } = require("../Controllers/blog")

const {getUserById} = require("../Controllers/user")
const {isSignedIn, isAuthenticated, isAdmin} = require("../Controllers/auth")

router.param("userId", getUserById)
router.param("blogId", getBlogById)

router.post("/blog/create/:userId", isSignedIn, isAuthenticated, isAdmin, createBlog)
router.get("/blog/:blogId", getBlog)

router.put("/blog/:blogId/comLike/:userId", isSignedIn, isAuthenticated, updateLikeComment)

router.get("/blog", getAllBlog)
router.delete("/blog/:blogId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteBlog)
router.put("/blog/:blogId/:userId", isSignedIn, isAuthenticated, isAdmin, updateBlog)

module.exports = router