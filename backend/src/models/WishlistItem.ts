import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { User } from './User';
import { Product } from './Product';

@Entity('wishlist_items')
@Unique(['user_id', 'product_id']) // Ensure a product can only be in a user's wishlist once
export class WishlistItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, user => user.wishlistItems)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column()
  @Index()
  user_id!: string;

  @ManyToOne(() => Product, product => product.wishlistItems)
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Column()
  @Index()
  product_id!: string;

  @CreateDateColumn()
  addedAt!: Date;

  // Optional note for the wishlist item
  @Column({ type: 'text', nullable: true })
  note?: string;

  // Flag for notifications when product is back in stock
  @Column({ default: false })
  notifyWhenInStock!: boolean;
} 
