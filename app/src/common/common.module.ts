import { Module } from '@nestjs/common';

// Shared Services
import { CancelOrderController } from './controllers/cancel-order.controller';
import { SimpleTransformController } from './controllers/simple-transform.controller';
import { AllocationTransformationService } from './services/domain/allocation-transformation.service';
import { CancelFieldMappingService } from './services/domain/cancel-field-mapping.service';
import { FileBasedOrderRepositoryService } from './services/domain/file-based-order-repository.service';
import { OrderCancellationService } from './services/domain/order-cancellation.service';
import { OrderLineTransformationService } from './services/domain/order-line-transformation.service';
import { OrderTransformationService } from './services/domain/order-transformation.service';
import { PaymentMethodTransformationService } from './services/domain/payment-method-transformation.service';
import { PaymentTransactionTransformationService } from './services/domain/payment-transaction-transformation.service';
import { PaymentTransformationService } from './services/domain/payment-transformation.service';
import { ReleaseLineTransformationService } from './services/domain/release-line-transformation.service';
import { ReleaseTransformationService } from './services/domain/release-transformation.service';
import { DynamicIdGeneratorService } from './services/dynamic-id-generator.service';
import { OrderTransformationOrchestratorService } from './services/orchestration/order-transformation-orchestrator.service';
import { ReleaseOrderTransformationService } from './services/release-order-transformation.service';
import { BusinessRulesService } from './services/shared/business-rules.service';
import { CalculationService } from './services/shared/calculation.service';
import { FileOutputService } from './services/shared/file-output.service';
import { TimestampService } from './services/shared/timestamp.service';

// Domain Services

// Orchestration Services

// Main Transformation Service (Facade)

// Controllers

@Module({
  controllers: [SimpleTransformController, CancelOrderController],
  providers: [
    // Shared Services
    DynamicIdGeneratorService,
    CalculationService,
    BusinessRulesService,
    TimestampService,
    FileOutputService,

    // Domain Services (Order: dependency order matters)
    PaymentTransactionTransformationService,
    PaymentMethodTransformationService,
    PaymentTransformationService,
    OrderTransformationService,
    OrderLineTransformationService,
    AllocationTransformationService,
    ReleaseTransformationService,
    ReleaseLineTransformationService,
    FileBasedOrderRepositoryService,
    CancelFieldMappingService,
    OrderCancellationService,

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
    FileOutputService,

    // Export domain services
    PaymentTransformationService,
    PaymentMethodTransformationService,
    PaymentTransactionTransformationService,
    OrderTransformationService,
    OrderLineTransformationService,
    AllocationTransformationService,
    ReleaseTransformationService,
    ReleaseLineTransformationService,
    FileBasedOrderRepositoryService,
    CancelFieldMappingService,
    OrderCancellationService,

    // Export orchestration services
    OrderTransformationOrchestratorService,

    // Export main service
    ReleaseOrderTransformationService,
  ],
})
export class CommonModule {}
