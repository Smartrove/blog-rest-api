const express = require("express");
const {
  createCommentController,
} = require("../../controller/comments/commentsController");

const router = express.Router();

//create post route
router.post("/", createCommentController);

module.exports = router;
