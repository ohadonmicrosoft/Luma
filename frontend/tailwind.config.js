/**
 * Tailwind CSS configuration for Luma e-commerce platform
 *
 * This configuration extends Tailwind with our design tokens
 * and custom utilities for the tactical/outdoor equipment focus.
 */

// Import design tokens
import colors from "./src/styles/tokens/colors";
import { fontFamily } from "./src/styles/tokens/typography";
import {
  spacing,
  containers,
  breakpoints,
} from "./src/styles/tokens/spacing";
import { shadows, borderRadius } from "./src/styles/tokens/elevation";

import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";

/** @type {import('tailwindcss').Config} */
export default {
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
    forms,
    typography,
    aspectRatio,
    // Add custom plugins here
  ],
};
