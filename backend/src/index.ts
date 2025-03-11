import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { initializeDatabase } from './config/database';
import { setupMiddleware, setupErrorHandling } from './middleware';
import routes from './routes';
import { logger } from './utils/logger';

// Load environment variables
dotenv.config();

// Create Express application
const app = express();
const port = process.env.PORT || 3001;

// Set up middleware
setupMiddleware(app);

// Set up routes
app.use(routes);

// Set up error handling (should be after routes)
setupErrorHandling(app);

// Start server function
const startServer = async () => {
  try {
    // Initialize database (may return null in development)
    const dataSource = await initializeDatabase();
    if (dataSource) {
      logger.info('Database connected successfully');
    } else {
      logger.warn('Running without database connection');
    }

    // Start server
    app.listen(port, () => {
      logger.info(`Server running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
    });
  } catch (error) {
    logger.error('Failed to start server:', { error });
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection:', { reason, promise });
  // Close server & exit process
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', { error: err });
  // Close server & exit process
  process.exit(1);
});

// Start server
startServer();
