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
  tableName: 'payment_methods',
  timestamps: true,
  underscored: true,
  schema: 'order',
})
export class PaymentMethod extends Model<PaymentMethod> {
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
    field: 'payment_id',
    allowNull: false,
  })
  @IsNotEmpty()
  @IsString()
  paymentId: string;

  @Column({
    type: DataType.STRING(255),
    field: 'payment_method_id',
    allowNull: false,
    unique: true,
  })
  @IsNotEmpty()
  @IsString()
  paymentMethodId: string;

  // Message and Currency
  @Column({
    type: DataType.TEXT,
    field: 'messages',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  messages?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'currency_code',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  currencyCode?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'alternate_currency_amount',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  alternateCurrencyAmount?: string;

  // Account Information
  @Column({
    type: DataType.STRING(255),
    field: 'account_number',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  accountNumber?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'account_display_number',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  accountDisplayNumber?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'name_on_card',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  nameOnCard?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'swipe_data',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  swipeData?: string;

  // Card Information
  @Column({
    type: DataType.STRING(255),
    field: 'card_expiry_month',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  cardExpiryMonth?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'card_expiry_year',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  cardExpiryYear?: string;

  @Column({
    type: DataType.STRING(25),
    field: 'gift_card_pin',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  giftCardPin?: string;

  // Signature Information
  @Column({
    type: DataType.STRING(255),
    field: 'customer_signature',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  customerSignature?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'customer_pay_signature',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  customerPaySignature?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'charge_sequence',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  chargeSequence?: string;

  // Bank Information
  @Column({
    type: DataType.STRING(255),
    field: 'routing_number',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  routingNumber?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'routing_display_number',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  routingDisplayNumber?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'check_number',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  checkNumber?: string;

  // License Information
  @Column({
    type: DataType.STRING(255),
    field: 'drivers_license_number',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  driversLicenseNumber?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'drivers_license_state',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  driversLicenseState?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'drivers_license_country',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  driversLicenseCountry?: string;

  // Business Information
  @Column({
    type: DataType.STRING(255),
    field: 'business_name',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  businessName?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'business_tax_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  businessTaxId?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'check_quantity',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  checkQuantity?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'original_amount',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  originalAmount?: string;

  // Parent References
  @Column({
    type: DataType.STRING(255),
    field: 'parent_order_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  parentOrderId?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'parent_payment_group_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  parentPaymentGroupId?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'parent_payment_method_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  parentPaymentMethodId?: string;

  // Gateway and Location Information
  @Column({
    type: DataType.STRING(255),
    field: 'gateway_account_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  gatewayAccountId?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'location_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  locationId?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'transaction_reference_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  transactionReferenceId?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'org_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  orgId?: string;

  // Additional Information
  @Column({
    type: DataType.STRING(255),
    field: 'entry_type_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  entryTypeId?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'gateway_id',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  gatewayId?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'captured_source',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  capturedSource?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'shopper_reference',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  shopperReference?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'suggested_amount',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  suggestedAmount?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'purge_date',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  purgeDate?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'account_type',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  accountType?: string;

  @Column({
    type: DataType.STRING(255),
    field: 'payment_category',
    allowNull: true,
  })
  @IsOptional()
  @IsString()
  paymentCategory?: string;

  // Financial Fields (DECIMAL 18,4)
  @Column({
    type: DataType.DECIMAL(18, 4),
    field: 'amount',
    allowNull: true,
  })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    field: 'current_auth_amount',
    allowNull: true,
  })
  @IsOptional()
  @IsNumber()
  currentAuthAmount?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    field: 'current_settled_amount',
    allowNull: true,
  })
  @IsOptional()
  @IsNumber()
  currentSettledAmount?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    field: 'current_refund_amount',
    allowNull: true,
  })
  @IsOptional()
  @IsNumber()
  currentRefundAmount?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    field: 'current_failed_amount',
    allowNull: true,
  })
  @IsOptional()
  @IsNumber()
  currentFailedAmount?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    field: 'merchandise_amount',
    allowNull: true,
  })
  @IsOptional()
  @IsNumber()
  merchandiseAmount?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    field: 'change_amount',
    allowNull: true,
  })
  @IsOptional()
  @IsNumber()
  changeAmount?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    field: 'conversion_rate',
    allowNull: true,
  })
  @IsOptional()
  @IsNumber()
  conversionRate?: number;

  // Boolean Flags
  @Column({
    type: DataType.BOOLEAN,
    field: 'captured_in_edge_mode',
    allowNull: true,
  })
  @IsOptional()
  @IsBoolean()
  capturedInEdgeMode?: boolean;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_suspended',
    allowNull: true,
  })
  @IsOptional()
  @IsBoolean()
  isSuspended?: boolean;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_voided',
    allowNull: true,
  })
  @IsOptional()
  @IsBoolean()
  isVoided?: boolean;

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
    field: 'is_modifiable',
    allowNull: true,
  })
  @IsOptional()
  @IsBoolean()
  isModifiable?: boolean;

  // JSONB Fields
  @Column({
    type: DataType.JSONB,
    field: 'actions',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  actions?: any;

  @Column({
    type: DataType.JSONB,
    field: 'billing_address',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  billingAddress?: any;

  @Column({
    type: DataType.JSONB,
    field: 'payment_method_attribute',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  paymentMethodAttribute?: any;

  @Column({
    type: DataType.JSONB,
    field: 'payment_method_encr_attribute',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  paymentMethodEncrAttribute?: any;

  @Column({
    type: DataType.JSONB,
    field: 'payment_type',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  paymentType?: any;

  @Column({
    type: DataType.JSONB,
    field: 'card_type',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  cardType?: any;

  @Column({
    type: DataType.JSONB,
    field: 'extended',
    allowNull: true,
  })
  @IsOptional()
  @IsObject()
  extended?: any;

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
