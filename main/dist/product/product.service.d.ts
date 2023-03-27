import { Product, ProductDocument } from './product.model';
import { Model } from 'mongoose';
export declare class ProductService {
    private readonly productModel;
    constructor(productModel: Model<ProductDocument>);
    all(): Promise<Product[]>;
    create(data: any): Promise<Product>;
}
