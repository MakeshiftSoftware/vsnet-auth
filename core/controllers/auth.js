const token = require('../auth/token').generateToken;
const co    = require('co');
const User  = require('../models/user');

exports.login = (req, res) => {
  const user = User.json(req.user);
  user.token = token(req.user);
  return res.status(200).send(user);
}

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

exports.me = (req, res) => {
  return res.status(200).send(User.json(req.user));
}