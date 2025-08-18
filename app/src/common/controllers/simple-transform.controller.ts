import * as fs from 'fs';
import * as path from 'path';

import { Controller, Get } from '@nestjs/common';

import { ReleaseOrderTransformationService } from '../services/release-order-transformation.service';

interface TransformationResult {
  success: boolean;
  message: string;
  input?: Record<string, unknown>;
  output?: Record<string, unknown>;
  error?: string;
}

interface HealthResult {
  status: string;
  service: string;
  timestamp: string;
}

@Controller('api')
export class SimpleTransformController {
  constructor(
    private readonly transformationService: ReleaseOrderTransformationService,
  ) {}

  @Get('test')
  testTransformation(): TransformationResult {
    try {
      // Get the sample input JSON file
      const samplePath = path.join(
        process.cwd(),
        '..',
        'data',
        'samples',
        'sample_input.json',
      );
      const sampleInput = JSON.parse(
        fs.readFileSync(samplePath, 'utf8'),
      ) as Record<string, unknown>;
      // Transform the order
      const result = this.transformationService.transform(sampleInput as any);

      return {
        success: true,
        message: 'Transformation successful',
        input: sampleInput,
        output: result as unknown as Record<string, unknown>,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Transformation failed',
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  @Get('health')
  health(): HealthResult {
    return {
      status: 'OK',
      service: 'MAO Service Transformer',
      timestamp: new Date().toISOString(),
    };
  }
}
