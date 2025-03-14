import express, { Express, RequestHandler, ErrorRequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { errorHandler, notFoundHandler } from "./errorHandler";

// Setup common middleware
export const setupMiddleware = (app: Express) => {
  // Enable Cross-Origin Resource Sharing
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  // Set security headers
  app.use(helmet());

  // Parse JSON request bodies
  app.use(express.json({ limit: "2mb" }));

  // Parse URL-encoded request bodies
  app.use(express.urlencoded({ extended: true, limit: "2mb" }));

  // Compress responses
  app.use(compression());

  // Apply rate limiting to all requests
  const apiLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10), // 15 minutes by default
    max: parseInt(process.env.RATE_LIMIT_MAX || "100", 10), // limit each IP to 100 requests per windowMs by default
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
      status: 429,
      message: "Too many requests, please try again later.",
    },
  });

  app.use("/api/", apiLimiter);

  // More stringent rate limiting for authentication routes
  const authLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10), // 15 minutes by default
    max: parseInt(process.env.AUTH_RATE_LIMIT_MAX || "10", 10), // limit each IP to 10 requests per windowMs by default
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      status: 429,
      message: "Too many authentication attempts, please try again later.",
    },
  });

  app.use("/api/auth/", authLimiter);

  // Health check endpoint (not rate limited)
  app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  return app;
};

// Setup error handling middleware (should be used after routes)
export const setupErrorHandling = (app: Express) => {
  // Add the 404 handler for unmatched routes
  app.use("*", notFoundHandler as RequestHandler);

  // Add the error handler as the last middleware
  app.use(errorHandler as ErrorRequestHandler);

  return app;
};

export default setupMiddleware;
