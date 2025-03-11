import { Router } from 'express';
// import { productController } from '../controllers/product.controller';
// import { validateProduct } from '../validators/product.validator';

const router = Router();

// GET /api/v1/products
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Product list endpoint - to be implemented',
    data: []
  });
});

// GET /api/v1/products/:id
router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Product details endpoint for ID: ${req.params.id} - to be implemented`,
    data: null
  });
});

export default router; 
