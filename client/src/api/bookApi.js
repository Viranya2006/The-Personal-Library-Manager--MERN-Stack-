import axios from 'axios';
import apiClient from './axiosInstance';

/**
 * Public Google Books API search - No authentication required
 */
const searchGoogleBooks = async (query, page = 1, filters = {}) => {
  try {
    const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
    if (!apiKey) {
      throw new Error('Google Books API key is not configured');
    }

    const startIndex = (page - 1) * 12;
    let url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=12&key=${apiKey}`;

    // Add filters if provided
    if (filters.printType) {
      url += `&printType=${filters.printType}`;
    }
    if (filters.filter === 'free') {
      url += `&filter=free-ebooks`;
    }

    const response = await axios.get(url);

    // Transform Google Books API response to our format
    const books = (response.data.items || []).map((item) => {
      const volumeInfo = item.volumeInfo || {};
      return {
        googleBookId: item.id,
        title: volumeInfo.title || 'Unknown Title',
        authors: volumeInfo.authors || [],
        description: volumeInfo.description || '',
        thumbnail: volumeInfo.imageLinks?.thumbnail || '',
        previewLink: volumeInfo.previewLink || '',
        publishedDate: volumeInfo.publishedDate || '',
        pageCount: volumeInfo.pageCount || 0,
        categories: volumeInfo.categories || [],
      };
    });

    return {
      books,
      totalItems: response.data.totalItems || 0,
    };
  } catch (error) {
    console.error('Google Books API error:', error);
    throw error;
  }
};

/**
 * Book API calls
 */
const bookService = {
  searchBooks: async (query, page = 1, filters = {}) => {
    // Use Google Books API for public search
    return searchGoogleBooks(query, page, filters);
  },

  saveBook: async (bookData) => {
    const response = await apiClient.post('/books', bookData);
    return response.data;
  },

  getUserLibrary: async (page = 1, status = '', limit = 12) => {
    const params = new URLSearchParams({
      page,
      limit,
    });
    if (status) {
      params.append('status', status);
    }
    const response = await apiClient.get(`/books?${params}`);
    return response.data;
  },

  getBook: async (id) => {
    const response = await apiClient.get(`/books/${id}`);
    return response.data;
  },

  updateBook: async (id, data) => {
    const response = await apiClient.put(`/books/${id}`, data);
    return response.data;
  },

  deleteBook: async (id) => {
    const response = await apiClient.delete(`/books/${id}`);
    return response.data;
  },
};

export default bookService;
