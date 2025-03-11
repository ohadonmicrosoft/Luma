import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
import logger from '../utils/logger';

// Load environment variables
dotenv.config();

// Environment detection
const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';
const isDevelopment = !isProduction && !isTest;

// Database connection options
const databaseOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: isTest ? 'luma_test' : (process.env.DB_NAME || 'luma'),
  synchronize: !isProduction, // Auto create database schema in development
  logging: !isProduction && !isTest,
  entities: [path.join(__dirname, '../models/**/*.{ts,js}')],
  migrations: [path.join(__dirname, '../migrations/**/*.{ts,js}')],
  subscribers: [],
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  // Performance optimizations
  cache: {
    duration: 60000, // Cache query results for 1 minute by default
  },
  // Connection pool configuration
  // Usually, you'd want this to be set based on the expected load
  extra: {
    // Connection pool settings
    max: parseInt(process.env.DB_POOL_MAX || '10'), // Maximum number of connections in the pool
    min: parseInt(process.env.DB_POOL_MIN || '2'),  // Minimum number of connections in the pool
    idle: 10000                                     // How long a connection can be idle before being released
  }
};

// Create DataSource instance
export const AppDataSource = new DataSource(databaseOptions);

// Initialize database connection
export const initializeDatabase = async () => {
  try {
    // Check if we should skip database connection (for development without DB)
    if (process.env.SKIP_DB_CONNECTION === 'true' || isDevelopment) {
      logger.warn('Database connection skipped in development mode. Set SKIP_DB_CONNECTION=false to enable database connection.');
      return null;
    }
    
    await AppDataSource.initialize();
    logger.info('Database connection established successfully');
    
    // Apply any necessary optimizations after connection
    // This will be handled by database.init.ts
    
    return AppDataSource;
  } catch (error) {
    logger.error('Error during database connection:', error);
    
    // In development, we may want to continue even without a database
    if (isDevelopment) {
      logger.warn('Continuing in development mode without database connection.');
      return null;
    }
    
    throw error;
  }
};

export default AppDataSource; 
