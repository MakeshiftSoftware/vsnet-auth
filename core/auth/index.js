const passport = require('passport');

exports.requireAuth = passport.authenticate('jwt', {
  session: false
})

exports.requireLogin = passport.authenticate('local', {
  session: false
})