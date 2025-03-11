import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Min, Max, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { User } from './User';
import { Product } from './Product';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, user => user.reviews)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column()
  @Index()
  user_id!: string;

  @ManyToOne(() => Product, product => product.reviews)
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Column()
  @Index()
  product_id!: string;

  @Column({ type: 'int' })
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating!: number;

  @Column({ type: 'text' })
  @Length(3, 1000)
  @IsNotEmpty()
  comment!: string;

  @Column({ type: 'text', array: true, nullable: true })
  @IsOptional()
  images?: string[];

  @Column({ default: true })
  isVerifiedPurchase!: boolean;

  @Column({ default: 0 })
  helpfulVotes!: number;

  @Column({ default: false })
  isApproved!: boolean;

  @Column({ nullable: true })
  @IsOptional()
  title?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
} 
