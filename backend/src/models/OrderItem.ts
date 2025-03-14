import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Min, IsNotEmpty } from "class-validator";
import { Order } from "./Order";
import { Product } from "./Product";

// Define a type for product attributes in order items
type OrderItemAttributes = Record<string, string | number | boolean | null>;

@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: "order_id" })
  order!: Order;

  @Column()
  order_id!: string;

  @ManyToOne(() => Product, (product) => product.orderItems)
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column()
  product_id!: string;

  @Column({ length: 255 })
  @IsNotEmpty()
  productName!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  @Min(0)
  @IsNotEmpty()
  price!: number;

  @Column()
  @Min(1)
  @IsNotEmpty()
  quantity!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  @IsNotEmpty()
  subtotal!: number;

  @Column({ type: "json", nullable: true })
  productAttributes?: OrderItemAttributes;

  @Column({ nullable: true })
  sku?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Calculate subtotal based on price and quantity
  calculateSubtotal(): void {
    this.subtotal = this.price * this.quantity;
  }
}
