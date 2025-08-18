import { Module } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { AppConfigModule, LoggerModule } from './core';

/**
 * Minimal test app module without database dependencies
 * for testing the transformation service directly
 */
@Module({
  imports: [AppConfigModule, CommonModule, LoggerModule.forRootAsync()],
})
export class TestAppModule {}
