import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { StatusCode } from '../utils/constants';
import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';

export class ProductController {
  private productService: ProductService;
  private categoryService: CategoryService;

  constructor() {
    this.productService = new ProductService();
    this.categoryService = new CategoryService();
  }

  /**
   * Get all products with filtering and pagination
   */
  getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        search,
        category_id,
        min_price,
        max_price,
        in_stock,
        sort_by = 'createdAt',
        sort_order = 'DESC',
        page = 1,
        limit = 10
      } = req.query;

      // Convert query parameters to appropriate types
      const filterOptions = {
        search: search as string,
        category_id: category_id as string,
        min_price: min_price ? parseFloat(min_price as string) : undefined,
        max_price: max_price ? parseFloat(max_price as string) : undefined,
        in_stock: in_stock === 'true',
        sortBy: sort_by as string,
        sortOrder: sort_order as 'ASC' | 'DESC',
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10)
      };

      const { products, total, totalPages } = await this.productService.getAllProducts(filterOptions);

      // Return response
      res.status(StatusCode.OK).json({
        success: true,
        data: products,
        pagination: {
          total,
          page: filterOptions.page,
          limit: filterOptions.limit,
          totalPages
        }
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get product by ID
   */
  getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(id);

      res.status(StatusCode.OK).json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create new product
   */
  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productData = req.body;

      // Check if category exists
      if (productData.category_id) {
        await this.categoryService.getCategoryById(productData.category_id);
      }

      const product = await this.productService.createProduct(productData);

      res.status(StatusCode.CREATED).json({
        success: true,
        data: product,
        message: 'Product created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update product
   */
  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const productData = req.body;

      // Check if category exists
      if (productData.category_id) {
        await this.categoryService.getCategoryById(productData.category_id);
      }

      const product = await this.productService.updateProduct(id, productData);

      res.status(StatusCode.OK).json({
        success: true,
        data: product,
        message: 'Product updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete product
   */
  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.productService.deleteProduct(id);

      res.status(StatusCode.OK).json({
        success: true,
        message: 'Product deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update product stock
   */
  updateProductStock = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      if (typeof quantity !== 'number') {
        throw new AppError('Quantity must be a number', StatusCode.BAD_REQUEST);
      }

      const product = await this.productService.updateProductStock(id, quantity);

      res.status(StatusCode.OK).json({
        success: true,
        data: product,
        message: 'Product stock updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Search products
   */
  searchProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query } = req.query;

      if (!query) {
        throw new AppError('Search query is required', StatusCode.BAD_REQUEST);
      }

      const products = await this.productService.searchProducts(query as string);

      res.status(StatusCode.OK).json({
        success: true,
        data: products
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get featured products
   */
  getFeaturedProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 8;
      const products = await this.productService.getFeaturedProducts(limit);

      res.status(StatusCode.OK).json({
        success: true,
        data: products
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get products by category
   */
  getProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { categoryId } = req.params;
      const { include_subcategories, page, limit } = req.query;

      // Check if category exists
      await this.categoryService.getCategoryById(categoryId);

      const options = {
        includeSubcategories: include_subcategories === 'true',
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 10
      };

      const { products, total, totalPages } = await this.productService.getProductsByCategory(
        categoryId,
        options
      );

      res.status(StatusCode.OK).json({
        success: true,
        data: products,
        pagination: {
          total,
          page: options.page,
          limit: options.limit,
          totalPages
        }
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get related products
   */
  getRelatedProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 4;

      const products = await this.productService.getRelatedProducts(id, limit);

      res.status(StatusCode.OK).json({
        success: true,
        data: products
      });
    } catch (error) {
      next(error);
    }
  };
} 
