import { Test, TestingModule } from '@nestjs/testing';

import { PMPOrderInputDTO } from '../dtos/release-create-order.dto';

import { OrderTransformationService } from './domain/order-transformation.service';
import { OrderTransformationOrchestratorService } from './orchestration/order-transformation-orchestrator.service';
import { ReleaseOrderTransformationService } from './release-order-transformation.service';
import { CalculationService } from './shared/calculation.service';
import { FileOutputService } from './shared/file-output.service';

describe('ReleaseOrderTransformationService', () => {
  let service: ReleaseOrderTransformationService;
  let mockCalculationService: jest.Mocked<CalculationService>;
  let mockOrderTransformationService: jest.Mocked<OrderTransformationService>;
  let mockOrchestratorService: jest.Mocked<OrderTransformationOrchestratorService>;
  let mockFileOutputService: jest.Mocked<FileOutputService>;

  beforeEach(async () => {
    // Create mock services with all required methods
    mockCalculationService = {
      calculateTotalCharges: jest.fn(),
      calculateOrderSubtotal: jest.fn(),
      calculateOrderTotalTaxes: jest.fn(),
      calculateOrderDiscounts: jest.fn(),
      calculateLineTotal: jest.fn(),
    } as any;

    mockOrderTransformationService = {
      generateMD5Hash: jest.fn(),
      transformOrderHeader: jest.fn(),
      transformOrderObject: jest.fn(),
      transformChargeDetail: jest.fn(),
      transformNote: jest.fn(),
    } as any;

    mockOrchestratorService = {
      orchestrateTransformation: jest.fn(),
    } as any;

    mockFileOutputService = {
      saveOrderToFile: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReleaseOrderTransformationService,
        {
          provide: CalculationService,
          useValue: mockCalculationService,
        },
        {
          provide: OrderTransformationService,
          useValue: mockOrderTransformationService,
        },
        {
          provide: OrderTransformationOrchestratorService,
          useValue: mockOrchestratorService,
        },
        {
          provide: FileOutputService,
          useValue: mockFileOutputService,
        },
      ],
    }).compile();

    service = module.get<ReleaseOrderTransformationService>(
      ReleaseOrderTransformationService,
    );
  });

  describe('Facade Pattern Tests', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should delegate transformation to orchestrator service', () => {
      // Arrange
      const mockInput: PMPOrderInputDTO = createMockPMPInput();
      const expectedOutput = { OriginalPayload: {} };

      mockOrchestratorService.orchestrateTransformation.mockReturnValue(
        expectedOutput as any,
      );

      // Act
      const result = service.transform(mockInput);

      // Assert
      expect(
        mockOrchestratorService.orchestrateTransformation,
      ).toHaveBeenCalledWith(mockInput);
      expect(result).toBe(expectedOutput);
    });

    it('should handle transformation errors gracefully', () => {
      // Arrange
      const mockInput: PMPOrderInputDTO = createMockPMPInput();
      const error = new Error('Orchestration failed');

      mockOrchestratorService.orchestrateTransformation.mockImplementation(
        () => {
          throw error;
        },
      );

      // Act & Assert
      expect(() => service.transform(mockInput)).toThrow(
        'Facade transformation failed: Orchestration failed',
      );
    });
  });

  describe('Deprecated Method Delegation Tests', () => {
    it('should delegate calculateShippingCharge to calculation service', () => {
      // Arrange
      const mockInput: PMPOrderInputDTO = createMockPMPInput();
      const expectedCharges = 25.5;

      mockCalculationService.calculateTotalCharges.mockReturnValue(
        expectedCharges,
      );

      // Act
      const result = service.calculateShippingCharge(mockInput);

      // Assert
      expect(mockCalculationService.calculateTotalCharges).toHaveBeenCalledWith(
        mockInput,
      );
      expect(result).toBe(expectedCharges);
    });

    it('should delegate calculateOrderSubtotal to calculation service', () => {
      // Arrange
      const mockInput: PMPOrderInputDTO = createMockPMPInput();
      const expectedSubtotal = 157;

      mockCalculationService.calculateOrderSubtotal.mockReturnValue(
        expectedSubtotal,
      );

      // Act
      const result = service.calculateOrderSubtotal(mockInput);

      // Assert
      expect(
        mockCalculationService.calculateOrderSubtotal,
      ).toHaveBeenCalledWith(mockInput);
      expect(result).toBe(expectedSubtotal);
    });

    it('should delegate calculateOrderTotalTaxes to calculation service', () => {
      // Arrange
      const mockInput: PMPOrderInputDTO = createMockPMPInput();
      const expectedTaxes = 15.7;

      mockCalculationService.calculateOrderTotalTaxes.mockReturnValue(
        expectedTaxes,
      );

      // Act
      const result = service.calculateOrderTotalTaxes(mockInput);

      // Assert
      expect(
        mockCalculationService.calculateOrderTotalTaxes,
      ).toHaveBeenCalledWith(mockInput);
      expect(result).toBe(expectedTaxes);
    });

    it('should delegate calculateOrderDiscounts to calculation service', () => {
      // Arrange
      const mockInput: PMPOrderInputDTO = createMockPMPInput();
      const expectedDiscounts = -10;

      mockCalculationService.calculateOrderDiscounts.mockReturnValue(
        expectedDiscounts,
      );

      // Act
      const result = service.calculateOrderDiscounts(mockInput);

      // Assert
      expect(
        mockCalculationService.calculateOrderDiscounts,
      ).toHaveBeenCalledWith(mockInput);
      expect(result).toBe(expectedDiscounts);
    });

    it('should delegate generateMD5Hash to order transformation service', () => {
      // Arrange
      const mockAddress = {
        Address1: '123 Test St',
        PostalCode: '12345',
        Country: 'TH',
      };
      const expectedHash = 'abc123def456';

      mockOrderTransformationService.generateMD5Hash.mockReturnValue(
        expectedHash,
      );

      // Act
      const result = service.generateMD5Hash(mockAddress);

      // Assert
      expect(
        mockOrderTransformationService.generateMD5Hash,
      ).toHaveBeenCalledWith(mockAddress);
      expect(result).toBe(expectedHash);
    });

    it('should delegate calculateLineTotal to calculation service', () => {
      // Arrange
      const mockLine = { Quantity: 2, UnitPrice: 50 };
      const expectedTotal = 100;

      mockCalculationService.calculateLineTotal.mockReturnValue(expectedTotal);

      // Act
      const result = service.calculateLineTotal(mockLine);

      // Assert
      expect(mockCalculationService.calculateLineTotal).toHaveBeenCalledWith(
        mockLine,
      );
      expect(result).toBe(expectedTotal);
    });
  });

  describe('Async Methods Tests', () => {
    it('should return promise from transformAsync', async () => {
      // Arrange
      const mockInput: PMPOrderInputDTO = createMockPMPInput();
      const expectedOutput = { OriginalPayload: {} };

      mockOrchestratorService.orchestrateTransformation.mockReturnValue(
        expectedOutput as any,
      );

      // Act
      const result = await service.transformAsync(mockInput);

      // Assert
      expect(result).toBe(expectedOutput);
    });

    it('should save transformed order to file using correct order ID', async () => {
      // Arrange
      const mockInput: PMPOrderInputDTO = createMockPMPInput();

      mockInput.AlternateOrderId = 'ALT-12345';

      const expectedOutput = { OriginalPayload: {} };
      const expectedFilePath = '/path/to/output/file.json';

      mockOrchestratorService.orchestrateTransformation.mockReturnValue(
        expectedOutput as any,
      );
      mockFileOutputService.saveOrderToFile.mockResolvedValue(expectedFilePath);

      // Act
      const result = await service.saveTransformedOrder(
        mockInput,
        '/custom/dir',
      );

      // Assert
      expect(mockFileOutputService.saveOrderToFile).toHaveBeenCalledWith(
        expectedOutput,
        'ALT-12345', // Should use AlternateOrderId when available
        '/custom/dir',
      );
      expect(result).toBe(expectedFilePath);
    });

    it('should use OrderId when AlternateOrderId is not available', async () => {
      // Arrange
      const mockInput: PMPOrderInputDTO = createMockPMPInput();

      delete mockInput.AlternateOrderId;

      const expectedOutput = { OriginalPayload: {} };
      const expectedFilePath = '/path/to/output/file.json';

      mockOrchestratorService.orchestrateTransformation.mockReturnValue(
        expectedOutput as any,
      );
      mockFileOutputService.saveOrderToFile.mockResolvedValue(expectedFilePath);

      // Act
      const result = await service.saveTransformedOrder(mockInput);

      // Assert
      expect(mockFileOutputService.saveOrderToFile).toHaveBeenCalledWith(
        expectedOutput,
        '403521240-C7LDVZNUTGAHMA', // Should use OrderId as fallback
        undefined,
      );
      expect(result).toBe(expectedFilePath);
    });
  });

  describe('Error Handling Tests', () => {
    it('should handle string errors in transformation', () => {
      // Arrange
      const mockInput: PMPOrderInputDTO = createMockPMPInput();

      mockOrchestratorService.orchestrateTransformation.mockImplementation(
        () => {
          throw 'String error';
        },
      );

      // Act & Assert
      expect(() => service.transform(mockInput)).toThrow(
        'Facade transformation failed: String error',
      );
    });

    it('should handle file saving errors', async () => {
      // Arrange
      const mockInput: PMPOrderInputDTO = createMockPMPInput();
      const expectedOutput = { OriginalPayload: {} };

      mockOrchestratorService.orchestrateTransformation.mockReturnValue(
        expectedOutput as any,
      );
      mockFileOutputService.saveOrderToFile.mockRejectedValue(
        new Error('File save failed'),
      );

      // Act & Assert
      await expect(service.saveTransformedOrder(mockInput)).rejects.toThrow(
        'File save failed',
      );
    });
  });
});

