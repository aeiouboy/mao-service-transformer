import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { SharedModule } from '../../shared/shared.module';
import { TransformationsModule } from '../transformations/transformations.module';

import { PaymentMethod } from './entities/payment-method.entity';
import { PaymentTransaction } from './entities/payment-transaction.entity';
import { Payment } from './entities/payment.entity';
import { PaymentMethodTransformationService } from './services/payment-method-transformation.service';
import { PaymentTransactionTransformationService } from './services/payment-transaction-transformation.service';
import { PaymentTransformationService } from './services/payment-transformation.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Payment, PaymentMethod, PaymentTransaction]),
    SharedModule,
    TransformationsModule,
  ],
  controllers: [],
  providers: [
    PaymentTransformationService,
    PaymentMethodTransformationService,
    PaymentTransactionTransformationService,
  ],
  exports: [
    PaymentTransformationService,
    PaymentMethodTransformationService,
    PaymentTransactionTransformationService,
  ],
})
export class PaymentsModule {}
