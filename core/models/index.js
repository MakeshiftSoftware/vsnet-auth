const Sequelize = require('sequelize-cockroachdb')

const DB_ADDR = process.env.NODE_ENV === 'production'
  ? process.env.DB_PROD
  : process.env.DB_DEV

const sequelize = new Sequelize(DB_ADDR,  {})

if (!Sequelize.supportsCockroachDB) {
  throw new Error('CockroachDB dialect for Sequelize not installed')
}

exports.User =  require('./user')(sequelize)

exports.sequelize = sequelize
exports.Sequelize = Sequelize
