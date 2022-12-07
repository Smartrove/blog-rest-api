const express = require("express");
const errorHandler = (err, req, res, next) => {
  const stack = err.stack;
  const message = err.message;
  const status = err.status ? err.status : "failed";
  const statusCode = err.statusCode ? err.statusCode : 500;

  //send response
  res.status(statusCode).json({
    stack,
    status,
    message,
  });
};

module.exports = errorHandler;
