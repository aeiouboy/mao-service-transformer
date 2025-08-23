import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import { Allocations } from './allocations.model';
import { OrderLine } from './order-line.model';
import { PaymentMethod } from './payment-method.model';
import { Payment } from './payment.model';
import { Release } from './release.model';

import {
  FulfillmentStatusText,
  OrderStatusText,
  PaymentStatusText,
} from '@/common/enums';

@Table({
  tableName: 'orders',
  schema: process.env.DATABASE_SCHEMA || 'order',
  timestamps: true,
  underscored: true,
})
export class Order extends Model<Order> {
  // Primary Key
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  // Business Identifiers
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
    comment: 'Business order identifier',
  })
  orderId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Short order number',
  })
  shortOrderNumber: string;

  // Customer Information
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Customer type identifier',
  })
  customerTypeId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Customer identifier',
  })
  customerId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Customer email address',
  })
  customerEmail: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Customer first name',
  })
  customerFirstName: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Customer last name',
  })
  customerLastName: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Customer phone number',
  })
  customerPhone: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Currency code',
  })
  currencyCode: string;

  // Channel and Organization
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Selling channel',
  })
  sellingChannel: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Organization identifier',
  })
  orgId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Alternate order identifier',
  })
  alternateOrderId: string;

  // Fulfillment Status
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Maximum fulfillment status identifier',
  })
  maxFulfillmentStatusId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Minimum fulfillment status identifier',
  })
  minFulfillmentStatusId: string;

  // Financial Fields
  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Order subtotal amount',
  })
  orderSubTotal: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Order total amount',
  })
  orderTotal: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Total charges amount',
  })
  totalCharges: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Total discounts amount',
  })
  totalDiscounts: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Total taxes amount',
  })
  totalTaxes: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Cancelled order subtotal amount',
  })
  cancelledOrderSubTotal: number;

  // Boolean Flags
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: 'Order is on hold flag',
  })
  isOnHold: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: 'Cancel allowed flag',
  })
  cancelAllowed: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: 'Order is cancelled flag',
  })
  isCancelled: boolean;

  // Locale and Status
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Order locale',
  })
  orderLocale: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Order status',
  })
  orderStatus: OrderStatusText;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Fulfillment status',
  })
  fulfillmentStatus: FulfillmentStatusText;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Payment status',
  })
  paymentStatus: PaymentStatusText;

  // Timestamp Fields
  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: 'Do not release before timestamp',
  })
  doNotReleaseBefore: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: 'Captured date timestamp',
  })
  capturedDate: Date;

  // JSONB Fields
  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Document type in JSON format',
  })
  docType: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Order hold information in JSON format',
  })
  orderHold: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Order actions in JSON format',
  })
  orderActions: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Order extension 1 in JSON format',
  })
  orderExtension1: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Order charge detail in JSON format',
  })
  orderChargeDetail: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Order tax detail in JSON format',
  })
  orderTaxDetail: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Order type in JSON format',
  })
  orderType: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Order note in JSON format',
  })
  orderNote: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Cancel reason in JSON format',
  })
  cancelReason: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Change log history in JSON format',
  })
  changeLog: object;

  // Parent and Version Control
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    comment: 'Parent order ID',
  })
  parentId: number;

  @Default(1)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: 'Version number',
  })
  version: number;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    comment: 'Is active flag',
  })
  isActive: boolean;

  // Standard Audit Fields
  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: 'Record creation timestamp',
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: 'Record last update timestamp',
  })
  updatedAt: Date;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'User who created the record',
  })
  createdBy: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'User who last updated the record',
  })
  updatedBy: string;

  // Associations
  @HasMany(() => OrderLine, {
    foreignKey: 'orderId',
    sourceKey: 'orderId',
  })
  orderLines: OrderLine[];

  @HasMany(() => Payment, {
    foreignKey: 'orderId',
    sourceKey: 'orderId',
  })
  payments: Payment[];

  @HasMany(() => PaymentMethod, {
    foreignKey: 'orderId',
    sourceKey: 'orderId',
  })
  paymentMethods: PaymentMethod[];

  @HasMany(() => Allocations, {
    foreignKey: 'orderId',
    sourceKey: 'orderId',
  })
  allocations: Allocations[];

  @HasMany(() => Release, {
    foreignKey: 'orderId',
    sourceKey: 'orderId',
  })
  releases: Release[];
}
