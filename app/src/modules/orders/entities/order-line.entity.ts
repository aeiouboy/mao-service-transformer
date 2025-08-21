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
  orderLineId: string;

  @ForeignKey(() => Order)
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
    field: 'item_id',
    allowNull: false,
  })
  @IsNotEmpty()
  @IsString()
  itemId: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Quantity cannot be negative' })
  quantity: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    field: 'unit_price',
    allowNull: false,
    defaultValue: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Unit price cannot be negative' })
  unitPrice: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    field: 'original_unit_price',
    allowNull: true,
  })
  @IsOptional()
  @IsNumber()
  originalUnitPrice?: number;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_gift',
    allowNull: false,
    defaultValue: false,
  })
  @IsBoolean()
  isGift: boolean;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_tax_included',
    allowNull: false,
    defaultValue: false,
  })
  @IsBoolean()
  isTaxIncluded: boolean;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  uom?: string;

  @Column({
    type: DataType.DATE,
    field: 'promised_delivery_date',
    allowNull: true,
  })
  @IsOptional()
  @IsDate()
  promisedDeliveryDate?: Date;

  @Column({
    type: DataType.STRING(255),
    field: 'shipping_method_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  shippingMethodId?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'fulfillment_status',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  fulfillmentStatus?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'order_line_status',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  orderLineStatus?: string;

  @Column({
    type: DataType.JSONB,
    field: 'delivery_method',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  deliveryMethod?: any;

  @Column({
    type: DataType.JSONB,
    field: 'order_line_charge_detail',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  orderLineChargeDetail?: any;

  @Column({
    type: DataType.JSONB,
    field: 'order_line_tax_detail',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  orderLineTaxDetail?: any;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_active',
    allowNull: false,
    defaultValue: true,
  })
  @IsBoolean()
  isActive: boolean;

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
  order?: Order;

  @HasMany(() => Allocation, {
    foreignKey: 'orderLineId',
    sourceKey: 'id',
    as: 'allocations',
  })
  allocations?: Allocation[];
}
