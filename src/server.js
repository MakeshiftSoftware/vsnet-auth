const http = require('http')
const app = require('./app')
const models = require('./models')

/**
 * Get server port
 */
const PORT = process.env.PORT

if (!PORT) {
  throw new Error('No port specified')
}

/**
 * Initialize server
 */
const server = http.createServer(app)

/**
 * Test connection to database, sync models, and then start server
 */
Promise.resolve()
  .then(() => {
    return models.sequelize.authenticate()
  })
  .then(() => {
    return models.sequelize.sync()
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log('Listening on', PORT)

      if (process.send) {
        process.send('ready')
      }
    })
  })
  .catch((err) => {
    console.log(err.message)
    throw new Error('Failed to start')
  })
