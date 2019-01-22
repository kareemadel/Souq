'use strict';

const bcrypt = require('bcrypt');
const Boom = require('boom');

const { saltRounds } = require('@config');

const createHash = async (plainTextPassword) => {
  const hash = await bcrypt.hashSync(plainTextPassword, saltRounds);
  return hash;
};

const validatePassword = async (plainTextPassword, hash) => {
  try {
    const isValid = await bcrypt.compare(plainTextPassword, hash);
    return isValid;
  } catch (error) {
    throw Boom.badImplementation('', error);
  }
};

module.exports = {
  createHash,
  validatePassword
};
