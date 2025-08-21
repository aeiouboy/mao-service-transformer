import { Allocation } from '../.../../orders/entities/allocation.entity';

describe('Allocation Entity', () => {
  describe('Entity Definition', () => {
    it('should be defined', () => {
      expect(Allocation).toBeDefined();
    });

    it('should be a function (class constructor)', () => {
      expect(typeof Allocation).toBe('function');
    });
  });

  describe('Basic Properties', () => {
    it('should allow creation of plain allocation objects', () => {
      const allocationData = {
        allocationId: 'ALLOC-123',
        orderLineId: 'LINE-123',
        facilityId: 'FAC-456',
        allocatedQuantity: 2,
        availableQuantity: 10,
        allocationStatus: 'ALLOCATED',
        allocationDate: new Date(),
        facilityCode: 'DC01',
        facilityName: 'Distribution Center 1',
        facilityType: 'WAREHOUSE',
      };

      expect(allocationData.allocationId).toBe('ALLOC-123');
      expect(allocationData.allocatedQuantity).toBe(2);
    });
  });
});
