import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://b-3a0127ff-aa1a-4b42-9931-246697f5f50f.mq.us-east-1.amazonaws.com',
      ],
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen();
  console.log(`Microservice is listening`);
}

bootstrap();

/*Local: amqp://localhost:5672*/