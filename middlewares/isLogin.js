const express = require("express");
const getTokenFromHeaders = require("../utils/getTokenFromHeaders");
const verifyToken = require("../utils/verifyToken");
const isLogin = (req, res, next) => {
  //get token from headers
  const token = getTokenFromHeaders(req);

  //verify token
  const decodedUser = verifyToken(token);

  //save user into a req object
  req.userAuth = decodedUser.id;

  if (!decodedUser) {
    return res.json({
      status: "failed",
      message: "invalid token",
    });
  } else {
    next();
  }
};

module.exports = isLogin;
