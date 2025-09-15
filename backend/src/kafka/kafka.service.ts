
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, logLevel } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka: Kafka;
  private producer: any;
  private consumer: any;

  constructor() {
    const brokers = ['localhost:29092'];
    console.log('Kafka brokers used:', brokers); // <-- thêm dòng này
    this.kafka = new Kafka({ brokers, clientId: 'kafka-realtime', logLevel: logLevel.WARN });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'gateway-group' });
  }

  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
    // subscribe to 'projects' topic and run each message via handler if provided
    // await this.consumer.subscribe({ topic: 'projects', fromBeginning: false });
    console.log('Kafka connected and consumer subscribed to topic "projects"');
  }

  async publish(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }

  async setMessageHandler(fn: (msg: any) => Promise<void>) {
    await this.consumer.subscribe({ topic: 'projects', fromBeginning: false });
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const value = message.value?.toString();
          if (value) {
            await fn(JSON.parse(value));
          }
        } catch (err) {
          console.error('Error handling message', err);
        }
      },
    });
  }
}
