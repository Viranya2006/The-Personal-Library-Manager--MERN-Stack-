import React from 'react';
import './Pagination.css';

/**
 * Pagination Component
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        ← Previous
      </button>

      <div className="page-info">
        Page {currentPage} of {totalPages}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
