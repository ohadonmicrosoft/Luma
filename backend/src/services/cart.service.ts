import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Cart } from "../models/Cart";
import { CartItem } from "../models/CartItem";
import { Product } from "../models/Product";
import { StatusCode } from "../utils/constants";
import { AppError } from "../utils/AppError";
import { logger } from "../utils/logger";

export interface CartItemInput {
  product_id: string;
  quantity: number;
  selected_options?: Record<string, string | number | boolean>;
}

export class CartService {
  private cartRepository: Repository<Cart>;
  private cartItemRepository: Repository<CartItem>;
  private productRepository: Repository<Product>;

  constructor() {
    this.cartRepository = AppDataSource.getRepository(Cart);
    this.cartItemRepository = AppDataSource.getRepository(CartItem);
    this.productRepository = AppDataSource.getRepository(Product);
  }

  /**
   * Get cart by ID
   */
  async getCartById(id: string): Promise<Cart> {
    try {
      const cart = await this.cartRepository.findOne({
        where: { id },
        relations: ["items", "items.product"],
      });

      if (!cart) {
        throw new AppError("Cart not found", StatusCode.NOT_FOUND);
      }

      return cart;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error getting cart with ID ${id}:`, error);
      throw new AppError(
        "Failed to get cart",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Get active cart by user ID or create a new one
   */
  async getOrCreateCartByUserId(userId: string): Promise<Cart> {
    try {
      // Find the user's active cart
      let cart = await this.cartRepository.findOne({
        where: { user_id: userId, is_active: true },
        relations: ["items", "items.product"],
      });

      // If no active cart, create a new one
      if (!cart) {
        cart = this.cartRepository.create({
          user_id: userId,
          is_active: true,
        });
        await this.cartRepository.save(cart);
      }

      return cart;
    } catch (error) {
      logger.error(`Error getting or creating cart for user ${userId}:`, error);
      throw new AppError(
        "Failed to get or create cart",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Get active cart by session ID or create a new one
   */
  async getOrCreateCartBySessionId(sessionId: string): Promise<Cart> {
    try {
      // Find the session's active cart
      let cart = await this.cartRepository.findOne({
        where: { session_id: sessionId, is_active: true },
        relations: ["items", "items.product"],
      });

      // If no active cart, create a new one
      if (!cart) {
        cart = this.cartRepository.create({
          session_id: sessionId,
          is_active: true,
        });
        await this.cartRepository.save(cart);
      }

      return cart;
    } catch (error) {
      logger.error(
        `Error getting or creating cart for session ${sessionId}:`,
        error
      );
      throw new AppError(
        "Failed to get or create cart",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Add an item to the cart
   */
  async addItemToCart(cartId: string, itemInput: CartItemInput): Promise<Cart> {
    try {
      // Start a transaction
      return await AppDataSource.transaction(
        async (transactionalEntityManager) => {
          // Get the cart
          const cart = await transactionalEntityManager.findOne(Cart, {
            where: { id: cartId },
            relations: ["items", "items.product"],
          });

          if (!cart) {
            throw new AppError("Cart not found", StatusCode.NOT_FOUND);
          }

          // Check if the product exists and is in stock
          const product = await transactionalEntityManager.findOne(Product, {
            where: { id: itemInput.product_id },
          });

          if (!product) {
            throw new AppError("Product not found", StatusCode.NOT_FOUND);
          }

          if (product.stock < itemInput.quantity) {
            throw new AppError(
              "Not enough stock available",
              StatusCode.BAD_REQUEST
            );
          }

          // Check if the item already exists in the cart
          let cartItem = cart.items.find(
            (item) => item.product_id === itemInput.product_id
          );

          if (cartItem) {
            // Update the existing item quantity
            const totalQuantity = cartItem.quantity + itemInput.quantity;

            // Validate against available stock
            if (product.stock < totalQuantity) {
              throw new AppError(
                "Not enough stock available",
                StatusCode.BAD_REQUEST
              );
            }

            cartItem.quantity = totalQuantity;
            cartItem.selected_options =
              itemInput.selected_options || cartItem.selected_options;
            cartItem.calculateSubtotal();

            await transactionalEntityManager.save(CartItem, cartItem);
          } else {
            // Create a new cart item
            cartItem = transactionalEntityManager.create(CartItem, {
              cart_id: cartId,
              product_id: itemInput.product_id,
              quantity: itemInput.quantity,
              price: product.price,
              selected_options: itemInput.selected_options,
            });

            cartItem.calculateSubtotal();
            await transactionalEntityManager.save(CartItem, cartItem);

            // Add to cart's items array
            cart.items.push(cartItem);
          }

          // Recalculate cart totals
          cart.calculateTotals();
          await transactionalEntityManager.save(Cart, cart);

          return cart;
        }
      );
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error adding item to cart ${cartId}:`, error);
      throw new AppError(
        "Failed to add item to cart",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Update cart item quantity
   */
  async updateCartItemQuantity(
    cartId: string,
    itemId: string,
    quantity: number
  ): Promise<Cart> {
    try {
      if (quantity <= 0) {
        return this.removeItemFromCart(cartId, itemId);
      }

      // Start a transaction
      return await AppDataSource.transaction(
        async (transactionalEntityManager) => {
          // Get the cart
          const cart = await transactionalEntityManager.findOne(Cart, {
            where: { id: cartId },
            relations: ["items", "items.product"],
          });

          if (!cart) {
            throw new AppError("Cart not found", StatusCode.NOT_FOUND);
          }

          // Find the cart item
          const cartItem = cart.items.find((item) => item.id === itemId);

          if (!cartItem) {
            throw new AppError("Cart item not found", StatusCode.NOT_FOUND);
          }

          // Check if the product has enough stock
          const product = await transactionalEntityManager.findOne(Product, {
            where: { id: cartItem.product_id },
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

          // Update quantity and recalculate subtotal
          cartItem.quantity = quantity;
          cartItem.calculateSubtotal();
          await transactionalEntityManager.save(CartItem, cartItem);

          // Recalculate cart totals
          cart.calculateTotals();
          await transactionalEntityManager.save(Cart, cart);

          return cart;
        }
      );
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(
        `Error updating quantity for item ${itemId} in cart ${cartId}:`,
        error
      );
      throw new AppError(
        "Failed to update cart item quantity",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Remove an item from the cart
   */
  async removeItemFromCart(cartId: string, itemId: string): Promise<Cart> {
    try {
      // Start a transaction
      return await AppDataSource.transaction(
        async (transactionalEntityManager) => {
          // Get the cart
          const cart = await transactionalEntityManager.findOne(Cart, {
            where: { id: cartId },
            relations: ["items", "items.product"],
          });

          if (!cart) {
            throw new AppError("Cart not found", StatusCode.NOT_FOUND);
          }

          // Find the cart item
          const cartItemIndex = cart.items.findIndex(
            (item) => item.id === itemId
          );

          if (cartItemIndex === -1) {
            throw new AppError("Cart item not found", StatusCode.NOT_FOUND);
          }

          // Remove the item from the cart
          await transactionalEntityManager.delete(CartItem, itemId);

          // Remove from the cart's items array
          cart.items.splice(cartItemIndex, 1);

          // Recalculate cart totals
          cart.calculateTotals();
          await transactionalEntityManager.save(Cart, cart);

          return cart;
        }
      );
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error removing item ${itemId} from cart ${cartId}:`, error);
      throw new AppError(
        "Failed to remove item from cart",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Clear cart (remove all items)
   */
  async clearCart(cartId: string): Promise<Cart> {
    try {
      // Start a transaction
      return await AppDataSource.transaction(
        async (transactionalEntityManager) => {
          // Get the cart
          const cart = await transactionalEntityManager.findOne(Cart, {
            where: { id: cartId },
            relations: ["items"],
          });

          if (!cart) {
            throw new AppError("Cart not found", StatusCode.NOT_FOUND);
          }

          // Delete all cart items
          await transactionalEntityManager.delete(CartItem, {
            cart_id: cartId,
          });

          // Clear the items array
          cart.items = [];

          // Reset totals
          cart.subtotal = 0;
          cart.total = 0;
          cart.discount = 0;
          cart.tax = 0;
          cart.shipping = 0;

          await transactionalEntityManager.save(Cart, cart);

          return cart;
        }
      );
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error clearing cart ${cartId}:`, error);
      throw new AppError(
        "Failed to clear cart",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Apply coupon code to cart
   */
  async applyCoupon(cartId: string, couponCode: string): Promise<Cart> {
    try {
      // Start a transaction
      return await AppDataSource.transaction(
        async (transactionalEntityManager) => {
          // Get the cart
          const cart = await transactionalEntityManager.findOne(Cart, {
            where: { id: cartId },
            relations: ["items", "items.product"],
          });

          if (!cart) {
            throw new AppError("Cart not found", StatusCode.NOT_FOUND);
          }

          // TODO: Implement coupon validation and discount calculation
          // This is a placeholder for now
          cart.coupon_code = couponCode;
          cart.discount = 0; // Set appropriate discount

          // Recalculate cart totals
          cart.calculateTotals();
          await transactionalEntityManager.save(Cart, cart);

          return cart;
        }
      );
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error applying coupon to cart ${cartId}:`, error);
      throw new AppError(
        "Failed to apply coupon",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Update gift settings
   */
  async updateGiftSettings(
    cartId: string,
    isGift: boolean,
    giftMessage?: string
  ): Promise<Cart> {
    try {
      // Start a transaction
      return await AppDataSource.transaction(
        async (transactionalEntityManager) => {
          // Get the cart
          const cart = await transactionalEntityManager.findOne(Cart, {
            where: { id: cartId },
            relations: ["items"],
          });

          if (!cart) {
            throw new AppError("Cart not found", StatusCode.NOT_FOUND);
          }

          // Update gift settings
          cart.is_gift = isGift;
          cart.gift_message = isGift ? giftMessage : undefined;

          await transactionalEntityManager.save(Cart, cart);

          return cart;
        }
      );
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error updating gift settings for cart ${cartId}:`, error);
      throw new AppError(
        "Failed to update gift settings",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Merge guest cart into user cart after login
   */
  async mergeGuestCart(sessionId: string, userId: string): Promise<Cart> {
    try {
      // Start a transaction
      return await AppDataSource.transaction(
        async (transactionalEntityManager) => {
          // Get the guest cart
          const guestCart = await transactionalEntityManager.findOne(Cart, {
            where: { session_id: sessionId, is_active: true },
            relations: ["items", "items.product"],
          });

          if (!guestCart || guestCart.items.length === 0) {
            // No guest cart or empty, just return the user cart
            return this.getOrCreateCartByUserId(userId);
          }

          // Get or create the user cart
          let userCart = await transactionalEntityManager.findOne(Cart, {
            where: { user_id: userId, is_active: true },
            relations: ["items", "items.product"],
          });

          if (!userCart) {
            // Create new user cart
            userCart = transactionalEntityManager.create(Cart, {
              user_id: userId,
              is_active: true,
            });
            await transactionalEntityManager.save(Cart, userCart);
          }

          // Merge items from guest cart to user cart
          for (const guestItem of guestCart.items) {
            // Check if the product exists in the user cart
            const existingItem = userCart.items.find(
              (item) => item.product_id === guestItem.product_id
            );

            if (existingItem) {
              // Update quantity of existing item
              existingItem.quantity += guestItem.quantity;

              // Ensure we don't exceed available stock
              const product = await transactionalEntityManager.findOne(
                Product,
                {
                  where: { id: guestItem.product_id },
                }
              );

              if (product && existingItem.quantity > product.stock) {
                existingItem.quantity = product.stock;
              }

              existingItem.calculateSubtotal();
              await transactionalEntityManager.save(CartItem, existingItem);
            } else {
              // Create a new item in the user cart
              const newItem = transactionalEntityManager.create(CartItem, {
                cart_id: userCart.id,
                product_id: guestItem.product_id,
                quantity: guestItem.quantity,
                price: guestItem.price,
                subtotal: guestItem.subtotal,
                selected_options: guestItem.selected_options,
              });

              await transactionalEntityManager.save(CartItem, newItem);
              userCart.items.push(newItem);
            }
          }

          // Copy over gift settings and coupon if they don't exist in user cart
          if (guestCart.is_gift && !userCart.is_gift) {
            userCart.is_gift = true;
            userCart.gift_message = guestCart.gift_message;
          }

          if (guestCart.coupon_code && !userCart.coupon_code) {
            userCart.coupon_code = guestCart.coupon_code;
            userCart.discount = guestCart.discount;
          }

          // Recalculate cart totals
          userCart.calculateTotals();
          await transactionalEntityManager.save(Cart, userCart);

          // Deactivate the guest cart
          guestCart.is_active = false;
          await transactionalEntityManager.save(Cart, guestCart);

          return userCart;
        }
      );
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(
        `Error merging guest cart for session ${sessionId} into user cart ${userId}:`,
        error
      );
      throw new AppError(
        "Failed to merge carts",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Calculate shipping cost based on items and location
   */
  async calculateShipping(
    cartId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _countryCode: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _postalCode: string
  ): Promise<number> {
    try {
      // Get the cart
      const cart = await this.cartRepository.findOne({
        where: { id: cartId },
        relations: ["items", "items.product"],
      });

      if (!cart) {
        throw new AppError("Cart not found", StatusCode.NOT_FOUND);
      }

      // TODO: Implement actual shipping calculation based on:
      // - Total weight/dimensions of products
      // - Shipping destination (_countryCode, _postalCode)
      // - Shipping method
      // For now, use a simple calculation

      // Simple shipping cost calculation
      let shippingCost = 5.99; // Base shipping cost

      // Free shipping for orders over $50
      if (cart.subtotal >= 50) {
        shippingCost = 0;
      }

      // Update cart with shipping cost
      cart.shipping = shippingCost;
      cart.calculateTotals();
      await this.cartRepository.save(cart);

      return shippingCost;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error calculating shipping for cart ${cartId}:`, error);
      throw new AppError(
        "Failed to calculate shipping",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Calculate tax based on items and location
   */
  async calculateTax(
    cartId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _countryCode: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _postalCode: string
  ): Promise<number> {
    try {
      // Get the cart
      const cart = await this.cartRepository.findOne({
        where: { id: cartId },
        relations: ["items", "items.product"],
      });

      if (!cart) {
        throw new AppError("Cart not found", StatusCode.NOT_FOUND);
      }

      // TODO: Implement actual tax calculation based on:
      // - Tax jurisdiction rules
      // - Product tax categories
      // - Customer location (_countryCode, _postalCode)
      // For now, use a simple calculation

      // Simple tax calculation (10% tax)
      const taxRate = 0.1;
      const taxAmount = cart.subtotal * taxRate;

      // Update cart with tax amount
      cart.tax = parseFloat(taxAmount.toFixed(2));
      cart.calculateTotals();
      await this.cartRepository.save(cart);

      return cart.tax;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Error calculating tax for cart ${cartId}:`, error);
      throw new AppError(
        "Failed to calculate tax",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}
