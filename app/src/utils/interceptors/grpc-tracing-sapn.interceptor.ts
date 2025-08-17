/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

import { SpanStatusCode, trace } from '@opentelemetry/api';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { GRPC_EXCEPTION_ERROR_CODES } from 'src/common/constants/grpc-exception-mapping';
import { AppConfigService } from 'src/core/config/services';

import { extractCapturedFields, sensitiveData } from '../helpers';

@Injectable()
export class GrpcTracingSpanInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger(GrpcTracingSpanInterceptor.name);
  constructor(private readonly appConfigService: AppConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const activeSpan = trace.getActiveSpan();
    const grpcClassName = context.getClass().name;
    const requestData = context.switchToRpc().getData();

    if (activeSpan) {
      activeSpan.updateName(`gRPC ${grpcClassName}`);

      activeSpan.setAttribute(
        'rpc.request.params',
        JSON.stringify(requestData),
      );

      void this.handleMaskingAndCapturedFields(activeSpan, requestData);
    }

    return next.handle().pipe(
      tap({
        next: response => {
          if (activeSpan) {
            activeSpan.setAttribute(
              'rpc.response.body',
              JSON.stringify(response),
            );

            void this.handleResponseMasking(activeSpan, response);

            activeSpan.end();
          }
        },
        error: error => {
          const grpcError = error.getError();
          const errorCode = Object.entries(GRPC_EXCEPTION_ERROR_CODES).find(
            ([, value]) => value === grpcError.code || '',
          )?.[0];

          if (activeSpan) {
            activeSpan.setStatus({
              code: SpanStatusCode.ERROR,
              message: error.message,
            });

            activeSpan.setAttribute('exception', String(error.name));

            activeSpan.addEvent(`Exception : ${error.name}`, {
              errorCode,
              errorMessage: grpcError.message,
              rpcStatus: grpcError.code,
            });
            activeSpan.end();
          }
        },
      }),
    );
  }

  private async handleMaskingAndCapturedFields(
    span: ReturnType<typeof trace.getActiveSpan>,
    requestData: unknown,
  ): Promise<void> {
    try {
      const maskedData = await sensitiveData.mask(
        requestData,
        this.appConfigService,
      );

      span.setAttribute('rpc.request.params', JSON.stringify(maskedData));

      const logCapturedConfig = await this.appConfigService.get(
        'LOG_CAPTURE_REQUEST',
      );
      const capturedFields = extractCapturedFields(
        requestData as Record<string, any>,
        logCapturedConfig,
      );

      for (const [capturedKey, capturedValue] of Object.entries(
        capturedFields,
      )) {
        span.setAttribute(capturedKey, String(capturedValue));
      }
    } catch (error) {
      this.logger.warn('Failed to handle masking or captured fields:', error);
    }
  }

  private async handleResponseMasking(
    span: ReturnType<typeof trace.getActiveSpan>,
    response: unknown,
  ): Promise<void> {
    try {
      const maskedResponse = await sensitiveData.mask(
        response,
        this.appConfigService,
      );

      span.setAttribute('rpc.response.body', JSON.stringify(maskedResponse));
    } catch (error) {
      this.logger.warn('Failed to mask response data:', error);
    }
  }
}
