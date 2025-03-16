# Backend Testing Structure

This directory contains the test files for the Luma backend application.

## Directory Structure

- `unit/`: Unit tests for individual services, controllers, and utilities
- `integration/`: Integration tests for API endpoints and database interactions
- `e2e/`: End-to-end tests for complete backend workflows

## Running Tests

To run the tests, use the following commands:

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run e2e tests only
npm run test:e2e
```

## Test Guidelines

1. Unit tests should focus on testing a single function or class in isolation
2. Integration tests should test API endpoints with database interactions
3. E2E tests should test complete backend workflows including external services
4. Use mocks and stubs for external dependencies in unit tests
5. Use test database for integration and e2e tests
