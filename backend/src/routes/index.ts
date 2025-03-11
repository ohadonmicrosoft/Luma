import { Router } from 'express';
import productRoutes from './product.routes';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import { notFoundHandler } from '../middleware/errorHandler';

const router = Router();

// API version prefix
const API_PREFIX = '/api/v1';

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
