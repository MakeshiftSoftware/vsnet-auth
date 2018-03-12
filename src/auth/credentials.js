const bcrypt = require('bcryptjs');

/**
 * Hash and salt password using bcrypt.
 *
 * @param {String} password - Plain text password
 */
const encrypt = (password) => (
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        return err ? reject(err) : resolve(hash);
      });
    });
  })
);

/**
 * Compare plain text password to hashed password using bcrypt.
 *
 * @param {String} candidate - Plain text password
 * @param {String} password - Hashed password
 */
const compare = (candidate, password) => (
  new Promise((resolve, reject) => {
    bcrypt.compare(candidate, password, (err, match) => {
      return err ? reject(err) : resolve(match);
    });
  })
);

module.exports = {
  encrypt,
  compare
};
