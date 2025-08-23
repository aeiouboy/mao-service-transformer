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
  tableName: 'payment_methods',
  schema: process.env.DATABASE_SCHEMA || 'order',
  timestamps: true,
  underscored: true,
})
export class PaymentMethod extends Model<PaymentMethod> {
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
    comment: 'Payment identifier',
  })
  paymentId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: 'Payment method identifier (unique)',
    unique: true,
  })
  paymentMethodId: string;

  // Message and Currency
  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: 'Payment method messages',
  })
  messages: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Currency code',
  })
  currencyCode: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Alternate currency amount',
  })
  alternateCurrencyAmount: string;

  // Account Information
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Account number',
  })
  accountNumber: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Account display number',
  })
  accountDisplayNumber: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Name on card',
  })
  nameOnCard: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Swipe data',
  })
  swipeData: string;

  // Card Information
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Card expiry month',
  })
  cardExpiryMonth: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Card expiry year',
  })
  cardExpiryYear: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: 'Gift card PIN',
  })
  giftCardPin: string;

  // Signature Information
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Customer signature',
  })
  customerSignature: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Customer pay signature',
  })
  customerPaySignature: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Charge sequence',
  })
  chargeSequence: string;

  // Bank Information
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Routing number',
  })
  routingNumber: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Routing display number',
  })
  routingDisplayNumber: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Check number',
  })
  checkNumber: string;

  // License Information
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Drivers license number',
  })
  driversLicenseNumber: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Drivers license state',
  })
  driversLicenseState: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Drivers license country',
  })
  driversLicenseCountry: string;

  // Business Information
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Business name',
  })
  businessName: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Business tax ID',
  })
  businessTaxId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Check quantity',
  })
  checkQuantity: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Original amount',
  })
  originalAmount: string;

  // Parent References
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Parent order ID',
  })
  parentOrderId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Parent payment group ID',
  })
  parentPaymentGroupId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Parent payment method ID',
  })
  parentPaymentMethodId: string;

  // Gateway and Location Information
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Gateway account ID',
  })
  gatewayAccountId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Location ID',
  })
  locationId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Transaction reference ID',
  })
  transactionReferenceId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Organization ID',
  })
  orgId: string;

  // Additional Information
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Entry type ID',
  })
  entryTypeId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Gateway ID',
  })
  gatewayId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Captured source',
  })
  capturedSource: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Shopper reference',
  })
  shopperReference: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Suggested amount',
  })
  suggestedAmount: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Purge date',
  })
  purgeDate: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Account type',
  })
  accountType: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: 'Payment category',
  })
  paymentCategory: string;

  // Financial Fields (DECIMAL 18,4)
  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Amount',
  })
  amount: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Current authorization amount',
  })
  currentAuthAmount: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Current settled amount',
  })
  currentSettledAmount: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Current refund amount',
  })
  currentRefundAmount: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Current failed amount',
  })
  currentFailedAmount: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Merchandise amount',
  })
  merchandiseAmount: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Change amount',
  })
  changeAmount: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    allowNull: true,
    comment: 'Conversion rate',
  })
  conversionRate: number;

  // Boolean Flags
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: 'Captured in edge mode flag',
  })
  capturedInEdgeMode: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: 'Is suspended flag',
  })
  isSuspended: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: 'Is voided flag',
  })
  isVoided: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: 'Is copied flag',
  })
  isCopied: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: 'Is modifiable flag',
  })
  isModifiable: boolean;

  // JSONB Fields
  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Payment method actions in JSON format',
  })
  actions: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Billing address in JSON format',
  })
  billingAddress: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Payment method attributes in JSON format',
  })
  paymentMethodAttribute: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Payment method encrypted attributes in JSON format',
  })
  paymentMethodEncrAttribute: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Payment type in JSON format',
  })
  paymentType: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: 'Card type in JSON format',
  })
  cardType: object;

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
