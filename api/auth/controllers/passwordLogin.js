const passport = require('passport');
const LocalStrategy = require('passport-local');
const { join } = require('path');
const Boom = require('boom');
const _ = require('lodash');

const { validatePassword } = require(join(__dirname, '..', 'services', 'password.js'));
const { findUserByEmail } = require(join(__dirname, '..', 'services', 'user.js'));
const { generateJWT } = require(join(__dirname, '..', 'services', 'jwt.js'));

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (username, password, done) => {
  try {
    let user = await findUserByEmail(username);
    if(!user || !(await validatePassword(password, user.hash))) {
      return done(null, false, { errmsg: 'username or password is invalid' });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

const afterAuthCallback = (req, res, next) => {
  return (err, passportUser, info) => {
    if (err) {
      return next(Boom.badImplementation('', err));
    }
    if (passportUser) {
      const user = _.pick(passportUser, ['email', 'role']);
      const token = generateJWT(user);
      user.token = token;
      return res.send({ user, name: passportUser.name });
    }
    return next(Boom.unauthorized(info.errmsg));
  };
};

const passwordLogin = (req, res, next) => {
  return passport.authenticate(
    'local',
    { session: false },
    afterAuthCallback(req, res, next))(req, res, next);
};

module.exports = {
  passwordLogin
};
