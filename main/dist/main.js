"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.connectMicroservice({
        transport: microservices_1.Transport.RMQ,
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
//# sourceMappingURL=main.js.map