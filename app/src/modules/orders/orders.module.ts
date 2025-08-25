import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { SharedModule } from '../../shared/shared.module';
import { PaymentsModule } from '../payments/payments.module';
import { TransformationsModule } from '../transformations/transformations.module';

import { CancelOrderDatabaseController } from './controllers/cancel-order-database.controller';
import { CancelOrderController } from './controllers/cancel-order.controller';
import { Allocation } from './entities/allocation.entity';
import { OrderLine } from './entities/order-line.entity';
import { Order } from './entities/order.entity';
import { CancelOrderMapperService } from './services/cancel-order-mapper.service';
import { CancelOrderTransformerService } from './services/cancel-order-transformer.service';
import { CancelledOrderQueryService } from './services/cancelled-order-query.service';
import { FileBasedOrderRepositoryService } from './services/file-based-order-repository.service';
import { OrderCancellationService } from './services/order-cancellation.service';
import { OrderLineTransformationService } from './services/order-line-transformation.service';
import { OrderTransformationOrchestratorService } from './services/order-transformation-orchestrator.service';
import { OrderTransformationService } from './services/order-transformation.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Order, OrderLine, Allocation]),
    SharedModule,
    TransformationsModule,
    PaymentsModule,
  ],
  controllers: [CancelOrderController, CancelOrderDatabaseController],
  providers: [
    OrderTransformationService,
    OrderLineTransformationService,
    OrderCancellationService,
    FileBasedOrderRepositoryService,
    OrderTransformationOrchestratorService,
    CancelledOrderQueryService,
    CancelOrderMapperService,
    CancelOrderTransformerService,
  ],
  exports: [
    OrderTransformationService,
    OrderLineTransformationService,
    OrderCancellationService,
    FileBasedOrderRepositoryService,
    OrderTransformationOrchestratorService,
    CancelledOrderQueryService,
    CancelOrderMapperService,
    CancelOrderTransformerService,
  ],
})
export class OrdersModule {}
