import React from 'react';
import './SearchBar.css';

/**
 * Search Bar Component
 */
const SearchBar = ({ onSearch, onFilterChange, filters = {} }) => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author, or keyword..."
          className="search-input"
        />
        <button type="submit" className="search-btn">
          🔍 Search
        </button>
      </form>

      <div className="filters">
        <div className="filter-group">
          <label>Type:</label>
          <select
            name="printType"
            value={filters.printType || ''}
            onChange={handleFilterChange}
          >
            <option value="">All Types</option>
            <option value="books">Books Only</option>
            <option value="magazines">Magazines Only</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Availability:</label>
          <select
            name="filter"
            value={filters.filter || ''}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="free">Free eBooks Only</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
