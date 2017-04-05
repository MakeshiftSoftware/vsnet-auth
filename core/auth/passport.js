const JwtStrategy   = require('passport-jwt').Strategy;
const ExtractJwt    = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const credentials   = require('./credentials');
const co            = require('co');
const User          = require('../models/user');

/**
 * Define jwt authentication options.
 */
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: process.env.JWT_SECRET
}

/**
 * Define local login options.
 */
const localOpts = {
  usernameField: 'username',
  passwordField: 'password'
}

/**
 * Initialize the local login strategy using username and
 * password. First, find a user with the provided username.
 * If successful, use bcrypt to perform a password comparison
 * against the encrypted password.
 *
 * If the passwords match, call the 'done' callback with the 
 * user object. If the validation fails at any point, call the
 * 'done' callback with 'false' in place of the user object.
 */
const localStrategy = new LocalStrategy(localOpts, (username, password, done) => {
  co(function *() {
    const user = yield User.findOne({
      username: username
    });

    if (!user) {
      done(null, false);
    } else {
      const match = yield credentials.compare(password, user.password);
      match ? done(null, user) : done(null, false);
    }
  })
  .catch(err => done(err));
})

/**
 * Define the jwt strategy. Decode the jwt and use the
 * resulting id to find the user object. If successful,
 * call the 'done' callback with the user object. Otherwise,
 * call the 'done' callback with 'false' in place of the user
 * object.
 */
const jwtStrategy = new JwtStrategy(jwtOpts, (payload, done) => {
  co(function *() {
    const user = yield User.findById(payload.id);
    if (!user) {
      done(null, false);
    } else {
      done(null, user);
    }
  })
  .catch(err => done(err, false));
})

/**
 * Expose the passport strategy function.
 */
module.exports = (passport) => {
  passport.use(localStrategy);
  passport.use(jwtStrategy);
}