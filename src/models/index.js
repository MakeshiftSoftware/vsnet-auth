const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB, {
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
