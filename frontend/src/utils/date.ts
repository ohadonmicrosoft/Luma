/**
 * Date formatting utilities with support for multiple locales including Hebrew
 */

import { useTranslation } from "next-i18next";

interface DateFormatOptions {
  dateStyle?: "full" | "long" | "medium" | "short";
  timeStyle?: "full" | "long" | "medium" | "short";
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  weekday?: "long" | "short" | "narrow";
  hourCycle?: "h11" | "h12" | "h23" | "h24";
  timeZone?: string;
}

/**
 * Format a date with locale-specific formatting
 * @param date - The date to format
 * @param locale - The locale to use for formatting
 * @param options - Additional formatting options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number,
  locale: string = "en",
  options: DateFormatOptions = { dateStyle: "medium" }
): string {
  // Handle string dates
  const dateObj =
    typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : date;

  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Format a relative time (e.g., "2 days ago", "in 3 hours")
 * @param date - The date to format relative to now
 * @param locale - The locale to use for formatting
 * @param style - The formatting style
 * @returns Formatted relative time string
 */
export function formatRelativeTime(
  date: Date | string | number,
  locale: string = "en",
  style: "long" | "short" | "narrow" = "long"
): string {
  const dateObj =
    typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : date;

  const now = new Date();
  const diffMs = dateObj.getTime() - now.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);
  const diffMonth = Math.round(diffDay / 30);
  const diffYear = Math.round(diffMonth / 12);

  let unit: Intl.RelativeTimeFormatUnit = "second";
  let value = diffSec;

  if (Math.abs(diffYear) >= 1) {
    unit = "year";
    value = diffYear;
  } else if (Math.abs(diffMonth) >= 1) {
    unit = "month";
    value = diffMonth;
  } else if (Math.abs(diffDay) >= 1) {
    unit = "day";
    value = diffDay;
  } else if (Math.abs(diffHour) >= 1) {
    unit = "hour";
    value = diffHour;
  } else if (Math.abs(diffMin) >= 1) {
    unit = "minute";
    value = diffMin;
  }

  const formatter = new Intl.RelativeTimeFormat(locale, { style });
  return formatter.format(value, unit);
}

/**
 * Format a date range
 * @param startDate - The start date
 * @param endDate - The end date
 * @param locale - The locale to use for formatting
 * @param options - Additional formatting options
 * @returns Formatted date range string
 */
export function formatDateRange(
  startDate: Date | string | number,
  endDate: Date | string | number,
  locale: string = "en",
  options: DateFormatOptions = { dateStyle: "medium" }
): string {
  const startObj =
    typeof startDate === "string" || typeof startDate === "number"
      ? new Date(startDate)
      : startDate;

  const endObj =
    typeof endDate === "string" || typeof endDate === "number"
      ? new Date(endDate)
      : endDate;

  // Use DateTimeFormat with formatRange if supported (newer browsers)
  if (typeof Intl.DateTimeFormat.prototype.formatRange === "function") {
    return new Intl.DateTimeFormat(locale, options).formatRange(
      startObj,
      endObj
    );
  }

  // Fallback for older browsers
  const startString = formatDate(startObj, locale, options);
  const endString = formatDate(endObj, locale, options);

  // Direction-aware formatting
  return locale.startsWith("he")
    ? `${endString} - ${startString}`
    : `${startString} - ${endString}`;
}

/**
 * Custom hook to get date formatting functions with the current locale
 * @returns Object with date formatting functions
 */
export function useDateFormatter() {
  const { i18n } = useTranslation();

  const format = (
    date: Date | string | number,
    options: DateFormatOptions = { dateStyle: "medium" }
  ): string => {
    return formatDate(date, i18n.language, options);
  };

  const formatRelative = (
    date: Date | string | number,
    style: "long" | "short" | "narrow" = "long"
  ): string => {
    return formatRelativeTime(date, i18n.language, style);
  };

  const formatRange = (
    startDate: Date | string | number,
    endDate: Date | string | number,
    options: DateFormatOptions = { dateStyle: "medium" }
  ): string => {
    return formatDateRange(startDate, endDate, i18n.language, options);
  };

  // Convert a date to a localized date string (for form inputs)
  const toLocaleDateString = (date: Date | string | number): string => {
    const dateObj =
      typeof date === "string" || typeof date === "number"
        ? new Date(date)
        : date;

    // For Hebrew locale, use different date format
    if (i18n.language.startsWith("he")) {
      return formatDate(dateObj, i18n.language, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }

    // Default format for non-Hebrew locales (yyyy-mm-dd)
    return dateObj.toISOString().split("T")[0];
  };

  return {
    format,
    formatRelative,
    formatRange,
    toLocaleDateString,
    locale: i18n.language,
  };
}
