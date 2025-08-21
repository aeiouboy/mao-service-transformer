import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Dialect } from 'sequelize';

import { AppConfigModule } from '../config/config.module';
import { AppConfigService } from '../config/services';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (configService: AppConfigService) => ({
        dialect: (await configService.get('DATABASE_DIALECT')) as Dialect,
        host: await configService.get('DATABASE_HOST'),
        port: Number(await configService.get('DATABASE_PORT')),
        username: await configService.get('DATABASE_USERNAME'),
        password: await configService.get('DATABASE_PASSWORD'),
        database: await configService.get('DATABASE_NAME'),
        schema: await configService.get('DATABASE_SCHEMA'),
        autoLoadModels: true,
        synchronize: false,
        logging: false,
        pool: {
          max: Number(await configService.get('DATABASE_MAX_POOL')) || 5,
        },
        define: { charset: 'utf8', collate: 'utf8_general_ci' },
        dialectOptions: {
          ssl: {
            require:
              (await configService.get('DATABASE_SSL_ENABLED')) === 'true',
            rejectUnauthorized:
              (await configService.get('DATABASE_SSL_REJECT_UNAUTHORIZED')) !==
              'false',
          },
        },
      }),
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
