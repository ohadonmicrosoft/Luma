/**
 * Number formatting utilities with support for multiple locales including Hebrew
 */

import { useTranslation } from "next-i18next";

interface NumberFormatOptions {
  style?: "decimal" | "percent" | "unit";
  unit?: string;
  unitDisplay?: "long" | "short" | "narrow";
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  minimumIntegerDigits?: number;
  minimumSignificantDigits?: number;
  maximumSignificantDigits?: number;
  notation?: "standard" | "scientific" | "engineering" | "compact";
  compactDisplay?: "short" | "long";
  signDisplay?: "auto" | "always" | "never" | "exceptZero";
}

/**
 * Format a number with locale-specific formatting
 * @param value - The number to format
 * @param locale - The locale to use for formatting
 * @param options - Additional formatting options
 * @returns Formatted number string
 */
export function formatNumber(
  value: number,
  locale: string = "en",
  options: NumberFormatOptions = {}
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Format a number as a percentage
 * @param value - The number to format (e.g., 0.5 for 50%)
 * @param locale - The locale to use for formatting
 * @param decimals - Number of decimal places
 * @returns Formatted percentage string
 */
export function formatPercent(
  value: number,
  locale: string = "en",
  decimals: number = 0
): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format a number with a unit (e.g., kg, m)
 * @param value - The number to format
 * @param unit - The unit to use
 * @param locale - The locale to use for formatting
 * @param options - Additional formatting options
 * @returns Formatted number with unit
 */
export function formatUnit(
  value: number,
  unit: string,
  locale: string = "en",
  options: Omit<NumberFormatOptions, "style" | "unit"> = {}
): string {
  return new Intl.NumberFormat(locale, {
    style: "unit",
    unit,
    unitDisplay: options.unitDisplay || "short",
    minimumFractionDigits: options.minimumFractionDigits,
    maximumFractionDigits: options.maximumFractionDigits,
    notation: options.notation,
  }).format(value);
}

/**
 * Format a number in compact notation (e.g., 1K, 1M)
 * @param value - The number to format
 * @param locale - The locale to use for formatting
 * @param options - Additional formatting options
 * @returns Formatted compact number
 */
export function formatCompact(
  value: number,
  locale: string = "en",
  options: Omit<NumberFormatOptions, "notation"> = {}
): string {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    compactDisplay: options.compactDisplay || "short",
    minimumFractionDigits: options.minimumFractionDigits,
    maximumFractionDigits: options.maximumFractionDigits || 1,
  }).format(value);
}

/**
 * Convert a measurement from one unit to another
 * @param value - The value to convert
 * @param fromUnit - The source unit
 * @param toUnit - The target unit
 * @returns The converted value
 */
export function convertMeasurement(
  value: number,
  fromUnit: string,
  toUnit: string
): number {
  // Conversion factors for common measurements
  const lengthConversions: Record<string, number> = {
    mm: 1,
    cm: 10,
    m: 1000,
    km: 1000000,
    in: 25.4,
    ft: 304.8,
    yd: 914.4,
    mi: 1609344,
  };

  const weightConversions: Record<string, number> = {
    mg: 1,
    g: 1000,
    kg: 1000000,
    oz: 28349.5,
    lb: 453592,
  };

  const volumeConversions: Record<string, number> = {
    ml: 1,
    l: 1000,
    cl: 10,
    fl_oz: 29.5735,
    pt: 473.176,
    qt: 946.353,
    gal: 3785.41,
  };

  // Determine which conversion table to use
  let conversions: Record<string, number>;
  if (fromUnit in lengthConversions && toUnit in lengthConversions) {
    conversions = lengthConversions;
  } else if (fromUnit in weightConversions && toUnit in weightConversions) {
    conversions = weightConversions;
  } else if (fromUnit in volumeConversions && toUnit in volumeConversions) {
    conversions = volumeConversions;
  } else {
    throw new Error(`Unsupported unit conversion: ${fromUnit} to ${toUnit}`);
  }

  // Convert to base unit then to target unit
  return (value * conversions[fromUnit]) / conversions[toUnit];
}

/**
 * Custom hook to get number formatting functions with the current locale
 * @returns Object with number formatting functions
 */
export function useNumberFormatter() {
  const { i18n } = useTranslation();

  const format = (value: number, options: NumberFormatOptions = {}): string => {
    return formatNumber(value, i18n.language, options);
  };

  const formatPct = (value: number, decimals: number = 0): string => {
    return formatPercent(value, i18n.language, decimals);
  };

  const formatWithUnit = (
    value: number,
    unit: string,
    options: Omit<NumberFormatOptions, "style" | "unit"> = {}
  ): string => {
    return formatUnit(value, unit, i18n.language, options);
  };

  const formatCompactNumber = (
    value: number,
    options: Omit<NumberFormatOptions, "notation"> = {}
  ): string => {
    return formatCompact(value, i18n.language, options);
  };

  return {
    format,
    formatPct,
    formatWithUnit,
    formatCompact: formatCompactNumber,
    convertMeasurement,
    locale: i18n.language,
  };
}
