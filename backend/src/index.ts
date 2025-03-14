import "reflect-metadata";
import app from "./app";
import { logger } from "./utils/logger";
import { initDatabase } from "./config/database.init";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection:", { reason, promise });
  // Close server & exit process
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", { error: err });
  // Close server & exit process
  process.exit(1);
});

// Start server
const startServer = async () => {
  try {
    // Initialize database with optimizations
    await initDatabase();

    // Start Express server
    app.listen(PORT, () => {
      logger.info(
        `Server running in ${
          process.env.NODE_ENV || "development"
        } mode on port ${PORT}`
      );
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
