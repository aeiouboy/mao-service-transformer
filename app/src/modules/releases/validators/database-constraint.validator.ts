import { Injectable } from '@nestjs/common';

import {
  FieldMappingConfig,
  ORDERS_FIELD_MAPPING,
  ORDER_LINES_FIELD_MAPPING,
  RELEASE_LINES_FIELD_MAPPING,
} from '../../../shared/utils/field-mapping.util';

export interface ValidationResult {
  isValid: boolean;
  tableName: string;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  summary: {
    totalRecords: number;
    validRecords: number;
    errorRecords: number;
    warningRecords: number;
  };
}

export interface ValidationError {
  recordIndex?: number;
  field: string;
  constraint: string;
  message: string;
  severity: 'CRITICAL' | 'ERROR';
  value?: any;
}

export interface ValidationWarning {
  recordIndex?: number;
  field: string;
  message: string;
  recommendation?: string;
  value?: any;
}

/**
 * Comprehensive database constraint validator
 * Validates data against actual database schema constraints
 */
@Injectable()
export class DatabaseConstraintValidator {
  /**
   * Validate orders table data
   */
  public validateOrdersData(data: Record<string, any>): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Required field validation
    this.validateRequiredFields(data, ORDERS_FIELD_MAPPING, errors, 0);

    // Data type validation
    this.validateDataTypes(data, ORDERS_FIELD_MAPPING, errors, warnings, 0);

    // Business rule validation
    this.validateOrdersBusinessRules(data, errors, warnings);

