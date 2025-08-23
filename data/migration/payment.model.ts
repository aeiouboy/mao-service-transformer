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
  tableName: 'payments',
  schema: process.env.DATABASE_SCHEMA || 'order',
  timestamps: true,
  underscored: true,
})
export class Payment extends Model<Payment> {
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
    comment: 'Payment identifier (unique)',
    unique: true,
  })
  paymentId: string;

  // Organization and Customer
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Organization identifier',
  })
  orgId?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Customer identifier',
  })
  customerId?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Payment group identifier',
  })
  paymentGroupId?: string;

  // Status and Information
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Status identifier',
  })
  statusId?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: 'Payment message',
  })
  message?: string;

  // Boolean Flags
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: 'Is anonymized flag',
  })
  isAnonymized?: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: 'Is cancelled flag',
  })
  isCancelled?: boolean;

  // Date Information
  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: 'Purge date timestamp',
  })
  purgeDate?: Date;

  // JSONB Fields
  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Payment actions in JSON format',
  })
  actions?: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Processing mode in JSON format',
  })
  processingMode?: object;

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
  createdBy?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'User who last updated the record',
  })
  updatedBy?: string;
}
