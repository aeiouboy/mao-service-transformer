import { Test, TestingModule } from '@nestjs/testing';

import { AddressMapper } from '../../mappers/address.mapper';
import { AddressDTO } from '../../release-message.dto';

describe('AddressMapper', () => {
  let mapper: AddressMapper;

  const mockAddressData = {
    street: '123 Test Street',
    address2: 'Unit 456',
    city: 'Bangkok',
    state: 'Bangkok',
    postalCode: '10100',
    country: 'TH',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressMapper],
    }).compile();

    mapper = module.get<AddressMapper>(AddressMapper);
  });

  it('should be defined', () => {
    expect(mapper).toBeDefined();
  });

  describe('mapToAddressDTO', () => {
    it('should map address data to DTO format', () => {
      // Act
      const result = mapper.mapToAddressDTO(mockAddressData);

      // Assert
      expect(result).toBeInstanceOf(AddressDTO);
      expect(result.address1).toBe('123 Test Street');
      expect(result.address2).toBe('Unit 456');
      expect(result.city).toBe('Bangkok');
      expect(result.state).toBe('Bangkok');
      expect(result.postalCode).toBe('10100');
      expect(result.country).toBe('TH');
    });

    it('should generate MD5 hash for address', () => {
      // Act
      const result = mapper.mapToAddressDTO(mockAddressData);

      // Assert
      expect(result.hash).toBeDefined();
      expect(result.hash).toMatch(/^[a-f0-9]{32}$/); // MD5 hash format
      expect(result.hash.length).toBe(32);
    });

    it('should generate consistent hash for same address', () => {
      // Act
      const result1 = mapper.mapToAddressDTO(mockAddressData);
      const result2 = mapper.mapToAddressDTO(mockAddressData);

      // Assert
      expect(result1.hash).toBe(result2.hash);
    });

    it('should generate different hashes for different addresses', () => {
      // Arrange
      const address2 = {
        ...mockAddressData,
        street: '456 Different Street',
      };
      // Act
      const result1 = mapper.mapToAddressDTO(mockAddressData);
      const result2 = mapper.mapToAddressDTO(address2);

      // Assert
      expect(result1.hash).not.toBe(result2.hash);
    });

    it('should handle missing optional fields', () => {
      // Arrange
      const minimalAddress = {
        street: '123 Test Street',
        city: 'Bangkok',
        postalCode: '10100',
        country: 'TH',
      };
      // Act
      const result = mapper.mapToAddressDTO(minimalAddress);

      // Assert
      expect(result.address1).toBe('123 Test Street');
      expect(result.city).toBe('Bangkok');
      expect(result.postalCode).toBe('10100');
      expect(result.country).toBe('TH');
      expect(result.hash).toBeDefined();
    });

    it('should normalize country code to uppercase', () => {
      // Arrange
      const addressWithLowercaseCountry = {
        ...mockAddressData,
        country: 'th',
      };
      // Act
      const result = mapper.mapToAddressDTO(addressWithLowercaseCountry);

      // Assert
      expect(result.country).toBe('TH');
    });

    it('should trim whitespace from address fields', () => {
      // Arrange
      const addressWithWhitespace = {
        street: '  123 Test Street  ',
        city: '  Bangkok  ',
        postalCode: '  10100  ',
        country: '  TH  ',
      };
      // Act
      const result = mapper.mapToAddressDTO(addressWithWhitespace);

      // Assert
      expect(result.address1).toBe('123 Test Street');
      expect(result.city).toBe('Bangkok');
      expect(result.postalCode).toBe('10100');
      expect(result.country).toBe('TH');
    });
  });

  describe('generateAddressHash', () => {
    it('should generate MD5 hash from address components', () => {
      // Act
      const hash = mapper.generateAddressHash(mockAddressData);

      // Assert
      expect(hash).toMatch(/^[a-f0-9]{32}$/);
      expect(hash.length).toBe(32);
    });

    it('should include all relevant address components in hash', () => {
      // Arrange
      const address1 = {
        street: '123 Test Street',
        city: 'Bangkok',
        postalCode: '10100',
        country: 'TH',
      };
      const address2 = {
        street: '123 Test Street',
        city: 'Bangkok',
        postalCode: '10101', // Different postal code
        country: 'TH',
      };
      // Act
      const hash1 = mapper.generateAddressHash(address1);
      const hash2 = mapper.generateAddressHash(address2);

      // Assert
      expect(hash1).not.toBe(hash2);
    });

    it('should handle null/undefined address data', () => {
      // Act & Assert
      expect(() => mapper.generateAddressHash(null)).toThrow();
      expect(() => mapper.generateAddressHash(undefined)).toThrow();
    });
  });
});
