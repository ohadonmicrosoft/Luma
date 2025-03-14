import winston from "winston";
import path from "path";
import fs from "fs";

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, colorize, json } = format;

// Define log directory
const logDir = path.join(process.cwd(), "logs");

// Ensure log directory exists
try {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
} catch (error) {
  console.warn(`Unable to create logs directory: ${error}`);
}

// Define log format
const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let metaStr = "";
  if (Object.keys(metadata).length > 0) {
    metaStr = JSON.stringify(metadata, null, 2);
  }
  return `${timestamp} [${level.toUpperCase()}]: ${message}${
    metaStr ? `\n${metaStr}` : ""
  }`;
});

// Create logger instance with file transports only if we can write to the log directory
let loggerTransports = [];

// Always add console transport in development
if (process.env.NODE_ENV !== "production") {
  loggerTransports.push(
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
      ),
    })
  );
}

// Try to add file transports if we can access the log directory
try {
  // Check if directory is writable
  fs.accessSync(logDir, fs.constants.W_OK);

  // Add file transports
  loggerTransports = [
    ...loggerTransports,
    // Write logs with level 'error' and below to error.log
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Write all logs to combined.log
    new transports.File({
      filename: path.join(logDir, "combined.log"),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ];
} catch (error) {
  console.warn(`Unable to write to logs directory: ${error}`);
  // Continue with console-only logging
}

// Create logger instance
export const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json()),
  defaultMeta: { service: "luma-api" },
  transports: loggerTransports,
  // We'll only handle exceptions/rejections through the console to avoid startup errors
  exceptionHandlers: [
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
      ),
    }),
  ],
  rejectionHandlers: [
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
      ),
    }),
  ],
  exitOnError: false,
});

export default logger;
