const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT token and extract user info
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get token from "Bearer token"

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided. Access denied.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user info to request
    next();
  } catch (error) {
    // Token expired or invalid
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message,
    });
  }
};

module.exports = authenticateToken;
