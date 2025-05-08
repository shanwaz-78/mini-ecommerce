import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products') 
export class Product {
  @PrimaryGeneratedColumn('increment')
  productId: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  productName: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image?: any; 
}
