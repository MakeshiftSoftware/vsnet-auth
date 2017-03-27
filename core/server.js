const express   = require('express');
const app       = express();
const http      = require('http');
const parser    = require('body-parser');
const helmet    = require('helmet');
const logger    = require('morgan');
const co        = require('co');
const passport  = require('passport');
const db        = require('./db');
const User      = require('./models/user');

require('dotenv').config();

app.use(helmet());
app.use(logger('dev'));
app.use(parser.json());

app.use(parser.urlencoded({
  extended: false
}));

app.use(passport.initialize());
require('./auth/passport')(passport);

app.use(require('./routes'));

const server = http.createServer(app);

co(function *() {
  const connection = yield db.connect();
  yield User.index();
  app.set('port', process.env.PORT);
  server.listen(app.get('port'));
  chat.init();
})
.catch(err => {
  console.log(err.message);
  process.exit(1);
});