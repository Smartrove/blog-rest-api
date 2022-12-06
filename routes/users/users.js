const express = require("express");
const {
  userRegisterController,
  userLoginController,
  userProfileController,
} = require("../../controller/users/usersController");
const isLogin = require("../../middlewares/isLogin");

const router = express.Router();

//create user route
router.post("/register", userRegisterController);

//login user
router.post("/login", userLoginController);

//get user profile
router.get("/profile/:id", isLogin, userProfileController);

module.exports = router;
