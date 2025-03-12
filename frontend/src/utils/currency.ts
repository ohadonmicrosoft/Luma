/**
 * Currency formatting utilities for Luma e-commerce platform
 * Supports USD (US Dollar) and ILS (Israeli Shekel)
 */

type CurrencyCode = 'USD' | 'ILS';

interface FormatCurrencyOptions {
  locale?: string;
  currency?: CurrencyCode;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useSymbol?: boolean;
}

/**
 * Format a number as currency
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  options: FormatCurrencyOptions = {}
): string {
  const {
    locale = 'en-US',
    currency = 'USD',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    useSymbol = true,
  } = options;

  // Handle locale-specific formatting
  const localeMap: Record<CurrencyCode, string> = {
    USD: 'en-US',
    ILS: 'he-IL',
  };

  // Use the provided locale or the default for the currency
  const formattingLocale = locale || localeMap[currency];

  // Format the currency
  return new Intl.NumberFormat(formattingLocale, {
    style: useSymbol ? 'currency' : 'decimal',
    currency: useSymbol ? currency : undefined,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}

/**
 * Get the currency symbol for a given currency code
 * @param currencyCode - The currency code
 * @returns The currency symbol
 */
export function getCurrencySymbol(currencyCode: CurrencyCode): string {
  const symbols: Record<CurrencyCode, string> = {
    USD: '$',
    ILS: '₪',
  };
  return symbols[currencyCode] || currencyCode;
}

/**
 * Format a price range
 * @param minPrice - The minimum price
 * @param maxPrice - The maximum price
 * @param options - Formatting options
 * @returns Formatted price range string
 */
export function formatPriceRange(
  minPrice: number,
  maxPrice: number,
  options: FormatCurrencyOptions = {}
): string {
  const { currency = 'USD', locale } = options;
  
  // For Hebrew locale, we might want to adjust the format
  const isHebrew = locale?.startsWith('he') || currency === 'ILS';
  
  const formattedMin = formatCurrency(minPrice, options);
  const formattedMax = formatCurrency(maxPrice, options);
  
  // Handle RTL formatting for Hebrew
  return isHebrew
    ? `${formattedMax} - ${formattedMin}`
    : `${formattedMin} - ${formattedMax}`;
}

/**
 * Format a price with discount
 * @param originalPrice - The original price
 * @param discountedPrice - The discounted price
 * @param options - Formatting options
 * @returns Object with formatted prices and discount percentage
 */
export function formatDiscountedPrice(
  originalPrice: number,
  discountedPrice: number,
  options: FormatCurrencyOptions = {}
): {
  original: string;
  discounted: string;
  percentage: number;
  saving: string;
} {
  const discountPercentage = Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100
  );
  
  return {
    original: formatCurrency(originalPrice, options),
    discounted: formatCurrency(discountedPrice, options),
    percentage: discountPercentage,
    saving: formatCurrency(originalPrice - discountedPrice, options),
  };
} 
