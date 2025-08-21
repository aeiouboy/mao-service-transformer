import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'payment_transactions',
  timestamps: true,
  underscored: true,
  schema: 'order',
})
export class PaymentTransaction extends Model<PaymentTransaction> {
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
    field: 'payment_method_id',
    allowNull: false,
  })
  @IsNotEmpty()
  @IsString()
  paymentMethodId: string;

  @Column({
    type: DataType.STRING(255),
    field: 'payment_transaction_id',
    allowNull: false,
    unique: true,
  })
  @IsNotEmpty()
  @IsString()
  paymentTransactionId: string;

  // Boolean Flags
  @Column({
    type: DataType.BOOLEAN,
    field: 'is_activation',
    allowNull: true,
  })
  @IsOptional()
  @IsBoolean()
  isActivation?: boolean;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_active',
    allowNull: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_copied',
    allowNull: true,
  })
  @IsOptional()
  @IsBoolean()
  isCopied?: boolean;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_valid_for_refund',
    allowNull: true,
  })
  @IsOptional()
  @IsBoolean()
  isValidForRefund?: boolean;

  // Request Information
  @Column({
    type: DataType.STRING(255),
    field: 'reconciliation_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  reconciliationId?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'request_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  requestId?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'request_token',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  requestToken?: string;

  // Financial Fields (DECIMAL 18,4)
  @Column({
    type: DataType.DECIMAL(18, 4),
    field: 'processed_amount',
    allowNull: true,
  })
  @IsOptional()
  @IsNumber()
  processedAmount?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    field: 'requested_amount',
    allowNull: true,
  })
  @IsOptional()
  @IsNumber()
  requestedAmount?: number;

  // Transaction Date
  @Column({
    type: DataType.DATE,
    field: 'transaction_date',
    allowNull: true,
  })
  @IsOptional()
  @IsDate()
  transactionDate?: Date;

  // JSONB Fields
  @Column({
    type: DataType.JSONB,
    field: 'payment_response_status',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  paymentResponseStatus?: any;

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
    field: 'transmission_status',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  transmissionStatus?: any;

  @Column({
    type: DataType.JSONB,
    field: 'transaction_type',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  transactionType?: any;

  // Standard Audit Fields
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

  @Column({
    type: DataType.STRING(255),
    field: 'created_by',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  createdBy?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'updated_by',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;
}
