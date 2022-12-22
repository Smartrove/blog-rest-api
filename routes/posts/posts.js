const express = require("express");

const {
  createPostController,
  viewAllPostsController,
  likePostController,
  disLikePostController,
  postViewCountController,
  deletePostController,
  updatePostController,
} = require("../../controller/posts/postsController");
const isLogin = require("../../middlewares/isLogin");

const router = express.Router();
const multer = require("multer");
const storage = require("../../config/cloudinary");
const upload = multer({ storage });

//create post route
router.post("/", isLogin, createPostController);
router.get("/", isLogin, viewAllPostsController);
router.get("/likes/:id", isLogin, likePostController);
router.get("/dislikes/:id", isLogin, disLikePostController);
router.get("/view/:id", isLogin, postViewCountController);
router.delete("/delete/:id", isLogin, deletePostController);
router.put(
  "/update/:id",
  isLogin,
  upload.single("profile"),
  updatePostController
);

module.exports = router;
