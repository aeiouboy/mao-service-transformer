import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { status } from '@grpc/grpc-js';
import { Observable, throwError } from 'rxjs';

import { GRPC_EXCEPTION_ERROR_CODES } from 'src/shared/constants/grpc-exception-mapping';

import { getResponseStatus } from '../helpers';

interface GrpcErrorResponse {
  code?: number;
  errorCode?: string;
  message?: string;
}

@Catch(RpcException)
export class GrpcExceptionFilter implements RpcExceptionFilter {
  catch(exception: RpcException, _host: ArgumentsHost): Observable<unknown> {
    const error = exception.getError();
    const isGrpcStatus = Object.values(status).includes(
      typeof error === 'string'
        ? error
        : (error as { code?: string }).code || '',
    );

    if (isGrpcStatus) {
      if (typeof error !== 'string' && 'code' in error) {
        error.code = Object.entries(GRPC_EXCEPTION_ERROR_CODES).find(
          ([, value]) => value === error.code || '',
        )?.[0];
      }
    }

    const httpExceptionResponseMapping = getResponseStatus(
      typeof error === 'string'
        ? error
        : ((error as GrpcErrorResponse).code as unknown as string),
    );

    if (typeof error !== 'string' && (error as GrpcErrorResponse).message) {
      httpExceptionResponseMapping.message = (
        error as GrpcErrorResponse
      ).message;
    }

    const grpcCode =
      GRPC_EXCEPTION_ERROR_CODES[
        typeof error === 'string' ? error : (error as GrpcErrorResponse).code
      ] || status.UNKNOWN;

    return throwError(() => ({
      code: grpcCode,
      message:
        httpExceptionResponseMapping.message || 'An unknown error occurred',
    }));
  }
}
