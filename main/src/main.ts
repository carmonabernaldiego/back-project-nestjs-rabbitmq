import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://b-8942fba6-d1a5-4968-958e-27fa0b8bdd2e.mq.us-east-1.amazonaws.com',
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
