const bcrypt = require('bcrypt')
const validator = require('validator')


/**
 * Hash and salt password using bcrypt
 *
 * @param {String} password - The password to hash
 */
exports.encrypt = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err)
      }

      bcrypt.hash(password, salt, (err, hash) => {
        err ? reject(err) : resolve(hash)
      })
    })
  })
}

/**
 * Compare plain text password to hashed password using bcrypt
 *
 * @param {String} password - The plain text password
 */
exports.compare = (candidate, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidate, password, (err, match) => {
      err ? reject(err) : resolve(match)
    })
  })
}

/**
 * Check if given string is a valid email
 *
 * @param {String} email - The email to validate
 */
exports.validateEmail = (email) => {
  return validator.isEmail(email)
}

/**
 * Normalize an email address
 *
 * @param {String} email - The email to normalize
 */
exports.normalizeEmail = (email) => {
  return validator.normalizeEmail(email, {
    all_lowercase: true
  })
}
