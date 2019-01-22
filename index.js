'use strict';

require('module-alias/register');
const express = require('express');
const mongoose = require('mongoose');
const { join } = require('path');
const _ = require('lodash');

const {
  DB_URI,
  DB_OPTIONS,
  PORT
} = require(join(__dirname, 'config'));

const app = express();
mongoose.connect(DB_URI, DB_OPTIONS);

// mount supApps
const auth = require(join(__dirname, 'api', 'auth'));
app.use('/auth', auth);

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
