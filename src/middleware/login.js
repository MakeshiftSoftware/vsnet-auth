const { response } = require('./common');
const { User } = require('../models');
const token = require('../auth/token');

module.exports = response({
  model: User,
  instance: 'user',
  append: (req) => ({
    token: token(req.user)
  })
});
