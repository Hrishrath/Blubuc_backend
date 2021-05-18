
const express = require("express");
const router = express.Router();

const {getUserById, getUser, updateUser, getAllUsers} = require("../Controllers/user")
const { isSignedIn, isAuthenticated, isAdmin } = require("../Controllers/auth")

router.param("userId", getUserById)

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser)

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser)

// router.get("/user/:userId/orders", isSignedIn, isAuthenticated, favouriteList)

router.get("/users/:userId", isSignedIn, isAuthenticated, isAdmin, getAllUsers)

module.exports = router;