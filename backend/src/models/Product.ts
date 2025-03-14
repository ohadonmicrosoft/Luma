import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { Length, IsNotEmpty, Min, IsOptional, IsNumber, IsEnum, IsArray } from 'class-validator';
import { Category } from './Category';
import { OrderItem } from './OrderItem';
import { Review } from './Review';
import { WishlistItem } from './WishlistItem';

// Define a type for product attributes
type ProductAttributes = Record<string, string | number | boolean | string[] | null>;

// Define product types for tactical and outdoor equipment
export enum ProductType {
  STANDARD = 'standard',
  TACTICAL = 'tactical',
  OUTDOOR = 'outdoor',
  HOME = 'home'
}

// Define durability rating scale
export enum DurabilityRating {
  BASIC = 'basic',
  STANDARD = 'standard',
  ENHANCED = 'enhanced',
  PROFESSIONAL = 'professional',
  MILITARY = 'military'
}

// Define weather resistance levels
export enum WeatherResistance {
  NONE = 'none',
  WATER_RESISTANT = 'water-resistant',
  WEATHER_RESISTANT = 'weather-resistant',
  WATERPROOF = 'waterproof',
  ALL_WEATHER = 'all-weather'
}

// Define a type for technical specifications
interface TechnicalSpecifications {
  material?: string;
  weight?: number;
  weightUnit?: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  durabilityRating?: DurabilityRating;
  weatherResistance?: WeatherResistance;
  batteryLife?: number;
  batteryType?: string;
  maxLoad?: number;
  maxLoadUnit?: string;
  operatingTemperature?: {
    min: number;
    max: number;
    unit: string;
  };
  certifications?: string[];
  warrantyPeriod?: number;
  countryOfOrigin?: string;
}

// Define a type for usage scenarios
interface UsageScenario {
  name: string;
  description: string;
  suitabilityRating: number; // 1-5 scale
  imageUrl?: string;
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  @Length(3, 100)
  @IsNotEmpty()
  @Index()
  name!: string;

  @Column({ type: 'text' })
  @Length(10, 5000)
  @IsNotEmpty()
  description!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Min(0)
  @IsNotEmpty()
  price!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @IsOptional()
  @Min(0)
  compareAtPrice?: number;

  @Column({ default: 0 })
  @Min(0)
  stock!: number;

  @Column({ nullable: true })
  @IsOptional()
  sku?: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: false })
  isFeatured!: boolean;

  @Column({
    type: 'enum',
    enum: ProductType,
    default: ProductType.STANDARD
  })
  @IsEnum(ProductType)
  productType!: ProductType;

  @Column({ nullable: true, type: 'text', array: true })
  @IsOptional()
  @IsArray()
  images?: string[];

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  attributes?: ProductAttributes;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  technicalSpecs?: TechnicalSpecifications;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  usageScenarios?: UsageScenario[];

  @Column({ type: 'text', array: true, nullable: true })
  @IsOptional()
  compatibleWith?: string[];

  @Column({ type: 'text', array: true, nullable: true })
  @IsOptional()
  keywords?: string[];

  @Column({ nullable: true })
  @IsOptional()
  brandName?: string;

  @Column({ nullable: true })
  @IsOptional()
  brandLogo?: string;

  @Column({ nullable: true })
  @IsOptional()
  manufactureYear?: number;

  @Column({ nullable: true })
  @IsOptional()
  isDiscontinued?: boolean;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  localizedData?: Record<string, {
    name?: string;
    description?: string;
    features?: string[];
  }>;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @Column({ nullable: true })
  category_id?: string;

  @OneToMany(() => OrderItem, orderItem => orderItem.product)
  orderItems!: OrderItem[];

  @OneToMany(() => Review, review => review.product)
  reviews!: Review[];

  @OneToMany(() => WishlistItem, wishlistItem => wishlistItem.product)
  wishlistItems!: WishlistItem[];

  @Column({ default: 0 })
  averageRating!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Calculate if product is in stock
  get inStock(): boolean {
    return this.stock > 0;
  }

  // Check if this is a tactical product
  get isTactical(): boolean {
    return this.productType === ProductType.TACTICAL;
  }

  // Check if this is an outdoor product
  get isOutdoor(): boolean {
    return this.productType === ProductType.OUTDOOR;
  }

  // Get all compatible products by IDs
  async getCompatibleProducts(): Promise<string[]> {
    return this.compatibleWith || [];
  }
} 
