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
      index: 'hashed',
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
    cart: [{
      name: {
        type: String,
        required: true
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      }
    }],
    products: [{
      name: {
        type: String,
        required: true
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      }
    }],
    reviews: [{
      body: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      rate: {
        type: Number,
        required: true
      },
      product: {
        name: {
          type: String,
          required: true
        },
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true
        }
      }
    }],
    address: mongoose.Mixed
  },
  {
    shardKey: {
      _id: 'hashed'
    }
  }
);

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};
