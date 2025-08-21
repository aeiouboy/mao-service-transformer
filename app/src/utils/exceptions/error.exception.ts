import { format } from 'util';

import { RpcException } from '@nestjs/microservices';

import { status } from '@grpc/grpc-js';

import { ERROR_CODES, HTTP_STATUS_MAPPING } from 'src/shared/constants';
import { GRPC_EXCEPTION_ERROR_CODES } from 'src/shared/constants/grpc-exception-mapping';
import { ResponseDto } from 'src/shared/dtos';

import { getResponseStatus } from '../helpers';

export class ErrorException extends Error {
  response: ResponseDto;

  constructor(
    errorCode: string,
    message: string | string[] = '',
    httpStatus?: number,
  ) {
    super();

    const error = ERROR_CODES.find(item => item.errorCode === errorCode);

    this.name = 'Exception';

    if (error.httpStatus >= 400 && error.httpStatus < 500) {
      this.name = 'ClientRequestException';
    }

    if (error.httpStatus >= 500) {
      this.name = 'UnexpectedException';
    }

    if (!message) {
      message = error.message;
    } else {
      message = error.message.includes('%s')
        ? format(error.message, message)
        : message;
    }

    this.response = getResponseStatus(errorCode, null, message, httpStatus);
  }
}

export class RpcErrorException extends RpcException {
  constructor(
    code:
      | keyof typeof GRPC_EXCEPTION_ERROR_CODES
      | (typeof status)[keyof typeof status]
      | ErrorException,
    message?: string,
  ) {
    let grpcCode: (typeof status)[keyof typeof status];
    let grpcMessage: string;

    if (code instanceof ErrorException) {
      const httpStatus = code.response?.httpStatus;
      const errorCode =
        HTTP_STATUS_MAPPING[httpStatus] || 'ERR_INTERNAL_SERVER_ERROR';

      grpcCode = GRPC_EXCEPTION_ERROR_CODES[errorCode] || status.UNKNOWN;
      grpcMessage = code.response?.message || 'An error occurred';
    } else {
      grpcCode =
        typeof code === 'string'
          ? GRPC_EXCEPTION_ERROR_CODES[code] || status.UNKNOWN
          : code;

      if (!message) {
        const isGrpcStatus = Object.values(status).includes(grpcCode || '');

        if (isGrpcStatus) {
          const mappedCode = Object.entries(GRPC_EXCEPTION_ERROR_CODES).find(
            ([, value]) => value === grpcCode || '',
          )?.[0];
          const response = getResponseStatus(mappedCode);

          grpcMessage = response.message.includes('%s')
            ? format(response.message, message)
            : response.message;
        } else {
          grpcMessage = 'An error occurred';
        }
      } else {
        grpcMessage = message;
      }
    }

    super({ code: grpcCode, message: grpcMessage });

    this.name = this.resolveExceptionName(grpcCode);
  }

  private resolveExceptionName(
    grpcCode: (typeof status)[keyof typeof status],
  ): string {
    if (
      grpcCode === status.INVALID_ARGUMENT ||
      grpcCode === status.UNAUTHENTICATED ||
      grpcCode === status.PERMISSION_DENIED ||
      grpcCode === status.NOT_FOUND ||
      grpcCode === status.ALREADY_EXISTS ||
      grpcCode === status.ABORTED ||
      grpcCode === status.FAILED_PRECONDITION ||
      grpcCode === status.OUT_OF_RANGE ||
      grpcCode === status.RESOURCE_EXHAUSTED ||
      grpcCode === status.CANCELLED
    ) {
      return 'ClientRequestException';
    }

    if (
      grpcCode === status.INTERNAL ||
      grpcCode === status.UNIMPLEMENTED ||
      grpcCode === status.UNKNOWN ||
      grpcCode === status.UNAVAILABLE ||
      grpcCode === status.DEADLINE_EXCEEDED
    ) {
      return 'UnexpectedException';
    }

    return 'RpcErrorException';
  }
}
