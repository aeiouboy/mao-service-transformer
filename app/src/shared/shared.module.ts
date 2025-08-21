import { Module } from '@nestjs/common';
import { DynamicIdGeneratorService } from './services/dynamic-id-generator.service';
import { TimestampService } from './services/timestamp.service';
import { FileOutputService } from './services/file-output.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    DynamicIdGeneratorService,
    TimestampService,
    FileOutputService,
  ],
  exports: [
    DynamicIdGeneratorService,
    TimestampService,
    FileOutputService,
  ],
})
export class SharedModule {}