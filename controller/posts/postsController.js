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
      // console.log(post);
      const blockedUsers = post.user.blocked;
      // console.log(blockedUsers);
      //whether the blocked id is included
      const isBlocked = blockedUsers.includes(req.userAuth);

      // return isBlocked ? null : post;
      return !isBlocked;
    });
    res.json({
      status: "success",
      data: filteredPosts,
    });
  } catch (err) {
    return next(err.message);
  }
};

//like a post
const likePostController = async (req, res, next) => {
  try {
    //find post to be liked
    const post = await Post.findById(req.params.id);
    //check if the post has been liked already
    const postAlreadyLiked = post.likes.includes(req.userAuth);
    //if user already liked the post, unlike it
    if (postAlreadyLiked) {
      post.likes = post.likes.filter((like) => like != req.userAuth);
      await post.save();
    } else {
      //if the user has not liked the post, then like it
      post.likes.push(req.userAuth);
      await post.save();
    }

    res.json({
      status: "success",
      data: post,
    });
  } catch (err) {
    next(appError(err.message));
  }
};

//dislike a post
const disLikePostController = async (req, res, next) => {
  try {
    //find post to be liked
    const post = await Post.findById(req.params.id);
    //check if the post has been liked already
    const postAlreadyDisliked = post.disLikes.includes(req.userAuth);
    //if user already liked the post, unlike it
    if (postAlreadyDisliked) {
      post.disLikes = post.disLikes.filter(
        (dislike) => dislike != req.userAuth
      );
      await post.save();
    } else {
      //if the user has not liked the post, then like it
      post.disLikes.push(req.userAuth);
      await post.save();
    }

    res.json({
      status: "success",
      data: post,
    });
  } catch (err) {
    next(appError(err.message));
  }
};

//number of view counts
const postViewCountController = async (req, res, next) => {
  try {
    //find post to be liked
    const post = await Post.findById(req.params.id);
    //number of views
    //check if user has viewed post
    const isViewed = post.numbViews.includes(req.userAuth);
    if (isViewed) {
      res.json({
        status: "success",
        data: post,
      });
    } else {
      res.json({
        status: "success",
        data: post,
      });
      //push the user id into the number of view arrays
      post.numbViews.push(req.userAuth);
      await post.save();
    }
  } catch (err) {
    next(appError(err.message));
  }
};
//delete post
const deletePostController = async (req, res, next) => {
  try {
    //find post to be liked
    const post = await Post.findById(req.params.id);
    //check if post belongs to the current user
    if (req.userAuth.toString() !== post.user.toString()) {
      return next(appError("You cant delete this post"));
    }
    await Post.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: "Post deleted successfully",
    });
  } catch (err) {
    next(appError(err.message));
  }
};
//update post
const updatePostController = async (req, res, next) => {
  const { title, description, category } = req.body;
  try {
    //find post to be liked
    const post = await Post.findById(req.params.id);
    //check if post belongs to the current user
    if (post.user.toString() !== req.userAuth.toString()) {
      return next(appError("You cant update this post"));
    }
    await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        photo: req?.file?.path,
      },
      { new: true }
    );
    res.json({
      status: "success",
      data: "Post updated successfully",
    });
  } catch (err) {
    next(appError(err.message));
  }
};

module.exports = {
  createPostController,
  viewAllPostsController,
  likePostController,
  disLikePostController,
  postViewCountController,
  deletePostController,
  updatePostController,
};
