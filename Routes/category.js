const express = require("express");
const router = express.Router();

const {getCategoryById, addCategory, getCategories, getCategory, updateCategory, deleteCategory} = require("../Controllers/category")
const { isSignedIn, isAuthenticated, isAdmin} = require("../Controllers/auth")
const {getUserById, getUser} = require("../Controllers/user")

router.param("userId", getUserById)
router.param("categoryId", getCategoryById)

router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, addCategory)

router.get("/category", getCategories)

router.get("/category/:categoryId", getCategory)

router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory)

router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteCategory)

module.exports = router