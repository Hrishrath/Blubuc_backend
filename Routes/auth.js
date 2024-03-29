const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const { signup, signin, signout } = require("../Controllers/auth");

router.get("/signout", signout);

router.post(
  "/signup",
  [
    check("name", " name should be atleast 3 characters").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be atleast 3 characters").isLength({
      min: 3,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password required").isLength({ min: 3 }),
  ],
  signin
);

module.exports = router;
