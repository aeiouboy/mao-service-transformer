import { Module } from '@nestjs/common';

// Shared Services
import { DynamicIdGeneratorService } from './services/dynamic-id-generator.service';
import { CalculationService } from './services/shared/calculation.service';
import { BusinessRulesService } from './services/shared/business-rules.service';
import { TimestampService } from './services/shared/timestamp.service';

// Domain Services
import { PaymentTransformationService } from './services/domain/payment-transformation.service';
import { PaymentMethodTransformationService } from './services/domain/payment-method-transformation.service';
import { PaymentTransactionTransformationService } from './services/domain/payment-transaction-transformation.service';
import { OrderTransformationService } from './services/domain/order-transformation.service';
import { OrderLineTransformationService } from './services/domain/order-line-transformation.service';
import { AllocationTransformationService } from './services/domain/allocation-transformation.service';
import { ReleaseTransformationService } from './services/domain/release-transformation.service';
import { ReleaseLineTransformationService } from './services/domain/release-line-transformation.service';

// Orchestration Services
import { OrderTransformationOrchestratorService } from './services/orchestration/order-transformation-orchestrator.service';

// Main Transformation Service (Facade)
import { ReleaseOrderTransformationService } from './services/release-order-transformation.service';

// Controllers
import { SimpleTransformController } from './controllers/simple-transform.controller';

@Module({
  controllers: [SimpleTransformController],
  providers: [
    // Shared Services
    DynamicIdGeneratorService,
    CalculationService,
    BusinessRulesService,
    TimestampService,
    
    // Domain Services (Order: dependency order matters)
    PaymentTransactionTransformationService,
    PaymentMethodTransformationService,
    PaymentTransformationService,
    OrderTransformationService,
    OrderLineTransformationService,
    AllocationTransformationService,
    ReleaseTransformationService,
    ReleaseLineTransformationService,
    
    // Orchestration Services
    OrderTransformationOrchestratorService,
    
    // Main Transformation Service (Facade)
    ReleaseOrderTransformationService,
  ],
  exports: [
    // Export shared services for use in other modules
    DynamicIdGeneratorService,
    CalculationService,
    BusinessRulesService,
    TimestampService,
    
    // Export domain services
    PaymentTransformationService,
    PaymentMethodTransformationService,
    PaymentTransactionTransformationService,
    OrderTransformationService,
    OrderLineTransformationService,
    AllocationTransformationService,
    ReleaseTransformationService,
    ReleaseLineTransformationService,
    
    // Export orchestration services
    OrderTransformationOrchestratorService,
    
    // Export main service
    ReleaseOrderTransformationService,
  ],
})
export class CommonModule {}