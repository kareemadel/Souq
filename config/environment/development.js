'use strict';

module.exports = {
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.DB_URI || 'mongodb://127.0.0.1:27017',
  DB_OPTIONS: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    dbName: process.env.DB_NAME || 'souq'
  },
  jwtSecret: process.env.JWT_SECRET || '(&*HU&Thjh86t78u978ygt&%',
  saltRounds: process.env.SALT_ROUNDS || 10,
  EXPRESS_APP_OPTIONS: {
    'query parser': 'simple',
    'env': 'development'
  }
};
