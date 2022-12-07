const express = require("express");

//handle app error
const appError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode ? statusCode : 500;
  error.stack = error.stack;
  return error;
};

//handle class error
class AppError extends Error {
  constructor(message, statusCode) {
    //
  }
}

module.exports = appError;
