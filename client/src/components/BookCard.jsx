import React from 'react';
import './BookCard.css';

/**
 * Book Card Component - Displays individual book in search/library
 */
const BookCard = ({
  book,
  onSave,
  onUpdate,
  onDelete,
  isInLibrary,
  isAuthenticated,
  showReview = false,
  onReviewChange,
  onStatusChange,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="book-card">
      <div className="book-image">
        {book.thumbnail ? (
          <img src={book.thumbnail} alt={book.title} />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>

      <div className="book-content">
        <h3 className="book-title" title={book.title}>
          {book.title}
        </h3>

        {book.authors && book.authors.length > 0 && (
          <p className="book-authors">by {book.authors.join(', ')}</p>
        )}

        <p className="book-description">
          {book.description ? book.description.substring(0, 100) + '...' : 'No description available'}
        </p>

        {showReview && (
          <div className="book-review-section">
            <div className="status-selector">
              <label>Status:</label>
              <select
                value={book.status || 'Want to Read'}
                onChange={(e) => onStatusChange(book._id, e.target.value)}
              >
                <option>Want to Read</option>
                <option>Reading</option>
                <option>Completed</option>
              </select>
            </div>

            <div className="review-textarea">
              <label>Personal Review:</label>
              <textarea
                value={book.personalReview || ''}
                onChange={(e) => onReviewChange(book._id, e.target.value)}
                placeholder="Write your review..."
                rows="3"
              />
            </div>
          </div>
        )}

        <div className="book-actions">
          {book.previewLink && (
            <a
              href={book.previewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Preview
            </a>
          )}

          {!showReview && !isInLibrary && isAuthenticated && (
            <button className="btn btn-primary" onClick={() => onSave(book)}>
              Save to Library
            </button>
          )}

          {showReview && (
            <>
              <button className="btn btn-primary" onClick={() => onUpdate(book._id)}>
                Update
              </button>
              <button className="btn btn-danger" onClick={() => onDelete(book._id)}>
                Remove
              </button>
            </>
          )}

          {!showReview && isInLibrary && (
            <span className="saved-badge">✓ Saved</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
