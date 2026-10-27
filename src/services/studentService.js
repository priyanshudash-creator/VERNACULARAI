import api from './api';

export const studentService = {
  async getStudents({ search = '', status = 'All' } = {}) {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (status && status !== 'All') params.set('status', status);

    const qs = params.toString() ? `?${params.toString()}` : '';
    const response = await api.get(`/students${qs}`);
    return response.data || [];
  },

  async getStudentById(id) {
    const response = await api.get(`/students/${id}`);
    return response.data;
  }
};

export default studentService;
