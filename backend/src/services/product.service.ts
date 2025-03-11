import { Repository, Like, FindOptionsWhere, ILike, FindOptionsOrder, Between, In, MoreThan, Not } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { StatusCode } from '../utils/constants';
import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';

// Define product filter options interface
export interface ProductFilterOptions {
  search?: string;
  category_id?: string;
  min_price?: number;
  max_price?: number;
  in_stock?: boolean;
  sortBy?: 'price' | 'createdAt' | 'name' | 'averageRating';
  sortOrder?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
}

export class ProductService {
  private productRepository: Repository<Product>;
  private categoryRepository: Repository<Category>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
    this.categoryRepository = AppDataSource.getRepository(Category);
  }

  /**
   * Get all products with filtering, sorting, and pagination
   */
  async getAllProducts(options: ProductFilterOptions = {}): Promise<{ products: Product[]; total: number; totalPages: number }> {
    try {
      const {
        search,
        category_id,
        min_price,
        max_price,
        in_stock,
        sortBy = 'createdAt',
        sortOrder = 'DESC',
        page = 1,
        limit = 10
      } = options;

      // Calculate pagination
      const skip = (page - 1) * limit;

      // Build where conditions
      const where: FindOptionsWhere<Product> = {};

      // Add search condition if specified
      if (search) {
        where.name = ILike(`%${search}%`);
        // For more complex search logic, see searchProducts method
      }

      // Add category filter if specified
      if (category_id) {
        where.category_id = category_id;
      }

      // Add price range filter if specified
      if (min_price !== undefined && max_price !== undefined) {
        where.price = Between(min_price, max_price);
      } else if (min_price !== undefined) {
        where.price = MoreThan(min_price);
      } else if (max_price !== undefined) {
        where.price = Between(0, max_price);
      }

      // Add stock filter if specified
      if (in_stock !== undefined) {
        where.stock = in_stock ? MoreThan(0) : Between(0, 0);
      }

      // Build sort order
      const order: FindOptionsOrder<Product> = {
        [sortBy]: sortOrder
      };

      // Execute query
      const [products, total] = await this.productRepository.findAndCount({
        where,
        order,
        relations: ['category'],
        skip,
        take: limit
      });

      // Calculate total pages
      const totalPages = Math.ceil(total / limit);

      return { products, total, totalPages };
    } catch (error) {
      logger.error('Error getting products:', error);
      throw new AppError('Failed to get products', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get product by ID
   */
  async getProductById(id: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
        relations: ['category'],
      });

      if (!product) {
        throw new AppError('Product not found', StatusCode.NOT_FOUND);
      }

      return product;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error getting product with ID ${id}:`, error);
      throw new AppError('Failed to get product', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Create new product
   */
  async createProduct(productData: Partial<Product>): Promise<Product> {
    try {
      // Validate category
      if (productData.category_id) {
        const category = await this.categoryRepository.findOneBy({ id: productData.category_id });
        if (!category) {
          throw new AppError('Invalid category', StatusCode.BAD_REQUEST);
        }
      }

      // Create and save the product
      const product = this.productRepository.create(productData);
      await this.productRepository.save(product);

      // Return the product with relations
      return this.getProductById(product.id);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error('Error creating product:', error);
      throw new AppError('Failed to create product', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Update product
   */
  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    try {
      // Check if product exists
      const existingProduct = await this.productRepository.findOneBy({ id });
      if (!existingProduct) {
        throw new AppError('Product not found', StatusCode.NOT_FOUND);
      }

      // Validate category
      if (productData.category_id) {
        const category = await this.categoryRepository.findOneBy({ id: productData.category_id });
        if (!category) {
          throw new AppError('Invalid category', StatusCode.BAD_REQUEST);
        }
      }

      // Update the product
      await this.productRepository.update(id, productData);

      // Return the updated product
      return this.getProductById(id);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error updating product with ID ${id}:`, error);
      throw new AppError('Failed to update product', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Delete product
   */
  async deleteProduct(id: string): Promise<void> {
    try {
      // Check if product exists
      const product = await this.productRepository.findOneBy({ id });
      if (!product) {
        throw new AppError('Product not found', StatusCode.NOT_FOUND);
      }

      // Delete the product
      await this.productRepository.delete(id);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error deleting product with ID ${id}:`, error);
      throw new AppError('Failed to delete product', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Update product stock
   */
  async updateProductStock(id: string, quantity: number): Promise<Product> {
    try {
      // Check if product exists
      const product = await this.productRepository.findOneBy({ id });
      if (!product) {
        throw new AppError('Product not found', StatusCode.NOT_FOUND);
      }

      // Update stock quantity
      product.stock = quantity;
      await this.productRepository.update(id, { stock: quantity });

      // Return the updated product
      return this.getProductById(id);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error updating stock for product ${id}:`, error);
      throw new AppError('Failed to update product stock', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Search products by name or description
   */
  async searchProducts(query: string): Promise<Product[]> {
    try {
      const products = await this.productRepository.find({
        where: [
          { name: ILike(`%${query}%`) },
          { description: ILike(`%${query}%`) }
        ],
        relations: ['category']
      });

      return products;
    } catch (error) {
      logger.error(`Error searching products with query '${query}':`, error);
      throw new AppError('Failed to search products', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    try {
      const products = await this.productRepository.find({
        where: { isFeatured: true },
        relations: ['category'],
        take: limit
      });

      return products;
    } catch (error) {
      logger.error('Error getting featured products:', error);
      throw new AppError('Failed to get featured products', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get products by category, optionally including subcategories
   */
  async getProductsByCategory(
    categoryId: string,
    options: { includeSubcategories?: boolean; page?: number; limit?: number } = {}
  ): Promise<{ products: Product[]; total: number; totalPages: number }> {
    try {
      const { includeSubcategories = false, page = 1, limit = 10 } = options;

      // Calculate pagination
      const skip = (page - 1) * limit;

      let categoryIds: string[] = [categoryId];

      // If including subcategories, get all descendant categories
      if (includeSubcategories) {
        const category = await this.categoryRepository.findOne({
          where: { id: categoryId },
          relations: ['children']
        });

        if (!category) {
          throw new AppError('Category not found', StatusCode.NOT_FOUND);
        }

        // Function to recursively get all subcategory IDs
        const getSubcategoryIds = (categories: Category[]): string[] => {
          const ids: string[] = [];
          
          for (const cat of categories) {
            ids.push(cat.id);
            if (cat.children && cat.children.length > 0) {
              ids.push(...getSubcategoryIds(cat.children));
            }
          }
          
          return ids;
        };

        // Add all child category IDs
        if (category.children.length > 0) {
          categoryIds = [...categoryIds, ...getSubcategoryIds(category.children)];
        }
      }

      // Execute query
      const [products, total] = await this.productRepository.findAndCount({
        where: {
          category_id: In(categoryIds)
        },
        relations: ['category'],
        skip,
        take: limit
      });

      // Calculate total pages
      const totalPages = Math.ceil(total / limit);

      return { products, total, totalPages };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error getting products for category ${categoryId}:`, error);
      throw new AppError('Failed to get products by category', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get related products based on category
   */
  async getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
    try {
      // Get the product to find its category
      const product = await this.getProductById(productId);
      
      // Find products in the same category, excluding the current product
      const relatedProducts = await this.productRepository.find({
        where: {
          category_id: product.category_id,
          id: Not(productId) // Exclude the current product
        },
        relations: ['category'],
        take: limit
      });

      // If not enough related products found, fetch products from any category
      if (relatedProducts.length < limit) {
        const additionalProducts = await this.productRepository.find({
          where: {
            id: Not(productId) // Exclude the current product
          },
          relations: ['category'],
          take: limit - relatedProducts.length
        });

        relatedProducts.push(...additionalProducts);
      }

      return relatedProducts;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error getting related products for product ${productId}:`, error);
      throw new AppError('Failed to get related products', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }
} 
