import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ClientProxy } from '@nestjs/microservices';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @SkipThrottle()
  @Get()
  async all() {
    return this.productService.all();
  }

  @Post()
  async create(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('product_type') product_type: string,
    @Body('price') price: number,
    @Body('stock') stock: number,
    @Body('image') image: string,
  ) {
    const product = await this.productService.create({
      name,
      description,
      product_type,
      price,
      stock,
      image,
    });

    this.client.emit('product_created', product);

    return product;
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.productService.get(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('product_type') product_type: string,
    @Body('price') price: number,
    @Body('stock') stock: number,
    @Body('image') image: string,
  ) {
    await this.productService.update(id, {
      name,
      description,
      product_type,
      price,
      stock,
      image,
    });

    const product = await this.productService.get(id);

    this.client.emit('product_updated', product);

    return product;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.productService.delete(id);

    this.client.emit('product_deleted', id);
  }

  @Post(':id/like')
  async like(@Param('id') id: number) {
    const product = await this.productService.get(id);

    return this.productService.update(id, {
      likes: product.likes + 1,
    });
  }
}
