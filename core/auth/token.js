const jwt = require('jsonwebtoken');

/**
 * Generate token for user using the user
 * using the user's id.
 */
exports.generateToken = user => {
  return 'JWT ' + jwt.sign({
    id: user._id
  }, process.env.JWT_SECRET);
}