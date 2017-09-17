const Sequelize = require('sequelize-cockroachdb')

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

  User.toJson = (user) => {
    return {
      id: user.id,
      username: user.username,
      currentGameId: user.currentGameId
    }
  }

  return User
}
