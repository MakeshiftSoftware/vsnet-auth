const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')
const credentials = require('./credentials')
const User = require('../models').User

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
 * Define the local login strategy using username and
 * password. First, find a user with the provided username.
 * If user is found, compare the given password with the
 * encrypted password using bcrypt.
 *
 * If the passwords match, call the 'done' callback with the
 * user object. If the validation fails at any point, call the
 * 'done' callback with 'false'
 */
const localStrategy = new LocalStrategy(localOpts, (username, password, done) => {
  User.findOne({ where: { username: username } })
    .then((user) => {
      if (!user) {
        return done(null, false)
      }

      credentials.compare(password, user.password)
        .then((match) => {
          return match ? done(null, user) : done(null, false)
        })
    })
    .catch((err) => {
      done(err)
    })
})

/**
 * Define the jwt strategy. Decode the jwt and use the
 * payload id to find the user object. If user is found,
 * call the 'done' callback with the user object. Otherwise,
 * call the 'done' callback with 'false'.
 */
const jwtStrategy = new JwtStrategy(jwtOpts, (payload, done) => {
  User.findById(payload.id)
    .then((user) => {
      return user ? done(null, user) : done(null, false)
    })
    .catch((err) => {
      done(err, false)
    })
})

/**
 * Expose the passport strategy function.
 */
module.exports = (passport) => {
  passport.use(localStrategy)
  passport.use(jwtStrategy)
}
