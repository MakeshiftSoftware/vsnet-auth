const bcrypt    = require('bcrypt');
const validator = require('validator');

/**
 * Hash password with added salt using bcrypt.
 *
 * @param {String} password - The password to hash
 */
exports.encrypt = (password) => new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) reject(err);

    bcrypt.hash(password, salt, (err, hash) => {
      err ? reject(err) : resolve(hash);
    });
  });
})

/**
 * Compare plain text password to hashed password using bcrypt.
 * If the passwords match, the value match will resolve to 'true'.
 *
 * @param {String} password - The plain text password
 */
exports.compare = (candidate, password) => new Promise((resolve, reject) => {
  bcrypt.compare(candidate, password, (err, match) => {
    err ? reject(err) : resolve(match);
  });
})

/**
 * Check if given email is a valid email using
 * the validator package.
 *
 * @param {String} email - The email to validate
 */
exports.validateEmail = (email) => validator.isEmail(email)

/**
 * Normalize the given email address.
 *
 * @param {String} email - The email to normalize
 */
exports.normalizeEmail = (email) => validator.normalizeEmail(email, {
  all_lowercase: true
})