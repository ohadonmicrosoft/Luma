import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { StatusCode, ErrorCode } from '../utils/constants';
import { AppError } from '../utils/AppError';

/**
 * Middleware to validate request data using express-validator
 */
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error: ValidationError) => ({
      field: error.type === 'field' ? error.path : 'unknown',
      message: error.msg
    }));
    
    const error = new AppError(
      'Validation failed',
      StatusCode.BAD_REQUEST,
      ErrorCode.INVALID_INPUT
    );
    
    // Add validation errors to the response
    res.status(StatusCode.BAD_REQUEST).json({
      status: 'error',
      code: ErrorCode.INVALID_INPUT,
      message: 'Validation failed',
      errors: errorMessages
    });
    return;
  }
  
  next();
}; 
