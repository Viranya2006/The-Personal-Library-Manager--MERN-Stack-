const Book = require('../models/Book');
const axios = require('axios');

/**
 * Search books on Google Books API
 * GET /api/books/search?query=...&page=...
 */
exports.searchBooks = async (req, res) => {
  try {
    const { query, page = 1, filter = '', printType = '' } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }

    // Build Google Books API URL
    let url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${process.env.GOOGLE_BOOKS_API_KEY}&maxResults=12&startIndex=${(page - 1) * 12}`;

    // Add filters
    if (filter === 'free') {
      url += '&filter=free-ebooks';
    }
    if (printType) {
      url += `&printType=${printType}`;
    }

    const response = await axios.get(url);

    const books = response.data.items
      ? response.data.items.map((item) => ({
          googleBookId: item.id,
          title: item.volumeInfo.title || 'Unknown Title',
          authors: item.volumeInfo.authors || [],
          description: item.volumeInfo.description || '',
          thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
          previewLink: item.volumeInfo.previewLink || '',
        }))
      : [];

    res.status(200).json({
      success: true,
      totalItems: response.data.totalItems || 0,
      books,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching books',
      error: error.message,
    });
  }
};

/**
 * Save a book to user's library
 * POST /api/books
 */
exports.saveBook = async (req, res) => {
  try {
    const { googleBookId, title, authors, description, thumbnail, previewLink } = req.body;

    // Validate required fields
    if (!googleBookId || !title) {
      return res.status(400).json({
        success: false,
        message: 'Google Book ID and title are required',
      });
    }

    // Check if book already exists for this user
    let book = await Book.findOne({
      googleBookId,
      user: req.user.id,
    });

    if (book) {
      return res.status(400).json({
        success: false,
        message: 'This book is already in your library',
      });
    }

    // Create new book entry
    book = await Book.create({
      googleBookId,
      title,
      authors: authors || [],
      description,
      thumbnail,
      previewLink,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Book saved to library',
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error saving book',
      error: error.message,
    });
  }
};

/**
 * Get user's library
 * GET /api/books
 */
exports.getUserLibrary = async (req, res) => {
  try {
    const { page = 1, status = '', limit = 12 } = req.query;

    const query = { user: req.user.id };

    // Filter by status if provided
    if (status && ['Want to Read', 'Reading', 'Completed'].includes(status)) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const books = await Book.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalBooks = await Book.countDocuments(query);

    res.status(200).json({
      success: true,
      books,
      totalBooks,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching library',
      error: error.message,
    });
  }
};

/**
 * Get a single book by ID
 * GET /api/books/:id
 */
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    // Check if book belongs to user
    if (book.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this book',
      });
    }

    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching book',
      error: error.message,
    });
  }
};

/**
 * Update book (review and status)
 * PUT /api/books/:id
 */
exports.updateBook = async (req, res) => {
  try {
    const { personalReview, status } = req.body;

    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    // Check if book belongs to user
    if (book.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this book',
      });
    }

    // Validate status
    if (status && !['Want to Read', 'Reading', 'Completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: Want to Read, Reading, or Completed',
      });
    }

    // Update fields
    if (personalReview !== undefined) book.personalReview = personalReview;
    if (status) book.status = status;

    book = await book.save();

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating book',
      error: error.message,
    });
  }
};

/**
 * Delete book from library
 * DELETE /api/books/:id
 */
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    // Check if book belongs to user
    if (book.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this book',
      });
    }

    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Book deleted from library',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting book',
      error: error.message,
    });
  }
};
