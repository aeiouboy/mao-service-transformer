/* eslint-disable @typescript-eslint/no-explicit-any */
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { ErrorException } from 'src/utils/exceptions';

import { RedisClientOptionsDto } from './dtos';

@Module({})
export class RedisClientModule {
  private static readonly logger = new Logger(RedisClientModule.name);

  static register(options: RedisClientOptionsDto): DynamicModule {
    const clientOptions = plainToInstance(RedisClientOptionsDto, options);
    const errors = validateSync(clientOptions);

    if (errors.length > 0) {
      const errorMessages = errors
        .map(err => Object.values(err.constraints || {}).join(', '))
        .join('; ');

      this.logger.error(`Invalid Redis Client options: ${errorMessages}`);

      throw new ErrorException('ERR_INTERNAL_SERVER_ERROR');
    }

    this.logger.log(`Registering Redis client: ${clientOptions.name}`);

    return {
      module: RedisClientModule,
      imports: [
        ClientsModule.register([
          {
            name: clientOptions.name,
            transport: Transport.REDIS,
            options: {
              host: clientOptions.host,
              port: clientOptions.port,
              retryAttempts: clientOptions.retryAttempts,
              retryDelay: clientOptions.retryDelay,
              wildcards: clientOptions.wildcards,
            },
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }

  static registerAsync(options: {
    imports?: any[];
    inject?: any[];
    useFactory: (
      ...args: any[]
    ) => Promise<RedisClientOptionsDto> | RedisClientOptionsDto;
  }): DynamicModule {
    return {
      module: RedisClientModule,
      imports: [
        ClientsModule.registerAsync([
          {
            imports: options.imports || [],
            inject: options.inject || [],
            name: options.useFactory.name,
            useFactory: async (...args: any[]): Promise<any> => {
              const clientOptions = await options.useFactory(...(args as []));
              const validatedOptions = plainToInstance(
                RedisClientOptionsDto,
                clientOptions,
              );
              const errors = validateSync(validatedOptions);

              if (errors.length > 0) {
                const errorMessages = errors
                  .map(err => Object.values(err.constraints || {}).join(', '))
                  .join('; ');

                this.logger.error(
                  `Invalid Redis Client options: ${errorMessages}`,
                );

                throw new ErrorException('ERR_INTERNAL_SERVER_ERROR');
              }

              this.logger.log(
                `Registering Redis client asynchronously: ${validatedOptions.name}`,
              );

              return {
                transport: Transport.REDIS,
                options: {
                  host: validatedOptions.host,
                  port: validatedOptions.port,
                  retryAttempts: validatedOptions.retryAttempts,
                  retryDelay: validatedOptions.retryDelay,
                  wildcards: validatedOptions.wildcards,
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
