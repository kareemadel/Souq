'use strict';

const Joi = require('joi');

const passwordLoginSchema = {
  body: Joi.object()
    .keys(
      {
        email: Joi.string().example('kareem.adel.000@gmail.com').required(),
        password: Joi.string().example('afasdkfj9u8243jio').required().min(8)
      }
    )
    .required()
};

module.exports = {
  passwordLoginSchema
};
