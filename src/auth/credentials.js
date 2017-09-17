const bcrypt = require('bcryptjs')
const validator = require('validator')

/**
 * Hash and salt password using bcrypt.
 *
 * @param {String} password - Plain text password
 */
exports.encrypt = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err)
      }

      bcrypt.hash(password, salt, (err, hash) => {
        return err ? reject(err) : resolve(hash)
      })
    })
  })
}

/**
 * Compare plain text password to hashed password using bcrypt.
 *
 * @param {String} password - Plain text password
 */
exports.compare = (candidate, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidate, password, (err, match) => {
      return err ? reject(err) : resolve(match)
    })
  })
}

/**
 * Check if given string is a valid email.
 *
 * @param {String} email - Email to validate
 */
exports.validateEmail = (email) => {
  return validator.isEmail(email)
}

/**
 * Normalize an email address.
 *
 * @param {String} email - Email to normalize
 */
exports.normalizeEmail = (email) => {
  return validator.normalizeEmail(email, {
    all_lowercase: true
  })
}
