import api from './api';

export const translationService = {
  async translate({ text, sourceLang, targetLang, mode = 'text' }) {
    const response = await api.post('/translate', {
      text,
      sourceLang,
      targetLang,
      mode
    });
    return response.data;
  },

  async getHistory({ search = '', lang = 'all', limit = 50 } = {}) {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (lang && lang !== 'all') params.set('lang', lang);
    if (limit) params.set('limit', limit);

    const qs = params.toString() ? `?${params.toString()}` : '';
    const response = await api.get(`/translations${qs}`);
    return response.data || [];
  },

  async deleteHistoryItem(id) {
    return api.delete(`/translations/${id}`);
  },

  async clearAllHistory() {
    return api.delete('/translations');
  }
};

export default translationService;
