import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { validateRequest } from '../middleware/validation.middleware';
import { authenticate } from '../middleware/auth.middleware';
import { checkRole } from '../middleware/role.middleware';
import { UserRole } from '../utils/constants';
import { productValidationSchemas } from '../validations/product.validations';

const router = Router();
const productController = new ProductController();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/category/:categoryId', productController.getProductsByCategory);
router.get('/:id', productController.getProductById);
router.get('/:id/related', productController.getRelatedProducts);

// Protected admin routes
router.post(
  '/',
  authenticate,
  checkRole([UserRole.Admin]),
  validateRequest(productValidationSchemas.createProduct),
  productController.createProduct
);

router.put(
  '/:id',
  authenticate,
  checkRole([UserRole.Admin]),
  validateRequest(productValidationSchemas.updateProduct),
  productController.updateProduct
);

router.patch(
  '/:id/stock',
  authenticate,
  checkRole([UserRole.Admin]),
  validateRequest(productValidationSchemas.updateStock),
  productController.updateProductStock
);

router.delete(
  '/:id',
  authenticate,
  checkRole([UserRole.Admin]),
  productController.deleteProduct
);

export default router; 
