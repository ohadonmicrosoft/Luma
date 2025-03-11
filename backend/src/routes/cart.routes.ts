import { Router, RequestHandler } from 'express';
import { CartController } from '../controllers/cart.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const cartController = new CartController();

// Get or create cart for current user/session
router.get('/', cartController.getOrCreateCart as RequestHandler);

// Get cart by ID
router.get('/:id', cartController.getCartById as RequestHandler);

// Add item to cart
router.post('/:cartId/items', cartController.addItemToCart as RequestHandler);

// Update cart item quantity
router.patch('/:cartId/items/:itemId', cartController.updateCartItemQuantity as RequestHandler);

// Remove item from cart
router.delete('/:cartId/items/:itemId', cartController.removeItemFromCart as RequestHandler);

// Clear cart (remove all items)
router.delete('/:cartId/items', cartController.clearCart as RequestHandler);

// Apply coupon to cart
router.post('/:cartId/coupon', cartController.applyCoupon as RequestHandler);

// Update gift settings
router.post('/:cartId/gift', cartController.updateGiftSettings as RequestHandler);

// Calculate shipping
router.post('/:cartId/shipping', cartController.calculateShipping as RequestHandler);

// Calculate tax
router.post('/:cartId/tax', cartController.calculateTax as RequestHandler);

// Merge guest cart into user cart after login (requires authentication)
router.post('/merge', authenticate as RequestHandler, cartController.mergeGuestCart as RequestHandler);

export default router; 
