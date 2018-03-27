const { User } = require('../models');
const token = require('../auth/token');

const login = (req, res) => {
  res.status(200).send({
    ...User.json(req.user),
    token: token(req.user)
  });
};

module.exports = login;
