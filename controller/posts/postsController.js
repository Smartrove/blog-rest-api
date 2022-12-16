const express = require("express");
const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");

const createPostController = async (req, res) => {
  const { title, description } = req.body;
  try {
    //find the user creating the post
    const author = await User.findById(req.userAuth);

    // create the post
    const post = await Post.create({
      title,
      description,
      user: author._id,
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

module.exports = { createPostController };
