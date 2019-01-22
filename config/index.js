'use strict';
const { join } = require('path');
const _ = require('lodash');

const config = (function ()
{
  const environment = process.env.NODE_ENV || 'development';

  const envConfig = require(join(__dirname, 'environment', `${environment}.js`));

  return _.merge({}, envConfig);
})();

module.exports = config;
