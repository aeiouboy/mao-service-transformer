import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '../../shared/shared.module';
import { TransformationsModule } from '../transformations/transformations.module';
import { PaymentsModule } from '../payments/payments.module';
import { CancelOrderController } from './controllers/cancel-order.controller';
import { OrderTransformationService } from './services/order-transformation.service';
import { OrderLineTransformationService } from './services/order-line-transformation.service';
import { OrderCancellationService } from './services/order-cancellation.service';
import { FileBasedOrderRepositoryService } from './services/file-based-order-repository.service';
import { OrderTransformationOrchestratorService } from './services/order-transformation-orchestrator.service';
import { Order } from './entities/order.entity';
import { OrderLine } from './entities/order-line.entity';
import { Allocation } from './entities/allocation.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Order,
      OrderLine,
      Allocation,
    ]),
    SharedModule,
    TransformationsModule,
    PaymentsModule,
  ],
  controllers: [
    CancelOrderController,
  ],
  providers: [
    OrderTransformationService,
    OrderLineTransformationService,
    OrderCancellationService,
    FileBasedOrderRepositoryService,
    OrderTransformationOrchestratorService,
  ],
  exports: [
    OrderTransformationService,
    OrderLineTransformationService,
    OrderCancellationService,
    FileBasedOrderRepositoryService,
    OrderTransformationOrchestratorService,
  ],
})
export class OrdersModule {}