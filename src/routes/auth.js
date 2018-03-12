const {
  requireLogin,
  login
} = require('../middleware');

module.exports = (router) => {
  router.post('/api/login', requireLogin, login);
};
