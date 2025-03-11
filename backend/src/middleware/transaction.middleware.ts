import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { EntityManager, QueryRunner } from 'typeorm';
import logger from '../utils/logger';

// Extend the Express Request type to include transaction related properties
// Using module augmentation instead of namespace
declare module 'express' {
  interface Request {
    transactionManager?: EntityManager;
    queryRunner?: QueryRunner;
  }
}

/**
 * Middleware to handle database transactions
 * Wraps the request handler in a transaction that will be committed if the request completes successfully
 * or rolled back if an error occurs
 */
export const transactionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // Skip if database is not initialized
  if (!AppDataSource || !AppDataSource.isInitialized) {
    logger.warn('Database not initialized, skipping transaction middleware');
    return next();
  }

  const queryRunner = AppDataSource.createQueryRunner();
  
  try {
    // Start transaction
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    // Attach transaction manager to request for use in controller
    req.queryRunner = queryRunner;
    req.transactionManager = queryRunner.manager;
    
    // Store original methods
    const originalJson = res.json;
    const originalSend = res.send;
    
    // Function to handle transaction completion
    const completeTransaction = async (isSuccess: boolean) => {
      try {
        if (isSuccess) {
          await queryRunner.commitTransaction();
        } else {
          await queryRunner.rollbackTransaction();
        }
      } catch (error) {
        logger.error('Error finalizing transaction:', error);
        try {
          await queryRunner.rollbackTransaction();
        } catch (rollbackError) {
          logger.error('Error during rollback:', rollbackError);
        }
      } finally {
        await queryRunner.release();
        delete req.queryRunner;
        delete req.transactionManager;
      }
    };
    
    // Override json method
    res.json = function(body) {
      const isSuccess = res.statusCode >= 200 && res.statusCode < 400;
      
      // Handle transaction asynchronously
      completeTransaction(isSuccess).catch(err => {
        logger.error('Unhandled error in transaction finalization:', err);
      });
      
      return originalJson.call(this, body);
    };
    
    // Override send method
    res.send = function(body) {
      const isSuccess = res.statusCode >= 200 && res.statusCode < 400;
      
      // Handle transaction asynchronously
      completeTransaction(isSuccess).catch(err => {
        logger.error('Unhandled error in transaction finalization:', err);
      });
      
      return originalSend.call(this, body);
    };
    
    next();
  } catch (error) {
    // Handle errors during transaction setup
    logger.error('Error setting up transaction:', error);
    
    if (queryRunner.isTransactionActive) {
      await queryRunner.rollbackTransaction();
    }
    
    await queryRunner.release();
    
    next(error);
  }
};

/**
 * Higher-order function to wrap a specific route handler with transaction management
 * Useful for specific routes that need transaction management without applying it to all routes
 */
export const withTransaction = (handler: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Skip if database is not initialized
    if (!AppDataSource || !AppDataSource.isInitialized) {
      logger.warn('Database not initialized, skipping transaction wrapper');
      return handler(req, res, next);
    }

    const queryRunner = AppDataSource.createQueryRunner();
    
    try {
      // Start transaction
      await queryRunner.connect();
      await queryRunner.startTransaction();
      
      // Attach transaction manager to request
      req.queryRunner = queryRunner;
      req.transactionManager = queryRunner.manager;
      
      // Execute handler
      await handler(req, res, next);
      
      // Commit transaction if no error was thrown and response is successful
      if (res.statusCode >= 200 && res.statusCode < 400) {
        await queryRunner.commitTransaction();
      } else {
        await queryRunner.rollbackTransaction();
      }
    } catch (error) {
      // Rollback transaction on error
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      
      next(error);
    } finally {
      // Release query runner
      await queryRunner.release();
      
      // Clean up request
      delete req.queryRunner;
      delete req.transactionManager;
    }
  };
}; 
