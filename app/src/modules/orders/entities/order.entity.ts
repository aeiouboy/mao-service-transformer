import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

import { OrderLine } from './order-line.entity';
import { Payment } from '../../payments/entities/payment.entity';

@Table({
  tableName: 'orders',
  timestamps: true,
  underscored: true,
  schema: 'order',
})
export class Order extends Model<Order> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  @IsNumber()
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    field: 'order_id',
    allowNull: false,
  })
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @Column({
    type: DataType.STRING(255),
    field: 'short_order_number',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  orderNumber: string;

  @Column({
    type: DataType.STRING(255),
    field: 'bu',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  bu: string;

  @Column({
    type: DataType.STRING(255),
    field: 'org_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  orgId: string;

  @Column({
    type: DataType.STRING(255),
    field: 'customer_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  customerId: string;

  @Column({
    type: DataType.STRING(255),
    field: 'customer_email',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  customerEmail: string;

  @Column({
    type: DataType.STRING(255),
    field: 'customer_first_name',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  customerFirstName: string;

  @Column({
    type: DataType.STRING(255),
    field: 'customer_last_name',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  customerLastName: string;

  @Column({
    type: DataType.STRING(255),
    field: 'customer_phone',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  customerPhone: string;

  @Column({
    type: DataType.DATE,
    field: 'captured_date',
    allowNull: true,
  })
  @IsOptional()
  @IsDate()
  capturedDate: Date;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_on_hold',
    allowNull: false,
    defaultValue: false,
  })
  @IsBoolean()
  isOnHold: boolean;

  @Column({
    type: DataType.BOOLEAN,
    field: 'cancel_allowed',
    allowNull: false,
    defaultValue: true,
  })
  @IsBoolean()
  cancelAllowed: boolean;

  @Column({
    type: DataType.STRING(10),
    field: 'currency_code',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  currencyCode: string;

  @Column({
    type: DataType.STRING(255),
    field: 'order_status',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  orderStatus: string;

  @Column({
    type: DataType.STRING(10),
    field: 'fulfillment_status',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  fulfillmentStatus: string;

  @Column({
    type: DataType.STRING(10),
    field: 'payment_status',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  paymentStatus: string;

  @Column({
    type: DataType.JSONB,
    field: 'order_charge_detail',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  orderChargeDetail: any;

  @Column({
    type: DataType.JSONB,
    field: 'order_tax_detail',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  orderTaxDetail: any;

  @Column({
    type: DataType.JSONB,
    field: 'order_type',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  orderType: any;

  @Column({
    type: DataType.JSONB,
    field: 'order_extension1',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  orderExtension1: any;

  // Financial fields from migration files
  @Column({
    type: DataType.DECIMAL(18, 4),
    field: 'order_sub_total',
    allowNull: true,
  })
  @IsOptional()
  @IsNumber()
  orderSubTotal?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    field: 'order_total',
    allowNull: true,
  })
  @IsOptional()
  @IsNumber()
  orderTotal?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    field: 'total_charges',
    allowNull: true,
  })
  @IsOptional()
  @IsNumber()
  totalCharges?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    field: 'total_discounts',
    allowNull: true,
  })
  @IsOptional()
  @IsNumber()
  totalDiscounts?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    field: 'total_taxes',
    allowNull: true,
  })
  @IsOptional()
  @IsNumber()
  totalTaxes?: number;

  @Column({
    type: DataType.STRING(255),
    field: 'max_fulfillment_status_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  maxFulfillmentStatusId?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'selling_channel',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  sellingChannel?: string;

  @Column({
    type: DataType.DATE,
    field: 'created_at',
    allowNull: false,
  })
  @IsDate()
  declare createdAt: Date;

  @Column({
    type: DataType.DATE,
    field: 'updated_at',
    allowNull: false,
  })
  @IsDate()
  declare updatedAt: Date;

  // Relations
  @HasMany(() => OrderLine, {
    foreignKey: 'orderId',
    sourceKey: 'orderId',
    as: 'orderLines',
  })
  orderLines: OrderLine[];

  @HasMany(() => Payment, {
    foreignKey: 'orderId',
    sourceKey: 'orderId',
    as: 'payments',
  })
  payments: Payment[];
}
