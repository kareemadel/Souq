'use strict';

const Joi = require('joi');

const addCategorySchema = {
  body: Joi.object()
    .keys(
      {
        categoryName: Joi.string().required()
      }
    )
    .required()
};

const addSubcategorySchema = {
  body: Joi.object()
    .keys(
      {
        categoryName: Joi.string().required(),
        subcategoryName: Joi.string().required()
      }
    )
    .required()
};

const getSubcategorySchema = {
  query: Joi.object()
    .keys(
      {
        categoryName: Joi.string().required()
      }
    )
    .required()
};

module.exports = {
  addCategorySchema,
  getSubcategorySchema,
  addSubcategorySchema
};
