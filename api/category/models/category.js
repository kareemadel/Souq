'use strict';

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: 'hashed',
      unique: true
    },
    subCategories: [String]
  }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = {
  Category
};
