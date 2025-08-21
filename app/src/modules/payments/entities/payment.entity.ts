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
  Model,
  Table,
} from 'sequelize-typescript';

import { Order } from '../../orders/entities/order.entity';

@Table({
  tableName: 'payment_transactions',
  timestamps: true,
  underscored: true,
  schema: 'order',
})
export class Payment extends Model<Payment> {
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
    field: 'payment_transaction_id',
    allowNull: false,
  })
  @IsNotEmpty()
  @IsString()
  paymentTransactionId: string;

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
    type: DataType.INTEGER,
    field: 'payment_method_id',
    allowNull: false,
  })
  @IsNotEmpty()
  @IsNumber()
  paymentMethodId: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    field: 'processed_amount',
    allowNull: false,
    defaultValue: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Payment amount cannot be negative' })
  processedAmount: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    field: 'requested_amount',
    allowNull: false,
    defaultValue: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Requested amount cannot be negative' })
  requestedAmount: number;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_activation',
    allowNull: false,
    defaultValue: false,
  })
  @IsBoolean()
  isActivation: boolean;

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
    field: 'transaction_date',
    allowNull: true,
  })
  @IsOptional()
  @IsDate()
  transactionDate?: Date;

  @Column({
    type: DataType.JSONB,
    field: 'status',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  status?: any;

  @Column({
    type: DataType.JSONB,
    field: 'transaction_type',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  transactionType?: any;

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
}
