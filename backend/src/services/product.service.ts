import {
  Repository,
  FindOptionsWhere,
  ILike,
  FindOptionsOrder,
  Between,
  In,
  MoreThan,
  Not,
  Like,
  IsNull,
} from "typeorm";
import { AppDataSource } from "../config/database";
import {
  Product,
  ProductType,
  DurabilityRating,
  WeatherResistance,
} from "../models/Product";
import { Category } from "../models/Category";
import { StatusCode } from "../utils/constants";
import { AppError } from "../utils/AppError";
import { logger } from "../utils/logger";

// Define product filter options interface
export interface ProductFilterOptions {
  search?: string;
  category_id?: string;
  min_price?: number;
  max_price?: number;
  in_stock?: boolean;
  productType?: ProductType;
  durabilityRating?: DurabilityRating;
  weatherResistance?: WeatherResistance;
  material?: string;
  minWeight?: number;
  maxWeight?: number;
  hasTechnicalSpecs?: boolean;
  compatibleWith?: string;
  keywords?: string;
  brandName?: string;
  sortBy?: "price" | "createdAt" | "name" | "averageRating" | string;
  sortOrder?: "ASC" | "DESC";
  page?: number;
  limit?: number;
}

// Define technical specifications filter options
export interface TechnicalSpecsFilterOptions {
  material?: string;
  minWeight?: number;
  maxWeight?: number;
  durabilityRating?: DurabilityRating;
  weatherResistance?: WeatherResistance;
  productType?: ProductType;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  locale?: string;
}

// Define options for getting a product
export interface ProductOptions {
  includeCompatible?: boolean;
  locale?: string;
}

// Define options for search
export interface SearchOptions {
  productType?: ProductType;
  locale?: string;
}

// Define options for featured products
export interface FeaturedProductOptions {
  limit?: number;
  productType?: ProductType;
  locale?: string;
}

// Define options for getting products by category
export interface CategoryProductOptions {
  includeSubcategories?: boolean;
  productType?: ProductType;
  durabilityRating?: DurabilityRating;
  weatherResistance?: WeatherResistance;
  minPrice?: number;
  maxPrice?: number;
  locale?: string;
  page?: number;
  limit?: number;
}

// Define options for related products
export interface RelatedProductOptions {
  limit?: number;
  locale?: string;
}

