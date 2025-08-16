import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { json, urlencoded } from 'body-parser';
import { RedocModule, RedocOptions } from 'nestjs-redoc';

import { AppModule } from './app.module';
import { AppConfigService } from './core/config/services';
import { GrpcServerService } from './core/grpc/services';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(AppConfigService);
  const grpcServerService = app.get(GrpcServerService);
  const logger = new Logger();
  const apiDocumentTitle = await configService.get('API_DOCUMENT_TITLE');
  const apiDocumentDescription = await configService.get(
    'API_DOCUMENT_DESCRIPTION',
  );
  const apiDocumentVersion = await configService.get('API_DOCUMENT_VERSION');
  const apiDocumentPath = await configService.get('API_DOCUMENT_PATH');

  grpcServerService.setApp(
    app as unknown as {
      connectMicroservice: (options: MicroserviceOptions) => void;
      startAllMicroservices: () => Promise<void>;
    },
  );

  if ((await configService.get('GRPC_SERVER_ENABLED')) === 'true') {
    await grpcServerService.initial();
  }

  app.use(
    json({ limit: await configService.get('APP_MAX_REQUEST_BODY_SIZE') }),
  );
  app.use(
    urlencoded({
      limit: await configService.get('APP_MAX_REQUEST_BODY_SIZE'),
      extended: true,
    }),
  );
  app.use('/swagger-json', (_req, res) => {
    res.json(document);
  });

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(apiDocumentTitle)
    .setDescription(apiDocumentDescription)
    .setVersion(apiDocumentVersion)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const redocOptions: RedocOptions = {
    title: apiDocumentTitle,
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
  };

  await RedocModule.setup(apiDocumentPath, app as any, document, redocOptions);

  const server = await app.listen(Number(await configService.get('APP_PORT')));

  server.setTimeout(Number(await configService.get('APP_TIMEOUT')) * 60000);

  logger.log(
    `HTTP Server is running on port ${await configService.get('APP_PORT')}`,
    'NestApplication',
  );
}

void bootstrap();
