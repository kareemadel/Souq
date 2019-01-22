'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => /(.+)@(.+){2,}\.(.+){2,}/.test(email)
      }
    },
    hash: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['buyer', 'seller'],
      required: true
    },
    cart: mongoose.Mixed,
    products: mongoose.Mixed,
    ratedProducts: mongoose.Mixed,
    commentedProducts: mongoose.Mixed,
    address: mongoose.Mixed
  }
);

module.exports = {
  User: mongoose.model('User', userSchema)
};
