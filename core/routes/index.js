const express = require('express')

/**
 * Initialize router
 */
const router = express.Router()

/**
 * Inject routes
 */
require('./auth')(router)

router.get('/', (req, res) => {
  res.json({message: 'Welcome!'})
});

/**
 * Expose router
 */
module.exports = router
