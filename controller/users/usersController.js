const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeaders = require("../../utils/getTokenFromHeaders");
const appError = require("../../utils/appError");
const express = require("express");
const { Error } = require("mongoose");

//register user
const userRegisterController = async (req, res, next) => {
  const { firstName, lastName, profilePhoto, email, password } = req.body;
  try {
    //check if the user is already registered
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appError("Email already registered", 500));
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

module.exports = {
  userRegisterController,
  userLoginController,
  userProfileController,
};
