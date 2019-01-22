'use strict';

const jwt = require('jsonwebtoken');

const { jwtSecret } = require('@config');

const generateJWT = (obj) => {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(obj, jwtSecret);
};

module.exports = {
  generateJWT
};
