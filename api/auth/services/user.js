'use strict';

const { join } = require('path');
const Boom = require('boom');

const { User } = require(join(__dirname, '..', 'models', 'user.js'));

const addSeller = async ({ name, email, hash, address }) =>
{
  try {
    const newUser = await User.create({
      name,
      email,
      hash,
      address,
      role: 'seller'
    });
    return newUser.toObject();
  } catch(error) {
    throw Boom.conflict('Duplicate Email.');
  }
};

const addBuyer = async ({ name, email, hash, address }) =>
{
  try {
    const newUser = await User.create({
      name,
      email,
      hash,
      address,
      role: 'buyer'
    });
    return newUser.toObject();
  } catch(error) {
    throw Boom.conflict('Duplicate Email.');
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return !user ? user : user.toObject();
  } catch (error) {
    throw Boom.badImplementation('', error);
  }
};

module.exports = {
  addSeller,
  addBuyer,
  findUserByEmail
};
