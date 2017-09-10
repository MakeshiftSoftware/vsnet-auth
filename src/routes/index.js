const express = require('express')

/**
 * Initialize router
 */
const router = express.Router()

/**
 * Inject routes
 */
require('./auth')(router)

/**
 * Expose router
 */
module.exports = router
