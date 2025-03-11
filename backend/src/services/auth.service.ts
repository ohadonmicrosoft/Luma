import { Repository } from 'typeorm';
import { User } from '../models/User';
import { AppDataSource } from '../config/database';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { ErrorCode, StatusCode, UserRole } from '../utils/constants';
import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  private userRepository: Repository<User>;
  private jwtSecret: string;
  private jwtExpiry: string;
  private refreshTokenExpiry: string;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret_for_dev';
    this.jwtExpiry = process.env.JWT_EXPIRY || '1h';
    this.refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY || '7d';
  }

  /**
   * Register a new user
   */
  async register(userData: Partial<User>): Promise<User> {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findOne({
        where: { email: userData.email }
      });

      if (existingUser) {
        throw new AppError(
          'User with this email already exists',
          StatusCode.BAD_REQUEST,
          ErrorCode.USER_ALREADY_EXISTS
        );
      }

      // Create verification token
      const emailVerificationToken = crypto.randomBytes(32).toString('hex');

      // Create new user
      const user = new User({
        ...userData,
        emailVerificationToken,
        emailVerified: false
      });

      // Save user to database
      const savedUser = await this.userRepository.save(user);

      // TODO: Send verification email

      // Return user without password
      const userWithoutPassword = { ...savedUser } as Partial<User>;
      if (userWithoutPassword.password) {
        delete userWithoutPassword.password;
      }
      return userWithoutPassword as User;
    } catch (error) {
      logger.error('Error registering user:', error);
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        'Failed to register user',
        StatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.REGISTRATION_FAILED
      );
    }
  }

  /**
   * Login a user
   */
  async login(email: string, password: string): Promise<{ user: User; tokens: AuthTokens }> {
    try {
      // Find user with password included
      const user = await this.userRepository.findOne({
        where: { email },
        select: ['id', 'email', 'password', 'firstName', 'lastName', 'role', 'emailVerified']
      });

      if (!user) {
        throw new AppError(
          'Invalid email or password',
          StatusCode.UNAUTHORIZED,
          ErrorCode.INVALID_CREDENTIALS
        );
      }

      // Check if email is verified
      if (!user.emailVerified) {
        throw new AppError(
          'Email not verified',
          StatusCode.UNAUTHORIZED,
          ErrorCode.EMAIL_NOT_VERIFIED
        );
      }

      // Verify password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new AppError(
          'Invalid email or password',
          StatusCode.UNAUTHORIZED,
          ErrorCode.INVALID_CREDENTIALS
        );
      }

      // Generate tokens
      const tokens = await this.generateTokens(user);

      // Update user's refresh token and last login
      user.refreshToken = tokens.refreshToken;
      user.lastLogin = new Date();
      await this.userRepository.save(user);

      // Remove password from response
      const userWithoutPassword = { ...user } as Partial<User>;
      if (userWithoutPassword.password) {
        delete userWithoutPassword.password;
      }

      return { user: userWithoutPassword as User, tokens };
    } catch (error) {
      logger.error('Error logging in user:', error);
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        'Failed to login',
        StatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.LOGIN_FAILED
      );
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    try {
      // Find user with this refresh token
      const user = await this.userRepository.findOne({
        where: { refreshToken }
      });

      if (!user) {
        throw new AppError(
          'Invalid refresh token',
          StatusCode.UNAUTHORIZED,
          ErrorCode.INVALID_REFRESH_TOKEN
        );
      }

      // Generate new tokens
      const tokens = await this.generateTokens(user);

      // Update user's refresh token
      user.refreshToken = tokens.refreshToken;
      await this.userRepository.save(user);

      return tokens;
    } catch (error) {
      logger.error('Error refreshing token:', error);
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        'Failed to refresh token',
        StatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.TOKEN_REFRESH_FAILED
      );
    }
  }

  /**
   * Logout a user
   */
  async logout(userId: string): Promise<void> {
    try {
      // Find user
      const user = await this.userRepository.findOne({
        where: { id: userId }
      });

      if (!user) {
        throw new AppError(
          'User not found',
          StatusCode.NOT_FOUND,
          ErrorCode.USER_NOT_FOUND
        );
      }

      // Clear refresh token
      user.refreshToken = null;
      await this.userRepository.save(user);
    } catch (error) {
      logger.error('Error logging out user:', error);
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        'Failed to logout',
        StatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.LOGOUT_FAILED
      );
    }
  }

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<User> {
    try {
      // Find user with this verification token
      const user = await this.userRepository.findOne({
        where: { emailVerificationToken: token }
      });

      if (!user) {
        throw new AppError(
          'Invalid verification token',
          StatusCode.BAD_REQUEST,
          ErrorCode.INVALID_VERIFICATION_TOKEN
        );
      }

      // Update user
      user.emailVerified = true;
      user.emailVerificationToken = null;
      const updatedUser = await this.userRepository.save(user);

      // Return user without password
      const userWithoutPassword = { ...updatedUser } as Partial<User>;
      if (userWithoutPassword.password) {
        delete userWithoutPassword.password;
      }
      return userWithoutPassword as User;
    } catch (error) {
      logger.error('Error verifying email:', error);
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        'Failed to verify email',
        StatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.EMAIL_VERIFICATION_FAILED
      );
    }
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<void> {
    try {
      // Find user
      const user = await this.userRepository.findOne({
        where: { email }
      });

      if (!user) {
        // Don't reveal that the user doesn't exist
        return;
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const passwordResetToken = resetToken;
      
      // Set expiration (1 hour from now)
      const passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);

      // Update user
      user.passwordResetToken = passwordResetToken;
      user.passwordResetExpires = passwordResetExpires;
      await this.userRepository.save(user);

      // TODO: Send password reset email
    } catch (error) {
      logger.error('Error requesting password reset:', error);
      throw new AppError(
        'Failed to request password reset',
        StatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.PASSWORD_RESET_REQUEST_FAILED
      );
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      // Find user with this reset token and valid expiration
      const user = await this.userRepository.findOne({
        where: {
          passwordResetToken: token,
        }
      });

      if (!user || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
        throw new AppError(
          'Invalid or expired password reset token',
          StatusCode.BAD_REQUEST,
          ErrorCode.INVALID_RESET_TOKEN
        );
      }

      // Update user
      user.password = newPassword;
      user.passwordResetToken = null;
      user.passwordResetExpires = null;
      await this.userRepository.save(user);
    } catch (error) {
      logger.error('Error resetting password:', error);
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        'Failed to reset password',
        StatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.PASSWORD_RESET_FAILED
      );
    }
  }

  /**
   * Generate JWT and refresh tokens
   */
  private async generateTokens(user: User): Promise<AuthTokens> {
    const payload: TokenPayload = {
      userId: user.id as string,
      email: user.email,
      role: user.role as unknown as UserRole
    };

    // Use a simpler approach to sign the token
    let accessToken = '';
    try {
      // @ts-ignore - Ignoring TypeScript errors for jwt.sign
      accessToken = jwt.sign(payload, this.jwtSecret, { expiresIn: this.jwtExpiry });
    } catch (error) {
      logger.error('Error signing JWT:', error);
      throw new AppError(
        'Failed to generate access token',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }

    const refreshToken = uuidv4();

    return {
      accessToken,
      refreshToken
    };
  }
} 
