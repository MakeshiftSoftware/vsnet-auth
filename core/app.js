const express = require('express')
const passport = require('passport')
const helmet = require('helmet')
const parser = require('body-parser')
const logger = require('morgan')
const compress = require('compression')

const app = express()

/**
 * Use helmet to set response headers
 */
app.use(helmet())

/**
 * Gzip response TODO: Evaluate
 */
app.use(compress())

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

/*
 * Expose app
 */
module.exports = app
