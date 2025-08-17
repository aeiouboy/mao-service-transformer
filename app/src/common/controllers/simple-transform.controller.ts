import { Controller, Get } from '@nestjs/common';
import { ReleaseOrderTransformationService } from '../services/release-order-transformation.service';

@Controller('api')
export class SimpleTransformController {
  constructor(
    private readonly transformationService: ReleaseOrderTransformationService
  ) {}

  @Get('test')
  async testTransformation() {
    try {
      // Load sample data using file system (simple approach)
      const fs = require('fs');
      const path = require('path');
      
      // Get the sample input JSON file
      const samplePath = path.join(process.cwd(), '..', 'data', 'samples', 'sample_input.json');
      const sampleInput = JSON.parse(fs.readFileSync(samplePath, 'utf8'));
      
      // Transform the order
      const result = this.transformationService.transform(sampleInput);
      
      return {
        success: true,
        message: 'Transformation successful',
        input: sampleInput,
        output: result
      };
    } catch (error) {
      return {
        success: false,
        message: 'Transformation failed',
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  @Get('health')
  async health() {
    return {
      status: 'OK',
      service: 'MAO Service Transformer',
      timestamp: new Date().toISOString()
    };
  }
}