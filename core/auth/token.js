const jwt = require('jsonwebtoken');

exports.generateToken = user => {
  return 'JWT ' + jwt.sign({
    id: user._id
  }, process.env.JWT_SECRET);
}