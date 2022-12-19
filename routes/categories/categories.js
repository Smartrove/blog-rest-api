const express = require("express");
const {
  createCategoryController,
  viewAllCategoryController,
  viewSingleCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../../controller/categories/categoriesController");
const isLogin = require("../../middlewares/isLogin");
const router = express.Router();

//create post route
router.post("/", isLogin, createCategoryController);
router.get("/view-all", viewAllCategoryController);
router.get("/view-single/:id", viewSingleCategoryController);
router.put("/:id", isLogin, updateCategoryController);
router.delete("/:id", isLogin, deleteCategoryController);

module.exports = router;
