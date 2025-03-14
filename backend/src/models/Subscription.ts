import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { SubscriptionItem } from "./SubscriptionItem";

// Subscription frequency options
export enum SubscriptionFrequency {
  WEEKLY = "weekly",
  BIWEEKLY = "biweekly",
  MONTHLY = "monthly",
  BIMONTHLY = "bimonthly",
  QUARTERLY = "quarterly",
}

// Subscription status
export enum SubscriptionStatus {
  ACTIVE = "active",
  PAUSED = "paused",
  CANCELLED = "cancelled",
  PAYMENT_FAILED = "payment_failed",
  COMPLETED = "completed",
}

@Entity("subscriptions")
export class Subscription {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: true })
  user_id?: string;

  @ManyToOne(() => User, (user) => user.subscriptions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user?: User;

  @Column({
    type: "enum",
    enum: SubscriptionFrequency,
    default: SubscriptionFrequency.MONTHLY,
  })
  frequency!: SubscriptionFrequency;

  @Column({
    type: "enum",
    enum: SubscriptionStatus,
    default: SubscriptionStatus.ACTIVE,
  })
  status!: SubscriptionStatus;

  @Column({ type: "timestamp", nullable: true })
  last_order_date?: Date;

  @Column({ type: "timestamp", nullable: true })
  next_order_date?: Date;

  @Column({ type: "timestamp", nullable: true })
  cancelled_at?: Date;

  @Column({ default: 0, type: "decimal", precision: 10, scale: 2 })
  amount!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  discount!: number;

  @Column({ nullable: true })
  stripe_subscription_id?: string;

  @Column({ nullable: true })
  coupon_code?: string;

  @Column({ default: false })
  auto_renew!: boolean;

  @Column({ type: "json", nullable: true })
  billing_address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };

  @Column({ type: "json", nullable: true })
  shipping_address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };

  @Column({ nullable: true })
  payment_method_id?: string;

  @OneToMany(() => SubscriptionItem, (item) => item.subscription, {
    cascade: true,
  })
  items!: SubscriptionItem[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  /**
   * Calculate the total amount for the subscription
   */
  calculateTotal(): number {
    let total = 0;
    if (this.items && this.items.length > 0) {
      total = this.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    }

    // Apply discount if any
    if (this.discount > 0) {
      total = total - this.discount;
      if (total < 0) total = 0;
    }

    this.amount = parseFloat(total.toFixed(2));
    return this.amount;
  }

  /**
   * Get the next order date based on frequency
   */
  calculateNextOrderDate(): Date {
    const nextDate = new Date(this.last_order_date || new Date());

    switch (this.frequency) {
      case SubscriptionFrequency.WEEKLY:
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case SubscriptionFrequency.BIWEEKLY:
        nextDate.setDate(nextDate.getDate() + 14);
        break;
      case SubscriptionFrequency.MONTHLY:
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
      case SubscriptionFrequency.BIMONTHLY:
        nextDate.setMonth(nextDate.getMonth() + 2);
        break;
      case SubscriptionFrequency.QUARTERLY:
        nextDate.setMonth(nextDate.getMonth() + 3);
        break;
      default:
        nextDate.setMonth(nextDate.getMonth() + 1);
    }

    this.next_order_date = nextDate;
    return nextDate;
  }
}
