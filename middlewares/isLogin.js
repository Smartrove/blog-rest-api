const express = require("express");
const getTokenFromHeaders = require("../utils/getTokenFromHeaders");

const isLogin = (req, res, next) => {
  //get token from headers
  const token = getTokenFromHeaders(req);
  if (!token) {
    return res.json({
      status: "failed",
      message: "Token is not attached to the headers",
    });
  } else {
    next();
  }
};

module.exports = isLogin;
