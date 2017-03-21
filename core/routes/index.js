const express       = require('express');
const requireAuth   = require('../auth').requireAuth;
const requireLogin  = require('../auth').requireLogin;
const authEndpoints = require('../controllers/auth');

const router = express.Router();

router.post('/api/v1/auth/login', requireLogin, authEndpoints.login);
router.post('/api/v1/auth/register', authEndpoints.register);
router.get('/api/v1/auth/me', requireAuth, authEndpoints.me);

router.get('/', (req, res) => {
  res.json({message: 'Welcome!'});
});

module.exports = router;
