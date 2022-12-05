const mongoose = require("mongoose");
const dotenv = require("dotenv/config");

const connection = mongoose
  .connect(process.env.BLOG_DB)
  .then(() => console.log(`database connected successfully`))
  .catch((error) => console.log(error.message));
