import apiClient from './axiosInstance';

/**
 * Auth API calls
 */
const authService = {
  register: async (username, email, password) => {
    const response = await apiClient.post('/auth/register', {
      username,
      email,
      password,
    });
    return response.data;
  },

  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export default authService;
