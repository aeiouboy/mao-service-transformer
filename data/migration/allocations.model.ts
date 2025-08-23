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
  tableName: 'allocations',
  schema: process.env.DATABASE_SCHEMA || 'order',
  timestamps: true,
  underscored: true,
})
export class Allocations extends Model<Allocations> {
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
    comment: 'Allocation identifier',
  })
  allocationId: string;

  // Core Business Fields (Required)
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: 'Allocation type',
  })
  allocationType: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: 'Status identifier',
  })
  statusId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: 'Ship from location identifier',
  })
  shipFromLocationId: string;

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

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: 'Carrier code',
  })
  carrierCode: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    comment: 'Allocation timestamp',
  })
  allocatedOn: Date;

  // Optional Business Fields
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Reservation request ID',
  })
  reservationRequestId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Reservation request detail ID',
  })
  reservationRequestDetailId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Ship to location identifier',
  })
  shipToLocationId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Country of origin',
  })
  countryOfOrigin: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Inventory segment ID',
  })
  inventorySegmentId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Inventory type ID',
  })
  inventoryTypeId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Substitution type ID',
  })
  substitutionTypeId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Allocation dependency ID',
  })
  allocationDependencyId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Group ID',
  })
  groupId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Product status ID',
  })
  productStatusId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Ship via ID',
  })
  shipViaId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'ASN ID',
  })
  asnId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'ASN detail ID',
  })
  asnDetailId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Service level code',
  })
  serviceLevelCode: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Process',
  })
  process: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Batch number',
  })
  batchNumber: string;

  // Boolean Field
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: 'Is virtual flag',
  })
  isVirtual: boolean;

  // Date Fields
  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: 'Earliest delivery date',
  })
  earliestDeliveryDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: 'Earliest ship date',
  })
  earliestShipDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: 'Committed delivery date',
  })
  committedDeliveryDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: 'Committed ship date',
  })
  committedShipDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: 'Latest ship date',
  })
  latestShipDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: 'Latest release date',
  })
  latestReleaseDate: Date;

  // JSONB Fields
  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Extended information in JSON format',
  })
  extended: object;

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
