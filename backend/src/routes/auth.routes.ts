import { Router, RequestHandler } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { body, param } from 'express-validator';
import { authenticate } from '../middleware/auth.middleware';

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
  ] as RequestHandler[],
  authController.register as RequestHandler
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ] as RequestHandler[],
  authController.login as RequestHandler
);

// Refresh token
router.post('/refresh-token', authController.refreshToken as RequestHandler);

// Logout
router.post('/logout', authenticate as RequestHandler, authController.logout as RequestHandler);

// Verify email
router.get(
  '/verify-email/:token',
  [param('token').notEmpty().withMessage('Token is required')] as RequestHandler[],
  authController.verifyEmail as RequestHandler
);

// Request password reset
router.post(
  '/forgot-password',
  [body('email').isEmail().withMessage('Please provide a valid email')] as RequestHandler[],
  authController.requestPasswordReset as RequestHandler
);

// Reset password
router.post(
  '/reset-password/:token',
  [
    param('token').notEmpty().withMessage('Token is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
  ] as RequestHandler[],
  authController.resetPassword as RequestHandler
);

export default router; 
