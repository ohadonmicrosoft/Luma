import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Subscription } from "./Subscription";
import { Product } from "./Product";

@Entity("subscription_items")
export class SubscriptionItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  subscription_id!: string;

  @ManyToOne(() => Subscription, (subscription) => subscription.items, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "subscription_id" })
  subscription!: Subscription;

  @Column()
  product_id!: string;

  @ManyToOne(() => Product, { onDelete: "CASCADE" })
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column({ default: 1 })
  quantity!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Column({ type: "json", nullable: true })
  selected_options?: Record<string, string | number | boolean>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
