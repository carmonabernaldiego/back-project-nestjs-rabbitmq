import { ProductService } from './product.service';
import { ClientProxy } from '@nestjs/microservices';
export declare class ProductController {
    private productService;
    private readonly client;
    constructor(productService: ProductService, client: ClientProxy);
    all(): Promise<import("./product.entity").Product[]>;
    create(name: string, description: string, product_type: string, price: number, image: string): Promise<import("./product.entity").Product>;
    get(id: number): Promise<import("./product.entity").Product>;
    update(id: number, name: string, description: string, product_type: string, price: number, image: string): Promise<import("./product.entity").Product>;
    delete(id: number): Promise<void>;
    like(id: number): Promise<any>;
}
