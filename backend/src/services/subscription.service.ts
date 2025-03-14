import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import {
  Subscription,
  SubscriptionFrequency,
  SubscriptionStatus,
} from "../models/Subscription";
import { SubscriptionItem } from "../models/SubscriptionItem";
import { Product } from "../models/Product";
import { StatusCode } from "../utils/constants";
import { AppError } from "../utils/AppError";
import { logger } from "../utils/logger";

export interface SubscriptionItemInput {
  product_id: string;
  quantity: number;
  selected_options?: Record<string, string | number | boolean>;
}

export interface CreateSubscriptionDto {
  user_id: string;
  frequency: SubscriptionFrequency;
  auto_renew?: boolean;
  items: SubscriptionItemInput[];
  shipping_address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  billing_address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  payment_method_id?: string;
  coupon_code?: string;
}

export class SubscriptionService {
  private subscriptionRepository: Repository<Subscription>;
  private subscriptionItemRepository: Repository<SubscriptionItem>;
  private productRepository: Repository<Product>;

  constructor() {
    this.subscriptionRepository = AppDataSource.getRepository(Subscription);
    this.subscriptionItemRepository =
      AppDataSource.getRepository(SubscriptionItem);
    this.productRepository = AppDataSource.getRepository(Product);
  }

  /**
   * Get all subscriptions for a user
   */
  async getSubscriptionsByUserId(userId: string): Promise<Subscription[]> {
    try {
      const subscriptions = await this.subscriptionRepository.find({
        where: { user_id: userId },
        relations: ["items", "items.product"],
        order: { createdAt: "DESC" },
      });

      return subscriptions;
    } catch (error) {
      logger.error(`Error getting subscriptions for user ${userId}:`, error);
      throw new AppError(
        "Failed to get subscriptions",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Get subscription by ID
   */
  async getSubscriptionById(id: string): Promise<Subscription> {
    try {
      const subscription = await this.subscriptionRepository.findOne({
        where: { id },
        relations: ["items", "items.product"],
      });

      if (!subscription) {
        throw new AppError("Subscription not found", StatusCode.NOT_FOUND);
      }

      return subscription;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error getting subscription with ID ${id}:`, error);
      throw new AppError(
        "Failed to get subscription",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Create a new subscription
   */
  async createSubscription(dto: CreateSubscriptionDto): Promise<Subscription> {
    try {
      // Start a transaction
      return await AppDataSource.transaction(
        async (transactionalEntityManager) => {
          // Create new subscription
          const subscription = this.subscriptionRepository.create({
            user_id: dto.user_id,
            frequency: dto.frequency,
            status: SubscriptionStatus.ACTIVE,
            auto_renew: dto.auto_renew || false,
            shipping_address: dto.shipping_address,
            billing_address: dto.billing_address,
            payment_method_id: dto.payment_method_id,
            coupon_code: dto.coupon_code,
            last_order_date: new Date(),
          });

          // Save the subscription to get an ID
          await transactionalEntityManager.save(Subscription, subscription);

          // Process each item
          for (const itemInput of dto.items) {
            // Check if product exists and is in stock
            const product = await transactionalEntityManager.findOne(Product, {
              where: { id: itemInput.product_id },
            });

            if (!product) {
              throw new AppError(
                `Product with ID ${itemInput.product_id} not found`,
                StatusCode.NOT_FOUND
              );
            }

            if (product.stock < itemInput.quantity) {
              throw new AppError(
                `Not enough stock for product ${product.name}`,
                StatusCode.BAD_REQUEST
              );
            }

            // Create subscription item
            const subscriptionItem = this.subscriptionItemRepository.create({
              subscription_id: subscription.id,
              product_id: itemInput.product_id,
              quantity: itemInput.quantity,
              price: product.price,
              selected_options: itemInput.selected_options,
            });

            await transactionalEntityManager.save(
              SubscriptionItem,
              subscriptionItem
            );

            // Add to subscription's items array
            if (!subscription.items) {
              subscription.items = [];
            }
            subscription.items.push(subscriptionItem);
          }

          // Calculate total
          subscription.calculateTotal();

          // Calculate next order date
          subscription.calculateNextOrderDate();

          // Save updates
          await transactionalEntityManager.save(Subscription, subscription);

          return subscription;
        }
      );
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error("Error creating subscription:", error);
      throw new AppError(
        "Failed to create subscription",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Update subscription frequency
   */
  async updateFrequency(
    id: string,
    frequency: SubscriptionFrequency
  ): Promise<Subscription> {
    try {
      const subscription = await this.getSubscriptionById(id);

      // Check if subscription can be updated
      if (subscription.status !== SubscriptionStatus.ACTIVE) {
        throw new AppError(
          "Only active subscriptions can be updated",
          StatusCode.BAD_REQUEST
        );
      }

      // Update frequency
      subscription.frequency = frequency;

      // Recalculate next order date
      subscription.calculateNextOrderDate();

      // Save changes
      await this.subscriptionRepository.save(subscription);

      return subscription;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error updating frequency for subscription ${id}:`, error);
      throw new AppError(
        "Failed to update subscription frequency",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Update auto-renew setting
   */
  async updateAutoRenew(id: string, autoRenew: boolean): Promise<Subscription> {
    try {
      const subscription = await this.getSubscriptionById(id);

      // Check if subscription can be updated
      if (subscription.status !== SubscriptionStatus.ACTIVE) {
        throw new AppError(
          "Only active subscriptions can be updated",
          StatusCode.BAD_REQUEST
        );
      }

      // Update auto-renew setting
      subscription.auto_renew = autoRenew;

      // Save changes
      await this.subscriptionRepository.save(subscription);

      return subscription;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error updating auto-renew for subscription ${id}:`, error);
      throw new AppError(
        "Failed to update subscription auto-renew setting",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Pause a subscription
   */
  async pauseSubscription(id: string): Promise<Subscription> {
    try {
      const subscription = await this.getSubscriptionById(id);

      // Check if subscription can be paused
      if (subscription.status !== SubscriptionStatus.ACTIVE) {
        throw new AppError(
          "Only active subscriptions can be paused",
          StatusCode.BAD_REQUEST
        );
      }

      // Update status
      subscription.status = SubscriptionStatus.PAUSED;

      // Save changes
      await this.subscriptionRepository.save(subscription);

      return subscription;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error pausing subscription ${id}:`, error);
      throw new AppError(
        "Failed to pause subscription",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Resume a paused subscription
   */
  async resumeSubscription(id: string): Promise<Subscription> {
    try {
      const subscription = await this.getSubscriptionById(id);

      // Check if subscription can be resumed
      if (subscription.status !== SubscriptionStatus.PAUSED) {
        throw new AppError(
          "Only paused subscriptions can be resumed",
          StatusCode.BAD_REQUEST
        );
      }

      // Update status
      subscription.status = SubscriptionStatus.ACTIVE;

      // Recalculate next order date
      subscription.calculateNextOrderDate();

      // Save changes
      await this.subscriptionRepository.save(subscription);

      return subscription;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error resuming subscription ${id}:`, error);
      throw new AppError(
        "Failed to resume subscription",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Cancel a subscription
   */
  async cancelSubscription(id: string): Promise<Subscription> {
    try {
      const subscription = await this.getSubscriptionById(id);

      // Check if subscription can be cancelled
      if (subscription.status === SubscriptionStatus.CANCELLED) {
        throw new AppError(
          "Subscription is already cancelled",
          StatusCode.BAD_REQUEST
        );
      }

      // Update status
      subscription.status = SubscriptionStatus.CANCELLED;
      subscription.cancelled_at = new Date();

      // If there's a Stripe subscription, cancel it
      if (subscription.stripe_subscription_id) {
        // TODO: Implement Stripe subscription cancellation
        // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
        // await stripe.subscriptions.cancel(subscription.stripe_subscription_id);
      }

      // Save changes
      await this.subscriptionRepository.save(subscription);

      return subscription;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error cancelling subscription ${id}:`, error);
      throw new AppError(
        "Failed to cancel subscription",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Add a product to a subscription
   */
  async addProductToSubscription(
    id: string,
    productId: string,
    quantity: number,
    selectedOptions?: Record<string, string | number | boolean>
  ): Promise<Subscription> {
    try {
      // Start a transaction
      return await AppDataSource.transaction(
        async (transactionalEntityManager) => {
          const subscription = await transactionalEntityManager.findOne(
            Subscription,
            {
              where: { id },
              relations: ["items", "items.product"],
            }
          );

          if (!subscription) {
            throw new AppError("Subscription not found", StatusCode.NOT_FOUND);
          }

          // Check if subscription can be updated
          if (subscription.status !== SubscriptionStatus.ACTIVE) {
            throw new AppError(
              "Only active subscriptions can be updated",
              StatusCode.BAD_REQUEST
            );
          }

          // Check if product exists and is in stock
          const product = await transactionalEntityManager.findOne(Product, {
            where: { id: productId },
          });

          if (!product) {
            throw new AppError("Product not found", StatusCode.NOT_FOUND);
          }

          if (product.stock < quantity) {
            throw new AppError(
              "Not enough stock available",
              StatusCode.BAD_REQUEST
            );
          }

          // Check if product already exists in the subscription
          const existingItem = subscription.items.find(
            (item) => item.product_id === productId
          );

          if (existingItem) {
            // Update quantity
            existingItem.quantity += quantity;
            existingItem.selected_options =
              selectedOptions || existingItem.selected_options;
            await transactionalEntityManager.save(
              SubscriptionItem,
              existingItem
            );
          } else {
            // Create new subscription item
            const newItem = transactionalEntityManager.create(
              SubscriptionItem,
              {
                subscription_id: id,
                product_id: productId,
                quantity,
                price: product.price,
                selected_options: selectedOptions,
              }
            );

            await transactionalEntityManager.save(SubscriptionItem, newItem);

            // Add to subscription's items array
            subscription.items.push(newItem);
          }

          // Recalculate total
          subscription.calculateTotal();

          // Save changes
          await transactionalEntityManager.save(Subscription, subscription);

          return subscription;
        }
      );
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error adding product to subscription ${id}:`, error);
      throw new AppError(
        "Failed to add product to subscription",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Remove a product from a subscription
   */
  async removeProductFromSubscription(
    id: string,
    itemId: string
  ): Promise<Subscription> {
    try {
      // Start a transaction
      return await AppDataSource.transaction(
        async (transactionalEntityManager) => {
          const subscription = await transactionalEntityManager.findOne(
            Subscription,
            {
              where: { id },
              relations: ["items"],
            }
          );

          if (!subscription) {
            throw new AppError("Subscription not found", StatusCode.NOT_FOUND);
          }

          // Check if subscription can be updated
          if (subscription.status !== SubscriptionStatus.ACTIVE) {
            throw new AppError(
              "Only active subscriptions can be updated",
              StatusCode.BAD_REQUEST
            );
          }

          // Find the item
          const itemIndex = subscription.items.findIndex(
            (item) => item.id === itemId
          );

          if (itemIndex === -1) {
            throw new AppError(
              "Item not found in subscription",
              StatusCode.NOT_FOUND
            );
          }

          // Remove the item
          await transactionalEntityManager.delete(SubscriptionItem, itemId);

          // Remove from subscription's items array
          subscription.items.splice(itemIndex, 1);

          // Check if at least one item remains
          if (subscription.items.length === 0) {
            throw new AppError(
              "Subscription must have at least one item",
              StatusCode.BAD_REQUEST
            );
          }

          // Recalculate total
          subscription.calculateTotal();

          // Save changes
          await transactionalEntityManager.save(Subscription, subscription);

          return subscription;
        }
      );
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error removing product from subscription ${id}:`, error);
      throw new AppError(
        "Failed to remove product from subscription",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Update item quantity in a subscription
   */
  async updateItemQuantity(
    id: string,
    itemId: string,
    quantity: number
  ): Promise<Subscription> {
    try {
      if (quantity <= 0) {
        return this.removeProductFromSubscription(id, itemId);
      }

      // Start a transaction
      return await AppDataSource.transaction(
        async (transactionalEntityManager) => {
          const subscription = await transactionalEntityManager.findOne(
            Subscription,
            {
              where: { id },
              relations: ["items", "items.product"],
            }
          );

          if (!subscription) {
            throw new AppError("Subscription not found", StatusCode.NOT_FOUND);
          }

          // Check if subscription can be updated
          if (subscription.status !== SubscriptionStatus.ACTIVE) {
            throw new AppError(
              "Only active subscriptions can be updated",
              StatusCode.BAD_REQUEST
            );
          }

          // Find the item
          const item = subscription.items.find((i) => i.id === itemId);

          if (!item) {
            throw new AppError(
              "Item not found in subscription",
              StatusCode.NOT_FOUND
            );
          }

          // Check if product has enough stock
          const product = await transactionalEntityManager.findOne(Product, {
            where: { id: item.product_id },
          });

          if (!product) {
            throw new AppError("Product not found", StatusCode.NOT_FOUND);
          }

          if (product.stock < quantity) {
            throw new AppError(
              "Not enough stock available",
              StatusCode.BAD_REQUEST
            );
          }

          // Update quantity
          item.quantity = quantity;
          await transactionalEntityManager.save(SubscriptionItem, item);

          // Recalculate total
          subscription.calculateTotal();

          // Save changes
          await transactionalEntityManager.save(Subscription, subscription);

          return subscription;
        }
      );
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(
        `Error updating item quantity in subscription ${id}:`,
        error
      );
      throw new AppError(
        "Failed to update item quantity",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Update shipping address for a subscription
   */
  async updateShippingAddress(
    id: string,
    address: {
      line1: string;
      line2?: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    }
  ): Promise<Subscription> {
    try {
      const subscription = await this.getSubscriptionById(id);

      // Check if subscription can be updated
      if (subscription.status !== SubscriptionStatus.ACTIVE) {
        throw new AppError(
          "Only active subscriptions can be updated",
          StatusCode.BAD_REQUEST
        );
      }

      // Update address
      subscription.shipping_address = address;

      // Save changes
      await this.subscriptionRepository.save(subscription);

      return subscription;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(
        `Error updating shipping address for subscription ${id}:`,
        error
      );
      throw new AppError(
        "Failed to update shipping address",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Process subscriptions that are due for renewal
   * This would typically be called by a scheduled job
   */
  async processRenewals(): Promise<void> {
    try {
      // Find all active subscriptions due for renewal
      const now = new Date();
      const dueSubscriptions = await this.subscriptionRepository.find({
        where: {
          status: SubscriptionStatus.ACTIVE,
          next_order_date: now,
          auto_renew: true,
        },
        relations: ["items", "items.product"],
      });

      for (const subscription of dueSubscriptions) {
        try {
          // Process payment using Stripe
          // TODO: Implement payment processing

          // If payment succeeded
          subscription.last_order_date = now;
          subscription.calculateNextOrderDate();

          // Create order
          // TODO: Create an order based on the subscription

          await this.subscriptionRepository.save(subscription);
        } catch (error) {
          // If payment failed
          subscription.status = SubscriptionStatus.PAYMENT_FAILED;
          await this.subscriptionRepository.save(subscription);

          logger.error(
            `Failed to process renewal for subscription ${subscription.id}:`,
            error
          );

          // TODO: Send email to customer about payment failure
        }
      }
    } catch (error) {
      logger.error("Error processing subscription renewals:", error);
      throw new AppError(
        "Failed to process subscription renewals",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}
