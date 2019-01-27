'use strict';

module.exports = {
  'PORT': process.env.PORT,
  DB_URI: process.env.DB_URI,
  DB_OPTIONS: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false,
    dbName: process.env.DB_NAME
  },
  jwtSecret: process.env.JWT_SECRET,
  saltRounds: process.env.SALT_ROUNDS,
  EXPRESS_APP_OPTIONS: {
    'query parser': 'simple',
    'x-powered-by': false,
    'env': 'production'
  }
};

