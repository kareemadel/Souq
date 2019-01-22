'use strict';

const express = require('express');
const router = express.Router();
const { join } = require('path');

const joiMiddleware = require('@middleware/joiValidation.js');
const { json } = require('@middleware/bodyParsers.js');
const passwordSignUpSchema = require(join(__dirname, 'schemas', 'newUser.js'));
const passwordLoginSchema = require(join(__dirname, 'schemas', 'login.js'));
const { signUpBuyer, signUpSeller } = require(join(__dirname, 'controllers', 'passwordSignUp.js'));
const { passwordLogin } = require(join(__dirname, 'controllers', 'passwordLogin.js'));

// user and seller register
router.post('/buyer', json, joiMiddleware(passwordSignUpSchema), signUpBuyer);
router.post('/seller', json, joiMiddleware(passwordSignUpSchema), signUpSeller);

// login route
router.post('/login', json, joiMiddleware(passwordLoginSchema), passwordLogin);

module.exports = router;
