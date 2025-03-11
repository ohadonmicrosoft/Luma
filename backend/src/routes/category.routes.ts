import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { validateRequest } from '../middleware/validation.middleware';
import { authenticate } from '../middleware/auth.middleware';
import { checkRole } from '../middleware/role.middleware';
import { UserRole } from '../utils/constants';
import { categoryValidationSchemas } from '../validations/category.validations';

const router = Router();
const categoryController = new CategoryController();

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/tree', categoryController.getCategoryTree);
router.get('/root', categoryController.getRootCategories);
router.get('/:id', categoryController.getCategoryById);
router.get('/:id/subcategories', categoryController.getSubcategories);
router.get('/:id/path', categoryController.getCategoryPath);

// Protected admin routes
router.post(
  '/',
  authenticate,
  checkRole([UserRole.Admin]),
  validateRequest(categoryValidationSchemas.createCategory),
  categoryController.createCategory
);

router.put(
  '/:id',
  authenticate,
  checkRole([UserRole.Admin]),
  validateRequest(categoryValidationSchemas.updateCategory),
  categoryController.updateCategory
);

router.delete(
  '/:id',
  authenticate,
  checkRole([UserRole.Admin]),
  categoryController.deleteCategory
);

export default router; 
