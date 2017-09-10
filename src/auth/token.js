const jwt = require('jsonwebtoken')

/**
 * Generate token for user using the user
 * using the user's id.
 */
module.exports = (user) => {
  return 'JWT ' + jwt.sign({
    id: user.id
  }, process.env.SECRET)
}
