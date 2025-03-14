/**
 * Currency utilities for formatting and displaying prices
 */

import { useTranslation } from 'next-i18next';

// Supported currencies
export enum Currency {
  USD = 'USD',
  ILS = 'ILS',
  EUR = 'EUR',
  GBP = 'GBP',
}

// Currency symbols
export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  [Currency.USD]: '$',
  [Currency.ILS]: '₪',
  [Currency.EUR]: '€',
  [Currency.GBP]: '£',
};

// Currency positions (before or after amount)
export const CURRENCY_POSITIONS: Record<Currency, 'before' | 'after'> = {
  [Currency.USD]: 'before',
  [Currency.ILS]: 'after',
  [Currency.EUR]: 'before',
  [Currency.GBP]: 'before',
};

// Currency locale mappings for Intl.NumberFormat
export const CURRENCY_LOCALES: Record<Currency, string> = {
  [Currency.USD]: 'en-US',
  [Currency.ILS]: 'he-IL',
  [Currency.EUR]: 'de-DE',
  [Currency.GBP]: 'en-GB',
};

/**
 * Format a price for display
 * @param amount - The price amount
 * @param currency - The currency code
 * @param locale - The locale to format for
 * @param options - Additional formatting options
 * @returns Formatted price string
 */
export function formatPrice(
  amount: number,
  currency: Currency = Currency.USD,
  locale?: string,
  options?: {
    decimals?: number;
    useSymbol?: boolean;
    useCurrencyCode?: boolean;
    compact?: boolean;
  }
): string {
  const {
    decimals = 2,
    useSymbol = true,
    useCurrencyCode = false,
    compact = false,
  } = options || {};

  // Determine which locale to use for formatting
  const formattingLocale = locale || CURRENCY_LOCALES[currency];
  
  // Create number formatter
  const formatter = new Intl.NumberFormat(formattingLocale, {
    style: 'currency',
    currency,
    currencyDisplay: useSymbol ? 'symbol' : (useCurrencyCode ? 'code' : 'name'),
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    notation: compact ? 'compact' : 'standard',
  });
  
  return formatter.format(amount);
}

/**
 * Format a price with symbol based on locale direction
 * @param amount - The price amount
 * @param currency - The currency code
 * @param options - Additional formatting options
 * @returns Formatted price string
 */
export function usePriceFormatter() {
  const { i18n } = useTranslation();
  
  const formatPriceWithLocale = (
    amount: number,
    currency: Currency = Currency.USD,
    options?: {
      decimals?: number;
      useSymbol?: boolean;
      useCurrencyCode?: boolean;
      compact?: boolean;
    }
  ): string => {
    return formatPrice(amount, currency, i18n.language, options);
  };
  
  return formatPriceWithLocale;
}

/**
 * Calculate discount amount
 * @param originalPrice - The original price
 * @param discountedPrice - The discounted price
 * @returns The discount amount
 */
export function calculateDiscountAmount(
  originalPrice: number,
  discountedPrice: number
): number {
  return Math.max(0, originalPrice - discountedPrice);
}

/**
 * Calculate discount percentage
 * @param originalPrice - The original price
 * @param discountedPrice - The discounted price
 * @returns The discount percentage
 */
export function calculateDiscountPercentage(
  originalPrice: number,
  discountedPrice: number
): number {
  if (originalPrice <= 0) return 0;
  const percentage = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.round(percentage);
}

/**
 * Convert between currencies
 * @param amount - The amount to convert
 * @param fromCurrency - The source currency
 * @param toCurrency - The target currency
 * @param exchangeRates - Exchange rates object
 * @returns The converted amount
 */
export function convertCurrency(
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency,
  exchangeRates: Record<Currency, number>
): number {
  if (fromCurrency === toCurrency) {
    return amount;
  }
  
  // Convert to base currency (USD) first, then to target currency
  const inUSD = fromCurrency === Currency.USD 
    ? amount 
    : amount / exchangeRates[fromCurrency];
    
  return toCurrency === Currency.USD 
    ? inUSD 
    : inUSD * exchangeRates[toCurrency];
} 
