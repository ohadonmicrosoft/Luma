// Error codes
export enum ErrorCode {
  // Authentication errors
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",

  // Validation errors
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INVALID_INPUT = "INVALID_INPUT",

  // Resource errors
  NOT_FOUND = "NOT_FOUND",
  ALREADY_EXISTS = "ALREADY_EXISTS",

  // Server errors
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",

  // Business logic errors
  INSUFFICIENT_INVENTORY = "INSUFFICIENT_INVENTORY",
  PAYMENT_REQUIRED = "PAYMENT_REQUIRED",
  PAYMENT_FAILED = "PAYMENT_FAILED",
}

// Status codes
export enum StatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

// API routes
export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
  },
  USERS: {
    BASE: "/users",
    PROFILE: "/users/profile",
    ADDRESSES: "/users/addresses",
  },
  PRODUCTS: {
    BASE: "/products",
    CATEGORIES: "/products/categories",
    SEARCH: "/products/search",
    FEATURED: "/products/featured",
  },
  ORDERS: {
    BASE: "/orders",
    CART: "/orders/cart",
  },
  PAYMENTS: {
    BASE: "/payments",
    INTENT: "/payments/intent",
    WEBHOOK: "/payments/webhook",
  },
};

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
};

// Product constants
export const PRODUCT = {
  MIN_PRICE: 0,
  MAX_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 2000,
  MAX_IMAGES: 10,
};

// Order constants
export const ORDER = {
  SHIPPING_METHODS: {
    STANDARD: "standard",
    EXPRESS: "express",
    OVERNIGHT: "overnight",
  },
  PAYMENT_METHODS: {
    CREDIT_CARD: "credit_card",
    PAYPAL: "paypal",
  },
};
