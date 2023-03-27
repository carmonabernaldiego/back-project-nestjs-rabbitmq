import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'project-mysql-pkdc-admin.chywqaqyevhp.us-east-1.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: '1937James7823',
      database: 'nest_admin',
      autoLoadEntities: true, /*remover en producción*/
      synchronize: true,
    }),
    ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
