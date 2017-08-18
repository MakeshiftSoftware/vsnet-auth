require('dotenv').config()

const http = require('http')
const co = require('co')
const db = require('./db')
const User = require('./models/user')
const app = require('./app')
const models = require('./models')


/**
 * Get server port
 */
const PORT = process.env.PORT

/**
 * Initialize server
 */
const server = http.createServer(app)

co(function* () {
  /**
   * Create database tables for sequelize models
   */
  yield models.sequelize.sync()

  /*
   * Start server
   */
  server.listen(PORT, () => {
    console.log('Listening on', PORT)
    process.send('ready')
  })
})
.catch(err => {
  console.log(err.message)
  process.exit(1)
})
