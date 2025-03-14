// Temporary constants file until we can import from @luma/shared
export enum StatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export enum ErrorCode {
  // General errors
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  NOT_FOUND = "NOT_FOUND",
  INVALID_INPUT = "INVALID_INPUT",
  ALREADY_EXISTS = "ALREADY_EXISTS",

  // Authentication errors
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  INVALID_TOKEN = "INVALID_TOKEN",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",
  EMAIL_NOT_VERIFIED = "EMAIL_NOT_VERIFIED",
  INVALID_VERIFICATION_TOKEN = "INVALID_VERIFICATION_TOKEN",
  INVALID_RESET_TOKEN = "INVALID_RESET_TOKEN",
  INVALID_REFRESH_TOKEN = "INVALID_REFRESH_TOKEN",

  // Operation errors
  REGISTRATION_FAILED = "REGISTRATION_FAILED",
  LOGIN_FAILED = "LOGIN_FAILED",
  LOGOUT_FAILED = "LOGOUT_FAILED",
  TOKEN_REFRESH_FAILED = "TOKEN_REFRESH_FAILED",
  EMAIL_VERIFICATION_FAILED = "EMAIL_VERIFICATION_FAILED",
  PASSWORD_RESET_FAILED = "PASSWORD_RESET_FAILED",
  PASSWORD_RESET_REQUEST_FAILED = "PASSWORD_RESET_REQUEST_FAILED",
}

// User roles
export enum UserRole {
  Customer = "customer",
  Admin = "admin",
  Staff = "staff",
}

// Authentication constants
export const AUTH_CONSTANTS = {
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret_key",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "1h",
  JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || "7d",
  PASSWORD_RESET_EXPIRY: 3600000, // 1 hour in milliseconds
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_TIME: 15 * 60 * 1000, // 15 minutes in milliseconds
};
