const Sequelize = require('sequelize');

const dbConnectionUrl = process.env.DB_CONNECTION_URL;
const dbHost = process.env.POSTGRES_SERVICE_HOST;
const dbPort = process.env.POSTGRES_SERVICE_PORT;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

let sequelize;

if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize({
    host: dbHost,
    port: dbPort,
    database: dbName,
    username: dbUser,
    password: dbPassword,
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false
  });
} else {
  sequelize = new Sequelize(dbConnectionUrl, {
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false
  });
}

const User = require('./user')(sequelize);

module.exports = {
  sequelize,
  Sequelize,
  User
};
