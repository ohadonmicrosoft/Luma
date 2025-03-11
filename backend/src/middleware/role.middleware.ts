import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../utils/constants';
import { StatusCode } from '../utils/constants';
import { AppError } from '../utils/AppError';

/**
 * Middleware to check if the authenticated user has the required role(s)
 * @param roles Array of allowed roles
 */
export const checkRole = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Ensure user object exists (should be attached by auth middleware)
      if (!req.user) {
        throw new AppError('User not authenticated', StatusCode.UNAUTHORIZED);
      }

      // Check if user role is in the allowed roles
      if (!roles.includes(req.user.role)) {
        throw new AppError('You do not have permission to perform this action', StatusCode.FORBIDDEN);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}; 
