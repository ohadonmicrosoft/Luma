import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { StatusCode } from '../utils/constants';
import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';

/**
 * Middleware to validate request data against a Zod schema
 * @param schema Zod schema to validate against
 */
export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request data against schema
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      
      next();
    } catch (error) {
      // Handle Zod validation errors
      if (error instanceof ZodError) {
        logger.debug('Validation error:', error.errors);
        
        // Format error messages
        const formattedErrors = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));
        
        // Return validation error response
        return res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          message: 'Validation failed',
          errors: formattedErrors,
        });
      }
      
      // Pass other errors to global error handler
      next(error);
    }
  };
}; 
