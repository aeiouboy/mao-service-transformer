import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { OrderLine } from './order-line.entity';

@Table({
  tableName: 'allocations',
  timestamps: true,
  underscored: true,
  schema: 'order',
})
export class Allocation extends Model<Allocation> {
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
    field: 'allocation_id',
    allowNull: false,
  })
  @IsNotEmpty()
  @IsString()
  allocationId: string;

  @ForeignKey(() => OrderLine)
  @Column({
    type: DataType.INTEGER,
    field: 'order_line_id',
    allowNull: false,
  })
  @IsNotEmpty()
  @IsNumber()
  orderLineId: number;

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
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Quantity cannot be negative' })
  quantity: number;

  @Column({
    type: DataType.STRING(255),
    field: 'allocation_type',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  allocationType?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'status_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  statusId?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  process?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  uom?: string;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_virtual',
    allowNull: false,
    defaultValue: false,
  })
  @IsBoolean()
  isVirtual: boolean;

  @Column({
    type: DataType.STRING(255),
    field: 'ship_from_location_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  shipFromLocationId?: string;

  @Column({
    type: DataType.DATE,
    field: 'allocated_on',
    allowNull: true,
  })
  @IsOptional()
  @IsDate()
  allocatedOn?: Date;

  @Column({
    type: DataType.DATE,
    field: 'earliest_delivery_date',
    allowNull: true,
  })
  @IsOptional()
  @IsDate()
  earliestDeliveryDate?: Date;

  @Column({
    type: DataType.DATE,
    field: 'committed_delivery_date',
    allowNull: true,
  })
  @IsOptional()
  @IsDate()
  committedDeliveryDate?: Date;

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
  @BelongsTo(() => OrderLine, {
    foreignKey: 'orderLineId',
    targetKey: 'id',
  })
  orderLine?: OrderLine;
}
