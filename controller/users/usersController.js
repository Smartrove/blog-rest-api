const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeaders = require("../../utils/getTokenFromHeaders");
const { appError, AppError } = require("../../utils/appError");
const express = require("express");
const { Error } = require("mongoose");
const { response } = require("express");

//register user
const userRegisterController = async (req, res, next) => {
  const { firstName, lastName, profilePhoto, email, password } = req.body;
  try {
    //check if the user is already registered
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(new AppError("Email already registered", 500));
    }
    //hash user password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    res.json({ status: "success", msg: "User created", data: user });
  } catch (err) {
    next(appError(err.message));
  }
};

//login user
const userLoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check if email exist
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.json({ msg: "invalid login credentials" });
    }

    //verify password

    const isPasswordMatched = await bcrypt.compareSync(
      password,
      userFound.password
    );

    if (!isPasswordMatched) {
      return res.json({ msg: "invalid login credentials" });
    }
    res.json({
      status: "success",
      msg: "User logged in successfully",
      data: {
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
        token: generateToken(userFound._id),
      },
    });
  } catch (err) {
    res.json(err.message);
  }
};

//following user
const userFollowingController = async (req, res, next) => {
  try {
    //find user to follow
    const user = await User.findById(req.params.id);

    //find the user who is following
    const userFollowing = await User.findById(req.userAuth);

    //check if the user and userfollowing are found
    if (user && userFollowing) {
      //check if userFollowing already exists in the array
      const userAlreadyFollowing = user.following.find(
        (follower) => follower.toString() === userFollowing._id.toString()
      );
      if (userAlreadyFollowing) {
        return next(appError("Following user already"));
      } else {
        //push follower id into the array
        user.followers.push(userFollowing._id);

        //push the user to be followed id into the follower array
        userFollowing.following.push(user._id);

        await user.save();
        await userFollowing.save();

        res.json({
          status: "success",
          data: "You have successfully followed this user",
        });
      }
    }
  } catch (err) {
    res.json(err.message);
  }
};
//unfollowing user
const userUnfollowingController = async (req, res, next) => {
  try {
    //find user to unfollow
    const userToBeUnfollowed = await User.findById(req.params.id);

    //find the user who is unfollowing
    const userUnfollowing = await User.findById(req.userAuth);

    //check if the userToBeUnfolloed and userUnfollowing are found
    if (userToBeUnfollowed && userUnfollowing) {
      //check if userFollowing already exists in the array
      const userAlreadyFollowing = userToBeUnfollowed.followers.find(
        (follower) => follower.toString() === userUnfollowing._id.toString()
      );
      if (!userAlreadyFollowing) {
        return next(appError("you cant unfollow user"));
      } else {
        //remove follower id from the array
        userToBeUnfollowed.followers.filter(
          (follower) => follower.toString() !== userUnfollowing._id.toString()
        );

        //remove the user to be unfollowed id from the array
        userUnfollowing.following.filter(
          (following) =>
            following.toString() !== userToBeUnfollowed._id.toString()
        );

        await userToBeUnfollowed.save();
        await userUnfollowing.save();

        res.json({
          status: "success",
          data: "You have successfully unfollowed this user",
        });
      }
    }
  } catch (err) {
    res.json(err.message);
  }
};

//user profile
const userProfileController = async (req, res) => {
  try {
    const user = await User.findById(req.userAuth);
    res.json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.json(err.message);
  }
};

//blocked user contoller
const blockedUser = async (req, res, next) => {
  try {
    //find user to be blocked
    const userToBeBlocked = await User.findById(req.params.id);

    //find the user who is blocking
    const userBlocking = await User.findById(req.userAuth);

    //check if the userToBeUnfolloed and userUnfollowing are found
    if (userToBeBlocked && userBlocking) {
      //check if user to be blocked already exists in the array
      const userAlreadyBlocked = userBlocking.blocked.find(
        (follower) => follower.toString() === userToBeBlocked._id.toString()
      );
      if (userAlreadyBlocked) {
        return next(appError("you cant block user twice"));
      } else {
        //remove follower id from the array
        userBlocking.blocked.push(userToBeBlocked._id.toString());
        await userBlocking.save();

        res.json({
          status: "success",
          data: "You have successfully blocked this user",
        });
      }
    }
  } catch (err) {
    res.json(err.message);
  }
};

//profile photo upload
const profilePhotoController = async (req, res, next) => {
  try {
    //find user for profile photo upload
    const userToUpload = await User.findById(req.userAuth);
    if (!userToUpload) {
      return next(appError("user not found", 404));
    }

    //check if user is blocked
    if (userToUpload.isBlocked) {
      return next(appError("your account is blocked, action not allowed", 403));
    }

    //check if user is updating his dp
    if (req.file) {
      //update user dp
      await User.findByIdAndUpdate(
        req.userAuth,
        {
          $set: { profilePhoto: req.file.path },
        },
        { new: true }
      );
    }
    res.json({
      status: "success",
      data: "You have successfully uploaded your profile photo",
    });
  } catch (err) {
    next(appError(err.message, 500));
  }
};

//profile viewers
const profileViewersController = async (req, res, next) => {
  try {
    //to find the user profile
    const user = await User.findById(req.params.id);

    //to find the user who is trying to view the profile
    const userWhoViewed = await User.findById(req.userAuth);

    //check if user and userWhoViewed exist
    if (user || userWhoViewed) {
      const isUserAlreadyViewed = user.viewers.find(
        (viewer) => viewer.toString() === userWhoViewed._id.toString()
      );
      console.log(111, userWhoViewed);
      if (isUserAlreadyViewed) {
        return next(appError("viewed"));
      } else {
        user.viewers.push(userWhoViewed._id);
        await user.save();
        res.json({
          status: "success",
          data: "profile viewed",
        });
      }
    }
  } catch (err) {
    next(appError(err.message, 500));
  }
};

module.exports = {
  userRegisterController,
  userLoginController,
  userProfileController,
  profilePhotoController,
  profileViewersController,
  userFollowingController,
  userUnfollowingController,
  blockedUser,
};
