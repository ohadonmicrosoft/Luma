import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { Length, IsNotEmpty, Min, IsOptional } from 'class-validator';
import { Category } from './Category';
import { OrderItem } from './OrderItem';
import { Review } from './Review';
import { WishlistItem } from './WishlistItem';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  @Length(3, 100)
  @IsNotEmpty()
  @Index()
  name: string;

  @Column({ type: 'text' })
  @Length(10, 5000)
  @IsNotEmpty()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Min(0)
  @IsNotEmpty()
  price: number;

  @Column({ default: 0 })
  @Min(0)
  stock: number;

  @Column({ nullable: true })
  @IsOptional()
  sku: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ nullable: true, type: 'text', array: true })
  @IsOptional()
  images: string[];

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  attributes: Record<string, any>;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ nullable: true })
  category_id: string;

  @OneToMany(() => OrderItem, orderItem => orderItem.product)
  orderItems: OrderItem[];

  @OneToMany(() => Review, review => review.product)
  reviews: Review[];

  @OneToMany(() => WishlistItem, wishlistItem => wishlistItem.product)
  wishlistItems: WishlistItem[];

  @Column({ default: 0 })
  averageRating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Calculate if product is in stock
  get inStock(): boolean {
    return this.stock > 0;
  }
} 
