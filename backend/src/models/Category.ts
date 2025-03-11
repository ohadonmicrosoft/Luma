import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Length, IsNotEmpty, IsOptional } from 'class-validator';
import { Product } from './Product';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  @Length(2, 100)
  @IsNotEmpty()
  @Index()
  name: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  description: string;

  @Column({ nullable: true })
  @IsOptional()
  image: string;

  @Column({ default: 0 })
  sortOrder: number;

  @ManyToOne(() => Category, category => category.children, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Category;

  @Column({ nullable: true })
  parent_id: string;

  @OneToMany(() => Category, category => category.parent)
  children: Category[];

  @OneToMany(() => Product, product => product.category)
  products: Product[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  @IsOptional()
  slug: string;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  attributes: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Helper method to get full category path (Breadcrumb)
  async getPath(): Promise<string[]> {
    const path: string[] = [this.name];
    let current = this;

    while (current.parent_id) {
      // We would need to load the parent here
      // This is a simplified version
      path.unshift(current.parent.name);
      current = current.parent;
    }

    return path;
  }
} 
