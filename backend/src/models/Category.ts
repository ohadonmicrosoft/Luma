import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Length, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Product, ProductType } from './Product';

// Define a type for category attributes
type CategoryAttributes = Record<string, string | number | boolean | null>;

// Define category types for better organization
export enum CategoryType {
  STANDARD = 'standard',
  TACTICAL = 'tactical',
  OUTDOOR = 'outdoor',
  HOME = 'home',
  BRAND = 'brand',
  COLLECTION = 'collection'
}

// Define common technical specifications for categories
interface CategorySpecifications {
  filterableAttributes?: string[];
  comparableAttributes?: string[];
  sortableAttributes?: string[];
  displayOrder?: string[];
  defaultSortField?: string;
  defaultFilterValues?: Record<string, any>;
  metricUnits?: boolean;
}

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  @Length(2, 100)
  @IsNotEmpty()
  @Index()
  name!: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  description?: string;

  @Column({ nullable: true })
  @IsOptional()
  image?: string;

  @Column({ type: 'text', array: true, nullable: true })
  @IsOptional()
  bannerImages?: string[];

  @Column({ default: 0 })
  sortOrder!: number;

  @Column({
    type: 'enum',
    enum: CategoryType,
    default: CategoryType.STANDARD
  })
  @IsEnum(CategoryType)
  categoryType!: CategoryType;

  @Column({ type: 'enum', enum: ProductType, nullable: true })
  @IsOptional()
  @IsEnum(ProductType)
  defaultProductType?: ProductType;

  @ManyToOne(() => Category, category => category.children, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent?: Category;

  @Column({ nullable: true })
  parent_id?: string;

  @OneToMany(() => Category, category => category.parent)
  children!: Category[];

  @OneToMany(() => Product, product => product.category)
  products!: Product[];

  @Column({ default: true })
  isActive!: boolean;

  @Column({ nullable: true })
  @IsOptional()
  slug?: string;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  attributes?: CategoryAttributes;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  specifications?: CategorySpecifications;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  localizedData?: Record<string, {
    name?: string;
    description?: string;
    metaTitle?: string;
    metaDescription?: string;
  }>;

  @Column({ nullable: true })
  @IsOptional()
  iconUrl?: string;

  @Column({ type: 'text', array: true, nullable: true })
  @IsOptional()
  relatedCategories?: string[];

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  featuredAttributes?: {
    name: string;
    icon?: string;
    description?: string;
  }[];

  @Column({ nullable: true })
  @IsOptional()
  metaTitle?: string;

  @Column({ nullable: true })
  @IsOptional()
  metaDescription?: string;

  @Column({ type: 'text', array: true, nullable: true })
  @IsOptional()
  keywords?: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Helper method to get full category path (Breadcrumb)
  async getPath(): Promise<string[]> {
    // Use a recursive approach instead of aliasing this
    const getParentPath = async (category: Category): Promise<string[]> => {
      if (category.parent_id && category.parent) {
        return [category.parent.name, ...await getParentPath(category.parent)];
      }
      return [];
    };
    
    // Get parent names and add to path
    const parentNames = await getParentPath(this);
    return [...parentNames, this.name];
  }

  // Check if this is a tactical category
  get isTactical(): boolean {
    return this.categoryType === CategoryType.TACTICAL;
  }

  // Check if this is an outdoor category
  get isOutdoor(): boolean {
    return this.categoryType === CategoryType.OUTDOOR;
  }

  // Get localized name based on language
  getLocalizedName(locale: string = 'en'): string {
    if (this.localizedData && this.localizedData[locale] && this.localizedData[locale].name) {
      return this.localizedData[locale].name || this.name;
    }
    return this.name;
  }

  // Get localized description based on language
  getLocalizedDescription(locale: string = 'en'): string | undefined {
    if (this.localizedData && this.localizedData[locale] && this.localizedData[locale].description) {
      return this.localizedData[locale].description;
    }
    return this.description;
  }
} 
