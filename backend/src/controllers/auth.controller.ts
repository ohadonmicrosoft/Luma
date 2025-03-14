import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { StatusCode } from "../utils/constants";
import { AppError } from "../utils/AppError";
import { logger } from "../utils/logger";
import { User } from "../models/User";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Register a new user
   */
  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData: Partial<User> = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role, // Role will be validated and defaulted in the User entity
      };

      const user = await this.authService.register(userData);

      res.status(StatusCode.CREATED).json({
        status: "success",
        data: { user },
      });
    } catch (error) {
      logger.error("Error in register controller:", error);
      next(error);
    }
  };

  /**
   * Login a user
   */
  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, password } = req.body;

      const { user, tokens } = await this.authService.login(email, password);

      // Set refresh token as HTTP-only cookie
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(StatusCode.OK).json({
        status: "success",
        data: {
          user,
          accessToken: tokens.accessToken,
        },
      });
    } catch (error) {
      logger.error("Error in login controller:", error);
      next(error);
    }
  };

  /**
   * Refresh access token
   */
  refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Get refresh token from cookie
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new AppError(
          "Refresh token not provided",
          StatusCode.UNAUTHORIZED
        );
      }

      const tokens = await this.authService.refreshToken(refreshToken);

      // Set new refresh token as HTTP-only cookie
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(StatusCode.OK).json({
        status: "success",
        data: {
          accessToken: tokens.accessToken,
        },
      });
    } catch (error) {
      logger.error("Error in refreshToken controller:", error);
      next(error);
    }
  };

  /**
   * Logout a user
   */
  logout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Get user ID from authenticated request
      if (!req.user) {
        throw new AppError("User not authenticated", StatusCode.UNAUTHORIZED);
      }

      const userId = req.user.id;

      await this.authService.logout(userId);

      // Clear refresh token cookie
      res.clearCookie("refreshToken");

      res.status(StatusCode.OK).json({
        status: "success",
        data: null,
      });
    } catch (error) {
      logger.error("Error in logout controller:", error);
      next(error);
    }
  };

  /**
   * Verify email with token
   */
  verifyEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { token } = req.params;

      const user = await this.authService.verifyEmail(token);

      res.status(StatusCode.OK).json({
        status: "success",
        data: { user },
      });
    } catch (error) {
      logger.error("Error in verifyEmail controller:", error);
      next(error);
    }
  };

  /**
   * Request password reset
   */
  requestPasswordReset = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email } = req.body;

      await this.authService.requestPasswordReset(email);

      // Always return success even if email doesn't exist (security)
      res.status(StatusCode.OK).json({
        status: "success",
        message:
          "If a user with that email exists, a password reset link has been sent",
      });
    } catch (error) {
      logger.error("Error in requestPasswordReset controller:", error);
      next(error);
    }
  };

  /**
   * Reset password with token
   */
  resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { token } = req.params;
      const { password } = req.body;

      await this.authService.resetPassword(token, password);

      res.status(StatusCode.OK).json({
        status: "success",
        message: "Password has been reset successfully",
      });
    } catch (error) {
      logger.error("Error in resetPassword controller:", error);
      next(error);
    }
  };
}
