import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../config/database";
import { User } from "../models/User";
import { AppError } from "../utils/AppError";
import { StatusCode, ErrorCode, UserRole } from "../utils/constants";
import { logger } from "../utils/logger";

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

/**
 * Middleware to authenticate user using JWT
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(
        "Authentication required",
        StatusCode.UNAUTHORIZED,
        ErrorCode.UNAUTHORIZED
      );
    }

    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret_for_dev";

    // Verify token
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AppError(
          "Token expired",
          StatusCode.UNAUTHORIZED,
          ErrorCode.TOKEN_EXPIRED
        );
      }
      throw new AppError(
        "Invalid token",
        StatusCode.UNAUTHORIZED,
        ErrorCode.INVALID_TOKEN
      );
    }

    // Get user from database
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: decoded.userId },
    });

    if (!user) {
      throw new AppError(
        "User not found",
        StatusCode.UNAUTHORIZED,
        ErrorCode.USER_NOT_FOUND
      );
    }

    // Attach user to request
    req.user = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      // Add additional properties from JWT
      userId: decoded.userId,
      iat: decoded.iat,
      exp: decoded.exp,
    };

    next();
  } catch (error) {
    logger.error("Authentication error:", error);
    next(error);
  }
};

/**
 * Middleware to restrict access based on user roles
 */
export const restrictTo = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(
        new AppError(
          "User not authenticated",
          StatusCode.UNAUTHORIZED,
          ErrorCode.UNAUTHORIZED
        )
      );
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      next(
        new AppError(
          "You do not have permission to perform this action",
          StatusCode.FORBIDDEN,
          ErrorCode.FORBIDDEN
        )
      );
      return;
    }

    next();
  };
};
