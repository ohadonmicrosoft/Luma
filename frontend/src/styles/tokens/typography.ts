/**
 * Design System Typography Tokens
 *
 * This file defines the typography system for the Luma e-commerce platform.
 * All typography values used in the application should reference these tokens.
 */

/**
 * Font families used throughout the application
 */
export const fontFamily = {
  // Primary sans-serif font for most text
  sans: ["Inter", "system-ui", "sans-serif"],

  // Serif font for certain headings or special text
  serif: ["Source Serif Pro", "Georgia", "serif"],

  // Monospace font for code and technical content
  mono: ["JetBrains Mono", "Menlo", "monospace"],

  // Hebrew font for RTL content
  hebrew: ["Open Sans Hebrew", "system-ui", "sans-serif"],
};

/**
 * Font sizes in rem units
 * These correspond to the text-* classes in Tailwind
 */
export const fontSize = {
  xs: "0.75rem", // 12px
  sm: "0.875rem", // 14px
  base: "1rem", // 16px
  lg: "1.125rem", // 18px
  xl: "1.25rem", // 20px
  "2xl": "1.5rem", // 24px
  "3xl": "1.875rem", // 30px
  "4xl": "2.25rem", // 36px
  "5xl": "3rem", // 48px
};

/**
 * Line heights (unitless multipliers)
 * These correspond to the leading-* classes in Tailwind
 */
export const lineHeight = {
  none: 1,
  tight: 1.2,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
};

/**
 * Font weights
 */
export const fontWeight = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
};

/**
 * Letter spacing (tracking)
 */
export const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
};

/**
 * Text case transformations
 */
export const textCase = {
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
  normalCase: "none",
};

/**
 * Typography presets for common text elements
 * These combine the atomic tokens into ready-to-use configurations
 */
export const textStyles = {
  // Heading styles
  h1: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize["4xl"],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h4: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h5: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  h6: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },

  // Body text styles
  bodyLarge: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  bodyDefault: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  bodySmall: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },

  // UI text styles
  buttonLabel: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.normal,
  },
  caption: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  overline: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.wider,
    textTransform: textCase.uppercase,
  },
};

/**
 * Complete typography object
 */
export const typography = {
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
  textCase,
  textStyles,
};

export default typography;
