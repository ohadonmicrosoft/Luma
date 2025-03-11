import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { StatusCode, ErrorCode } from '../utils/constants';

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
    
    // Send validation error response
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
