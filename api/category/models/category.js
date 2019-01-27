'use strict';

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    indexName : {
      type: String,
      index: true,
      unique: true,
      set: (v) => v.toLowerCase()
    },
    subCategories: [String]
  }
);

const Category = mongoose.model('Category', categorySchema);
Category.createIndexes();

module.exports = {
  Category
};
