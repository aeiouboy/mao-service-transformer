export class CancelledOrderNotFoundException extends Error {
  constructor(orderId: string) {
    super(`Cancelled order not found: ${orderId}`);
    this.name = 'CancelledOrderNotFoundException';
  }
}

export class OrderNotCancelledException extends Error {
  constructor(orderId: string) {
    super(`Order ${orderId} is not cancelled`);
    this.name = 'OrderNotCancelledException';
  }
}

export class CancelOrderTransformationException extends Error {
  constructor(orderId: string, originalError: string) {
    super(`Failed to transform cancelled order ${orderId}: ${originalError}`);
    this.name = 'CancelOrderTransformationException';
  }
}

export class InvalidOrderIdException extends Error {
  constructor(orderId?: string) {
    super(`Invalid order ID provided: ${orderId || 'empty'}`);
    this.name = 'InvalidOrderIdException';
  }
}

export class CancelOrderValidationException extends Error {
  constructor(orderId: string, errors: string[]) {
    super(
      `Validation failed for cancelled order ${orderId}: ${errors.join(', ')}`,
    );
    this.name = 'CancelOrderValidationException';
  }
}
