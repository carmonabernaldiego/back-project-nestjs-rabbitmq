import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  product_type: string;

  @Prop()
  price: number;

  @Prop()
  stock: number;

  @Prop()
  image: string;

  @Prop()
  likes: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
