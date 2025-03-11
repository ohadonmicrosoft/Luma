import { Request, Response, NextFunction } from 'express';
import { SubscriptionService, CreateSubscriptionDto } from '../services/subscription.service';
import { SubscriptionFrequency } from '../models/Subscription';
import { StatusCode } from '../utils/constants';

export class SubscriptionController {
  private subscriptionService: SubscriptionService;

  constructor() {
    this.subscriptionService = new SubscriptionService();
  }

  /**
   * Get all subscriptions for the current user
   */
  getUserSubscriptions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(StatusCode.UNAUTHORIZED).json({
          success: false,
          error: 'User is not authenticated'
        });
        return;
      }

      const subscriptions = await this.subscriptionService.getSubscriptionsByUserId(req.user.id);

      res.status(StatusCode.OK).json({
        success: true,
        data: subscriptions
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get subscription by ID
   */
  getSubscriptionById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const subscription = await this.subscriptionService.getSubscriptionById(id);

      // Check if the subscription belongs to the current user
      if (subscription.user_id !== req.user?.id) {
        res.status(StatusCode.FORBIDDEN).json({
          success: false,
          error: 'You do not have permission to access this subscription'
        });
        return;
      }

      res.status(StatusCode.OK).json({
        success: true,
        data: subscription
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create a new subscription
   */
  createSubscription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(StatusCode.UNAUTHORIZED).json({
          success: false,
          error: 'User is not authenticated'
        });
        return;
      }

      const subscriptionData: CreateSubscriptionDto = {
        ...req.body,
        user_id: req.user.id
      };

      // Validate required fields
      if (!subscriptionData.frequency || !Array.isArray(subscriptionData.items) || subscriptionData.items.length === 0) {
        res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          error: 'Frequency and at least one item are required'
        });
        return;
      }

      // Validate frequency
      if (!Object.values(SubscriptionFrequency).includes(subscriptionData.frequency)) {
        res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          error: 'Invalid subscription frequency'
        });
        return;
      }

      // Validate items
      for (const item of subscriptionData.items) {
        if (!item.product_id || typeof item.quantity !== 'number' || item.quantity <= 0) {
          res.status(StatusCode.BAD_REQUEST).json({
            success: false,
            error: 'Each item must have a product_id and a quantity greater than 0'
          });
          return;
        }
      }

      const subscription = await this.subscriptionService.createSubscription(subscriptionData);

      res.status(StatusCode.CREATED).json({
        success: true,
        data: subscription
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update subscription frequency
   */
  updateFrequency = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { frequency } = req.body;

      // Validate subscription ownership
      const subscription = await this.subscriptionService.getSubscriptionById(id);
      if (subscription.user_id !== req.user?.id) {
        res.status(StatusCode.FORBIDDEN).json({
          success: false,
          error: 'You do not have permission to modify this subscription'
        });
        return;
      }

      // Validate frequency
      if (!frequency || !Object.values(SubscriptionFrequency).includes(frequency)) {
        res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          error: 'Invalid subscription frequency'
        });
        return;
      }

      const updatedSubscription = await this.subscriptionService.updateFrequency(id, frequency);

      res.status(StatusCode.OK).json({
        success: true,
        data: updatedSubscription
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update auto-renew setting
   */
  updateAutoRenew = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { autoRenew } = req.body;

      // Validate subscription ownership
      const subscription = await this.subscriptionService.getSubscriptionById(id);
      if (subscription.user_id !== req.user?.id) {
        res.status(StatusCode.FORBIDDEN).json({
          success: false,
          error: 'You do not have permission to modify this subscription'
        });
        return;
      }

      // Validate autoRenew
      if (typeof autoRenew !== 'boolean') {
        res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          error: 'Auto-renew setting must be a boolean'
        });
        return;
      }

      const updatedSubscription = await this.subscriptionService.updateAutoRenew(id, autoRenew);

      res.status(StatusCode.OK).json({
        success: true,
        data: updatedSubscription
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Pause a subscription
   */
  pauseSubscription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      // Validate subscription ownership
      const subscription = await this.subscriptionService.getSubscriptionById(id);
      if (subscription.user_id !== req.user?.id) {
        res.status(StatusCode.FORBIDDEN).json({
          success: false,
          error: 'You do not have permission to modify this subscription'
        });
        return;
      }

      const pausedSubscription = await this.subscriptionService.pauseSubscription(id);

      res.status(StatusCode.OK).json({
        success: true,
        data: pausedSubscription
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Resume a paused subscription
   */
  resumeSubscription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      // Validate subscription ownership
      const subscription = await this.subscriptionService.getSubscriptionById(id);
      if (subscription.user_id !== req.user?.id) {
        res.status(StatusCode.FORBIDDEN).json({
          success: false,
          error: 'You do not have permission to modify this subscription'
        });
        return;
      }

      const resumedSubscription = await this.subscriptionService.resumeSubscription(id);

      res.status(StatusCode.OK).json({
        success: true,
        data: resumedSubscription
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Cancel a subscription
   */
  cancelSubscription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      // Validate subscription ownership
      const subscription = await this.subscriptionService.getSubscriptionById(id);
      if (subscription.user_id !== req.user?.id) {
        res.status(StatusCode.FORBIDDEN).json({
          success: false,
          error: 'You do not have permission to modify this subscription'
        });
        return;
      }

      const cancelledSubscription = await this.subscriptionService.cancelSubscription(id);

      res.status(StatusCode.OK).json({
        success: true,
        data: cancelledSubscription
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Add a product to a subscription
   */
  addProductToSubscription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { productId, quantity, selectedOptions } = req.body;

      // Validate subscription ownership
      const subscription = await this.subscriptionService.getSubscriptionById(id);
      if (subscription.user_id !== req.user?.id) {
        res.status(StatusCode.FORBIDDEN).json({
          success: false,
          error: 'You do not have permission to modify this subscription'
        });
        return;
      }

      // Validate required fields
      if (!productId || typeof quantity !== 'number' || quantity <= 0) {
        res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          error: 'Product ID and a quantity greater than 0 are required'
        });
        return;
      }

      const updatedSubscription = await this.subscriptionService.addProductToSubscription(
        id,
        productId,
        quantity,
        selectedOptions
      );

      res.status(StatusCode.OK).json({
        success: true,
        data: updatedSubscription
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Remove a product from a subscription
   */
  removeProductFromSubscription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id, itemId } = req.params;

      // Validate subscription ownership
      const subscription = await this.subscriptionService.getSubscriptionById(id);
      if (subscription.user_id !== req.user?.id) {
        res.status(StatusCode.FORBIDDEN).json({
          success: false,
          error: 'You do not have permission to modify this subscription'
        });
        return;
      }

      const updatedSubscription = await this.subscriptionService.removeProductFromSubscription(id, itemId);

      res.status(StatusCode.OK).json({
        success: true,
        data: updatedSubscription
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update item quantity in a subscription
   */
  updateItemQuantity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id, itemId } = req.params;
      const { quantity } = req.body;

      // Validate subscription ownership
      const subscription = await this.subscriptionService.getSubscriptionById(id);
      if (subscription.user_id !== req.user?.id) {
        res.status(StatusCode.FORBIDDEN).json({
          success: false,
          error: 'You do not have permission to modify this subscription'
        });
        return;
      }

      // Validate quantity
      if (typeof quantity !== 'number' || quantity < 0) {
        res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          error: 'Quantity must be a number greater than or equal to 0'
        });
        return;
      }

      const updatedSubscription = await this.subscriptionService.updateItemQuantity(id, itemId, quantity);

      res.status(StatusCode.OK).json({
        success: true,
        data: updatedSubscription
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update shipping address for a subscription
   */
  updateShippingAddress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const address = req.body;

      // Validate subscription ownership
      const subscription = await this.subscriptionService.getSubscriptionById(id);
      if (subscription.user_id !== req.user?.id) {
        res.status(StatusCode.FORBIDDEN).json({
          success: false,
          error: 'You do not have permission to modify this subscription'
        });
        return;
      }

      // Validate address
      if (!address || !address.line1 || !address.city || !address.state || !address.postal_code || !address.country) {
        res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          error: 'Address must include line1, city, state, postal_code, and country'
        });
        return;
      }

      const updatedSubscription = await this.subscriptionService.updateShippingAddress(id, address);

      res.status(StatusCode.OK).json({
        success: true,
        data: updatedSubscription
      });
    } catch (error) {
      next(error);
    }
  };
} 
