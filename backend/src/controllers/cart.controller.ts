import { Request, Response, NextFunction } from 'express';
import { CartService, CartItemInput } from '../services/cart.service';
import { StatusCode } from '../utils/constants';

export class CartController {
  private cartService: CartService;

  constructor() {
    this.cartService = new CartService();
  }

  /**
   * Get or create cart for the current user/session
   */
  getOrCreateCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let cart;
      
      // If user is authenticated, use user ID
      if (req.user?.id) {
        cart = await this.cartService.getOrCreateCartByUserId(req.user.id);
      } 
      // Otherwise use session ID
      else {
        // Create or use session ID
        if (!req.session.id) {
          req.session.id = Date.now().toString();
        }
        cart = await this.cartService.getOrCreateCartBySessionId(req.session.id);
      }

      res.status(StatusCode.OK).json({
        success: true,
        data: cart
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get cart by ID
   */
  getCartById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cart = await this.cartService.getCartById(req.params.id);

      res.status(StatusCode.OK).json({
        success: true,
        data: cart
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Add product to cart
   */
  addItemToCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { cartId } = req.params;
      const itemInput: CartItemInput = req.body;

      const cart = await this.cartService.addItemToCart(cartId, itemInput);

      res.status(StatusCode.OK).json({
        success: true,
        data: cart
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update cart item quantity
   */
  updateCartItemQuantity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { cartId, itemId } = req.params;
      const { quantity } = req.body;

      if (typeof quantity !== 'number' || quantity < 0) {
        res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          error: 'Valid quantity required'
        });
        return;
      }

      const cart = await this.cartService.updateCartItemQuantity(cartId, itemId, quantity);

      res.status(StatusCode.OK).json({
        success: true,
        data: cart
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Remove item from cart
   */
  removeItemFromCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { cartId, itemId } = req.params;

      const cart = await this.cartService.removeItemFromCart(cartId, itemId);

      res.status(StatusCode.OK).json({
        success: true,
        data: cart
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Clear cart (remove all items)
   */
  clearCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { cartId } = req.params;

      const cart = await this.cartService.clearCart(cartId);

      res.status(StatusCode.OK).json({
        success: true,
        data: cart
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Apply coupon to cart
   */
  applyCoupon = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { cartId } = req.params;
      const { couponCode } = req.body;

      if (!couponCode || typeof couponCode !== 'string') {
        res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          error: 'Valid coupon code required'
        });
        return;
      }

      const cart = await this.cartService.applyCoupon(cartId, couponCode);

      res.status(StatusCode.OK).json({
        success: true,
        data: cart
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update gift settings
   */
  updateGiftSettings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { cartId } = req.params;
      const { isGift, giftMessage } = req.body;

      if (typeof isGift !== 'boolean') {
        res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          error: 'Valid isGift flag required'
        });
        return;
      }

      const cart = await this.cartService.updateGiftSettings(cartId, isGift, giftMessage);

      res.status(StatusCode.OK).json({
        success: true,
        data: cart
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Calculate shipping
   */
  calculateShipping = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { cartId } = req.params;
      const { countryCode, postalCode } = req.body;

      if (!countryCode || !postalCode) {
        res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          error: 'Country code and postal code are required'
        });
        return;
      }

      const shippingCost = await this.cartService.calculateShipping(cartId, countryCode, postalCode);

      res.status(StatusCode.OK).json({
        success: true,
        data: { shippingCost }
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Calculate tax
   */
  calculateTax = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { cartId } = req.params;
      const { countryCode, postalCode } = req.body;

      if (!countryCode || !postalCode) {
        res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          error: 'Country code and postal code are required'
        });
        return;
      }

      const taxAmount = await this.cartService.calculateTax(cartId, countryCode, postalCode);

      res.status(StatusCode.OK).json({
        success: true,
        data: { taxAmount }
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Merge guest cart into user cart after login
   */
  mergeGuestCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user?.id || !req.session?.id) {
        res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          error: 'User must be authenticated and have a session'
        });
        return;
      }

      const cart = await this.cartService.mergeGuestCart(req.session.id, req.user.id);

      res.status(StatusCode.OK).json({
        success: true,
        data: cart
      });
    } catch (error) {
      next(error);
    }
  };
} 
