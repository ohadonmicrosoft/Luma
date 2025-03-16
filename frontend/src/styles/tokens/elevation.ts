/**
 * Design System Elevation Tokens
 *
 * This file defines the elevation system for the Luma e-commerce platform.
 * All shadow and elevation values used in the application should reference these tokens.
 */

/**
 * Shadow values
 * Used for creating depth and elevation in the UI
 */
export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
};

/**
 * Border radius values
 * Used for rounding corners of elements
 */
export const borderRadius = {
  none: "0",
  sm: "0.125rem", // 2px
  DEFAULT: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  full: "9999px",
};

/**
 * Border width values
 * Used for defining border thickness
 */
export const borderWidth = {
  DEFAULT: "1px",
  0: "0",
  2: "2px",
  4: "4px",
  8: "8px",
};

/**
 * Opacity values
 * Used for transparency effects
 */
export const opacity = {
  0: "0",
  5: "0.05",
  10: "0.1",
  20: "0.2",
  25: "0.25",
  30: "0.3",
  40: "0.4",
  50: "0.5",
  60: "0.6",
  70: "0.7",
  75: "0.75",
  80: "0.8",
  90: "0.9",
  95: "0.95",
  100: "1",
};

/**
 * Elevation levels
 * Semantic mapping of elevation to use cases
 */
export const elevationLevels = {
  ground: "none",
  raised: shadows.sm,
  card: shadows.DEFAULT,
  dropdown: shadows.md,
  sticky: shadows.lg,
  modal: shadows.xl,
  popup: shadows["2xl"],
};

/**
 * Complete elevation object
 */
export const elevationTokens = {
  shadows,
  borderRadius,
  borderWidth,
  opacity,
  elevationLevels,
};

export default elevationTokens;
