const express = require("express");
const {
  createPostController,
  viewAllPostsController,
} = require("../../controller/posts/postsController");
const isLogin = require("../../middlewares/isLogin");

const router = express.Router();

//create post route
router.post("/", isLogin, createPostController);
router.get("/", isLogin, viewAllPostsController);

module.exports = router;
