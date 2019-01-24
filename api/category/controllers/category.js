'use strict';

const { join } = require('path');

const {
  fetchCategories,
  fetchSubcategories,
  createCategory,
  createSubcategory
} = require(join(__dirname, '..', 'services', 'category.js'));

const getCategories = async (req, res, next) => {
  try {
    const { skip, limit } = req.query;
    const categories = await fetchCategories(skip, limit);
    res.send(categories);
  } catch (error) {
    next(error);
  }
};

const getSubcategories = async (req, res, next) => {
  try {
    const { categoryName } = req.query;
    const subcategories = await fetchSubcategories(categoryName);
    res.send(subcategories);
  } catch (error) {
    next(error);
  }
};

const addCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.body;
    const newCategory = await createCategory(categoryName);
    res.send(newCategory);
  } catch (error) {
    next(error);
  }
};

const addSubcategory = async (req, res, next) => {
  try {
    const { subcategoryName, categoryName } = req.body;
    const updatedCategory = await createSubcategory(subcategoryName, categoryName);
    res.send(updatedCategory);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getSubcategories,
  addCategory,
  addSubcategory
};
