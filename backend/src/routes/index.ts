import { Router } from 'express';
import { notFoundHandler } from '../middleware/errorHandler';

// Import routes
// Note: We're creating empty router objects for now since the actual route files
// will be implemented later with proper controllers and validators
const productRoutes = Router();
const authRoutes = Router();
const userRoutes = Router();

// Create temporary placeholder routes
productRoutes.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Product list endpoint - to be implemented',
    data: []
  });
});

authRoutes.post('/login', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Login endpoint - to be implemented',
    data: null
  });
});

userRoutes.get('/profile', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User profile endpoint - to be implemented',
    data: null
  });
});

const router = Router();

// API version prefix from environment or default
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

// Health check route (publicly accessible)
router.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Mount API routes
router.use(`${API_PREFIX}/auth`, authRoutes);
router.use(`${API_PREFIX}/users`, userRoutes);
router.use(`${API_PREFIX}/products`, productRoutes);

// Documentation route (if swagger is enabled)
if (process.env.ENABLE_SWAGGER === 'true') {
  router.get(`${API_PREFIX}/docs`, (req, res) => {
    res.redirect('/api-docs');
  });
}

// Handle 404 for all unmatched routes
router.use('*', notFoundHandler);

export default router; 
