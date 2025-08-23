import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'payment_transactions',
  schema: process.env.DATABASE_SCHEMA || 'order',
  timestamps: true,
  underscored: true,
})
export class PaymentTransaction extends Model<PaymentTransaction> {
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
    comment: 'Payment method identifier',
  })
  paymentMethodId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: 'Payment transaction identifier (unique)',
    unique: true,
  })
  paymentTransactionId: string;

  // Boolean Flags
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: 'Is activation flag',
  })
  isActivation: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: 'Is active flag',
  })
  isActive: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: 'Is copied flag',
  })
  isCopied: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: 'Is valid for refund flag',
  })
  isValidForRefund: boolean;

  // Request Information
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Reconciliation ID',
  })
  reconciliationId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Request ID',
  })
  requestId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Request token',
  })
  requestToken: string;

  // Financial Fields (DECIMAL 18,4)
  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Processed amount',
  })
  processedAmount: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Requested amount',
  })
  requestedAmount: number;

  // Transaction Date
  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: 'Transaction date',
  })
  transactionDate: Date;

  // JSONB Fields
  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Payment response status in JSON format',
  })
  paymentResponseStatus: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Status in JSON format',
  })
  status: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Transmission status in JSON format',
  })
  transmissionStatus: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Transaction type in JSON format',
  })
  transactionType: object;

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
}
