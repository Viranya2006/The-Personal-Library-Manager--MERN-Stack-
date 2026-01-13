import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

/**
 * Auth Provider Component
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize user from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const register = async (username, email, password) => {
    try {
      setError(null);
      const data = await authService.register(username, email, password);
      const userData = data.user;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const data = await authService.login(email, password);
      const userData = data.user;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    isLoading,
    error,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use Auth Context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
