import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.connectMicroservice({
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
  await app.startAllMicroservices();
  await app.listen(8001);
  console.log(`Microservice is listening`);
}
bootstrap();