import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';
import { useAuth } from '../context/AuthContext';
import bookService from '../api/bookApi';
import './LibraryPage.css';

/**
 * Library Page - View and manage user's saved books
 * Protected route - requires authentication
 */
const LibraryPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingReviews, setEditingReviews] = useState({});
  const [updating, setUpdating] = useState({});

  const BOOKS_PER_PAGE = 12;

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch user's library on mount and when filters change
  useEffect(() => {
    if (isAuthenticated) {
      fetchLibrary(1, selectedStatus);
    }
  }, [selectedStatus, isAuthenticated]);

  const fetchLibrary = async (page, status) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await bookService.getUserLibrary(page, status, BOOKS_PER_PAGE);
      setBooks(result.books || []);
      setTotalBooks(result.totalBooks || 0);
    } catch (err) {
      setError('Error loading your library. Please try again.');
      console.error('Error fetching library:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchLibrary(newPage, selectedStatus);
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handleReviewChange = (bookId, review) => {
    setEditingReviews((prev) => ({
      ...prev,
      [bookId]: review,
    }));
  };

  const handleStatusChange = (bookId, newStatus) => {
    setBooks((prev) =>
      prev.map((book) =>
        book._id === bookId ? { ...book, status: newStatus } : book
      )
    );
  };

  const handleUpdateBook = async (bookId) => {
    try {
      setUpdating((prev) => ({ ...prev, [bookId]: true }));
      const book = books.find((b) => b._id === bookId);
      
      await bookService.updateBook(bookId, {
        personalReview: editingReviews[bookId] !== undefined ? editingReviews[bookId] : book.personalReview,
        status: book.status,
      });

      setEditingReviews((prev) => {
        const newReviews = { ...prev };
        delete newReviews[bookId];
        return newReviews;
      });

      alert('Book updated successfully!');
    } catch (err) {
      alert('Error updating book. Please try again.');
      console.error('Error updating book:', err);
    } finally {
      setUpdating((prev) => ({ ...prev, [bookId]: false }));
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm('Are you sure you want to remove this book from your library?')) {
      try {
        setUpdating((prev) => ({ ...prev, [bookId]: true }));
        await bookService.deleteBook(bookId);
        setBooks((prev) => prev.filter((b) => b._id !== bookId));
        setTotalBooks((prev) => prev - 1);
        alert('Book removed from your library');
      } catch (err) {
        alert('Error removing book. Please try again.');
        console.error('Error deleting book:', err);
      } finally {
        setUpdating((prev) => ({ ...prev, [bookId]: false }));
      }
    }
  };

  const totalPages = Math.ceil(totalBooks / BOOKS_PER_PAGE);

  return (
    <div className="library-page">
      <div className="page-container">
        <div className="library-header">
          <h1>📚 My Library</h1>
          <p>{totalBooks} books in your collection</p>
        </div>

        <div className="library-filters">
          <button
            className={`filter-btn ${!selectedStatus ? 'active' : ''}`}
            onClick={() => handleStatusFilter('')}
          >
            All Books ({totalBooks})
          </button>
          <button
            className={`filter-btn ${selectedStatus === 'Want to Read' ? 'active' : ''}`}
            onClick={() => handleStatusFilter('Want to Read')}
          >
            Want to Read
          </button>
          <button
            className={`filter-btn ${selectedStatus === 'Reading' ? 'active' : ''}`}
            onClick={() => handleStatusFilter('Reading')}
          >
            Currently Reading
          </button>
          <button
            className={`filter-btn ${selectedStatus === 'Completed' ? 'active' : ''}`}
            onClick={() => handleStatusFilter('Completed')}
          >
            Completed
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {isLoading && <div className="loading">Loading your library...</div>}

        {!isLoading && books.length > 0 && (
          <>
            <div className="books-grid">
              {books.map((book) => (
                <BookCard
                  key={book._id}
                  book={{
                    ...book,
                    personalReview: editingReviews[book._id] !== undefined ? editingReviews[book._id] : book.personalReview,
                  }}
                  onReviewChange={handleReviewChange}
                  onStatusChange={handleStatusChange}
                  onUpdate={handleUpdateBook}
                  onDelete={handleDeleteBook}
                  isInLibrary={true}
                  showReview={true}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}

        {!isLoading && books.length === 0 && (
          <div className="empty-library">
            <p>Your library is empty</p>
            <p>Start by searching for books and adding them to your collection</p>
            <a href="/" className="btn btn-primary">
              Search Books
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;
