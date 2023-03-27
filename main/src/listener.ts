import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://rtbjqfiq:ZGAPtUubSdLZW6Cp8zgufY7_eMKN5k4n@chimpanzee.rmq.cloudamqp.com/rtbjqfiq',
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
