/**
 * Design System Tokens
 *
 * This file exports all design tokens for the Luma e-commerce platform.
 * Import this file to access all tokens in one place.
 */

import colors from "./colors";
import typography from "./typography";
import spacingTokens from "./spacing";
import elevationTokens from "./elevation";

/**
 * Complete design token system
 */
export const tokens = {
  colors,
  typography,
  spacing: spacingTokens,
  elevation: elevationTokens,
};

// Export individual token categories
export { colors, typography, spacingTokens, elevationTokens };

// Default export for the complete token system
export default tokens;
