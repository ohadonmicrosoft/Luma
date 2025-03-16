# Testing Structure

This directory contains the test files for the Luma frontend application.

## Directory Structure

- `unit/`: Unit tests for individual components and utilities
- `integration/`: Integration tests for connected components
- `e2e/`: End-to-end tests for complete user flows

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

1. Unit tests should focus on testing a single component or function in isolation
2. Integration tests should test how components work together
3. E2E tests should simulate real user interactions and workflows
