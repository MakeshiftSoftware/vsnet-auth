const jwt = require('jsonwebtoken')

/**
 * Generate auth token using the user's id.
 *
 * @param {Object} user - User object
 */
module.exports = (user) => {
  return 'JWT ' + jwt.sign({
    id: user.id
  }, process.env.SECRET)
}
