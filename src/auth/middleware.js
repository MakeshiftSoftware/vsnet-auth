const passport = require('passport')

/**
 * Define jwt authentication middleware
 */
exports.requireAuth = passport.authenticate('jwt', {
  session: false
})

/**
 * Define login required middleware
 */
exports.requireLogin = passport.authenticate('local', {
  session: false
})
