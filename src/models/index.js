const Sequelize = require('sequelize');

let connectionUrl;

if (process.env.NODE_ENV === 'production') {
  connectionUrl = process.env.DB_PROD;
} else if (process.env.NODE_ENV === 'development') {
  connectionUrl = process.env.DB_DEV;
}

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
