const jwt = require("jsonwebtoken");

//generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "3d" });
};

module.exports = generateToken;
