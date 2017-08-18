const Sequelize = require('sequelize-cockroachdb')
const co = require('co');
const credentials = require('../auth/credentials')

const DataTypes = Sequelize.DataTypes


module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    currentGameId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'current_game_id'
    },
    password: DataTypes.STRING
  }, {
    indexes: [
      { fields: ['username'] }
    ],
    timestamps: false,
    underscored: true
  })

  User.register = (username, password) => {
    return new Promise((resolve, reject) => {
      if (!username || !password) {
        return reject({
          code: 400,
          message: 'All fields required'
        })
      }

      co(function* () {
        const encryptedPassword = yield credentials.encrypt(password)

        const newUser = yield User.create({
          username: username,
          password: encryptedPassword,
          currentGameId: null
        })

        resolve(newUser)
      })
      .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          reject({
            code: 409,
            message: 'That username is already in use'
          })
        } else {
          reject({
            code: 400,
            message: 'Something went wrong'
          })
        }
      })
    })
  }

  User.toJson = (user) => {
    return {
      id: user.id,
      username: user.username,
      currentGameId: user.currentGameId
    }
  }

  return User
}
