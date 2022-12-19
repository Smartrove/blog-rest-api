const express = require("express");
const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
const { appError } = require("../../utils/appError");
//create post
const createPostController = async (req, res, next) => {
  const { title, description, category } = req.body;
  try {
    //find the user creating the post
    const author = await User.findById(req.userAuth);
    //check if the user is blocked before creating the post
    if (author.isBlocked) {
      return next(appError("You are not allowed to create a post", 403));
    }

    // create the post
    const post = await Post.create({
      title,
      description,
      user: author._id,
      category,
    });

    // associate the user to the post
    author.posts.push(post);
    await author.save();
    res.json({
      status: "success",
      data: post,
    });
  } catch (err) {
    res.json(err.message);
  }
};

//view all posts
const viewAllPostsController = async (req, res, next) => {
  try {
    //find all post
    const allPosts = await Post.find({})
      .populate("user")
      .populate("category", "title");

    //check if the post author have blocked user
    const filteredPosts = allPosts.filter((post) => {
      //get all blocked users
      const blockedUsers = post.user.blocked;

      //whether the blocked id is included
      const isBlocked = blockedUsers.includes(req.userAuth);
      console.log(isBlocked);
    });
    res.json({
      status: "success",
      data: allPosts,
    });
  } catch (err) {
    return next(err.message);
  }
};

module.exports = { createPostController, viewAllPostsController };
