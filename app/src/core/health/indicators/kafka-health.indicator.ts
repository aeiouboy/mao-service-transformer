import { Injectable, Logger } from '@nestjs/common';
import { HealthIndicatorResult } from '@nestjs/terminus';

import { Admin, Kafka, KafkaConfig } from 'kafkajs';

@Injectable()
export class KafkaHealthIndicator {
  private readonly logger = new Logger(KafkaHealthIndicator.name);
  private admin: Admin | null = null;

  async check(
    key: string,
    options: KafkaConfig,
  ): Promise<HealthIndicatorResult> {
    if (!this.admin) {
      const kafka = new Kafka(options);

      this.admin = kafka.admin();
      await this.admin.connect();
    }

    try {
      await this.admin.fetchTopicMetadata();

      return {
        [key]: {
          status: 'up',
        },
      };
    } catch (error) {
      this.logger.error(
        `Kafka [${key}] health check failed: ${JSON.stringify(error)}`,
      );

      return {
        [key]: {
          status: 'down',
        },
      };
    }
  }
}
