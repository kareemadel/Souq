'use strict';

const { join } = require('path');
const _ = require('lodash');

const {
  addBuyer,
  addSeller
} = require(join(__dirname, '..', 'services', 'user.js'));
const { generateJWT } = require(join(__dirname, '..', 'services', 'jwt.js'));
const { createHash } = require(join(__dirname, '..', 'services', 'password.js'));

const signUpBuyer = async (req, res, next) =>
{
  const { body, body: { password } } = req;
  body.hash = await createHash(password);
  try {
    const newUser = _.pick(await addBuyer(body), ['_id', 'role']);
    const token = generateJWT(newUser);
    newUser.token = token;
    res.send({
      user: newUser,
      name: body.name
    });
  } catch (error) {
    next(error);
  }
};

const signUpSeller = async (req, res, next) =>
{
  const { body, body: { password } } = req;
  body.hash = await createHash(password);
  try {
    const newUser = _.pick(await addSeller(body), ['_id', 'role']);
    const token = generateJWT(newUser);
    newUser.token = token;
    res.send({
      user: newUser,
      name: body.name
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUpBuyer,
  signUpSeller
};
