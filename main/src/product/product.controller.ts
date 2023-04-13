import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    private httpService: HttpService,
  ) {}

  @SkipThrottle()
  @Get()
  async all() {
    return this.productService.all();
  }

  @Post(':id/like')
  async like(@Param('id') id: number) {
    const product = await this.productService.findOne(id);

    this.httpService
      .post(`http://127.0.0.1:8000/api/products/${id}/like`, {})
      .subscribe((res) => {
        console.log(res);
      });

    return this.productService.update(id, {
      likes: product.likes + 1,
    });
  }

  @EventPattern('product_created')
  async productCreated(product: any) {
    await this.productService.create({
      id: product.id,
      name: product.name,
      description: product.description,
      product_type: product.product_type,
      price: product.price,
      stock: product.stock,
      image: product.image,
      likes: product.likes,
    });
  }

  @EventPattern('product_updated')
  async productUpdated(product: any) {
    await this.productService.update(product.id, {
      id: product.id,
      name: product.name,
      description: product.description,
      product_type: product.product_type,
      price: product.price,
      stock: product.stock,
      image: product.image,
      likes: product.likes,
    });
  }

  @EventPattern('product_deleted')
  async productDeleted(id: number) {
    await this.productService.delete(id);
  }
}
