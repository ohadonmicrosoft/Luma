import { Request, Response, NextFunction } from "express";
import {
  ProductService,
  ProductFilterOptions,
  TechnicalSpecsFilterOptions,
  ProductOptions,
  SearchOptions,
  FeaturedProductOptions,
  CategoryProductOptions,
  RelatedProductOptions,
  UsageScenarioData,
} from "../services/product.service";
import { AppError } from "../utils/AppError";
import { StatusCode } from "../utils/constants";
import {
  ProductType,
  DurabilityRating,
  WeatherResistance,
} from "../models/Product";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  /**
   * Get all products with filtering and pagination
   */
  getAllProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        search,
        category_id,
        min_price,
        max_price,
        in_stock,
        product_type,
        durability_rating,
        weather_resistance,
        material,
        min_weight,
        max_weight,
        has_technical_specs,
        compatible_with,
        keywords,
        brand_name,
        sort_by,
        sort_order,
        page,
        limit,
      } = req.query;

      // Parse query parameters
      const options: ProductFilterOptions = {
        search: search?.toString(),
        category_id: category_id?.toString(),
        min_price: min_price ? parseFloat(min_price.toString()) : undefined,
        max_price: max_price ? parseFloat(max_price.toString()) : undefined,
        in_stock: in_stock === "true",
        productType: product_type
          ? (product_type.toString() as ProductType)
          : undefined,
        durabilityRating: durability_rating
          ? (durability_rating.toString() as DurabilityRating)
          : undefined,
        weatherResistance: weather_resistance
          ? (weather_resistance.toString() as WeatherResistance)
          : undefined,
        material: material?.toString(),
        minWeight: min_weight ? parseFloat(min_weight.toString()) : undefined,
        maxWeight: max_weight ? parseFloat(max_weight.toString()) : undefined,
        hasTechnicalSpecs: has_technical_specs === "true",
        compatibleWith: compatible_with?.toString(),
        keywords: keywords?.toString(),
        brandName: brand_name?.toString(),
        sortBy: sort_by?.toString() || "createdAt",
        sortOrder: sort_order?.toString() === "asc" ? "ASC" : "DESC",
        page: page ? parseInt(page.toString(), 10) : 1,
        limit: limit ? parseInt(limit.toString(), 10) : 10,
      };

      const result = await this.productService.getAllProducts(options);

      res.status(StatusCode.OK).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get product by ID
   */
  getProductById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { include_compatible, locale } = req.query;

      const options: ProductOptions = {
        includeCompatible: include_compatible === "true",
        locale: locale?.toString(),
      };

      const product = await this.productService.getProductById(id, options);

      res.status(StatusCode.OK).json({
        status: "success",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create new product
   */
  createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const product = await this.productService.createProduct(req.body);

      res.status(StatusCode.CREATED).json({
        status: "success",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update product
   */
  updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const product = await this.productService.updateProduct(id, req.body);

      res.status(StatusCode.OK).json({
        status: "success",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete product
   */
  deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      await this.productService.deleteProduct(id);

      res.status(StatusCode.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update product stock
   */
  updateProductStock = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      if (typeof quantity !== "number") {
        throw new AppError("Quantity must be a number", StatusCode.BAD_REQUEST);
      }

      const product = await this.productService.updateProductStock(
        id,
        quantity
      );

      res.status(StatusCode.OK).json({
        status: "success",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Search products
   */
  searchProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { q, product_type, locale } = req.query;

      if (!q) {
        throw new AppError("Search query is required", StatusCode.BAD_REQUEST);
      }

      const options: SearchOptions = {
        productType: product_type
          ? (product_type.toString() as ProductType)
          : undefined,
        locale: locale?.toString(),
      };

      const products = await this.productService.searchProducts(
        q.toString(),
        options
      );

      res.status(StatusCode.OK).json({
        status: "success",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get featured products
   */
  getFeaturedProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { limit, product_type, locale } = req.query;

      const options: FeaturedProductOptions = {
        limit: limit ? parseInt(limit.toString(), 10) : 8,
        productType: product_type
          ? (product_type.toString() as ProductType)
          : undefined,
        locale: locale?.toString(),
      };

      const products = await this.productService.getFeaturedProducts(options);

      res.status(StatusCode.OK).json({
        status: "success",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get products by category
   */
  getProductsByCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { categoryId } = req.params;
      const {
        include_subcategories,
        product_type,
        durability_rating,
        weather_resistance,
        min_price,
        max_price,
        locale,
        page,
        limit,
      } = req.query;

      const options: CategoryProductOptions = {
        includeSubcategories: include_subcategories === "true",
        productType: product_type
          ? (product_type.toString() as ProductType)
          : undefined,
        durabilityRating: durability_rating
          ? (durability_rating.toString() as DurabilityRating)
          : undefined,
        weatherResistance: weather_resistance
          ? (weather_resistance.toString() as WeatherResistance)
          : undefined,
        minPrice: min_price ? parseFloat(min_price.toString()) : undefined,
        maxPrice: max_price ? parseFloat(max_price.toString()) : undefined,
        locale: locale?.toString(),
        page: page ? parseInt(page.toString(), 10) : 1,
        limit: limit ? parseInt(limit.toString(), 10) : 10,
      };

      const result = await this.productService.getProductsByCategory(
        categoryId,
        options
      );

      res.status(StatusCode.OK).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get related products
   */
  getRelatedProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { productId } = req.params;
      const { limit, locale } = req.query;

      const options: RelatedProductOptions = {
        limit: limit ? parseInt(limit.toString(), 10) : 4,
        locale: locale?.toString(),
      };

      const products = await this.productService.getRelatedProducts(
        productId,
        options
      );

      res.status(StatusCode.OK).json({
        status: "success",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get compatible products
   */
  getCompatibleProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { productId } = req.params;
      const { locale } = req.query;

      const products = await this.productService.getCompatibleProducts(
        productId,
        locale?.toString()
      );

      res.status(StatusCode.OK).json({
        status: "success",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update technical specifications
   */
  updateTechnicalSpecs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { technicalSpecs } = req.body;

      if (!technicalSpecs) {
        throw new AppError(
          "Technical specifications are required",
          StatusCode.BAD_REQUEST
        );
      }

      const product = await this.productService.updateTechnicalSpecs(
        id,
        technicalSpecs
      );

      res.status(StatusCode.OK).json({
        status: "success",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Add usage scenario
   */
  addUsageScenario = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { scenarioData } = req.body;

      if (
        !scenarioData ||
        !scenarioData.name ||
        !scenarioData.description ||
        typeof scenarioData.suitabilityRating !== "number"
      ) {
        throw new AppError(
          "Valid scenario data is required with name, description, and suitabilityRating",
          StatusCode.BAD_REQUEST
        );
      }

      const product = await this.productService.addUsageScenario(
        id,
        scenarioData as UsageScenarioData
      );

      res.status(StatusCode.OK).json({
        status: "success",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Filter products by technical specifications
   */
  filterByTechnicalSpecs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        material,
        min_weight,
        max_weight,
        durability_rating,
        weather_resistance,
        product_type,
        min_price,
        max_price,
        locale,
        page,
        limit,
      } = req.query;

      const options: TechnicalSpecsFilterOptions = {
        material: material?.toString(),
        minWeight: min_weight ? parseFloat(min_weight.toString()) : undefined,
        maxWeight: max_weight ? parseFloat(max_weight.toString()) : undefined,
        durabilityRating: durability_rating
          ? (durability_rating.toString() as DurabilityRating)
          : undefined,
        weatherResistance: weather_resistance
          ? (weather_resistance.toString() as WeatherResistance)
          : undefined,
        productType: product_type
          ? (product_type.toString() as ProductType)
          : undefined,
        minPrice: min_price ? parseFloat(min_price.toString()) : undefined,
        maxPrice: max_price ? parseFloat(max_price.toString()) : undefined,
        locale: locale?.toString(),
        page: page ? parseInt(page.toString(), 10) : 1,
        limit: limit ? parseInt(limit.toString(), 10) : 10,
      };

      const result = await this.productService.filterByTechnicalSpecs(options);

      res.status(StatusCode.OK).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
