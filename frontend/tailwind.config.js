/**
 * Tailwind CSS configuration for Luma e-commerce platform
 *
 * This configuration extends Tailwind with our design tokens
 * and custom utilities for the tactical/outdoor equipment focus.
 */

// Import design tokens
const colors = require("./src/styles/tokens/colors");
const { fontFamily } = require("./src/styles/tokens/typography");
const {
  spacing,
  containers,
  breakpoints,
} = require("./src/styles/tokens/spacing");
const { shadows, borderRadius } = require("./src/styles/tokens/elevation");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Override the default Tailwind theme with our design tokens
    screens: breakpoints,
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000000",
      white: "#ffffff",
      primary: colors.primary,
      secondary: colors.secondary,
      gray: colors.gray,
      tactical: colors.tactical,
      outdoor: colors.outdoor,
      error: colors.ui.error,
      warning: colors.ui.warning,
      success: colors.ui.success,
      info: colors.ui.info,
    },
    fontFamily: {
      sans: fontFamily.sans,
      serif: fontFamily.serif,
      mono: fontFamily.mono,
      hebrew: fontFamily.hebrew,
    },
    borderRadius,
    boxShadow: shadows,
    extend: {
      spacing,
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
        screens: containers,
      },
      // Add custom utilities and extensions here
      typography: {
        DEFAULT: {
          css: {
            color: colors.gray[800],
            a: {
              color: colors.primary[600],
              "&:hover": {
                color: colors.primary[700],
              },
            },
            h1: {
              color: colors.gray[900],
            },
            h2: {
              color: colors.gray[900],
            },
            h3: {
              color: colors.gray[900],
            },
            h4: {
              color: colors.gray[900],
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    // Add custom plugins here
  ],
};
