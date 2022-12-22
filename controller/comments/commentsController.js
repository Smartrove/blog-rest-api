const express = require("express");
const Comment = require("../../model/Comment/Comment");
const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
const { appError } = require("../../utils/appError");

const createCommentController = async (req, res, next) => {
  const { description } = req.body;
  try {
    //find post to comment
    const post = await Post.findById(req.params.id);
    //create comment
    const comment = await Comment.create({
      post: post._id,
      description,
      user: req.userAuth,
    });
    //push the comment to post
    post.comments.push(comment._id);
    //find the user
    const user = await User.findById(req.userAuth);
    //push comment to the user
    user.comments.push(comment._id);

    //save the two models
    //disable validation
    await post.save({ validateBeforeSave: false });
    await user.save({ validateBeforeSave: false });
    res.json({
      status: "success",
      data: comment,
    });
  } catch (err) {
    next(appError(err.message));
  }
};

const updateCommentController = async (req, res, next) => {
  const { description } = req.body;
  try {
    //find comment to be updated
    const commentToBeUpdated = await Comment.findById(req.params.id);
    //check if post belongs to the current user
    if (commentToBeUpdated.user.toString() !== req.userAuth.toString()) {
      return next(appError("You cant update this post"));
    }
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { description },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({
      status: "success",
      data: comment,
    });
  } catch (err) {
    return next(appError(err.message));
  }
};

const deleteCommentController = async (req, res, next) => {
  try {
    //find comment to be updated
    const commentToBeDeleted = await Comment.findById(req.params.id);
    //check if post belongs to the current user
    if (commentToBeDeleted.user.toString() !== req.userAuth.toString()) {
      return next(appError("You cant delete this post"));
    }
    await Comment.findByIdAndDelete(req.params.id);

    res.json({
      status: "success",
      data: "comment has been deleted",
    });
  } catch (err) {
    next(appError(err.message));
  }
};

module.exports = {
  createCommentController,
  deleteCommentController,
  updateCommentController,
};
