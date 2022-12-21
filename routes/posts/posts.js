const express = require("express");
const {
  createPostController,
  viewAllPostsController,
  likePostController,
  disLikePostController,
  postViewCountController,
  deletePostController,
} = require("../../controller/posts/postsController");
const isLogin = require("../../middlewares/isLogin");

const router = express.Router();

//create post route
router.post("/", isLogin, createPostController);
router.get("/", isLogin, viewAllPostsController);
router.get("/likes/:id", isLogin, likePostController);
router.get("/dislikes/:id", isLogin, disLikePostController);
router.get("/view/:id", isLogin, postViewCountController);
router.delete("/delete/:id", isLogin, deletePostController);

module.exports = router;
