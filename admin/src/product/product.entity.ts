import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  product_type: string;

  @Column('decimal', { precision: 6, scale: 2 })
  price: number;

  @Column()
  image: string;

  @Column({ default: 0 })
  likes: number;
}