    return this.buildValidationResult('orders', [data], errors, warnings);
  }

  /**
   * Validate order lines table data
   */
  public validateOrderLinesData(
    dataArray: Record<string, any>[],
  ): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    dataArray.forEach((data, index) => {
      // Required field validation
      this.validateRequiredFields(
        data,
        ORDER_LINES_FIELD_MAPPING,
        errors,
        index,
      );

      // Data type validation
      this.validateDataTypes(
        data,
        ORDER_LINES_FIELD_MAPPING,
        errors,
        warnings,
        index,
      );

      // Business rule validation
      this.validateOrderLinesBusinessRules(data, errors, warnings, index);
    });

    return this.buildValidationResult(
      'order_lines',
      dataArray,
      errors,
      warnings,
    );
  }

  /**
   * Validate release lines table data - CRITICAL FOR DATABASE INSERTION
   */
  public validateReleaseLinesData(
    dataArray: Record<string, any>[],
  ): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    dataArray.forEach((data, index) => {
      // Required field validation (critical for NOT NULL constraints)
      this.validateRequiredFields(
        data,
        RELEASE_LINES_FIELD_MAPPING,
        errors,
        index,
      );

      // Data type validation
      this.validateDataTypes(
        data,
        RELEASE_LINES_FIELD_MAPPING,
        errors,
        warnings,
        index,
      );

      // Business rule validation
      this.validateReleaseLinesBusinessRules(data, errors, warnings, index);

      // Critical constraint validation
      this.validateCriticalConstraints(data, errors, index);
    });

    return this.buildValidationResult(
      'release_lines',
      dataArray,
      errors,
      warnings,
    );
  }

  /**
   * Validate required fields against NOT NULL constraints
   */
  private validateRequiredFields(
    data: Record<string, any>,
    mapping: Record<string, FieldMappingConfig>,
    errors: ValidationError[],
    recordIndex: number,
  ): void {
    for (const [key, config] of Object.entries(mapping)) {
      if (config.required) {
        const value = data[config.databaseField];

        if (value === null || value === undefined || value === '') {
          errors.push({
            recordIndex,
            field: config.databaseField,
            constraint: 'NOT NULL',
            message: `Required field '${config.databaseField}' is missing or null`,
            severity: 'CRITICAL',
            value,
          });
        }
      }
    }
  }

  /**
   * Validate data types and constraints
   */
  private validateDataTypes(
    data: Record<string, any>,
    mapping: Record<string, FieldMappingConfig>,
    errors: ValidationError[],
    warnings: ValidationWarning[],
    recordIndex: number,
  ): void {
    for (const [key, config] of Object.entries(mapping)) {
      const value = data[config.databaseField];

      if (value !== null && value !== undefined) {
        // Type validation
        if (!this.isValidType(value, config.dataType)) {
          errors.push({
            recordIndex,
            field: config.databaseField,
            constraint: 'DATA_TYPE',
            message: `Field '${config.databaseField}' has invalid type. Expected: ${config.dataType}, Got: ${typeof value}`,
            severity: 'ERROR',
            value,
          });
        }

        // String length validation (assuming VARCHAR(255) for strings)
        if (
          config.dataType === 'string' &&
          typeof value === 'string' &&
          value.length > 255
        ) {
          warnings.push({
            recordIndex,
            field: config.databaseField,
            message: `Field '${config.databaseField}' exceeds typical VARCHAR(255) limit`,
            recommendation: 'Consider truncating or using TEXT type',
            value: `${value.substring(0, 50)}... (${value.length} chars)`,
          });
        }
      }
    }
  }

  /**
   * Validate orders table business rules
   */
  private validateOrdersBusinessRules(
    data: Record<string, any>,
    errors: ValidationError[],
    warnings: ValidationWarning[],
  ): void {
    // Order ID format validation
    if (data.order_id && !this.isValidOrderIdFormat(data.order_id)) {
      warnings.push({
        field: 'order_id',
        message: 'Order ID format may not follow expected pattern',
        recommendation: 'Ensure order ID follows business conventions',
        value: data.order_id,
      });
    }

    // Financial totals validation
    if (data.order_total && data.order_sub_total && data.total_charges) {
      const expectedTotal =
        (data.order_sub_total || 0) + (data.total_charges || 0);

      if (Math.abs(data.order_total - expectedTotal) > 0.01) {
        warnings.push({
          field: 'order_total',
          message: 'Order total does not match subtotal + charges calculation',
          recommendation: 'Verify financial calculation logic',
          value: `Expected: ${expectedTotal}, Got: ${data.order_total}`,
        });
      }
    }

    // Email format validation
    if (data.customer_email && !this.isValidEmail(data.customer_email)) {
      warnings.push({
        field: 'customer_email',
        message: 'Customer email format is invalid',
        value: data.customer_email,
      });
    }
  }

  /**
   * Validate order lines business rules
   */
  private validateOrderLinesBusinessRules(
    data: Record<string, any>,
    errors: ValidationError[],
    warnings: ValidationWarning[],
    recordIndex: number,
  ): void {
    // Quantity validation
    if (data.quantity && data.quantity <= 0) {
      errors.push({
        recordIndex,
        field: 'quantity',
        constraint: 'BUSINESS_RULE',
        message: 'Quantity must be greater than 0',
        severity: 'ERROR',
        value: data.quantity,
      });
    }

    // Unit price validation
    if (data.unit_price && data.unit_price < 0) {
      warnings.push({
        recordIndex,
        field: 'unit_price',
        message: 'Unit price is negative',
        recommendation: 'Verify pricing logic',
        value: data.unit_price,
      });
    }

    // Line total calculation validation
    if (data.quantity && data.unit_price && data.order_line_total) {
      const expectedTotal = data.quantity * data.unit_price;

      if (Math.abs(data.order_line_total - expectedTotal) > 0.01) {
        warnings.push({
          recordIndex,
          field: 'order_line_total',
          message: 'Line total does not match quantity × unit price',
          recommendation: 'Verify line total calculation',
          value: `Expected: ${expectedTotal}, Got: ${data.order_line_total}`,
        });
      }
    }
  }

  /**
   * Validate release lines business rules - CRITICAL
   */
  private validateReleaseLinesBusinessRules(
    data: Record<string, any>,
    errors: ValidationError[],
    warnings: ValidationWarning[],
    recordIndex: number,
  ): void {
    // Critical foreign key relationships
    if (!data.order_id) {
      errors.push({
        recordIndex,
        field: 'order_id',
        constraint: 'FOREIGN_KEY',
        message: 'Release line must reference a valid order',
        severity: 'CRITICAL',
      });
    }

    if (!data.order_line_id) {
      errors.push({
        recordIndex,
        field: 'order_line_id',
        constraint: 'FOREIGN_KEY',
        message: 'Release line must reference a valid order line',
        severity: 'CRITICAL',
      });
    }

    // Allocation validation
    if (!data.allocation_id) {
      errors.push({
        recordIndex,
        field: 'allocation_id',
        constraint: 'BUSINESS_RULE',
        message: 'Release line must have allocation information',
        severity: 'CRITICAL',
      });
    }

    // Quantity validation
    if (data.quantity && data.quantity <= 0) {
      errors.push({
        recordIndex,
        field: 'quantity',
        constraint: 'BUSINESS_RULE',
        message: 'Release quantity must be greater than 0',
        severity: 'CRITICAL',
        value: data.quantity,
      });
    }

    // UOM validation
    if (!data.uom) {
      errors.push({
        recordIndex,
        field: 'uom',
        constraint: 'BUSINESS_RULE',
        message: 'Unit of measure is required for release lines',
        severity: 'CRITICAL',
      });
    }
  }

  /**
   * Validate critical database constraints
   */
  private validateCriticalConstraints(
    data: Record<string, any>,
    errors: ValidationError[],
    recordIndex: number,
  ): void {
    // Unique constraint simulation (release_line_id should be unique)
    if (!data.release_line_id) {
      errors.push({
        recordIndex,
        field: 'release_line_id',
        constraint: 'UNIQUE',
        message: 'Release line ID must be unique',
        severity: 'CRITICAL',
      });
    }

    // Check key length constraints
    const keyFields = [
      'order_id',
      'order_line_id',
      'release_id',
      'allocation_id',
    ];

    keyFields.forEach(field => {
      if (data[field] && data[field].length > 255) {
        errors.push({
          recordIndex,
          field,
          constraint: 'LENGTH',
          message: `${field} exceeds maximum length of 255 characters`,
          severity: 'ERROR',
          value: `${data[field].substring(0, 50)}... (${data[field].length} chars)`,
        });
      }
    });
  }

  /**
   * Build validation result summary
   */
  private buildValidationResult(
    tableName: string,
    dataArray: Record<string, any>[],
    errors: ValidationError[],
    warnings: ValidationWarning[],
  ): ValidationResult {
    const errorRecordIndices = new Set(errors.map(e => e.recordIndex));
    const warningRecordIndices = new Set(warnings.map(w => w.recordIndex));

    return {
      isValid: errors.length === 0,
      tableName,
      errors,
      warnings,
      summary: {
        totalRecords: dataArray.length,
        validRecords: dataArray.length - errorRecordIndices.size,
        errorRecords: errorRecordIndices.size,
        warningRecords: warningRecordIndices.size,
      },
    };
  }

  /**
   * Type checking utilities
   */
  private isValidType(value: any, expectedType: string): boolean {
    switch (expectedType) {
      case 'string':
        return typeof value === 'string';
      case 'number':
        return typeof value === 'number' && !isNaN(value);
      case 'boolean':
        return typeof value === 'boolean';
      case 'date':
        return value instanceof Date || this.isValidDateString(value);
      case 'object':
        return typeof value === 'object' && value !== null;
      default:
        return true;
    }
  }

  private isValidDateString(value: any): boolean {
    if (typeof value !== 'string') return false;

    const date = new Date(value);

    return !isNaN(date.getTime());
  }

  private isValidOrderIdFormat(orderId: string): boolean {
    // Basic order ID format validation (adjust based on business rules)
    return /^[A-Za-z0-9\-_]+$/.test(orderId) && orderId.length >= 3;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }

  /**
   * Validate complete transformation result
   */
  public validateCompleteTransformation(transformationResult: any): {
    isValid: boolean;
    results: ValidationResult[];
    criticalErrors: ValidationError[];
    totalErrors: number;
    totalWarnings: number;
  } {
    const results: ValidationResult[] = [];

    // Validate orders table
    if (transformationResult.ordersTableData) {
      results.push(
        this.validateOrdersData(transformationResult.ordersTableData),
      );
    }

    // Validate order lines table
    if (transformationResult.orderLinesTableData) {
      results.push(
        this.validateOrderLinesData(transformationResult.orderLinesTableData),
      );
    }

    // Validate release lines table
    if (transformationResult.releaseLinesTableData) {
      results.push(
        this.validateReleaseLinesData(
          transformationResult.releaseLinesTableData,
        ),
      );
    }

    // Aggregate results
    const allErrors = results.flatMap(r => r.errors);
    const criticalErrors = allErrors.filter(e => e.severity === 'CRITICAL');
    const totalWarnings = results.reduce(
      (sum, r) => sum + r.warnings.length,
      0,
    );

    return {
      isValid: criticalErrors.length === 0,
      results,
      criticalErrors,
      totalErrors: allErrors.length,
      totalWarnings,
    };
  }
}