// Define usage scenario interface
export interface UsageScenarioData {
  name: string;
  description: string;
  suitabilityRating: number;
  imageUrl?: string;
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
  async getAllProducts(
    options: ProductFilterOptions = {}
  ): Promise<{ products: Product[]; total: number; totalPages: number }> {
    try {
      const {
        search,
        category_id,
        min_price,
        max_price,
        in_stock,
        productType,
        durabilityRating,
        weatherResistance,
        material,
        minWeight,
        maxWeight,
        hasTechnicalSpecs,
        compatibleWith,
        keywords,
        brandName,
        sortBy = "createdAt",
        sortOrder = "DESC",
        page = 1,
        limit = 10,
      } = options;

      // Calculate pagination
      const skip = (page - 1) * limit;

      // Build base query
      const query: FindOptionsWhere<Product> = {};

      // Add filters
      if (search) {
        query.name = ILike(`%${search}%`);
      }

      if (category_id) {
        query.category_id = category_id;
      }

      if (min_price !== undefined && max_price !== undefined) {
        query.price = Between(min_price, max_price);
      } else if (min_price !== undefined) {
        query.price = MoreThan(min_price);
      }

      if (in_stock) {
        query.stock = MoreThan(0);
      }

      if (productType) {
        query.productType = productType;
      }

      if (brandName) {
        query.brandName = ILike(`%${brandName}%`);
      }

      // Handle technical specifications filtering
      const technicalSpecsConditions: any[] = [];

      if (durabilityRating) {
        technicalSpecsConditions.push(
          `"technicalSpecs"->>'durabilityRating' = '${durabilityRating}'`
        );
      }

      if (weatherResistance) {
        technicalSpecsConditions.push(
          `"technicalSpecs"->>'weatherResistance' = '${weatherResistance}'`
        );
      }

      if (material) {
        technicalSpecsConditions.push(
          `"technicalSpecs"->>'material' ILIKE '%${material}%'`
        );
      }

      if (minWeight !== undefined && maxWeight !== undefined) {
        technicalSpecsConditions.push(
          `("technicalSpecs"->>'weight')::float BETWEEN ${minWeight} AND ${maxWeight}`
        );
      } else if (minWeight !== undefined) {
        technicalSpecsConditions.push(
          `("technicalSpecs"->>'weight')::float >= ${minWeight}`
        );
      } else if (maxWeight !== undefined) {
        technicalSpecsConditions.push(
          `("technicalSpecs"->>'weight')::float <= ${maxWeight}`
        );
      }

      if (hasTechnicalSpecs) {
        technicalSpecsConditions.push(`"technicalSpecs" IS NOT NULL`);
      }

      if (compatibleWith) {
        technicalSpecsConditions.push(
          `'${compatibleWith}' = ANY("compatibleWith")`
        );
      }

      if (keywords) {
        technicalSpecsConditions.push(`'${keywords}' = ANY("keywords")`);
      }

      // Set sort order
      const order: FindOptionsOrder<Product> = {};
      if (
        sortBy === "price" ||
        sortBy === "createdAt" ||
        sortBy === "name" ||
        sortBy === "averageRating"
      ) {
        order[sortBy] = sortOrder;
      } else {
        order.createdAt = sortOrder;
      }

      // Create query builder for complex queries
      let queryBuilder = this.productRepository.createQueryBuilder("product");

      // Join with category if needed
      if (category_id) {
        queryBuilder = queryBuilder.leftJoinAndSelect(
          "product.category",
          "category"
        );
      }

      // Apply regular where conditions
      for (const [key, value] of Object.entries(query)) {
        queryBuilder = queryBuilder.andWhere(`product.${key} = :${key}`, {
          [key]: value,
        });
      }

      // Apply technical specs conditions
      if (technicalSpecsConditions.length > 0) {
        technicalSpecsConditions.forEach((condition, index) => {
          queryBuilder = queryBuilder.andWhere(condition);
        });
      }

      // Get total count for pagination
      const total = await queryBuilder.getCount();

      // Apply sorting and pagination
      queryBuilder = queryBuilder
        .orderBy(`product.${Object.keys(order)[0]}`, Object.values(order)[0])
        .skip(skip)
        .take(limit);

      // Execute query
      const products = await queryBuilder.getMany();

      // Calculate total pages
      const totalPages = Math.ceil(total / limit);

      return { products, total, totalPages };
    } catch (error) {
      logger.error("Error getting products:", error);
      throw new AppError(
        "Failed to retrieve products",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Get product by ID
   */
  async getProductById(
    id: string,
    options: ProductOptions = {}
  ): Promise<Product> {
    try {
      const { includeCompatible = false, locale } = options;

      // Build query
      const queryBuilder = this.productRepository
        .createQueryBuilder("product")
        .leftJoinAndSelect("product.category", "category")
        .where("product.id = :id", { id });

      // Execute query
      const product = await queryBuilder.getOne();

      if (!product) {
        throw new AppError("Product not found", StatusCode.NOT_FOUND);
      }

      // Get compatible products if needed
      if (
        includeCompatible &&
        product.compatibleWith &&
        product.compatibleWith.length > 0
      ) {
        const compatibleProducts = await this.productRepository.find({
          where: { id: In(product.compatibleWith) },
        });

        // Add to product response
        (product as any).compatibleProducts = compatibleProducts;
      }

      // Handle localization if needed
      if (locale && product.localizedData && product.localizedData[locale]) {
        const localizedData = product.localizedData[locale];

        // Apply localized data
        if (localizedData.name) {
          (product as any).localizedName = localizedData.name;
        }

        if (localizedData.description) {
          (product as any).localizedDescription = localizedData.description;
        }

        if (localizedData.features) {
          (product as any).localizedFeatures = localizedData.features;
        }
      }

      return product;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      logger.error("Error getting product by ID:", error);
      throw new AppError(
        "Failed to retrieve product",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Create new product
   */
  async createProduct(productData: Partial<Product>): Promise<Product> {
    try {
      const product = this.productRepository.create(productData);

      // Apply defaults based on product type if needed
      if (
        product.productType === ProductType.TACTICAL &&
        !product.technicalSpecs
      ) {
        product.technicalSpecs = {
          durabilityRating: DurabilityRating.STANDARD,
          weatherResistance: WeatherResistance.NONE,
        };
      }

      await this.productRepository.save(product);
      return product;
    } catch (error) {
      logger.error("Error creating product:", error);
      throw new AppError(
        "Failed to create product",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Update product
   */
  async updateProduct(
    id: string,
    productData: Partial<Product>
  ): Promise<Product> {
    try {
      // Find product first
      const product = await this.getProductById(id);

      // Update product
      this.productRepository.merge(product, productData);

      await this.productRepository.save(product);
      return product;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      logger.error("Error updating product:", error);
      throw new AppError(
        "Failed to update product",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Delete product
   */
  async deleteProduct(id: string): Promise<void> {
    try {
      // Find product first
      const product = await this.getProductById(id);

      // Delete product
      await this.productRepository.remove(product);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      logger.error("Error deleting product:", error);
      throw new AppError(
        "Failed to delete product",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Update product stock
   */
  async updateProductStock(id: string, quantity: number): Promise<Product> {
    try {
      // Find product first
      const product = await this.getProductById(id);

      // Update stock
      product.stock = Math.max(0, quantity);

      await this.productRepository.save(product);
      return product;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      logger.error("Error updating product stock:", error);
      throw new AppError(
        "Failed to update product stock",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Search products
   */
  async searchProducts(
    query: string,
    options: SearchOptions = {}
  ): Promise<Product[]> {
    try {
      const { productType, locale } = options;

      // Build query
      const queryBuilder = this.productRepository
        .createQueryBuilder("product")
        .where("product.name ILIKE :query", { query: `%${query}%` })
        .orWhere("product.description ILIKE :query", { query: `%${query}%` })
        .orWhere(":query = ANY(product.keywords)", { query });

      // Filter by product type if specified
      if (productType) {
        queryBuilder.andWhere("product.productType = :productType", {
          productType,
        });
      }

      // Limit results
      queryBuilder.take(20);

      // Execute query
      const products = await queryBuilder.getMany();

      // Handle localization if needed
      if (locale) {
        products.forEach((product) => {
          if (product.localizedData && product.localizedData[locale]) {
            const localizedData = product.localizedData[locale];

            if (localizedData.name) {
              (product as any).localizedName = localizedData.name;
            }

            if (localizedData.description) {
              (product as any).localizedDescription = localizedData.description;
            }
          }
        });
      }

      return products;
    } catch (error) {
      logger.error("Error searching products:", error);
      throw new AppError(
        "Failed to search products",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(
    options: FeaturedProductOptions = {}
  ): Promise<Product[]> {
    try {
      const { limit = 8, productType, locale } = options;

      // Build query
      const queryBuilder = this.productRepository
        .createQueryBuilder("product")
        .where("product.isFeatured = :isFeatured", { isFeatured: true });

      // Filter by product type if specified
      if (productType) {
        queryBuilder.andWhere("product.productType = :productType", {
          productType,
        });
      }

      // Limit results
      queryBuilder.take(limit);

      // Execute query
      const products = await queryBuilder.getMany();

      // Handle localization if needed
      if (locale) {
        products.forEach((product) => {
          if (product.localizedData && product.localizedData[locale]) {
            const localizedData = product.localizedData[locale];

            if (localizedData.name) {
              (product as any).localizedName = localizedData.name;
            }

            if (localizedData.description) {
              (product as any).localizedDescription = localizedData.description;
            }
          }
        });
      }

      return products;
    } catch (error) {
      logger.error("Error getting featured products:", error);
      throw new AppError(
        "Failed to retrieve featured products",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(
    categoryId: string,
    options: CategoryProductOptions = {}
  ): Promise<{ products: Product[]; total: number; totalPages: number }> {
    try {
      const {
        includeSubcategories = false,
        productType,
        durabilityRating,
        weatherResistance,
        minPrice,
        maxPrice,
        locale,
        page = 1,
        limit = 10,
      } = options;

      // Calculate pagination
      const skip = (page - 1) * limit;

      // Find the category first
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
        relations: ["children"],
      });

      if (!category) {
        throw new AppError("Category not found", StatusCode.NOT_FOUND);
      }

      // Get all subcategory IDs if needed
      let categoryIds = [categoryId];

      if (includeSubcategories && category.children.length > 0) {
        // Recursive function to get all subcategory IDs
        const getSubcategoryIds = (categories: Category[]): string[] => {
          let ids: string[] = [];

          categories.forEach((cat) => {
            ids.push(cat.id);
            if (cat.children && cat.children.length > 0) {
              ids = [...ids, ...getSubcategoryIds(cat.children)];
            }
          });

          return ids;
        };

        categoryIds = [...categoryIds, ...getSubcategoryIds(category.children)];
      }

      // Build query
      const queryBuilder = this.productRepository
        .createQueryBuilder("product")
        .where("product.category_id IN (:...categoryIds)", { categoryIds });

      // Apply additional filters
      if (productType) {
        queryBuilder.andWhere("product.productType = :productType", {
          productType,
        });
      }

      if (minPrice !== undefined && maxPrice !== undefined) {
        queryBuilder.andWhere("product.price BETWEEN :minPrice AND :maxPrice", {
          minPrice,
          maxPrice,
        });
      } else if (minPrice !== undefined) {
        queryBuilder.andWhere("product.price >= :minPrice", { minPrice });
      } else if (maxPrice !== undefined) {
        queryBuilder.andWhere("product.price <= :maxPrice", { maxPrice });
      }

      // Handle technical specifications filtering
      if (durabilityRating) {
        queryBuilder.andWhere(
          `"technicalSpecs"->>'durabilityRating' = :durabilityRating`,
          { durabilityRating }
        );
      }

      if (weatherResistance) {
        queryBuilder.andWhere(
          `"technicalSpecs"->>'weatherResistance' = :weatherResistance`,
          { weatherResistance }
        );
      }

      // Get total count for pagination
      const total = await queryBuilder.getCount();

      // Apply pagination
      queryBuilder.skip(skip).take(limit);

      // Execute query
      const products = await queryBuilder.getMany();

      // Handle localization if needed
      if (locale) {
        products.forEach((product) => {
          if (product.localizedData && product.localizedData[locale]) {
            const localizedData = product.localizedData[locale];

            if (localizedData.name) {
              (product as any).localizedName = localizedData.name;
            }

            if (localizedData.description) {
              (product as any).localizedDescription = localizedData.description;
            }
          }
        });
      }

      // Calculate total pages
      const totalPages = Math.ceil(total / limit);

      return { products, total, totalPages };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      logger.error("Error getting products by category:", error);
      throw new AppError(
        "Failed to retrieve products",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Get related products
   */
  async getRelatedProducts(
    productId: string,
    options: RelatedProductOptions = {}
  ): Promise<Product[]> {
    try {
      const { limit = 4, locale } = options;

      // Find the product first
      const product = await this.getProductById(productId);

      // Get products in the same category
      const queryBuilder = this.productRepository
        .createQueryBuilder("product")
        .where("product.category_id = :categoryId", {
          categoryId: product.category_id,
        })
        .andWhere("product.id != :productId", { productId })
        .take(limit);

      // Execute query
      const products = await queryBuilder.getMany();

      // Handle localization if needed
      if (locale) {
        products.forEach((product) => {
          if (product.localizedData && product.localizedData[locale]) {
            const localizedData = product.localizedData[locale];

            if (localizedData.name) {
              (product as any).localizedName = localizedData.name;
            }

            if (localizedData.description) {
              (product as any).localizedDescription = localizedData.description;
            }
          }
        });
      }

      return products;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      logger.error("Error getting related products:", error);
      throw new AppError(
        "Failed to retrieve related products",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Get compatible products
   */
  async getCompatibleProducts(
    productId: string,
    locale?: string
  ): Promise<Product[]> {
    try {
      // Find the product first
      const product = await this.getProductById(productId);

      // Check if product has compatible products
      if (!product.compatibleWith || product.compatibleWith.length === 0) {
        return [];
      }

      // Get compatible products
      const compatibleProducts = await this.productRepository.find({
        where: { id: In(product.compatibleWith) },
      });

      // Handle localization if needed
      if (locale) {
        compatibleProducts.forEach((product) => {
          if (product.localizedData && product.localizedData[locale]) {
            const localizedData = product.localizedData[locale];

            if (localizedData.name) {
              (product as any).localizedName = localizedData.name;
            }

            if (localizedData.description) {
              (product as any).localizedDescription = localizedData.description;
            }
          }
        });
      }

      return compatibleProducts;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      logger.error("Error getting compatible products:", error);
      throw new AppError(
        "Failed to retrieve compatible products",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Update technical specifications
   */
  async updateTechnicalSpecs(
    id: string,
    technicalSpecs: any
  ): Promise<Product> {
    try {
      // Find product first
      const product = await this.getProductById(id);

      // Update technical specs
      product.technicalSpecs = {
        ...(product.technicalSpecs || {}),
        ...technicalSpecs,
      };

      await this.productRepository.save(product);
      return product;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      logger.error("Error updating technical specifications:", error);
      throw new AppError(
        "Failed to update technical specifications",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Add usage scenario
   */
  async addUsageScenario(
    id: string,
    scenarioData: UsageScenarioData
  ): Promise<Product> {
    try {
      // Find product first
      const product = await this.getProductById(id);

      // Initialize usageScenarios if not exists
      if (!product.usageScenarios) {
        product.usageScenarios = [];
      }

      // Add new scenario
      product.usageScenarios.push(scenarioData);

      await this.productRepository.save(product);
      return product;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      logger.error("Error adding usage scenario:", error);
      throw new AppError(
        "Failed to add usage scenario",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Filter products by technical specifications
   */
  async filterByTechnicalSpecs(
    options: TechnicalSpecsFilterOptions
  ): Promise<{ products: Product[]; total: number; totalPages: number }> {
    try {
      const {
        material,
        minWeight,
        maxWeight,
        durabilityRating,
        weatherResistance,
        productType,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10,
        locale,
      } = options;

      // Calculate pagination
      const skip = (page - 1) * limit;

      // Build query
      const queryBuilder = this.productRepository.createQueryBuilder("product");

      // Apply technical specs filters
      if (material) {
        queryBuilder.andWhere(`"technicalSpecs"->>'material' ILIKE :material`, {
          material: `%${material}%`,
        });
      }

      if (minWeight !== undefined && maxWeight !== undefined) {
        queryBuilder.andWhere(
          `("technicalSpecs"->>'weight')::float BETWEEN :minWeight AND :maxWeight`,
          { minWeight, maxWeight }
        );
      } else if (minWeight !== undefined) {
        queryBuilder.andWhere(
          `("technicalSpecs"->>'weight')::float >= :minWeight`,
          { minWeight }
        );
      } else if (maxWeight !== undefined) {
        queryBuilder.andWhere(
          `("technicalSpecs"->>'weight')::float <= :maxWeight`,
          { maxWeight }
        );
      }

      if (durabilityRating) {
        queryBuilder.andWhere(
          `"technicalSpecs"->>'durabilityRating' = :durabilityRating`,
          { durabilityRating }
        );
      }

      if (weatherResistance) {
        queryBuilder.andWhere(
          `"technicalSpecs"->>'weatherResistance' = :weatherResistance`,
          { weatherResistance }
        );
      }

      // Apply regular filters
      if (productType) {
        queryBuilder.andWhere("product.productType = :productType", {
          productType,
        });
      }

      if (minPrice !== undefined && maxPrice !== undefined) {
        queryBuilder.andWhere("product.price BETWEEN :minPrice AND :maxPrice", {
          minPrice,
          maxPrice,
        });
      } else if (minPrice !== undefined) {
        queryBuilder.andWhere("product.price >= :minPrice", { minPrice });
      } else if (maxPrice !== undefined) {
        queryBuilder.andWhere("product.price <= :maxPrice", { maxPrice });
      }

      // Ensure technicalSpecs is not null
      queryBuilder.andWhere("product.technicalSpecs IS NOT NULL");

      // Get total count for pagination
      const total = await queryBuilder.getCount();

      // Apply pagination
      queryBuilder.skip(skip).take(limit);

      // Execute query
      const products = await queryBuilder.getMany();

      // Handle localization if needed
      if (locale) {
        products.forEach((product) => {
          if (product.localizedData && product.localizedData[locale]) {
            const localizedData = product.localizedData[locale];

            if (localizedData.name) {
              (product as any).localizedName = localizedData.name;
            }

            if (localizedData.description) {
              (product as any).localizedDescription = localizedData.description;
            }
          }
        });
      }

      // Calculate total pages
      const totalPages = Math.ceil(total / limit);

      return { products, total, totalPages };
    } catch (error) {
      logger.error("Error filtering products by technical specs:", error);
      throw new AppError(
        "Failed to filter products",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}
