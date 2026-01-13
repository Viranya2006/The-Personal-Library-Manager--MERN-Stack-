import apiClient from './axiosInstance';

/**
 * Book API calls
 */
const bookService = {
  searchBooks: async (query, page = 1, filters = {}) => {
    const params = new URLSearchParams({
      query,
      page,
      ...filters,
    });
    const response = await apiClient.get(`/books/search?${params}`);
    return response.data;
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
