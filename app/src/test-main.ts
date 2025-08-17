import { NestFactory } from '@nestjs/core';
import { TestAppModule } from './test-app.module';

/**
 * Minimal test application for transformation service testing
 * Runs without database, observability, or other external dependencies
 */
async function bootstrap() {
  // Create the minimal app
  const app = await NestFactory.create(TestAppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // Enable CORS for testing
  app.enableCors();

  // Set global prefix
  app.setGlobalPrefix('api');

  // Start the server
  const port = process.env.APP_PORT || 3001;
  await app.listen(port);

  console.log(`🚀 Test Application is running on: http://localhost:${port}`);
  console.log(`🎯 Test transformation endpoint: http://localhost:${port}/api/test`);
  console.log(`💚 Health check endpoint: http://localhost:${port}/api/health`);
}

bootstrap();