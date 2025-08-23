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
  tableName: 'quantity_details',
  schema: process.env.DATABASE_SCHEMA || 'order',
  timestamps: true,
  underscored: true,
})
export class QuantityDetails extends Model<QuantityDetails> {
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

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: 'Quantity detail identifier (unique)',
    unique: true,
  })
  quantityDetailId: string;

  // Core Business Fields
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: 'Status identifier',
  })
  statusId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: 'Organization identifier',
  })
  orgId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: 'Item identifier',
  })
  itemId: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: false,
    comment: 'Quantity',
  })
  quantity: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: 'Unit of measure',
  })
  uom: string;

  // Process and Reason Information
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Process',
  })
  process: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Reason',
  })
  reason: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Reason type',
  })
  reasonType: string;

  // Substitution Information
  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Substitution ratio',
  })
  substitutionRatio: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Substitution type',
  })
  substitutionType: string;

  // Web URL Information
  @Column({
    type: DataType.STRING(500),
    allowNull: true,
    comment: 'Web URL',
  })
  webUrl: string;

  // JSONB Fields
  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Change log in JSON format',
  })
  changeLog: object;

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
