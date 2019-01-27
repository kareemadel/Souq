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

const addBatchCategoriesSchema = {
  body: Joi.object()
    .keys(
      {
        categories: Joi.array()
          .items(
            Joi.object()
              .keys(
                {
                  name: Joi.string().required(),
                  subCategories: Joi.array().items(Joi.string())
                }
              )
          )
          .required()
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
  addSubcategorySchema,
  addBatchCategoriesSchema
};
