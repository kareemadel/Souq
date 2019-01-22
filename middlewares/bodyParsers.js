'use strict';

const express = require('express');

module.exports = {
  json: express.json(),
  urlEncoded: express.urlencoded({ extended: true })
};
