const token = require('../auth/token').generateToken;
const co    = require('co');
const User  = require('../models/user');

/**
 * Log in the user. Generate a token to
 * include with the response. Username and
 * password validation handled by passport
 * authentication middleware.
 */
exports.login = (req, res) => {
  const user = User.json(req.user);
  user.token = token(req.user);
  return res.status(200).send(user);
}

/**
 * Register the user. If successful, generate a token
 * to be included with the response.
 */
exports.register = (req, res) => {
  co(function *() {
    let user = yield User.register(req);
    user = User.json(user);
    user.token = token(user);
    return res.status(200).send(user);
  })
  .catch(err => res.status(err.code || 400).send({
    message: err.message
  }));
}

/**
 * Get the user profile using the provided token.
 */
exports.me = (req, res) => {
  res.status(200).send(User.json(req.user));
}