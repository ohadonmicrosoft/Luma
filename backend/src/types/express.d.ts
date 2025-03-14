import { UserRole } from "../utils/constants";

// Extend the Express Request interface to include a user property
declare module "express" {
  interface Request {
    user?: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: UserRole;
      [key: string]: unknown; // Use unknown instead of any
    };
    refreshToken?: string;
  }
}
