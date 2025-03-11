import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validation.middleware';
import { authenticate } from '../middleware/auth.middleware';
import { body, param } from 'express-validator';

const router = Router();
const authController = new AuthController();

// Register a new user
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required')
  ],
  validateRequest,
  authController.register
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validateRequest,
  authController.login
);

// Refresh token
router.post('/refresh-token', authController.refreshToken);

// Logout
router.post('/logout', authenticate, authController.logout);

// Verify email
router.get(
  '/verify-email/:token',
  [param('token').notEmpty().withMessage('Token is required')],
  validateRequest,
  authController.verifyEmail
);

// Request password reset
router.post(
  '/forgot-password',
  [body('email').isEmail().withMessage('Please provide a valid email')],
  validateRequest,
  authController.requestPasswordReset
);

// Reset password
router.post(
  '/reset-password/:token',
  [
    param('token').notEmpty().withMessage('Token is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
  ],
  validateRequest,
  authController.resetPassword
);

export default router; 
