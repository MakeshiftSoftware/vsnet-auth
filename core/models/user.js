const co          = require('co');
const credentials = require('../auth/credentials');
const Model       = require('./model');

/**
 * The User model
 */
class User extends Model {
  /**
   * Modify user object before returning it.
   * Only include fields that should be part of
   * the response body.
   *
   * @param {Object} user - The user object
   */
  static json(user) {
    delete user.password;
    return user;
  }

  /**
   * Register a new user. Validate fields
   *
   * @param {Object} req - The parsed request object
   */
  static register(req) {
    return new Promise((resolve, reject) => {
      /**
       * Extract username, email, password from
       * request body.
       */
      let username = req.body.username;
      let email = req.body.email;
      let password = req.body.password;

      /**
       * Return error if any one of username, email,
       * or password is missing in request body.
       */
      if (!username || !email || !password) {
        reject({
          message: 'All fields required',
          code: 400
        });
      }

      /**
       * Validate user's email.
       * TODO: add more validation for username
       */
      if (!credentials.validateEmail(email)) {
        reject({
          message: 'Invalid email',
          code: 400
        })
      }

      /**
       * Normalize user's email.
       */
      email = credentials.normalizeEmail(email);

      co(function *() {
        /**
         * Encrypt user's password.
         */
        const encryptedPassword = yield credentials.encrypt(password);
        
        /**
         * Create user object to be saved in database.
         * TODO: Add other user fields
         */
        const userObject = {
          email: email,
          username: username,
          password: encryptedPassword,
          currentGameId: null,
          friends: []
        }

        /**
         * Create user object and resolve promise.
         */
        yield User.create(userObject);
        resolve(userObject);
      })
      .catch(err => {
        /**
         * Return specific error for unique field violation.
         * Return generic error for anything else.
         */
        if (err.name === 'MongoError' && err.code === 11000) {
          reject({
            message: 'That username or email is taken',
            code: 409
          });
        } else {
          reject({
            message: err.message,
            code: 400
          });
        }
      });
    });
  }
}

/**
 * Define User specific model attributes.
 */
User.modelName = 'User';
User.collection = 'users';
User.requiredFields = ['email', 'username'];
User.uniqueFields = ['email', 'username'];

/**
 * Expose User model
 */
module.exports = User;