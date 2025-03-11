import { Request, Response, NextFunction } from 'express';
import { StatusCode, ErrorCode } from '../utils/constants';
import { logger } from '../utils/logger';

// Custom API error class
export class ApiError extends Error {
  statusCode: number;
  errorCode: string;
  isOperational: boolean;

  constructor(
    statusCode: number,
    message: string,
    errorCode: string = ErrorCode.INTERNAL_SERVER_ERROR,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Global error handler middleware
export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  // Default error values
  let statusCode = StatusCode.INTERNAL_SERVER_ERROR;
  let errorCode = ErrorCode.INTERNAL_SERVER_ERROR;
  let message = 'Internal Server Error';
  let isOperational = false;

  // If this is our ApiError, use its values
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorCode = err.errorCode;
    isOperational = err.isOperational;
  } else if (err.name === 'ValidationError') {
    // Handle validation errors
    statusCode = StatusCode.BAD_REQUEST;
    errorCode = ErrorCode.VALIDATION_ERROR;
    message = err.message;
    isOperational = true;
  } else if (err.name === 'UnauthorizedError') {
    // Handle authentication errors (e.g., from JWT middleware)
    statusCode = StatusCode.UNAUTHORIZED;
    errorCode = ErrorCode.UNAUTHORIZED;
    message = 'Authentication required';
    isOperational = true;
  }

  // Log the error
  if (isOperational) {
    logger.warn(`${errorCode}: ${message}`, {
      path: req.path,
      method: req.method,
      statusCode,
      errorCode,
    });
  } else {
    logger.error(`Unhandled error: ${err.message}`, {
      error: err,
      stack: err.stack,
      path: req.path,
      method: req.method,
    });
  }

  // Send response
  return res.status(statusCode).json({
    success: false,
    error: errorCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// Not found error handler middleware
export const notFoundHandler = (req: Request, res: Response) => {
  const message = `Route not found: ${req.originalUrl}`;
  logger.warn(message, {
    path: req.path,
    method: req.method,
  });

  res.status(StatusCode.NOT_FOUND).json({
    success: false,
    error: ErrorCode.NOT_FOUND,
    message,
  });
}; 
