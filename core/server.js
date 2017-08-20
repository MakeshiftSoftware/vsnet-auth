require('dotenv').config()

const http = require('http')
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

/**
 * Create database tables for sequelize models
 * and then start server
 */
models.sequelize.sync()
  .then(() => {
    server.listen(PORT, () => {
      console.log('Listening on', PORT)
      process.send('ready')
    })
  })
  .catch((err) => {
    console.log(err.message)
    throw new Error('Failed to start')
  })
