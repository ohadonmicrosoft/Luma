/**
 * Design System Spacing Tokens
 *
 * This file defines the spacing system for the Luma e-commerce platform.
 * All spacing values used in the application should reference these tokens.
 */

/**
 * Base spacing unit in rem
 * All spacing values are multiples of this base unit
 */
export const BASE_UNIT = 0.25; // 4px at 16px base font size

/**
 * Spacing scale in rem units
 * These correspond to the p-*, m-*, gap-* classes in Tailwind
 */
export const spacing = {
  0: "0",
  1: `${BASE_UNIT}rem`, // 4px
  2: `${BASE_UNIT * 2}rem`, // 8px
  3: `${BASE_UNIT * 3}rem`, // 12px
  4: `${BASE_UNIT * 4}rem`, // 16px
  5: `${BASE_UNIT * 5}rem`, // 20px
  6: `${BASE_UNIT * 6}rem`, // 24px
  8: `${BASE_UNIT * 8}rem`, // 32px
  10: `${BASE_UNIT * 10}rem`, // 40px
  12: `${BASE_UNIT * 12}rem`, // 48px
  16: `${BASE_UNIT * 16}rem`, // 64px
  20: `${BASE_UNIT * 20}rem`, // 80px
  24: `${BASE_UNIT * 24}rem`, // 96px
};

/**
 * Container width values
 * Used for setting max-width constraints on content
 */
export const containers = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

/**
 * Responsive breakpoints
 * Used for media queries and responsive utilities
 */
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

/**
 * Z-index scale
 * Used for controlling the stacking order of elements
 */
export const zIndex = {
  0: "0",
  10: "10",
  20: "20",
  30: "30",
  40: "40",
  50: "50",
  auto: "auto",
  dropdown: "1000",
  sticky: "1100",
  fixed: "1200",
  drawer: "1300",
  modal: "1400",
  popover: "1500",
  tooltip: "1600",
};

/**
 * Complete spacing object
 */
export const spacingTokens = {
  BASE_UNIT,
  spacing,
  containers,
  breakpoints,
  zIndex,
};

export default spacingTokens;
