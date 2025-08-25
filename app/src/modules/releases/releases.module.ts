import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { DatabaseModule } from '../../core/database/database.module';
import { SharedModule } from '../../shared/shared.module';
import { Allocation } from '../orders/entities/allocation.entity';
import { OrderLine } from '../orders/entities/order-line.entity';
import { Order } from '../orders/entities/order.entity';
import { OrdersModule } from '../orders/orders.module';
import { Payment } from '../payments/entities/payment.entity';
import { PaymentsModule } from '../payments/payments.module';
import { TransformationsModule } from '../transformations/transformations.module';

import { ReleaseOrderController } from './controllers/release-order.controller';
import { OrderDatabaseRepositoryService } from './services/order-database-repository.service';
import { OrderReleaseTemplateTransformerService } from './services/order-release-transformer.service';
import { DatabaseConstraintValidator } from './validators/database-constraint.validator';

@Module({
  imports: [
    SequelizeModule.forFeature([Allocation, Order, OrderLine, Payment]),
    DatabaseModule,
    SharedModule,
    TransformationsModule,
    OrdersModule,
    PaymentsModule,
  ],
  controllers: [ReleaseOrderController],
  providers: [
    OrderDatabaseRepositoryService,
    DatabaseConstraintValidator,
    OrderReleaseTemplateTransformerService,
  ],
  exports: [
    OrderDatabaseRepositoryService,
    DatabaseConstraintValidator,
    OrderReleaseTemplateTransformerService,
  ],
})
export class ReleasesModule {}
