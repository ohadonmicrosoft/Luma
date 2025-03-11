import { Repository, FindOptionsWhere, ILike, IsNull } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { StatusCode } from '../utils/constants';
import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';

// Define category filter options interface
export interface CategoryFilterOptions {
  search?: string;
  parent_id?: string | null;
  isActive?: boolean;
  sortBy?: 'name' | 'sortOrder' | 'createdAt';
  sortOrder?: 'ASC' | 'DESC';
}

export class CategoryService {
  private categoryRepository: Repository<Category>;
  private productRepository: Repository<Product>;

  constructor() {
    this.categoryRepository = AppDataSource.getRepository(Category);
    this.productRepository = AppDataSource.getRepository(Product);
  }

  /**
   * Get all categories with filtering and sorting
   */
  async getAllCategories(options: CategoryFilterOptions = {}): Promise<Category[]> {
    try {
      const {
        search,
        parent_id,
        isActive = true,
        sortBy = 'sortOrder',
        sortOrder = 'ASC'
      } = options;

      // Build where conditions
      const where: FindOptionsWhere<Category> = {};

      // Add basic filters
      if (isActive !== undefined) {
        where.isActive = isActive;
      }
      
      // Handle parent_id filter (including root categories with null parent_id)
      if (parent_id === null) {
        where.parent_id = IsNull();
      } else if (parent_id !== undefined) {
        where.parent_id = parent_id;
      }
      
      // Add search condition if specified
      if (search) {
        where.name = ILike(`%${search}%`);
      }

      // Execute query
      const categories = await this.categoryRepository.find({
        where,
        order: {
          [sortBy]: sortOrder
        },
        relations: ['parent', 'children']
      });

      return categories;
    } catch (error) {
      logger.error('Error getting categories:', error);
      throw new AppError('Failed to get categories', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get category by ID
   */
  async getCategoryById(id: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id },
        relations: ['parent', 'children']
      });

      if (!category) {
        throw new AppError('Category not found', StatusCode.NOT_FOUND);
      }

      return category;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error getting category with ID ${id}:`, error);
      throw new AppError('Failed to get category', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Create new category
   */
  async createCategory(categoryData: Partial<Category>): Promise<Category> {
    try {
      // Validate parent category if provided
      if (categoryData.parent_id) {
        const parentCategory = await this.categoryRepository.findOneBy({ id: categoryData.parent_id });
        if (!parentCategory) {
          throw new AppError('Invalid parent category', StatusCode.BAD_REQUEST);
        }
      }

      // Create and save the category
      const category = this.categoryRepository.create(categoryData);
      await this.categoryRepository.save(category);

      // Return the category with relations
      return this.getCategoryById(category.id);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error('Error creating category:', error);
      throw new AppError('Failed to create category', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Update category
   */
  async updateCategory(id: string, categoryData: Partial<Category>): Promise<Category> {
    try {
      // Check if category exists
      const existingCategory = await this.categoryRepository.findOneBy({ id });
      if (!existingCategory) {
        throw new AppError('Category not found', StatusCode.NOT_FOUND);
      }

      // Validate parent category if provided and ensure no circular reference
      if (categoryData.parent_id) {
        // Cannot set parent to itself
        if (categoryData.parent_id === id) {
          throw new AppError('Category cannot be its own parent', StatusCode.BAD_REQUEST);
        }

        const parentCategory = await this.categoryRepository.findOneBy({ id: categoryData.parent_id });
        if (!parentCategory) {
          throw new AppError('Invalid parent category', StatusCode.BAD_REQUEST);
        }

        // Check if the new parent is not a child of the current category
        // to prevent circular references
        const children = await this.getDescendantCategories(id);
        if (children.some(child => child.id === categoryData.parent_id)) {
          throw new AppError('Cannot set a child category as parent', StatusCode.BAD_REQUEST);
        }
      }

      // Update the category
      await this.categoryRepository.update(id, categoryData);

      // Return the updated category
      return this.getCategoryById(id);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error updating category with ID ${id}:`, error);
      throw new AppError('Failed to update category', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Delete category
   */
  async deleteCategory(id: string): Promise<void> {
    try {
      // Start a transaction
      await AppDataSource.transaction(async transactionalEntityManager => {
        // Check if category exists
        const category = await transactionalEntityManager.findOne(Category, {
          where: { id },
          relations: ['children', 'products']
        });

        if (!category) {
          throw new AppError('Category not found', StatusCode.NOT_FOUND);
        }

        // Check if category has children
        if (category.children && category.children.length > 0) {
          throw new AppError('Cannot delete category with subcategories', StatusCode.BAD_REQUEST);
        }

        // Check if category has products
        if (category.products && category.products.length > 0) {
          // Either throw error or handle products (e.g., set their category to null)
          throw new AppError('Cannot delete category with associated products', StatusCode.BAD_REQUEST);
        }

        // Delete the category
        await transactionalEntityManager.delete(Category, id);
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error deleting category with ID ${id}:`, error);
      throw new AppError('Failed to delete category', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get root categories (categories without a parent)
   */
  async getRootCategories(): Promise<Category[]> {
    try {
      return this.getAllCategories({ parent_id: null });
    } catch (error) {
      logger.error('Error getting root categories:', error);
      throw new AppError('Failed to get root categories', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get subcategories of a category
   */
  async getSubcategories(parentId: string): Promise<Category[]> {
    try {
      return this.getAllCategories({ parent_id: parentId });
    } catch (error) {
      logger.error(`Error getting subcategories for category ${parentId}:`, error);
      throw new AppError('Failed to get subcategories', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get category tree (hierarchical structure)
   */
  async getCategoryTree(): Promise<Category[]> {
    try {
      // Get root categories first
      const rootCategories = await this.getRootCategories();

      // For each root category, recursively get its children
      for (const category of rootCategories) {
        await this.populateCategoryChildren(category);
      }

      return rootCategories;
    } catch (error) {
      logger.error('Error getting category tree:', error);
      throw new AppError('Failed to get category tree', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Helper method to recursively populate a category's children
   */
  private async populateCategoryChildren(category: Category): Promise<void> {
    // Get direct children
    const children = await this.getSubcategories(category.id);
    category.children = children;

    // Recursively populate each child's children
    for (const child of children) {
      await this.populateCategoryChildren(child);
    }
  }

  /**
   * Get category path (breadcrumb)
   */
  async getCategoryPath(id: string): Promise<Category[]> {
    try {
      const path: Category[] = [];
      let currentCategory = await this.getCategoryById(id);
      
      path.unshift(currentCategory);
      
      while (currentCategory.parent_id) {
        currentCategory = await this.getCategoryById(currentCategory.parent_id);
        path.unshift(currentCategory);
      }
      
      return path;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error getting path for category ${id}:`, error);
      throw new AppError('Failed to get category path', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get all descendant categories (children, grandchildren, etc.)
   */
  async getDescendantCategories(id: string): Promise<Category[]> {
    try {
      const result: Category[] = [];
      const category = await this.getCategoryById(id);
      
      // Add direct children
      result.push(...category.children);
      
      // Recursively add descendants of each child
      for (const child of category.children) {
        const descendants = await this.getDescendantCategories(child.id);
        result.push(...descendants);
      }
      
      return result;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error getting descendants for category ${id}:`, error);
      throw new AppError('Failed to get category descendants', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }
} 
