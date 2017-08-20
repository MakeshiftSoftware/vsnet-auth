const endpoints = require('../controllers').auth
const requireLogin = require('../auth/middleware').requireLogin

/*
 * Authentication routes
 */
module.exports = (router) => {
  router.post('/api/auth/login', requireLogin, endpoints.login)
  router.post('/api/auth/register', endpoints.register)
}
