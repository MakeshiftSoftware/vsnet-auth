const jwt = require('jsonwebtoken');

const secret = process.env.APP_SECRET;

/**
 * Generate auth token.
 *
 * @param {Object} user - User object
 */
module.exports = (user) => {
  const token = jwt.sign({
    id: user.id
  }, secret);

  return `JWT ${token}`;
};
