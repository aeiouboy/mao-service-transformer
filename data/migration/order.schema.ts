import { SequelizeModule } from '@nestjs/sequelize';

import { Allocations } from './allocations.model';
import { FulfillmentDetails } from './fulfillment-details.model';
import { OrderLine } from './order-line.model';
import { Order } from './order.model';
import { PaymentMethod } from './payment-method.model';
import { PaymentTransaction } from './payment-transaction.model';
import { Payment } from './payment.model';
import { QuantityDetails } from './quantity-details.model';
import { ReleaseLines } from './release-lines.model';
import { Release } from './release.model';

export const databaseEntityRegistry = SequelizeModule.forFeature([
  Allocations,
  FulfillmentDetails,
  Order,
  OrderLine,
  Payment,
  PaymentMethod,
  PaymentTransaction,
  QuantityDetails,
  Release,
  ReleaseLines,
]);
