'use strict';

require('module-alias/register');
const express = require('express');
const mongoose = require('mongoose');
const { join } = require('path');
const _ = require('lodash');

const {
  DB_URI,
  DB_OPTIONS,
  PORT,
  EXPRESS_APP_OPTIONS
} = require(join(__dirname, 'config'));

const app = express();
for (let key in EXPRESS_APP_OPTIONS) {
  app.set(key, EXPRESS_APP_OPTIONS[key]);
}
mongoose.connect(DB_URI, DB_OPTIONS);

// mount supApps
const auth = require(join(__dirname, 'api', 'auth'));
const category = require(join(__dirname, 'api', 'category'));
app.use('/auth', auth);
app.use('/category', category);

// express errors
app.use(function (err, req, res, next) {
  const resBody = _.get(err, 'output.payload');
  if (err.data) {
    resBody.data = _.get(err, 'data');
  }
  res.status(_.get(err, 'output.statusCode'))
    .send(resBody);
});

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});
