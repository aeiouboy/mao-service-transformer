import { promises as fs } from 'fs';
import { join } from 'path';

import { Injectable, Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppConfigService } from 'src/core/config/services';

@Injectable()
export class GrpcServerService {
  private readonly logger = new Logger('NestMicroservice');
  private app: {
    connectMicroservice: (options: MicroserviceOptions) => void;
    startAllMicroservices: () => Promise<void>;
  };

  constructor(private readonly appConfigService: AppConfigService) {}

  setApp(app: {
    connectMicroservice: (options: MicroserviceOptions) => void;
    startAllMicroservices: () => Promise<void>;
  }): void {
    this.app = app;
  }

  public async initial(): Promise<void> {
    this.logger.log('Initialize gRPC Server Service');

    try {
      if (!this.app) {
        throw new Error('Application instance is not set in GrpcServerService');
      }

      const grpcPort = await this.appConfigService.get('GRPC_PORT', '50052');
      const protoFiles = await this.getMainProtos();

      if (!protoFiles || protoFiles.length === 0) {
        this.logger.log('No proto files found');
      }

      const protoPath = protoFiles.map(file => file.protoPath);
      const grpcPackages = Array.from(
        new Set(protoFiles.map(file => file.packageName)),
      );

      this.logger.log(`gRPC Package: ${grpcPackages.join(', ')}`);
      this.logger.log(
        `Using Proto: ${protoPath.map(path => join('/', path.split('/modules/')[1])).join(', ')}`,
      );

      this.app.connectMicroservice({
        transport: Transport.GRPC,
        options: {
          package: grpcPackages,
          protoPath,
          url: `0.0.0.0:${grpcPort}`,
        },
      });

      await this.app.startAllMicroservices();
      this.logger.log(`gRPC Server is running on port ${grpcPort}`);
    } catch (error) {
      this.logger.error(
        'Failed to configure gRPC Server',
        error instanceof Error ? error.message : error,
      );
    }
  }

  private async getMainProtos(): Promise<
    { protoPath: string; packageName: string }[]
  > {
    const baseDir = join(__dirname, '../../../../../src/modules');
    const protoPaths: { protoPath: string; packageName: string }[] = [];
    const allProtos: { path: string; content: string }[] = [];
    const findProtoFiles = async (dir: string): Promise<void> => {
      const files = await fs.readdir(dir);

      for (const file of files) {
        const fullPath = join(dir, file);
        const stat = await fs.stat(fullPath);

        if (stat.isDirectory()) {
          await findProtoFiles(fullPath);
        } else if (file.endsWith('.proto')) {
          const content = await fs.readFile(fullPath, 'utf-8');

          allProtos.push({ path: fullPath, content });
        }
      }
    };

    await findProtoFiles(baseDir);

    for (const proto of allProtos) {
      const { path, content } = proto;
      const packageMatch = RegExp(/package\s+([\w.]+);/).exec(content);

      if (!packageMatch) continue;

      const packageName = packageMatch[1];
      const hasImports = RegExp(/import\s+["'][\w./-]+["'];/).test(content);
      const isMainFile =
        hasImports ||
        !allProtos.some(
          otherProto =>
            otherProto !== proto &&
            RegExp(`package\\s+${packageName};`).test(otherProto.content),
        );

      if (isMainFile) {
        protoPaths.push({ protoPath: path, packageName });
      }
    }

    return protoPaths;
  }
}
