import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/category.service";
import { StatusCode } from "../utils/constants";

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  /**
   * Get all categories
   */
  getAllCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        search,
        parent_id,
        is_active,
        sort_by = "sortOrder",
        sort_order = "ASC",
      } = req.query;

      // Convert query parameters to appropriate types
      const filterOptions = {
        search: search as string,
        parent_id: parent_id as string | null,
        isActive: is_active === "true",
        sortBy: sort_by as "name" | "sortOrder" | "createdAt",
        sortOrder: sort_order as "ASC" | "DESC",
      };

      const categories = await this.categoryService.getAllCategories(
        filterOptions
      );

      res.status(StatusCode.OK).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get category by ID
   */
  getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const category = await this.categoryService.getCategoryById(id);

      res.status(StatusCode.OK).json({
        success: true,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create new category
   */
  createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryData = req.body;
      const category = await this.categoryService.createCategory(categoryData);

      res.status(StatusCode.CREATED).json({
        success: true,
        data: category,
        message: "Category created successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update category
   */
  updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const categoryData = req.body;
      const category = await this.categoryService.updateCategory(
        id,
        categoryData
      );

      res.status(StatusCode.OK).json({
        success: true,
        data: category,
        message: "Category updated successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete category
   */
  deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.categoryService.deleteCategory(id);

      res.status(StatusCode.OK).json({
        success: true,
        message: "Category deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get root categories
   */
  getRootCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categories = await this.categoryService.getRootCategories();

      res.status(StatusCode.OK).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get subcategories of a category
   */
  getSubcategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const categories = await this.categoryService.getSubcategories(id);

      res.status(StatusCode.OK).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get category tree
   */
  getCategoryTree = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tree = await this.categoryService.getCategoryTree();

      res.status(StatusCode.OK).json({
        success: true,
        data: tree,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get category path (breadcrumb)
   */
  getCategoryPath = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const path = await this.categoryService.getCategoryPath(id);

      res.status(StatusCode.OK).json({
        success: true,
        data: path,
      });
    } catch (error) {
      next(error);
    }
  };
}
