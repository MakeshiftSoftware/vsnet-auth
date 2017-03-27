const bcrypt    = require('bcrypt');
const validator = require('validator');

exports.encrypt = password => new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) reject(err);

    bcrypt.hash(password, salt, (err, hash) => {
      err ? reject(err) : resolve(hash);
    });
  });
})

exports.compare = (candidate, password) => new Promise((resolve, reject) => {
  bcrypt.compare(candidate, password, (err, match) => {
    err ? reject(err) : resolve(match);
  });
})

exports.validateEmail = email => validator.isEmail(email)

exports.normalizeEmail = email => validator.normalizeEmail(email, {
  all_lowercase: true
})