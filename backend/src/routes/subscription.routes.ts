import { Router, RequestHandler } from 'express';
import { SubscriptionController } from '../controllers/subscription.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const subscriptionController = new SubscriptionController();

// Authentication required for all subscription routes
router.use(authenticate as RequestHandler);

// Get all subscriptions for the current user
router.get('/', subscriptionController.getUserSubscriptions as RequestHandler);

// Get subscription by ID
router.get('/:id', subscriptionController.getSubscriptionById as RequestHandler);

// Create a new subscription
router.post('/', subscriptionController.createSubscription as RequestHandler);

// Update subscription frequency
router.patch('/:id/frequency', subscriptionController.updateFrequency as RequestHandler);

// Update auto-renew setting
router.patch('/:id/auto-renew', subscriptionController.updateAutoRenew as RequestHandler);

// Pause a subscription
router.post('/:id/pause', subscriptionController.pauseSubscription as RequestHandler);

// Resume a paused subscription
router.post('/:id/resume', subscriptionController.resumeSubscription as RequestHandler);

// Cancel a subscription
router.post('/:id/cancel', subscriptionController.cancelSubscription as RequestHandler);

// Add a product to a subscription
router.post('/:id/items', subscriptionController.addProductToSubscription as RequestHandler);

// Remove a product from a subscription
router.delete('/:id/items/:itemId', subscriptionController.removeProductFromSubscription as RequestHandler);

// Update item quantity in a subscription
router.patch('/:id/items/:itemId', subscriptionController.updateItemQuantity as RequestHandler);

// Update shipping address for a subscription
router.patch('/:id/shipping-address', subscriptionController.updateShippingAddress as RequestHandler);

export default router; 
