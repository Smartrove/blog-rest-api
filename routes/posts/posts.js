const express = require("express");
const {
  createPostController,
} = require("../../controller/posts/postsController");

const router = express.Router();

//create post route
router.post("/", createPostController);

module.exports = router;
