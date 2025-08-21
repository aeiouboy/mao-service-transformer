import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { OrdersModule } from '../modules/orders/orders.module';
import { ReleasesModule } from '../modules/releases/releases.module';
import { TransformationsModule } from '../modules/transformations/transformations.module';
import { PaymentsModule } from '../modules/payments/payments.module';
import { SimpleTransformController } from './controllers/simple-transform.controller';

@Module({
  imports: [
    SharedModule,
    OrdersModule,
    ReleasesModule,
    TransformationsModule,
    PaymentsModule,
  ],
  controllers: [
    SimpleTransformController,
  ],
  providers: [],
  exports: [
    SharedModule,
    OrdersModule,
    ReleasesModule,
    TransformationsModule,
    PaymentsModule,
  ],
})
export class CommonModule {}
