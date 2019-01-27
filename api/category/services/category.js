'use strict';

const { join } = require('path');
const Boom = require('boom');

const { Category } = require(join(__dirname, '..', 'models', 'category'));

let categories = null;
let isOutdated = true;


const fetchCategories = async (skip, limit) => {
  skip = skip ? skip : 0;
  limit = limit ? limit : 0;
  if (!isOutdated) {
    return [...categories(skip, skip+limit+1)];
  }
  try {
    categories = await Category.find({}).exec();
    return [...categories(skip, skip+limit+1)];
  } catch (error) {
    throw Boom.badImplementation('', error);
  }
};

const fetchSubcategories = async (categoryName) => {
  if(isOutdated) {
    await fetchCategories();
  }
  if (!categories[categoryName]) {
    throw Boom.notFound('There is no such category');
  }
  return [...categories[categoryName].subCategories];
};

const createCategory = async (categoryName) => {
  try {
    const newCategory = await Category.create({
      name: categoryName,
      indexName: categoryName
    });
    return newCategory.toObject();
  } catch (error) {
    throw Boom.conflict('Duplicate Category.', error);
  } finally {
    isOutdated = true;
  }
};

const createBatchCategory = async (categories) => {
  categories.forEach(o => {
    o.indexName = o.name;
  });
  try {
    const newCategories = await Category.insertMany(categories, {
      ordered: false
    });
    return newCategories;
  } catch (error) {
    throw Boom.conflict('Duplicate Categories.', error);
  } finally {
    isOutdated = true;
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
  } finally {
    isOutdated = true;
  }
};

const isCategory = async (categoryName) => {
  const categories = await fetchCategories();
  if (categories.indexOf(categoryName) === -1) {
    return false;
  }
  return true;
};

const isSubcategory = async (subcategoryName) => {
  const categories = await fetchCategories();
  for (let c of categories) {
    if (c.subCategories.indexOf(subcategoryName) !== -1) {
      return true;
    }
  }
  return false;
};

module.exports = {
  fetchCategories,
  fetchSubcategories,
  createCategory,
  createSubcategory,
  createBatchCategory,
  isCategory,
  isSubcategory
};
