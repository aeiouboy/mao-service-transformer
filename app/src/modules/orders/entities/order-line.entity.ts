import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

import { Allocation } from './allocation.entity';
import { Order } from './order.entity';

@Table({
  tableName: 'order_lines',
  timestamps: true,
  underscored: true,
  schema: 'order',
})
export class OrderLine extends Model<OrderLine> {
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
    field: 'order_line_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  declare orderLineId: string;

  @ForeignKey(() => Order)
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
    field: 'item_id',
    allowNull: false,
  })
  @IsNotEmpty()
  @IsString()
  declare itemId: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Quantity cannot be negative' })
  declare quantity: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    field: 'unit_price',
    allowNull: false,
    defaultValue: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Unit price cannot be negative' })
  declare unitPrice: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    field: 'original_unit_price',
    allowNull: true,
  })
  @IsOptional()
  @IsNumber()
  declare originalUnitPrice?: number;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_gift',
    allowNull: false,
    defaultValue: false,
  })
  @IsBoolean()
  declare isGift: boolean;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_tax_included',
    allowNull: false,
    defaultValue: false,
  })
  @IsBoolean()
  declare isTaxIncluded: boolean;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  declare uom?: string;

  @Column({
    type: DataType.DATE,
    field: 'promised_delivery_date',
    allowNull: true,
  })
  @IsOptional()
  @IsDate()
  declare promisedDeliveryDate?: Date;

  @Column({
    type: DataType.STRING(255),
    field: 'shipping_method_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  declare shippingMethodId?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'fulfillment_status',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  declare fulfillmentStatus?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'order_line_status',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  declare orderLineStatus?: string;

  @Column({
    type: DataType.JSONB,
    field: 'delivery_method',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  declare deliveryMethod?: any;

  @Column({
    type: DataType.JSONB,
    field: 'order_line_charge_detail',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  declare orderLineChargeDetail?: any;

  @Column({
    type: DataType.JSONB,
    field: 'order_line_tax_detail',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  declare orderLineTaxDetail?: any;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_active',
    allowNull: false,
    defaultValue: true,
  })
  @IsBoolean()
  declare isActive: boolean;

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

  // Relationships
  @BelongsTo(() => Order, {
    foreignKey: 'orderId',
    targetKey: 'orderId',
  })
  declare order?: Order;

  @HasMany(() => Allocation, {
    foreignKey: 'orderLineId',
    sourceKey: 'id',
    as: 'allocations',
  })
  declare allocations?: Allocation[];
}
