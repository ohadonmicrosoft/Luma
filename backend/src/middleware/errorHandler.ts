import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { StatusCode, ErrorCode } from '../utils/constants';
import { logger } from '../utils/logger';

/**
 * Global error handler middleware
 */
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  logger.error('Error:', err);

  // Default error response
  let statusCode = StatusCode.INTERNAL_SERVER_ERROR;
  let errorCode = ErrorCode.INTERNAL_SERVER_ERROR;
  let message = 'Something went wrong';
  let stack = undefined;

  // If it's our custom AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    errorCode = err.errorCode;
    message = err.message;
    
    // Only include stack trace in development
    if (process.env.NODE_ENV === 'development') {
      stack = err.stack;
    }
  } else if (err instanceof SyntaxError && 'body' in err) {
    // Handle JSON parsing errors
    statusCode = StatusCode.BAD_REQUEST;
    errorCode = ErrorCode.INVALID_INPUT;
    message = 'Invalid JSON payload';
    
    // Only include stack trace in development
    if (process.env.NODE_ENV === 'development') {
      stack = err.stack;
    }
  } else if (err.name === 'ValidationError') {
    // Handle validation errors
    statusCode = StatusCode.BAD_REQUEST;
    errorCode = ErrorCode.INVALID_INPUT;
    message = err.message;
  } else if (err.name === 'UnauthorizedError') {
    // Handle authentication errors (e.g., from JWT middleware)
    statusCode = StatusCode.UNAUTHORIZED;
    errorCode = ErrorCode.UNAUTHORIZED;
    message = 'Authentication required';
  } else if (err instanceof Error) {
    // For other errors
    message = err.message || message;
    
    // Only include stack trace in development
    if (process.env.NODE_ENV === 'development') {
      stack = err.stack;
    }
  }

  // Send error response
  res.status(statusCode).json({
    status: 'error',
    code: errorCode,
    message,
    ...(stack && { stack })
  });
};

/**
 * Not found error handler middleware
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  const message = `Route not found: ${req.originalUrl}`;
  logger.warn(message, {
    path: req.path,
    method: req.method,
  });

  res.status(StatusCode.NOT_FOUND).json({
    status: 'error',
    code: ErrorCode.NOT_FOUND,
    message,
  });
}; 