// Test data factory
function createMockPMPInput(): PMPOrderInputDTO {
  return {
    OrderId: '403521240-C7LDVZNUTGAHMA',
    AlternateOrderId: 'ALT-' + '403521240-C7LDVZNUTGAHMA',
    BU: 'CFR',
    CapturedDate: '2025-08-05T12:13:12Z',
    CurrencyCode: 'THB',
    CustomerId: null,
    CustomerEmail: 'test@example.com',
    DoNotReleaseBefore: '',
    CustomerFirstName: 'Test',
    CustomerLastName: 'Customer',
    CustomerPhone: '0123456789',
    CustomerTypeId: '',
    DocType: {
      DocTypeId: 'CustomerOrder',
    },
    IsOnHold: false,
    OrderLocale: 'th',
    CancelAllowed: true,
    OrgId: 'CFR',
    OrderType: {
      OrderTypeId: 'Web',
    },
    SellingChannel: {
      SellingChannelId: 'Grab',
    },
    OrderActions: {
      IsAlreadyPriced: true,
      IsAlreadyCharged: true,
      IsAlreadyTaxed: true,
    },
    OrderExtension1: {
      Extended: {
        FullTaxInvoice: false,
        AllowSubstitution: true,
        CancelAllowed: true,
        TaxId: '',
        CompanyName: '',
        BranchNo: '',
        ConfirmPaymentId: 'Cash On Delivery',
        IsPSConfirmed: true,
        ExternalMPSellerId: null,
      },
    },
    OrderLine: [
      {
        OrderLineId: 'line-1',
        Quantity: 1,
        UnitPrice: 157,
        ItemId: 'TEST-ITEM',
        ShipToAddress: {
          Address: {
            Address1: '123 Test Street',
            Address2: '',
            Address3: '',
            City: 'Bangkok',
            State: 'Bangkok',
            PostalCode: '10100',
            Country: 'TH',
            County: '',
          },
          IsAddressVerified: false,
        },
        ShippingMethodId: 'Standard',
        OrderLineTaxDetail: [],
        Allocation: [],
      },
    ],
    OrderChargeDetail: [],
    OrderTaxDetail: [],
    OrderNote: [],
    OrderHold: [],
    Payment: [],
  } as PMPOrderInputDTO;
}
