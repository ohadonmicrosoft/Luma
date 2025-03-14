import { UserRole, User } from "./models/User";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      role?: UserRole;
      session: {
        id?: string;
        [key: string]: unknown;
      };
    }
  }
}

export {};
