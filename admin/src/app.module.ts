import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db-admin-pkdc.chywqaqyevhp.us-east-1.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: '1937james7823',
      database: 'nest_admin',
      autoLoadEntities: true /*remover en producción*/,
      synchronize: true,
    }),
    ProductModule,
    ThrottlerModule.forRoot({
      ttl: 60, // tiempo de vida del registro en segundos
      limit: 10, // número máximo de solicitudes por ttl
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
