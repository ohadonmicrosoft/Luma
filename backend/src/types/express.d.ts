import { JwtPayload } from 'jsonwebtoken';
import { UserRole } from '../utils/constants';

// Extend the Express Request interface to include a user property
declare module 'express' {
  interface Request {
    user?: {
      id: string;
      email: string;
      role: UserRole;
    } & JwtPayload;
    refreshToken?: string;
  }
} 
