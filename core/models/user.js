const co          = require('co');
const credentials = require('../auth/credentials');
const Model       = require('./model');

class User extends Model {
  static json(user) {
    delete user.password;
    return user;
  }

  static register(req, done) {
    return new Promise((resolve, reject) => {
      let username = req.body.username;
      let email = req.body.email;
      let password = req.body.password;

      if (!username || !email || !password) {
        reject({
          message: 'All fields required',
          code: 400
        });
      }

      // TODO: validate fields
      if (!credentials.validateEmail(email)) {
        reject({
          message: 'Invalid email',
          code: 400
        })
      }

      email = credentials.normalizeEmail(email);

      co(function *() {
        const encryptedPassword = yield credentials.encrypt(password);
        
        const userObject = {
          email: email,
          username: username,
          password: encryptedPassword
        }

        yield User.create(userObject);
        resolve(userObject);
      })
      .catch(err => {
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

User.modelName = 'User';
User.collection = 'users';
User.requiredFields = ['email', 'username'];
User.uniqueFields = ['email', 'username'];
module.exports = User;