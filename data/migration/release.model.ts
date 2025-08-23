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
  tableName: 'releases',
  schema: process.env.DATABASE_SCHEMA || 'order',
  timestamps: true,
  underscored: true,
})
export class Release extends Model<Release> {
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
    comment: 'Release identifier (unique)',
    unique: true,
  })
  releaseId: string;

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
    comment: 'Ship from location identifier',
  })
  shipFromLocationId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: 'Carrier code',
  })
  carrierCode: string;

  // Optional Business Fields
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Delivery method ID',
  })
  deliveryMethodId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Ship to location identifier',
  })
  shipToLocationId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Ship via ID',
  })
  shipViaId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Release type',
  })
  releaseType: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Process',
  })
  process: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Service level code',
  })
  serviceLevelCode: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Destination action',
  })
  destinationAction: string;

  // Integer Field
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    comment: 'Effective rank',
  })
  effectiveRank: number;

  // JSONB Fields
  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Release extension 1 in JSON format',
  })
  releaseExtension_1: object;

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
