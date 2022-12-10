const express = require("express");
const storage = require("../../config/cloudinary");
const {
  userRegisterController,
  userLoginController,
  userProfileController,
  profilePhotoController,
} = require("../../controller/users/usersController");
const isLogin = require("../../middlewares/isLogin");
const multer = require("multer");

//instance of multer
const upload = new multer({
  storage,
});

const router = express.Router();

//create user route
router.post("/register", userRegisterController);

//login user
router.post("/login", userLoginController);

//get user profile
router.get("/profile", isLogin, userProfileController);
profilePhotoController;
router.post(
  "/profile-upload",
  isLogin,
  upload.single("profile"),
  profilePhotoController
);

module.exports = router;
