import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async create(data): Promise<Product> {
    return new this.productModel(data).save();
  }

  async findOne(id: number): Promise<Product> {
    return this.productModel.findOne({ id });
  }

  async update(id: number, data): Promise<any> {
    return this.productModel.findOneAndUpdate({ id }, data);
  }

  async delete(id: number): Promise<void> {
    this.productModel.deleteOne({ id });
  }
}
