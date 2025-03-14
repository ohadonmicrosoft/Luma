import express, { RequestHandler, ErrorRequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { AppDataSource } from "./config/database";
import { logger } from "./utils/logger";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import routes from "./routes";

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(helmet());
app.use(
  cookieParser(process.env.COOKIE_SECRET || "default_cookie_secret_for_dev")
);
app.use(morgan("dev"));

// API routes
app.use("/api", routes);

// 404 handler
app.use(notFoundHandler as RequestHandler);

// Global error handler
app.use(errorHandler as ErrorRequestHandler);

// Initialize database connection
const initializeApp = async () => {
  try {
    // Skip database connection in development mode if needed
    if (process.env.SKIP_DB_CONNECTION === "true") {
      logger.info("Skipping database connection in development mode");
    } else {
      await AppDataSource.initialize();
      logger.info("Database connection established");
    }

    // Start server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      logger.info(
        `Server running on port ${PORT} in ${
          process.env.NODE_ENV || "development"
        } mode`
      );
    });
  } catch (error) {
    logger.error("Error initializing app:", error);
    process.exit(1);
  }
};

// Start the application
initializeApp();

export default app;
