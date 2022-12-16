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
  unblockedUser,
  adminBlockedUser,
  adminUnblockedUser,
  usersController,
} = require("../../controller/users/usersController");
const isLogin = require("../../middlewares/isLogin");
const multer = require("multer");
const isAdmin = require("../../middlewares/isAdmin");
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
router.get("/all-users", usersController);
router.get("/viewers/:id", isLogin, profileViewersController);
router.get("/following/:id", isLogin, userFollowingController);
router.get("/unfollowing/:id", isLogin, userUnfollowingController);
router.get("/blocked/:id", isLogin, blockedUser);
router.get("/unblocked/:id", isLogin, unblockedUser);
router.put("/blockedByAdmin/:id", isLogin, isAdmin, adminBlockedUser);
router.put("/admin-unblock/:id", isLogin, isAdmin, adminUnblockedUser);

router.post(
  "/profile-upload",
  isLogin,
  upload.single("profile"),
  profilePhotoController
);

module.exports = router;
