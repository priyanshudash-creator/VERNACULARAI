import api from './api';

export const lessonService = {
  async getLessons({ grade = 'All', subject = 'All', language = 'All' } = {}) {
    const params = new URLSearchParams();
    if (grade && grade !== 'All') params.set('grade', grade);
    if (subject && subject !== 'All') params.set('subject', subject);
    if (language && language !== 'All') params.set('language', language);

    const qs = params.toString() ? `?${params.toString()}` : '';
    const response = await api.get(`/lessons${qs}`);
    return response.data || [];
  },

  async getLessonById(id) {
    const response = await api.get(`/lessons/${id}`);
    return response.data;
  },

  async generateLesson(params) {
    const response = await api.post('/lessons/generate', params);
    return response.data;
  },

  async saveLesson(lesson) {
    const response = await api.post('/lessons', lesson);
    return response.data;
  }
};

export default lessonService;
