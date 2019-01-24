'use strict';

const { join } = require('path');
const Boom = require('boom');

const { Category } = require(join(__dirname, '..', 'models', 'category'));


const fetchCategories = async (skip, limit) => {
  try {
    return await Category.find({})
      .skip(skip)
      .limit(limit)
      .exec();
  } catch (error) {
    throw Boom.badImplementation('', error);
  }
};

const fetchSubcategories = async (categoryName) => {
  try {
    return await Category.findOne({ name: categoryName }).exec();
  } catch (error) {
    throw Boom.badImplementation('', error);
  }
};

const createCategory = async (categoryName) => {
  try {
    const newCategory = await Category.create({
      name: categoryName.toLowerCase()
    });
    return newCategory.toObject();
  } catch (error) {
    throw Boom.conflict('Duplicate Category.');
  }
};

const createSubcategory = async (subcategoryName, categoryName) => {
  try {
    return await Category.findOneAndUpdate(
      {
        name: categoryName.toLowerCase()
      },
      {
        $addToSet: {
          subCategories: subcategoryName
        }
      },
      {
        upsert: true,
        new: true
      }
    ).exec();
  } catch (error) {
    throw Boom.badImplementation('', error);
  }
};

module.exports = {
  fetchCategories,
  fetchSubcategories,
  createCategory,
  createSubcategory
};
