const express = require("express");
const storage = require("../../config/cloudinary");
const {
  userRegisterController,
  userLoginController,
  userProfileController,
  profilePhotoController,
  profileViewersController,
  userFollowingController,
  userUnfollowingController,
  blockedUser,
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
router.get("/viewers/:id", isLogin, profileViewersController);
router.get("/following/:id", isLogin, userFollowingController);
router.get("/unfollowing/:id", isLogin, userUnfollowingController);
router.get("/blocked/:id", isLogin, blockedUser);

router.post(
  "/profile-upload",
  isLogin,
  upload.single("profile"),
  profilePhotoController
);

module.exports = router;
