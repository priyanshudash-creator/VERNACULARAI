import express from 'express';
import {
  getLessons,
  getLessonById,
  generateLesson,
  saveLesson
} from '../controllers/lessonController.js';
import { optionalAuth } from '../middleware/auth.js';
import { aiLimiter } from '../middleware/rateLimiter.js';
import { lessonGenerateValidators } from '../middleware/validate.js';

const router = express.Router();

router.get('/', getLessons);
router.get('/:id', getLessonById);
router.post('/generate', aiLimiter, lessonGenerateValidators, generateLesson);
router.post('/', optionalAuth, saveLesson);

export default router;
