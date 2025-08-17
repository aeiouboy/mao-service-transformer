import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import type { Instrumentation } from '@opentelemetry/instrumentation';

export function kafkaInstrumentationHook(): Instrumentation[] {
  return getNodeAutoInstrumentations({
    '@opentelemetry/instrumentation-kafkajs': {
      enabled: true,
      consumerHook: (span, info): void => {
        if (info.topic) {
          span.setAttribute('kafka.topic', info.topic);
          span.setAttribute('kafka.partition', info.message.partition);
          span.setAttribute('kafka.message', info.message.value.toString());
        }
      },
      producerHook: (span, info): void => {
        if (info.topic) {
          span.setAttribute('kafka.topic', info.topic);
          span.setAttribute('kafka.partition', info.message.partition);
          span.setAttribute('kafka.message', info.message.value.toString());
        }
      },
    },
  });
}
