import express from 'express';
import {
  translateText,
  getTranslationHistory,
  deleteTranslationRecord,
  clearAllTranslations
} from '../controllers/translationController.js';
import { optionalAuth } from '../middleware/auth.js';
import { aiLimiter } from '../middleware/rateLimiter.js';
import { translateValidators } from '../middleware/validate.js';

export const translateRouter = express.Router();
export const translationsRouter = express.Router();

// Route: POST /api/v1/translate
translateRouter.post('/', aiLimiter, optionalAuth, translateValidators, translateText);

// Routes: /api/v1/translations (history management)
translationsRouter.get('/', optionalAuth, getTranslationHistory);
translationsRouter.post('/', optionalAuth, translateValidators, translateText);
translationsRouter.delete('/:id', optionalAuth, deleteTranslationRecord);
translationsRouter.delete('/', optionalAuth, clearAllTranslations);
