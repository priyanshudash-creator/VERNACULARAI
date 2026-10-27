import api from './api';

export const copilotService = {
  async ask({ message, grade = 'Grade 2', language = 'Santhali', subject = 'Mathematics' }) {
    const response = await api.post('/copilot/chat', {
      message,
      grade,
      language,
      subject
    });
    return response.data;
  }
};

export default copilotService;
