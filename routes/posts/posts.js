const express = require("express");
const {
  createPostController,
} = require("../../controller/posts/postsController");
const isLogin = require("../../middlewares/isLogin");

const router = express.Router();

//create post route
router.post("/", isLogin, createPostController);

module.exports = router;
