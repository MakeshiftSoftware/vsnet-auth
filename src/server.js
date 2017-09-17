const http = require('http')
const co = require('co')
const app = require('./app')
const models = require('./models')

const server = http.createServer(app)

// Test connection to database, sync models, and then start server
co(function* () {
  yield models.sequelize.authenticate()
  yield models.sequelize.sync()

  server.listen(process.env.PORT, () => {
    console.log('Listening on', process.env.PORT)

    if (process.send) {
      process.send('ready')
    }
  })
}).catch((err) => {
  /* eslint-disable */
  console.log(err.message)
  throw new Error('Failed to start')
})
