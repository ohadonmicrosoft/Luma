/**
 * Design System Color Tokens
 *
 * This file defines the color palette for the Luma e-commerce platform.
 * All color values used in the application should reference these tokens.
 */

/**
 * Primary Color Palette - Deep Navy
 * Used for primary actions, key UI elements, and branded areas
 */
export const primary = {
  50: "#f0f4fa",
  100: "#e3eaf4",
  200: "#c5d2e8",
  300: "#97afd5",
  400: "#6485bc",
  500: "#4166a6",
  600: "#2A3B56", // Primary base color
  700: "#253249",
  800: "#1A2A45", // Primary dark
  900: "#192438",
  950: "#0e1621",
};

/**
 * Secondary Color Palette - Copper/Amber
 * Used for accents, highlights, and secondary actions
 */
export const secondary = {
  50: "#fcf5eb",
  100: "#f9ead6",
  200: "#f3d4ae",
  300: "#eab77b",
  400: "#e29a4a",
  500: "#D8842A", // Secondary base color
  600: "#B36F1C", // Secondary dark
  700: "#95570f",
  800: "#794612",
  900: "#633c14",
  950: "#3a2008",
};

/**
 * Gray palette for neutral elements
 * Used for text, backgrounds, borders, and non-interactive elements
 */
export const gray = {
  50: "#F7F9FC", // Gray-100 from specs
  100: "#EDF1F7", // Gray-200 from specs
  200: "#E1E8F0", // Gray-300 from specs
  300: "#C9D4E4", // Gray-400 from specs
  400: "#9AABC2", // Gray-500 from specs
  500: "#627795", // Gray-600 from specs
  600: "#4A5A78", // Gray-700 from specs
  700: "#344056", // Gray-800 from specs
  800: "#1E2B3E", // Gray-900 from specs
  900: "#172435",
  950: "#0D1419",
};

/**
 * Tactical palette
 * Used for tactical/military product categories and UI elements
 */
export const tactical = {
  50: "#f1f4f6",
  100: "#e2e7ec",
  200: "#c5d0db",
  300: "#a1b2c8",
  400: "#7b91af",
  500: "#5e7594",
  600: "#4c5e7a",
  700: "#3f4d65",
  800: "#384354",
  900: "#303a46",
  950: "#1e252e",
};

/**
 * Outdoor palette
 * Used for outdoor/hiking product categories and UI elements
 */
export const outdoor = {
  50: "#f4f8f3",
  100: "#e6efe4",
  200: "#cfdecb",
  300: "#b1c9a9",
  400: "#8bac7f",
  500: "#6c8f60",
  600: "#57754c",
  700: "#455e3e",
  800: "#3a4c35",
  900: "#314130",
  950: "#19241a",
};

/**
 * Semantic UI colors
 * Used for feedback, status, and alerts
 */
export const ui = {
  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a",
  },
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03",
  },
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16",
  },
  info: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554",
  },
};

/**
 * Complete color palette object
 */
export const colors = {
  primary,
  secondary,
  gray,
  tactical,
  outdoor,
  ui,
};

export default colors;
