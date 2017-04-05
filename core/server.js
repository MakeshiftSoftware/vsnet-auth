const express   = require('express');
const app       = express();
const http      = require('http');
const compress  = require('compression');
const parser    = require('body-parser');
const helmet    = require('helmet');
const logger    = require('morgan');
const co        = require('co');
const passport  = require('passport');
const db        = require('./db');
const User      = require('./models/user');

require('dotenv').config();

/**
 * Get app port
 */
const PORT = process.env.PORT;

/**
 * Use helmet to set response headers.
 */
app.use(helmet());

/**
 * Gzip response TODO: Evaluate
 */
app.use(compress());

/**
 * Log requests using morgan.
 */
app.use(logger('dev'));

/**
 * Parse incoming request bodies.
 */
app.use(parser.json());

app.use(parser.urlencoded({
  extended: false
}));

/**
 * Initialize passport and use it in the app
 */
app.use(passport.initialize());
require('./auth/passport')(passport);

/**
 * Inject routes into the app
 */
app.use(require('./routes'));

/**
 * Initialize server
 */
const server = http.createServer(app);

co(function *() {
  /**
   * Wait for db connection
   */
  yield db.connect();

  /**
   * Create unique indexes for User model if they
   * do not exist.
   */
  yield User.index();

  /**
   * Set app port and start server
   */
  app.set('port', PORT);

  server.listen(PORT, () => {
    console.log('Listening on', PORT);
  });
})
.catch(err => {
  console.log(err.message);
  process.exit(1);
});