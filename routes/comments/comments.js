const express = require("express");
const {
  createCommentController,
  deleteCommentController,
  updateCommentController,
} = require("../../controller/comments/commentsController");
const isLogin = require("../../middlewares/isLogin");
const router = express.Router();

//create post route
router.post("/:id", isLogin, createCommentController);
router.delete("/:id", isLogin, deleteCommentController);
router.put("/:id", isLogin, updateCommentController);

module.exports = router;
