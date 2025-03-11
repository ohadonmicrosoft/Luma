import { Router, RequestHandler } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { validateRequest } from '../middleware/validation.middleware';
import { authenticate } from '../middleware/auth.middleware';
import { checkRole } from '../middleware/role.middleware';
import { UserRole } from '../utils/constants';
import { categoryValidationSchemas } from '../validations/category.validations';

const router = Router();
const categoryController = new CategoryController();

// Public routes
router.get('/', categoryController.getAllCategories as RequestHandler);
router.get('/tree', categoryController.getCategoryTree as RequestHandler);
router.get('/root', categoryController.getRootCategories as RequestHandler);
router.get('/:id', categoryController.getCategoryById as RequestHandler);
router.get('/:id/subcategories', categoryController.getSubcategories as RequestHandler);
router.get('/:id/path', categoryController.getCategoryPath as RequestHandler);

// Protected admin routes
router.post(
  '/',
  authenticate as RequestHandler,
  checkRole([UserRole.Admin]) as RequestHandler,
  validateRequest(categoryValidationSchemas.createCategory) as RequestHandler,
  categoryController.createCategory as RequestHandler
);

router.put(
  '/:id',
  authenticate as RequestHandler,
  checkRole([UserRole.Admin]) as RequestHandler,
  validateRequest(categoryValidationSchemas.updateCategory) as RequestHandler,
  categoryController.updateCategory as RequestHandler
);

router.delete(
  '/:id',
  authenticate as RequestHandler,
  checkRole([UserRole.Admin]) as RequestHandler,
  categoryController.deleteCategory as RequestHandler
);

export default router; 
