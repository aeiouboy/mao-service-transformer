import { Module } from '@nestjs/common';

import { OrdersModule } from '../modules/orders/orders.module';
import { PaymentsModule } from '../modules/payments/payments.module';
import { ReleasesModule } from '../modules/releases/releases.module';
import { TransformationsModule } from '../modules/transformations/transformations.module';
import { SharedModule } from '../shared/shared.module';

import { ReleaseOrderTransformationService } from './services/release-order-transformation.service';
// import { SimpleTransformController } from './controllers/simple-transform.controller';

@Module({
  imports: [
    SharedModule,
    OrdersModule,
    ReleasesModule,
    TransformationsModule,
    PaymentsModule,
  ],
  controllers: [
    // SimpleTransformController,
  ],
  providers: [ReleaseOrderTransformationService],
  exports: [
    SharedModule,
    OrdersModule,
    ReleasesModule,
    TransformationsModule,
    PaymentsModule,
    ReleaseOrderTransformationService,
  ],
})
export class CommonModule {}
