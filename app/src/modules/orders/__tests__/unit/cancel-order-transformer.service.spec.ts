import { Test, TestingModule } from '@nestjs/testing';

import { CancelledOrderData } from '../../dtos/cancelled-order-data.dto';
import {
  CancelOrderTransformationException,
  CancelledOrderNotFoundException,
  InvalidOrderIdException,
  OrderNotCancelledException,
} from '../../exceptions/cancel-order.exceptions';
import { CancelOrderMapperService } from '../../services/cancel-order-mapper.service';
import { CancelOrderTransformerService } from '../../services/cancel-order-transformer.service';
import { CancelledOrderQueryService } from '../../services/cancelled-order-query.service';

describe('CancelOrderTransformerService', () => {
  let service: CancelOrderTransformerService;
  let queryService: jest.Mocked<CancelledOrderQueryService>;
  let mapperService: jest.Mocked<CancelOrderMapperService>;

  const mockCancelledOrderData: CancelledOrderData[] = [
    {
      order_id: '311647613-C7LXT7KBTPA3TN',
      is_cancelled: true,
      cancelled_order_sub_total: 366.0,
      order_sub_total: 0.0,
      order_total: 0.0,
      total_charges: 0.0,
      total_discounts: 0.0,
      total_taxes: 0.0,
      customer_first_name: 'Grab Customer',
      customer_last_name: '-',
      customer_email: 'undefined',
      order_line_id: 'line-1',
      line_is_cancelled: true,
      line_item_id: 'ITEM-123',
      quantity_detail_id: 'qd-1',
    },
  ];
  const mockMAOResult = {
    OrderId: '311647613-C7LXT7KBTPA3TN',
    IsCancelled: true,
    FulfillmentStatus: 'Canceled',
    CancelLineCount: 1,
    OrderLineCount: 1,
    OrderLine: [],
  };

  beforeEach(async () => {
    const mockQueryService = {
      getCancelledOrderById: jest.fn(),
    };
    const mockMapperService = {
      mapToMAOFormat: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CancelOrderTransformerService,
        {
          provide: CancelledOrderQueryService,
          useValue: mockQueryService,
        },
        {
          provide: CancelOrderMapperService,
          useValue: mockMapperService,
        },
      ],
    }).compile();

    service = module.get<CancelOrderTransformerService>(
      CancelOrderTransformerService,
    );
    queryService = module.get(CancelledOrderQueryService);
    mapperService = module.get(CancelOrderMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('transformCancelledOrder', () => {
    it('should transform a cancelled order successfully', async () => {
      // Arrange
      const orderId = '311647613-C7LXT7KBTPA3TN';

      queryService.getCancelledOrderById.mockResolvedValue(
        mockCancelledOrderData,
      );
      mapperService.mapToMAOFormat.mockReturnValue(mockMAOResult as any);

      // Act
      const result = await service.transformCancelledOrder(orderId);

      // Assert
      expect(result).toEqual(mockMAOResult);
      expect(queryService.getCancelledOrderById).toHaveBeenCalledWith(orderId);
      expect(mapperService.mapToMAOFormat).toHaveBeenCalledWith(
        mockCancelledOrderData,
      );
    });

    it('should throw InvalidOrderIdException for empty order ID', async () => {
      // Act & Assert
      await expect(service.transformCancelledOrder('')).rejects.toThrow(
        InvalidOrderIdException,
      );
      await expect(service.transformCancelledOrder('   ')).rejects.toThrow(
        InvalidOrderIdException,
      );
      await expect(
        service.transformCancelledOrder(null as any),
      ).rejects.toThrow(InvalidOrderIdException);
    });

    it('should throw CancelledOrderNotFoundException when order not found', async () => {
      // Arrange
      const orderId = 'NON-EXISTENT-ORDER';

      queryService.getCancelledOrderById.mockResolvedValue([]);

      // Act & Assert
      await expect(service.transformCancelledOrder(orderId)).rejects.toThrow(
        CancelledOrderNotFoundException,
      );
      expect(queryService.getCancelledOrderById).toHaveBeenCalledWith(orderId);
    });

    it('should throw OrderNotCancelledException when order is not cancelled', async () => {
      // Arrange
      const orderId = 'ACTIVE-ORDER';
      const activeOrderData = [
        { ...mockCancelledOrderData[0], is_cancelled: false },
      ];

      queryService.getCancelledOrderById.mockResolvedValue(activeOrderData);

      // Act & Assert
      await expect(service.transformCancelledOrder(orderId)).rejects.toThrow(
        OrderNotCancelledException,
      );
    });

    it('should throw CancelOrderTransformationException when mapping fails', async () => {
      // Arrange
      const orderId = '311647613-C7LXT7KBTPA3TN';

      queryService.getCancelledOrderById.mockResolvedValue(
        mockCancelledOrderData,
      );
      mapperService.mapToMAOFormat.mockImplementation(() => {
        throw new Error('Mapping failed');
      });

      // Act & Assert
      await expect(service.transformCancelledOrder(orderId)).rejects.toThrow(
        CancelOrderTransformationException,
      );
    });

    it('should trim whitespace from order ID', async () => {
      // Arrange
      const orderId = '  311647613-C7LXT7KBTPA3TN  ';
      const trimmedOrderId = '311647613-C7LXT7KBTPA3TN';

      queryService.getCancelledOrderById.mockResolvedValue(
        mockCancelledOrderData,
      );
      mapperService.mapToMAOFormat.mockReturnValue(mockMAOResult as any);

      // Act
      await service.transformCancelledOrder(orderId);

      // Assert
      expect(queryService.getCancelledOrderById).toHaveBeenCalledWith(
        trimmedOrderId,
      );
    });
  });
});
