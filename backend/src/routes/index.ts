import { Router } from 'express';
import authRoutes from './auth.routes';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    timestamp: new Date().toISOString(),
    service: 'luma-api'
  });
});

// API routes
router.use('/auth', authRoutes);

export default router; 
