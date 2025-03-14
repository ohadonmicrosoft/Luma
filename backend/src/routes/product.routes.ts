import { Router, RequestHandler } from 'express';
import { ProductController } from '../controllers/product.controller';
import { validateRequest } from '../middleware/validation.middleware';
import { authenticate } from '../middleware/auth.middleware';
import { checkRole } from '../middleware/role.middleware';
import { UserRole } from '../utils/constants';
import { productValidationSchemas } from '../validations/product.validations';

const router = Router();
const productController = new ProductController();

// Public routes
router.get('/', productController.getAllProducts as RequestHandler);
router.get('/search', productController.searchProducts as RequestHandler);
router.get('/featured', productController.getFeaturedProducts as RequestHandler);
router.get('/category/:categoryId', productController.getProductsByCategory as RequestHandler);
router.get('/technical-specs', productController.filterByTechnicalSpecs as RequestHandler);
router.get('/:id', productController.getProductById as RequestHandler);
router.get('/:id/related', productController.getRelatedProducts as RequestHandler);
router.get('/:id/compatible', productController.getCompatibleProducts as RequestHandler);

// Protected admin routes
router.post(
  '/',
  authenticate as RequestHandler,
  checkRole([UserRole.Admin]) as RequestHandler,
  validateRequest(productValidationSchemas.createProduct) as RequestHandler,
  productController.createProduct as RequestHandler
);

router.put(
  '/:id',
  authenticate as RequestHandler,
  checkRole([UserRole.Admin]) as RequestHandler,
  validateRequest(productValidationSchemas.updateProduct) as RequestHandler,
  productController.updateProduct as RequestHandler
);

router.patch(
  '/:id/stock',
  authenticate as RequestHandler,
  checkRole([UserRole.Admin]) as RequestHandler,
  validateRequest(productValidationSchemas.updateStock) as RequestHandler,
  productController.updateProductStock as RequestHandler
);

router.patch(
  '/:id/technical-specs',
  authenticate as RequestHandler,
  checkRole([UserRole.Admin]) as RequestHandler,
  validateRequest(productValidationSchemas.updateTechnicalSpecs) as RequestHandler,
  productController.updateTechnicalSpecs as RequestHandler
);

router.post(
  '/:id/usage-scenario',
  authenticate as RequestHandler,
  checkRole([UserRole.Admin]) as RequestHandler,
  validateRequest(productValidationSchemas.addUsageScenario) as RequestHandler,
  productController.addUsageScenario as RequestHandler
);

router.delete(
  '/:id',
  authenticate as RequestHandler,
  checkRole([UserRole.Admin]) as RequestHandler,
  productController.deleteProduct as RequestHandler
);

export default router; 
