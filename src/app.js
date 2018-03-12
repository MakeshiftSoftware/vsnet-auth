const express = require('express');
const cors = require('cors');
const passport = require('passport');
const helmet = require('helmet');
const parser = require('body-parser');
const logger = require('morgan');
const compression = require('compression');

const app = express();

// @TODO: restrict in production
app.use(cors());

// Set security headers
app.use(helmet());

// Gzip response
app.use(compression());

// Log requests
app.use(logger('dev'));

// Parse incoming requests
app.use(parser.json());

app.use(parser.urlencoded({
  extended: false
}));

// Initialize passport
app.use(passport.initialize());
require('./auth/passport')(passport);

// Inject routes
app.use(require('./routes'));

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).send({
    code: 500,
    message: 'Something went wrong'
  });
});

module.exports = app;
