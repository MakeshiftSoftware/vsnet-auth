const express       = require('express');
const requireAuth   = require('../auth').requireAuth;
const requireLogin  = require('../auth').requireLogin;
const endpoints     = require('../controllers');

/**
 * Initialize router
 */
const router = express.Router();

/**
 * Define api routes
 */
router.post('/api/v1/auth/login', requireLogin, endpoints.auth.login);
router.post('/api/v1/auth/register', endpoints.auth.register);
router.get('/api/v1/auth/me', requireAuth, endpoints.auth.me);

router.get('/', (req, res) => {
  res.json({message: 'Welcome!'});
});

/**
 * Expose router
 */
module.exports = router;