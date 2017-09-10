const token = require('../auth/token')
const User = require('../models').User

/**
 * Log in the user. Generate a jwt token to
 * for user. Username and password validation
 * handled by passport authentication middleware.
 */
exports.login = (req, res) => {
  res.status(200).send({
    code: 200,
    user: User.toJson(req.user),
    token: token(req.user)
  })
}

/**
 * Register the user. If successful, generate
 * a jwt token for the new user.
 */
exports.register = (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  User.register(username, password)
    .then((user) => {
      res.status(200).send({
        code: 200,
        user: User.toJson(user),
        token: token(user)
      })
    })
    .catch(next)
}