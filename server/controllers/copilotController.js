import { generateCopilotAdvice } from '../services/copilotService.js';

export const chatWithCopilot = async (req, res, next) => {
  try {
    const { message, grade, language, subject } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Query message cannot be empty'
      });
    }

    const response = await generateCopilotAdvice({
      message,
      grade,
      language,
      subject
    });

    return res.status(200).json({
      success: true,
      data: response
    });
  } catch (error) {
    next(error);
  }
};
