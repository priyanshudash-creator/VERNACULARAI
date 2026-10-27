import { validationResult, body } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg
    }));
    return res.status(400).json({
      success: false,
      message: formattedErrors[0]?.message || 'Validation failed',
      errors: formattedErrors
    });
  }
  next();
};

export const registerValidators = [
  body('fullName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Full name is required'),
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  handleValidationErrors
];

export const loginValidators = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email or mobile number is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

export const translateValidators = [
  body('text')
    .trim()
    .notEmpty()
    .withMessage('Text to translate cannot be empty'),
  body('targetLang')
    .trim()
    .notEmpty()
    .withMessage('Target language must be specified'),
  handleValidationErrors
];

export const lessonGenerateValidators = [
  body('topic')
    .trim()
    .notEmpty()
    .withMessage('Lesson topic is required'),
  body('grade')
    .trim()
    .notEmpty()
    .withMessage('Grade is required'),
  body('targetLanguage')
    .trim()
    .notEmpty()
    .withMessage('Target language is required'),
  handleValidationErrors
];
