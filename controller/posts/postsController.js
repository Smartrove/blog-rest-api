const express = require("express");

const createPostController = async (req, res) => {
  res.send("hello world");
};

module.exports = { createPostController };
