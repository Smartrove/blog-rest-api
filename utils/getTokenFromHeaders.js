const express = require("express");
const getTokenFromHeaders = (req) => {
  //get token from headers
  const headerObject = req.headers;

  const token = headerObject["authorization"].split(" ")[1];
  if (token !== undefined) {
    return token;
  } else {
    return false;
  }
};

module.exports = getTokenFromHeaders;
