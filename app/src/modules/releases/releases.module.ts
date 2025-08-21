import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '../../shared/shared.module';
import { TransformationsModule } from '../transformations/transformations.module';
import { OrdersModule } from '../orders/orders.module';
import { PaymentsModule } from '../payments/payments.module';
import { DatabaseModule } from '../../core/database/database.module';
import { ReleaseOrderController } from './controllers/release-order.controller';
import { ReleaseOrderTransformationService } from './services/release-order-transformation.service';
import { ReleaseLineTransformationService } from './services/release-line-transformation.service';
import { ReleaseTransformationService } from './services/release-transformation.service';
import { OrderDatabaseRepositoryService } from './services/order-database-repository.service';
import { ReleaseOrderTransformerService } from './services/release-order-transformer.service';
import { Allocation } from '../orders/entities/allocation.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderLine } from '../orders/entities/order-line.entity';
import { Payment } from '../payments/entities/payment.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Allocation,
      Order,
      OrderLine,
      Payment,
    ]),
    DatabaseModule,
    SharedModule,
    TransformationsModule,
    OrdersModule,
    PaymentsModule,
  ],
  controllers: [
    ReleaseOrderController,
  ],
  providers: [
    ReleaseOrderTransformationService,
    ReleaseLineTransformationService,
    ReleaseTransformationService,
    OrderDatabaseRepositoryService,
    ReleaseOrderTransformerService,
  ],
  exports: [
    ReleaseOrderTransformationService,
    ReleaseLineTransformationService,
    ReleaseTransformationService,
    OrderDatabaseRepositoryService,
    ReleaseOrderTransformerService,
  ],
})
export class ReleasesModule {}