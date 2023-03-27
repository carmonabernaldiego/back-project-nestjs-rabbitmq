import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async all() {
    return this.productService.all();
  }

  @EventPattern('product_created')
  async hello(product: any) {
    await this.productService.create({
      id: product.id,
      title: product.title,
      image: product.image,
      likes: product.likes,
    });
  }
}
