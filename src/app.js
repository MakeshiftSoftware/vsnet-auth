const express = require('express')
const passport = require('passport')
const helmet = require('helmet')
const parser = require('body-parser')
const logger = require('morgan')
const compression = require('compression')

const app = express()

/**
 * Use helmet to set response headers
 */
app.use(helmet())

/**
 * Gzip response
 */
app.use(compression())

/**
 * Log requests using morgan
 */
app.use(logger('dev'))

/**
 * Parse incoming request bodies
 */
app.use(parser.json())

app.use(parser.urlencoded({
  extended: false
}))

/**
 * Initialize and install passport
 */
app.use(passport.initialize())
require('./auth/passport')(passport)

/**
 * Inject routes into the app
 */
app.use(require('./routes'))

/**
 * Error handler
 */
app.use((err, req, res, next) => {
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).send({
      code: 409,
      message: 'Unique constraint violation error'
    })
  }

  res.status(500).send({
    code: 500,
    message: 'Something went wrong'
  })
})

/*
 * Expose app
 */
module.exports = app
