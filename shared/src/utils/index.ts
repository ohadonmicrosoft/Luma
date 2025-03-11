import { PAGINATION } from '../constants';

/**
 * Format currency for display
 * @param amount Amount in cents
 * @param currency Currency code (defaults to USD)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount / 100);
}

/**
 * Parse pagination parameters from request query
 * @param query Request query object with page and limit
 * @returns Parsed pagination parameters
 */
export function parsePagination(query: { page?: string; limit?: string }) {
  const page = Math.max(
    1,
    parseInt(query.page || String(PAGINATION.DEFAULT_PAGE), 10)
  );
  
  const limit = Math.min(
    PAGINATION.MAX_LIMIT,
    Math.max(1, parseInt(query.limit || String(PAGINATION.DEFAULT_LIMIT), 10))
  );
  
  return { page, limit, offset: (page - 1) * limit };
}

/**
 * Slugify a string for URLs
 * @param text Text to slugify
 * @returns URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Generate a random string of specified length
 * @param length Length of the string (default: 16)
 * @returns Random string
 */
export function generateRandomString(length = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}

/**
 * Deep clone an object
 * @param obj Object to clone
 * @returns Cloned object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Calculate total pages for pagination
 * @param totalItems Total number of items
 * @param limit Items per page
 * @returns Total number of pages
 */
export function calculateTotalPages(totalItems: number, limit: number): number {
  return Math.ceil(totalItems / limit);
} 
