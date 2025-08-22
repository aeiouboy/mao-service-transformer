import { createHash } from 'crypto';

import { Injectable } from '@nestjs/common';

import { DatabaseAddressDTO } from '../../releases/dtos/database-compatible-release.dto';

@Injectable()
export class AddressMapper {
  /**
   * Map address data to DTO format with MD5 hash generation
   * @param addressData Raw address data from order
   * @returns AddressDTO with generated hash
   */
  mapToAddressDTO(addressData: any): DatabaseAddressDTO {
    if (!addressData) {
      throw new Error('Address data is required');
    }

    const addressDto = new DatabaseAddressDTO();

    // Map address fields with trimming and normalization
    addressDto.addressLine1 = this.normalizeString(
      addressData.street || addressData.address1 || '',
    );
    addressDto.addressLine2 = this.normalizeString(addressData.address2);
    addressDto.addressLine3 = this.normalizeString(addressData.address3);
    addressDto.city = this.normalizeString(addressData.city || '');
    addressDto.state = this.normalizeString(addressData.state);
    addressDto.zipCode = this.normalizeString(addressData.postalCode || '');
    addressDto.country = this.normalizeCountryCode(addressData.country || '');
    addressDto.county = this.normalizeString(addressData.county);

    // Generate address ID hash for deduplication
    addressDto.addressId = this.generateAddressHash(addressData);

    return addressDto;
  }

  /**
   * Generate MD5 hash from address components for deduplication
   * @param addressData Address components
   * @returns MD5 hash string
   */
  generateAddressHash(addressData: any): string {
    if (!addressData) {
      throw new Error(
        'Cannot generate hash for null or undefined address data',
      );
    }

    // Create consistent hash input from relevant address components
    const hashInput = [
      addressData.street || addressData.address1 || '',
      addressData.address2 || '',
      addressData.city || '',
      addressData.state || '',
      addressData.postalCode || '',
      (addressData.country || '').toUpperCase(),
    ]
      .map(field => (field || '').toString().trim())
      .join('|');

    return createHash('md5').update(hashInput, 'utf8').digest('hex');
  }

  /**
   * Normalize string fields (trim whitespace, handle nulls)
   * @param value Input string value
   * @returns Normalized string or undefined
   */
  private normalizeString(value: any): string | undefined {
    if (value === null || value === undefined) {
      return undefined;
    }

    const trimmed = value.toString().trim();

    return trimmed === '' ? undefined : trimmed;
  }

  /**
   * Normalize country code to uppercase
   * @param countryCode Country code
   * @returns Normalized country code
   */
  private normalizeCountryCode(countryCode: string): string {
    if (!countryCode) {
      return '';
    }

    return countryCode.toString().trim().toUpperCase();
  }

  /**
   * Validate address completeness
   * @param addressData Address data to validate
   * @returns boolean indicating if address is complete
   */
  validateAddressCompleteness(addressData: any): boolean {
    if (!addressData) {
      return false;
    }

    const requiredFields = [
      addressData.street || addressData.address1,
      addressData.city,
      addressData.postalCode,
      addressData.country,
    ];

    return requiredFields.every(
      field => field && field.toString().trim() !== '',
    );
  }

  /**
   * Compare two addresses for equality using hash
   * @param address1 First address
   * @param address2 Second address
   * @returns boolean indicating if addresses are the same
   */
  areAddressesEqual(address1: any, address2: any): boolean {
    try {
      const hash1 = this.generateAddressHash(address1);
      const hash2 = this.generateAddressHash(address2);

      return hash1 === hash2;
    } catch {
      return false;
    }
  }
}
