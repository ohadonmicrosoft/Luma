import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Cart } from './Cart';
import { Product } from './Product';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  cart_id!: string;

  @ManyToOne(() => Cart, cart => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart!: Cart;

  @Column()
  product_id!: string;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Column({ default: 1 })
  quantity!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal!: number;

  @Column({ type: 'json', nullable: true })
  selected_options?: Record<string, string | number | boolean>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  /**
   * Calculate subtotal based on price and quantity
   */
  calculateSubtotal(): void {
    this.subtotal = this.price * this.quantity;
  }
} 
