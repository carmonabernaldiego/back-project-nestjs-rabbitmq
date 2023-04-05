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
        'amqp://localhost',
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