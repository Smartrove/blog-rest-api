const express = require("express");
const {
  createCategoryController,
} = require("../../controller/categories/categoriesController");

const router = express.Router();

//create post route
router.post("/", createCategoryController);

module.exports = router;
