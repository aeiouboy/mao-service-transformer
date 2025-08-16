import { Module } from '@nestjs/common';

import { AppConfigModule } from '..';

import { GrpcServerService } from './services/grpc-server.service';

@Module({
  imports: [AppConfigModule],
  providers: [GrpcServerService],
  exports: [GrpcServerService],
})
export class GrpcServerModule {}
