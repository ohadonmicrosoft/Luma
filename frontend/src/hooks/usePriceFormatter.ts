import { useRouter } from "next/router";
import { useDirectionalStyles } from "@/utils/rtl";

export const usePriceFormatter = () => {
  const router = useRouter();
  const { isRTL } = useDirectionalStyles();

  /**
   * Format a price with the appropriate currency symbol and thousand separators
   */
  const formatPrice = (
    price: number,
    currency = "USD",
    options?: {
      showCurrency?: boolean;
      maximumFractionDigits?: number;
      minimumFractionDigits?: number;
    }
  ): string => {
    const {
      showCurrency = true,
      maximumFractionDigits = 2,
      minimumFractionDigits = 0,
    } = options || {};

    // Get locale from router
    const locale = router.locale || router.defaultLocale || "en-US";

    // Define currency display based on RTL
    const currencyDisplay = isRTL ? "symbol" : "symbol";

    // Format using Intl.NumberFormat
    const formatter = new Intl.NumberFormat(locale, {
      style: showCurrency ? "currency" : "decimal",
      currency: showCurrency ? currency : undefined,
      currencyDisplay,
      maximumFractionDigits,
      minimumFractionDigits,
    });

    return formatter.format(price);
  };

  /**
   * Format a price range with appropriate currency symbols
   */
  const formatPriceRange = (
    minPrice: number,
    maxPrice: number,
    currency = "USD"
  ): string => {
    if (minPrice === maxPrice) {
      return formatPrice(minPrice, currency);
    }

    const formattedMin = formatPrice(minPrice, currency);
    const formattedMax = formatPrice(maxPrice, currency);

    return isRTL
      ? `${formattedMax} - ${formattedMin}`
      : `${formattedMin} - ${formattedMax}`;
  };

  /**
   * Calculate and format a discount percentage
   */
  const formatDiscount = (
    originalPrice: number,
    discountedPrice: number
  ): string => {
    if (originalPrice <= 0 || discountedPrice >= originalPrice) return "";

    const discountPercentage = Math.round(
      ((originalPrice - discountedPrice) / originalPrice) * 100
    );
    return isRTL ? `${discountPercentage}%−` : `-${discountPercentage}%`;
  };

  return {
    formatPrice,
    formatPriceRange,
    formatDiscount,
  };
};
