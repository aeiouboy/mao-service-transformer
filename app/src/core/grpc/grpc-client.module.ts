/* eslint-disable @typescript-eslint/no-explicit-any */
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { ErrorException } from 'src/utils/exceptions';

import { GrpcClientOptionsDto } from './dtos';

@Module({})
export class GrpcClientModule {
  private static readonly logger = new Logger();

  static registerAsync(options: {
    name: string;
    imports?: any[];
    inject?: any[];
    useFactory: (
      ...args: any[]
    ) => Promise<GrpcClientOptionsDto> | GrpcClientOptionsDto;
  }): DynamicModule {
    const clientName = options.name;

    return {
      module: GrpcClientModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: clientName,
            imports: options.imports || [],
            inject: options.inject || [],
            useFactory: async (...args: any[]): Promise<any> => {
              const clientOptions = await options.useFactory(...(args as []));
              const validatedOptions = plainToInstance(
                GrpcClientOptionsDto,
                clientOptions,
              );
              const errors = validateSync(validatedOptions);

              if (errors.length > 0) {
                this.logger.error(
                  `Invalid gRPC Client options: ${JSON.stringify(errors)}`,
                );

                throw new ErrorException('ERR_INTERNAL_SERVER_ERROR');
              }

              return {
                transport: Transport.GRPC,
                options: {
                  package: validatedOptions.package,
                  protoPath: validatedOptions.protoPath,
                  url: validatedOptions.url,
                  channelOptions: validatedOptions.channelOptions || {},
                },
              };
            },
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
