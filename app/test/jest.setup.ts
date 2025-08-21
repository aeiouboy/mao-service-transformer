import 'reflect-metadata';

// Mock console.log/warn/error to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
};

// Mock process.env for consistent test environment
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';

// Setup timezone for consistent date handling
process.env.TZ = 'UTC';

// Mock any required environment variables
process.env.LOG_LEVEL = 'error';
process.env.REDIS_URL = 'redis://localhost:6379';
