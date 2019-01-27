'use strict';

const express = require('express');
const router = express.Router();
const { join } = require('path');

const joiMiddleware = require('@middleware/joiValidation.js');
const { json } = require('@middleware/bodyParsers.js');
const {
  addCategorySchema,
  getSubcategorySchema,
  addSubcategorySchema,
  addBatchCategoriesSchema
} = require(join(__dirname, 'schemas', 'category.js'));
const {
  getCategories,
  getSubcategories,
  addCategory,
  addSubcategory,
  addBatchCategories
} = require(join(__dirname, 'controllers', 'category.js'));

// get categories
router.get('/', getCategories);
// get subcategories
router.get('/', joiMiddleware(getSubcategorySchema), getSubcategories);
// add category
router.post('', json, joiMiddleware(addCategorySchema), addCategory);
// add subcategory
router.put('/', json, joiMiddleware(addSubcategorySchema), addSubcategory);
// batch add
router.post('/bulk', json, joiMiddleware(addBatchCategoriesSchema), addBatchCategories);

module.exports = router;
