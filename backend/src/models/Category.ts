import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Length, IsNotEmpty, IsOptional } from 'class-validator';
import { Product } from './Product';

// Define a type for category attributes
type CategoryAttributes = Record<string, string | number | boolean | null>;

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

  @Column({ default: 0 })
  sortOrder!: number;

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
} 
