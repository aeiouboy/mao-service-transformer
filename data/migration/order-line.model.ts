import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import { Order } from './order.model';

@Table({
  tableName: 'order_lines',
  schema: process.env.DATABASE_SCHEMA || 'order',
  timestamps: true,
  underscored: true,
})
export class OrderLine extends Model<OrderLine> {
  // Primary Key
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  // Business Identifiers
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: 'Order identifier',
  })
  orderId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: 'Order line identifier',
  })
  orderLineId: string;

  // Shipping and Fulfillment
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Release group identifier',
  })
  releaseGroupId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Shipping method identifier',
  })
  shippingMethodId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Fulfillment group identifier',
  })
  fulfillmentGroupId: string;

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

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Ship to location identifier',
  })
  shipToLocationId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Ship from address identifier',
  })
  shipFromAddressId: string;

  // Item Information
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Item identifier',
  })
  itemId: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: 'Item description',
  })
  itemDescription: string;

  // Boolean Flags
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: 'Is gift flag',
  })
  isGift: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: 'Is tax included flag',
  })
  isTaxIncluded: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: 'Is pre-order flag',
  })
  isPreOrder: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: 'Is cancelled flag',
  })
  isCancelled: boolean;

  // Delivery Information
  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: 'Promised delivery date',
  })
  promisedDeliveryDate: Date;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Small image URI',
  })
  smallImageUri: string;

  // Quantity and Pricing
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Unit of measure',
  })
  uom: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Quantity',
  })
  quantity: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Unit price',
  })
  unitPrice: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Original unit price',
  })
  originalUnitPrice: number;

  // Financial Totals
  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Order line subtotal',
  })
  orderLineSubTotal: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Order line total',
  })
  orderLineTotal: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Order line tax total',
  })
  orderLineTaxTotal: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Total charges',
  })
  totalCharges: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Total discounts',
  })
  totalDiscounts: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Total discount on item',
  })
  totalDiscountOnItem: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Cancelled order line subtotal',
  })
  cancelledOrderLineSubTotal: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Cancelled total discounts',
  })
  cancelledTotalDiscounts: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Max appeasement amount',
  })
  maxAppeasementAmount: number;

  // Status and Configuration
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Order line status',
  })
  orderLineStatus: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Fulfillment status',
  })
  fulfillmentStatus: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Delivery method in JSON format',
  })
  deliveryMethod: object;

  // JSONB Fields
  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Ship to address in JSON format',
  })
  shipToAddress: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Order line charge detail in JSON format',
  })
  orderLineChargeDetail: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Order line tax detail in JSON format',
  })
  orderLineTaxDetail: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Order line extension 1 in JSON format',
  })
  orderLineExtension1: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Order line note in JSON format',
  })
  orderLineNote: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Order line promising info in JSON format',
  })
  orderLinePromisingInfo: object;

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
    comment: 'Parent order line ID',
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
  @BelongsTo(() => Order, {
    foreignKey: 'orderId',
    targetKey: 'orderId',
  })
  order: Order;
}
