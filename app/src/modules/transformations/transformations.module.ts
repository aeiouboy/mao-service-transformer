import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';

import { AddressMapper } from './mappers/address.mapper';
import { AllocationMapper } from './mappers/allocation.mapper';
import { PaymentMapper } from './mappers/payment.mapper';
import { ReleaseLineMapper } from './mappers/release-line.mapper';
import { AllocationTransformationService } from './services/allocation-transformation.service';
import { BusinessRulesService } from './services/business-rules.service';
import { CalculationService } from './services/calculation.service';
import { CancelFieldMappingService } from './services/cancel-field-mapping.service';

@Module({
  imports: [SharedModule],
  controllers: [],
  providers: [
    BusinessRulesService,
    CalculationService,
    CancelFieldMappingService,
    AllocationTransformationService,
    AddressMapper,
    AllocationMapper,
    PaymentMapper,
    ReleaseLineMapper,
  ],
  exports: [
    BusinessRulesService,
    CalculationService,
    CancelFieldMappingService,
    AllocationTransformationService,
    AddressMapper,
    AllocationMapper,
    PaymentMapper,
    ReleaseLineMapper,
  ],
})
export class TransformationsModule {}
