import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';
import { useAuth } from '../context/AuthContext';
import bookService from '../api/bookApi';
import './SearchPage.css';

/**
 * Search Page - Search Google Books API
 */
const SearchPage = () => {
  const { isAuthenticated } = useAuth();
  const [books, setBooks] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [savedBooks, setSavedBooks] = useState(new Set());

  const BOOKS_PER_PAGE = 12;

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    await fetchBooks(query, 1, filters);
  };

  const fetchBooks = async (query, page, currentFilters = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await bookService.searchBooks(query, page, currentFilters);
      setBooks(result.books || []);
      setTotalItems(result.totalItems || 0);
    } catch (err) {
      setError('Error searching books. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchBooks(searchQuery, newPage, filters);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    if (searchQuery) {
      fetchBooks(searchQuery, 1, newFilters);
    }
  };

  const handleSaveBook = async (book) => {
    if (!isAuthenticated) {
      alert('Please login to save books');
      return;
    }

    try {
      await bookService.saveBook({
        googleBookId: book.googleBookId,
        title: book.title,
        authors: book.authors,
        description: book.description,
        thumbnail: book.thumbnail,
        previewLink: book.previewLink,
      });

      setSavedBooks((prev) => new Set([...prev, book.googleBookId]));
      alert('Book saved to your library!');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error saving book';
      alert(errorMsg);
    }
  };

  const totalPages = Math.ceil(totalItems / BOOKS_PER_PAGE);

  return (
    <div className="search-page">
      <div className="page-container">
        <div className="search-hero">
          <h1>Discover Books</h1>
          <p>Search and save your favorite books</p>
        </div>

        <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} filters={filters} />

        {error && <div className="error-message">{error}</div>}

        {isLoading && <div className="loading">Searching books...</div>}

        {!isLoading && books.length > 0 && (
          <>
            <div className="search-results-info">
              Found {totalItems} books {searchQuery && `for "${searchQuery}"`}
            </div>

            <div className="books-grid">
              {books.map((book) => (
                <BookCard
                  key={book.googleBookId}
                  book={book}
                  onSave={handleSaveBook}
                  isInLibrary={savedBooks.has(book.googleBookId)}
                  isAuthenticated={isAuthenticated}
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

        {!isLoading && books.length === 0 && searchQuery && (
          <div className="no-results">
            <p>No books found. Try a different search.</p>
          </div>
        )}

        {!searchQuery && (
          <div className="welcome-message">
            <p>Start by searching for a book, author, or keyword above</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
