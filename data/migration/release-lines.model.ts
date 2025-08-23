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
  tableName: 'release_lines',
  schema: process.env.DATABASE_SCHEMA || 'order',
  timestamps: true,
  underscored: true,
})
export class ReleaseLines extends Model<ReleaseLines> {
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
    comment: 'Release identifier',
  })
  releaseId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: 'Release line identifier',
  })
  releaseLineId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: 'Allocation identifier',
  })
  allocationId: string;

  // Core Business Fields (Required)
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
    type: DataType.STRING,
    allowNull: false,
    comment: 'Quantity',
  })
  quantity: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: 'Unit of measure',
  })
  uom: string;

  // Optional Business Fields
  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Fulfilled quantity',
  })
  fulfilledQuantity: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: 'Cancelled quantity',
  })
  cancelledQuantity: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    comment: 'Effective rank',
  })
  effectiveRank: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Process',
  })
  process: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: 'Cancelled date',
  })
  cancelledDate: Date;

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
