const express = require('express');
const cors = require('cors');
const passport = require('passport');
const helmet = require('helmet');
const parser = require('body-parser');
const morgan = require('morgan');
const compression = require('compression');

const {
  requireLogin,
  login
} = require('./middleware');

const app = express();

// @TODO: restrict in production
app.use(cors());

// Set security headers
app.use(helmet());

// Gzip response
app.use(compression());

// Log requests
app.use(morgan(process.env.HTTP_LOG_LEVEL, {
  skip: function (req, res) {
    return res.statusCode < 400;
  },
  stream: process.stderr
}));

app.use(morgan(process.env.HTTP_LOG_LEVEL, {
  skip: function (req, res) {
    return res.statusCode >= 400;
  },
  stream: process.stdout
}));

// Parse incoming requests
app.use(parser.json());

app.use(parser.urlencoded({
  extended: false
}));

// Initialize passport
app.use(passport.initialize());
require('./auth/passport')(passport);

// Define login route
app.post('/api/login', requireLogin, login);

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).send({
    code: 500,
    message: 'Something went wrong'
  });
});

module.exports = app;
