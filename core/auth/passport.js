const JwtStrategy   = require('passport-jwt').Strategy;
const ExtractJwt    = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const credentials   = require('./credentials');
const co            = require('co');
const User          = require('../models/user');

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: process.env.JWT_SECRET
};

const localOpts = {
  usernameField: 'username',
  passwordField: 'password'
};

const localStrategy = new LocalStrategy(localOpts, (username, password, done) => {
  co(function *() {
    const user = yield User.findOne({username: username});
    if (!user) return done(null, false);
    const match = yield credentials.compare(password, user.password);
    return match ? done(null, user) : done(null, false);
  })
  .catch(err => done(err));
});

const jwtStrategy = new JwtStrategy(jwtOpts, (payload, done) => {
  co(function *() {
    const user = yield User.findById(payload.id);
    if (!user) return done(null, false);
    done(null, user);
  })
  .catch(err => done(err, false));
});

module.exports = (passport) => {
  passport.use(localStrategy);
  passport.use(jwtStrategy);
}