const Sequelize = require('sequelize');
const serialize = require('./serialize');

const DataTypes = Sequelize.DataTypes;

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    userId: {
      field: 'user_id',
      type: DataTypes.UUID
    },
    email: {
      field: 'email',
      type: DataTypes.STRING
    },
    username: {
      field: 'username',
      type: DataTypes.STRING
    },
    password: {
      field: 'password',
      type: DataTypes.STRING
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE
    }
  }, {
    timestamps: false,
    underscored: true
  });

  User.json = serialize.user;

  return User;
};
