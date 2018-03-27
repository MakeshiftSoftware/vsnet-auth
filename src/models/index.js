const Sequelize = require('sequelize');

const connectionUrl = process.env.DB_CONNECTION_URL;

const sequelize = new Sequelize(connectionUrl, {
  dialect: 'postgres',
  operatorsAliases: false,
  logging: false
});

const User = require('./user')(sequelize);

module.exports = {
  sequelize,
  Sequelize,
  User
};
