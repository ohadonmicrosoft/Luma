import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './errorHandler';

// Setup common middleware
export const setupMiddleware = (app: Express) => {
  // Enable Cross-Origin Resource Sharing
  app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  // Set security headers
  app.use(helmet());

  // Parse JSON request bodies
  app.use(express.json({ limit: '2mb' }));

  // Parse URL-encoded request bodies
  app.use(express.urlencoded({ extended: true, limit: '2mb' }));

  // Compress responses
  app.use(compression());

  // Apply rate limiting to all requests
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
      status: 429,
      message: 'Too many requests, please try again later.'
    }
  });

  app.use('/api/', apiLimiter);

  // More stringent rate limiting for authentication routes
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      status: 429,
      message: 'Too many authentication attempts, please try again later.'
    }
  });

  app.use('/api/auth/', authLimiter);

  // Health check endpoint (not rate limited)
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  return app;
};

// Setup error handling middleware (should be used after routes)
export const setupErrorHandling = (app: Express) => {
  app.use(errorHandler);
  return app;
};

export default setupMiddleware; 
