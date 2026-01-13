const express = require('express');
const router = express.Router();
const {
  searchBooks,
  saveBook,
  getUserLibrary,
  getBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');
const authenticateToken = require('../middleware/authMiddleware');

/**
 * Book Routes
 */

// Public route - search books (no auth required)
router.get('/search', searchBooks);

// All following routes require authentication
router.use(authenticateToken);

// Save book to library
router.post('/', saveBook);

// Get user's library
router.get('/', getUserLibrary);

// Get single book
router.get('/:id', getBook);

// Update book (review, status)
router.put('/:id', updateBook);

// Delete book
router.delete('/:id', deleteBook);

module.exports = router;
