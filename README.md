# Luma - Premium E-Commerce Platform

A high-end e-commerce platform specialized for premium soap and shampoo products.

## Project Structure

This project is organized with the following directories:

- `frontend/`: Next.js application
- `backend/`: Node.js/Express API
- `shared/`: Shared types and utilities
- `infrastructure/`: Deployment configurations
- `docs/`: Project documentation

## Getting Started

1. Start the database services:

   ```bash
   docker-compose up -d
   ```

2. Start the backend:

   ```bash
   cd backend
   npm run dev
   ```

3. In a separate terminal, start the frontend:

   ```bash
   cd frontend
   npm run dev
   ```

4. Open your browser to http://localhost:3000

## Development Notes

The project is currently set up with individual packages instead of a monorepo due to technical limitations. Each package (frontend, backend, shared) should be developed and managed separately.
