const express = require("express");
const router = express.Router();

//create user route
router.get("/", (req, res) => {
  res.send("hello world");
});

module.export = router;
