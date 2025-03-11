import { User } from '../models/User';
import { UserRole } from '../utils/constants';

declare global {
  namespace Express {
    interface Request {
      user?: User & {
        id: string;
        role: UserRole;
      };
    }
  }
} 
