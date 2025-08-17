import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
  ValidatorConstraint,
} from 'class-validator';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { ValidatorConstraintInterface } from 'class-validator/types/validation/ValidatorConstraintInterface';

@ValidatorConstraint({ name: 'isStringOrStringArray', async: false })
export class IsStringOrStringArray implements ValidatorConstraintInterface {
  validate(value: string | string[]): boolean {
    if (typeof value === 'string') {
      return true;
    }

    if (Array.isArray(value)) {
      return value.every(item => typeof item === 'string');
    }

    return false;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be a string or an array of strings`;
  }
}

@ValidatorConstraint({ name: 'isProtoPath', async: false })
export class IsProtoPath implements ValidatorConstraintInterface {
  validate(value: string | string[]): boolean {
    const isValidProto = (path: string): boolean => path.endsWith('.proto');

    if (typeof value === 'string') {
      return isValidProto(value);
    }

    if (Array.isArray(value)) {
      return value.every(isValidProto);
    }

    return false;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be a valid .proto file path or an array of .proto file paths`;
  }
}

export class GrpcClientOptionsDto {
  @IsNotEmpty()
  @Validate(IsStringOrStringArray)
  package: string | string[];

  @IsNotEmpty()
  @Validate(IsProtoPath)
  protoPath: string | string[];

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsOptional()
  channelOptions?: Record<string, unknown>;
}
