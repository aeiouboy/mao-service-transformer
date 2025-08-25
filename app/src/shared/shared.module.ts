import { Module } from '@nestjs/common';

import { DatabaseTransformationService } from './services/database-transformation.service';
import { DynamicIdGeneratorService } from './services/dynamic-id-generator.service';
import { FileOutputService } from './services/file-output.service';
import { TimestampService } from './services/timestamp.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    DynamicIdGeneratorService,
    TimestampService,
    FileOutputService,
    DatabaseTransformationService,
  ],
  exports: [
    DynamicIdGeneratorService,
    TimestampService,
    FileOutputService,
    DatabaseTransformationService,
  ],
})
export class SharedModule {}
