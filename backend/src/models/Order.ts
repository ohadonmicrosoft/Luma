import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from "typeorm";
import { Min, IsNotEmpty, IsOptional, IsEnum } from "class-validator";
import { User } from "./User";
import { OrderItem } from "./OrderItem";

// Define address type
type Address = {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
};

// Define order status enum
export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
}

// Define payment status enum
export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
  REFUNDED = "refunded",
}

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true })
  @IsNotEmpty()
  @Index()
  orderNumber!: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column()
  user_id!: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items!: OrderItem[];

  @Column({ type: "decimal", precision: 10, scale: 2 })
  @Min(0)
  subtotal!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  @Min(0)
  tax!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  @Min(0)
  shipping!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  @Min(0)
  total!: number;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PENDING })
  @IsEnum(OrderStatus)
  status!: OrderStatus;

  @Column({ type: "enum", enum: PaymentStatus, default: PaymentStatus.PENDING })
  @IsEnum(PaymentStatus)
  paymentStatus!: PaymentStatus;

  @Column({ nullable: true })
  @IsOptional()
  paymentMethod?: string;

  @Column({ nullable: true })
  @IsOptional()
  paymentId?: string;

  @Column({ type: "json", nullable: true })
  @IsOptional()
  billingAddress?: Address;

  @Column({ type: "json", nullable: true })
  @IsOptional()
  shippingAddress?: Address;

  @Column({ nullable: true })
  @IsOptional()
  trackingNumber?: string;

  @Column({ nullable: true })
  @IsOptional()
  shippingMethod?: string;

  @Column({ type: "text", nullable: true })
  @IsOptional()
  notes?: string;

  @Column({ default: false })
  isGift!: boolean;

  @Column({ type: "text", nullable: true })
  @IsOptional()
  giftMessage?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Helper method to calculate order totals
  calculateTotals(): void {
    // Reset totals
    this.subtotal = 0;

    // Calculate subtotal from items
    if (this.items && this.items.length > 0) {
      this.subtotal = this.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    }

    // Calculate final total
    this.total = this.subtotal + this.tax + this.shipping;
  }
}
