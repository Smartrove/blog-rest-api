const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeaders = require("../../utils/getTokenFromHeaders");
const { appError, AppError } = require("../../utils/appError");
const express = require("express");
const { Error } = require("mongoose");

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

module.exports = {
  userRegisterController,
  userLoginController,
  userProfileController,
  profilePhotoController,
};
