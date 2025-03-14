import { ErrorCode, StatusCode } from "./constants";

export class AppError extends Error {
  public readonly statusCode: StatusCode;
  public readonly errorCode: ErrorCode;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: StatusCode = StatusCode.INTERNAL_SERVER_ERROR,
    errorCode: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);

    // Set the prototype explicitly
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
