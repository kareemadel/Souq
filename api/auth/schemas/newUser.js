'use strict';

const Joi = require('joi');

const passwordSignUpSchema = {
  body: Joi.object()
    .keys(
      {
        name: Joi.string().example('Kareem Ali').required(),
        email: Joi.string().email().example('kareem.adel.000@gmail.com').required(),
        password: Joi.string().example('afasdkfj9u8243jio').required().min(8),
        address: Joi.string().example('San Francisco')
      }
    )
    .required()
};


module.exports = {
  passwordSignUpSchema
};
