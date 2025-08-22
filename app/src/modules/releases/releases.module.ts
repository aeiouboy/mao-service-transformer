import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '../../shared/shared.module';
import { TransformationsModule } from '../transformations/transformations.module';
import { OrdersModule } from '../orders/orders.module';
import { PaymentsModule } from '../payments/payments.module';
import { DatabaseModule } from '../../core/database/database.module';
import { ReleaseOrderController } from './controllers/release-order.controller';
import { OrderDatabaseRepositoryService } from './services/order-database-repository.service';
import { ReleaseOrderTransformerService } from './services/release-order-transformer.service';
import { DatabaseConstraintValidator } from './validators/database-constraint.validator';
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
    OrderDatabaseRepositoryService,
    ReleaseOrderTransformerService,
    DatabaseConstraintValidator,
  ],
  exports: [
    OrderDatabaseRepositoryService,
    ReleaseOrderTransformerService,
    DatabaseConstraintValidator,
  ],
})
export class ReleasesModule {}