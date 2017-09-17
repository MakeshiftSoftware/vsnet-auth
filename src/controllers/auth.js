const co = require('co')
const token = require('../auth/token')
const User = require('../models').User
const credentials = require('../auth/credentials')

/**
 * Validate user login and generate a jwt token.
 */
exports.login = (req, res) => {
  res.status(200).send({
    code: 200,
    user: User.toJson(req.user),
    token: token(req.user)
  })
}

/**
 * Register a user and generate a jwt token.
 */
exports.register = (req, res, next) => {
  co(function* () {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
      return res.status(400).send({
        code: 400,
        message: 'All fields required'
      })
    }

    const encryptedPassword = yield credentials.encrypt(password)

    const user = yield User.create({
      username: username,
      password: encryptedPassword,
      currentGameId: null
    })

    res.status(200).send({
      code: 200,
      user: User.toJson(user),
      token: token(user)
    })
  }).catch(next)
}
