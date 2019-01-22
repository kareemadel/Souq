'use strict';

const Joi = require('joi');
const Boom = require('boom');

const joiMiddleware = (joiSchema) => {
  return async (req, res, next) => {
    const error = {};
    for (let i in joiSchema) {
      try {
        await Joi.validate(req[i], joiSchema[i], { abortEarly: false });
      } catch (err) {
        error[i] = err.details;
      }
    }
    if (Object.keys(error).length === 0) {
      next();
    } else {
      next(Boom.badRequest('', error));
    }
  };
};

module.exports = joiMiddleware;
