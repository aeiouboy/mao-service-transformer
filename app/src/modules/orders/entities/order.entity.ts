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
  declare orderId: string;

  @Column({
    type: DataType.STRING(255),
    field: 'short_order_number',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  declare orderNumber: string;

  @Column({
    type: DataType.STRING(255),
    field: 'bu',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  declare bu: string;

  @Column({
    type: DataType.STRING(255),
    field: 'org_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  declare orgId: string;

  @Column({
    type: DataType.STRING(255),
    field: 'customer_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  declare customerId: string;

  @Column({
    type: DataType.STRING(255),
    field: 'customer_email',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  declare customerEmail: string;

  @Column({
    type: DataType.STRING(255),
    field: 'customer_first_name',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  declare customerFirstName: string;

  @Column({
    type: DataType.STRING(255),
    field: 'customer_last_name',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  declare customerLastName: string;

  @Column({
    type: DataType.STRING(255),
    field: 'customer_phone',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  declare customerPhone: string;

  @Column({
    type: DataType.DATE,
    field: 'captured_date',
    allowNull: true,
  })
  @IsOptional()
  @IsDate()
  declare capturedDate: Date;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_on_hold',
    allowNull: false,
    defaultValue: false,
  })
  @IsBoolean()
  declare isOnHold: boolean;

  @Column({
    type: DataType.BOOLEAN,
    field: 'cancel_allowed',
    allowNull: false,
    defaultValue: true,
  })
  @IsBoolean()
  declare cancelAllowed: boolean;

  @Column({
    type: DataType.STRING(10),
    field: 'currency_code',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  declare currencyCode: string;

  @Column({
    type: DataType.STRING(255),
    field: 'order_status',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  declare orderStatus: string;

  @Column({
    type: DataType.STRING(10),
    field: 'fulfillment_status',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  declare fulfillmentStatus: string;

  @Column({
    type: DataType.STRING(10),
    field: 'payment_status',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  declare paymentStatus: string;

  @Column({
    type: DataType.JSONB,
    field: 'order_charge_detail',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  declare orderChargeDetail: any;

  @Column({
    type: DataType.JSONB,
    field: 'order_tax_detail',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  declare orderTaxDetail: any;

  @Column({
    type: DataType.JSONB,
    field: 'order_type',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  declare orderType: any;

  @Column({
    type: DataType.JSONB,
    field: 'order_extension1',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  declare orderExtension1: any;

  // Financial fields from migration files
  @Column({
    type: DataType.DECIMAL(18, 4),
    field: 'order_sub_total',
    allowNull: true,
  })
  @IsOptional()
  @IsNumber()
  declare orderSubTotal?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    field: 'order_total',
    allowNull: true,
  })
  @IsOptional()
  @IsNumber()
  declare orderTotal?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    field: 'total_charges',
    allowNull: true,
  })
  @IsOptional()
  @IsNumber()
  declare totalCharges?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    field: 'total_discounts',
    allowNull: true,
  })
  @IsOptional()
  @IsNumber()
  declare totalDiscounts?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    field: 'total_taxes',
    allowNull: true,
  })
  @IsOptional()
  @IsNumber()
  declare totalTaxes?: number;

  @Column({
    type: DataType.STRING(255),
    field: 'max_fulfillment_status_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  declare maxFulfillmentStatusId?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'selling_channel',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  declare sellingChannel?: string;

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
  declare orderLines: OrderLine[];

  @HasMany(() => Payment, {
    foreignKey: 'orderId',
    sourceKey: 'orderId',
    as: 'payments',
  })
  declare payments: Payment[];
}
