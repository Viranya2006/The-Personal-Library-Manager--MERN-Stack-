const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

/**
 * Auth Routes
 */

// Register new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Get current user (requires authentication)
router.get('/me', authenticateToken, getCurrentUser);

module.exports = router;
