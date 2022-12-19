const express = require("express");
const Category = require("../../model/Category/Category");
const { appError } = require("../../utils/appError");

//create a category
const createCategoryController = async (req, res, next) => {
  const { title } = req.body;
  try {
    const category = await Category.create({
      title,
      user: req.userAuth,
    });
    res.json({
      status: "success",
      data: category,
    });
  } catch (err) {
    return next(appError(err.message));
  }
};

//view all categories
const viewAllCategoryController = async (req, res, next) => {
  try {
    const category = await Category.find();
    res.json({
      status: "success",
      data: category,
    });
  } catch (err) {
    return next(appError(err.message));
  }
};

//view a single category
const viewSingleCategoryController = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json({
      status: "success",
      data: category,
    });
  } catch (err) {
    return next(appError(err.message));
  }
};

//update category
const updateCategoryController = async (req, res, next) => {
  const { title } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { title },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({
      status: "success",
      data: category,
    });
  } catch (err) {
    return next(appError(err.message));
  }
};

//delete category
const deleteCategoryController = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id, {
      new: true,
      runValidators: true,
    });
    res.json({
      status: "success",
      data: "category deleted successfully",
    });
  } catch (err) {
    return next(appError(err.message));
  }
};
module.exports = {
  viewSingleCategoryController,
  createCategoryController,
  viewAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
