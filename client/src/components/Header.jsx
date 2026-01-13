import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Header.css';

/**
 * Header Component with Navigation
 */
const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">📚</span>
          <span className="logo-text">Library Manager</span>
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">
            Search
          </Link>

          {isAuthenticated && (
            <Link to="/library" className="nav-link">
              My Library
            </Link>
          )}
        </nav>

        <div className="header-right">
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle dark mode">
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {isAuthenticated ? (
            <div className="user-section">
              <span className="user-name">{user?.username}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="auth-link login-link">
                Login
              </Link>
              <Link to="/register" className="auth-link register-link">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
