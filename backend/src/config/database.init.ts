import { AppDataSource } from "./database";
import logger from "../utils/logger";

/**
 * Initializes the database with performance optimizations
 * - Creates indexes on frequently queried columns
 * - Sets up any necessary database extensions
 */
export const initDatabaseOptimizations = async () => {
  try {
    // Skip if database is not initialized
    if (!AppDataSource.isInitialized) {
      logger.warn("Database not initialized, skipping optimizations");
      return;
    }

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    logger.info("Setting up database optimizations...");

    // Create extension for full-text search if not exists
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS pg_trgm;
    `);

    // Create GIN index for faster text search on products
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_products_name_description_gin
      ON products USING gin(name gin_trgm_ops, description gin_trgm_ops);
    `);

    // Create composite index for ordered/filtered queries
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_products_category_price
      ON products(category_id, price);
    `);

    // Create index for frequently filtered product attributes
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_products_is_active_is_featured
      ON products(is_active, is_featured);
    `);

    // Create index for order status queries
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_orders_status_created_at
      ON orders(status, created_at);
    `);

    // Create index for user order history
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_orders_user_id_created_at
      ON orders(user_id, created_at DESC);
    `);

    // Create index for product reviews
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_reviews_product_id_rating
      ON reviews(product_id, rating);
    `);

    logger.info("Database optimizations completed successfully");
  } catch (error) {
    logger.error("Error setting up database optimizations:", error);
  }
};

/**
 * Full database initialization function
 * - Connects to the database
 * - Sets up optimizations
 */
export const initDatabase = async () => {
  try {
    // Initialize database connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized successfully");
    }

    // Set up optimizations
    await initDatabaseOptimizations();

    return AppDataSource;
  } catch (error) {
    logger.error("Database initialization failed:", error);

    // In development, we may want to continue even without a database
    const isDevelopment =
      process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test";
    if (isDevelopment && process.env.SKIP_DB_CONNECTION === "true") {
      logger.warn(
        "Continuing in development mode without database connection."
      );
      return null;
    }

    throw error;
  }
};
