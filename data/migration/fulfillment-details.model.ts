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
  tableName: 'fulfillment_details',
  schema: process.env.DATABASE_SCHEMA || 'order',
  timestamps: true,
  underscored: true,
})
export class FulfillmentDetails extends Model<FulfillmentDetails> {
  // Primary Key
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  // Business Identifiers
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Order identifier',
  })
  orderId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Order line identifier',
  })
  orderLineId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Release identifier',
  })
  releaseId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Release line identifier',
  })
  releaseLineId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Fulfillment identifier',
  })
  fulfillmentId: string;

  // Core Business Fields
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Fulfillment group identifier',
  })
  fulfillmentGroupId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Event type identifier',
  })
  eventTypeId: string;

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

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: 'Status identifier',
  })
  statusId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Short reason identifier',
  })
  shortReasonId: string;

  // JSONB Fields
  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Fulfillment information',
  })
  fulfillmentInfo: object;

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
