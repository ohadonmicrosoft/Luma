import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';
const isDevelopment = !isProduction && !isTest;

// Database connection options
export const AppDataSource = new DataSource({
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
});

// Initialize database connection
export const initializeDatabase = async () => {
  try {
    // Check if we should skip database connection (for development without DB)
    if (process.env.SKIP_DB_CONNECTION === 'true' || isDevelopment) {
      console.warn('Database connection skipped in development mode. Set SKIP_DB_CONNECTION=false to enable database connection.');
      return null;
    }
    
    await AppDataSource.initialize();
    console.log('Database connection established successfully');
    return AppDataSource;
  } catch (error) {
    console.error('Error during database connection:', error);
    
    // In development, we may want to continue even without a database
    if (isDevelopment) {
      console.warn('Continuing in development mode without database connection.');
      return null;
    }
    
    throw error;
  }
};

export default AppDataSource; 
