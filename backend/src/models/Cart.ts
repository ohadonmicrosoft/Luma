import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { CartItem } from "./CartItem";

@Entity("carts")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: true })
  user_id?: string;

  @ManyToOne(() => User, (user) => user.carts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user?: User;

  @Column({ nullable: true })
  session_id?: string;

  @Column({ default: 0, type: "decimal", precision: 10, scale: 2 })
  subtotal!: number;

  @Column({ default: 0, type: "decimal", precision: 10, scale: 2 })
  tax!: number;

  @Column({ default: 0, type: "decimal", precision: 10, scale: 2 })
  shipping!: number;

  @Column({ default: 0, type: "decimal", precision: 10, scale: 2 })
  discount!: number;

  @Column({ default: 0, type: "decimal", precision: 10, scale: 2 })
  total!: number;

  @Column({ nullable: true })
  coupon_code?: string;

  @Column({ default: false })
  is_gift!: boolean;

  @Column({ type: "text", nullable: true })
  gift_message?: string;

  @Column({ default: true })
  is_active!: boolean;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  items!: CartItem[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  /**
   * Calculate the totals for the cart
   */
  calculateTotals(): void {
    // Calculate subtotal based on items
    this.subtotal =
      this.items?.reduce((sum, item) => sum + item.subtotal, 0) || 0;

    // Calculate total with shipping, tax, and discounts
    this.total = this.subtotal + this.shipping + this.tax - this.discount;
  }
}
