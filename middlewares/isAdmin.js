const express = require("express");
const { appError } = require("../utils/appError");
const getTokenFromHeaders = require("../utils/getTokenFromHeaders");
const verifyToken = require("../utils/verifyToken");
const User = require("../model/User/User");

const isAdmin = async (req, res, next) => {
  //get token from headers
  const token = getTokenFromHeaders(req);

  //verify token
  const decodedUser = verifyToken(token);

  //save user into a req object
  req.userAuth = decodedUser.id;

  //find user in the database
  const user = await User.findById(decodedUser.id);

  if (user.isAdmin) {
    return next();
  } else {
    return next(appError("Access denied, admin only", 403));
  }
};

module.exports = isAdmin;
