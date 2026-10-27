import api from './api';

export const authService = {
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    if (response.token) {
      localStorage.setItem('vernacular_token', response.token);
    }
    return response;
  },

  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    if (response.token) {
      localStorage.setItem('vernacular_token', response.token);
    }
    return response;
  },

  async getMe() {
    return api.get('/auth/me');
  },

  async updateProfile(profileData) {
    return api.put('/auth/profile', profileData);
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('vernacular_token');
    }
  },

  async forgotPassword(email) {
    return api.post('/auth/forgot-password', { email });
  },

  async resetPassword({ email, otp, newPassword }) {
    return api.post('/auth/reset-password', { email, otp, newPassword });
  }
};

export default authService;
