import express from 'express';
import { chatWithCopilot } from '../controllers/copilotController.js';
import { aiLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/chat', aiLimiter, chatWithCopilot);

export default router;
