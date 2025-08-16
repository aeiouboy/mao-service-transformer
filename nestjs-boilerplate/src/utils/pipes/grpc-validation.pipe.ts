import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { status } from '@grpc/grpc-js';
import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';

@Injectable()
export class GrpcValidationPipe implements PipeTransform {
  async transform(
    value: unknown,
    { metatype }: ArgumentMetadata,
  ): Promise<unknown> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object as object);

    if (errors.length > 0) {
      const message = this.formatErrors(errors);

      throw new RpcException({ code: status.INVALID_ARGUMENT, message });
    }

    return value;
  }

  private toValidate(metatype: new (...args: unknown[]) => object): boolean {
    const types: (new (...args: unknown[]) => unknown)[] = [
      String,
      Boolean,
      Number,
      Array,
      Object,
    ];

    return !types.includes(metatype);
  }

  private formatErrors(errors: ValidationError[]): string {
    for (const err of errors) {
      if (err.constraints) {
        return Object.values(err.constraints)[0];
      }

      if (err.children && err.children.length > 0) {
        return this.formatErrors(err.children);
      }
    }

    return 'Validation failed';
  }
}
