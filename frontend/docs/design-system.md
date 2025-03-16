# Luma Design System

This document outlines the design token system for the Luma e-commerce platform, focusing on tactical and outdoor equipment.

## Overview

The Luma design system is built around a comprehensive set of design tokens that ensure consistency across the entire application. These tokens are structured as TypeScript objects that are integrated with Tailwind CSS for seamless implementation.

## Design Token Structure

Our design tokens are organized into the following categories:

- **Colors**: Brand colors, semantic colors, and supporting palettes
- **Typography**: Font families, sizes, weights, line heights, and text styles
- **Spacing**: Spacing scale, containers, breakpoints, and z-index
- **Elevation**: Shadows, border radius, opacity, and elevation levels

All tokens are centralized in the `frontend/src/styles/tokens` directory and are imported into the Tailwind configuration.

## Usage Guidelines

### Importing Tokens

```typescript
// Import the entire token system
import tokens from '@/styles/tokens';

// Import specific token categories
import { colors, typography, spacingTokens, elevationTokens } from '@/styles/tokens';

// Import specific tokens from a category
import { primary, secondary } from '@/styles/tokens/colors';
```

### Using with Tailwind CSS

Most tokens are directly mapped to Tailwind classes:

```jsx
// Using color tokens
<div className="bg-primary-600 text-white">Primary Button</div>

// Using typography tokens
<h1 className="font-sans text-3xl font-bold leading-tight">Heading</h1>

// Using spacing tokens
<div className="p-4 m-6">Spaced Content</div>

// Using elevation tokens
<div className="shadow-md rounded-lg">Elevated Card</div>
```

## Color System

### Primary Palette

The primary color palette is based on a deep navy blue, reflecting reliability and professionalism.

```
primary-50: #f0f4fa
primary-100: #e3eaf4
...
primary-600: #2A3B56 (Primary base color)
...
primary-950: #0e1621
```

### Secondary Palette

The secondary palette features a copper/amber tone, adding warmth and accent.

```
secondary-50: #fcf5eb
secondary-100: #f9ead6
...
secondary-500: #D8842A (Secondary base color)
...
secondary-950: #3a2008
```

### Semantic Colors

Our UI includes semantic colors for feedback and status:

- **Error**: Red tones for error states
- **Warning**: Amber tones for warning states
- **Success**: Green tones for success states
- **Info**: Blue tones for informational states

### Industry-Specific Palettes

- **Tactical**: Subdued blue-gray palette for tactical gear
- **Outdoor**: Earth-toned green palette for outdoor equipment

## Typography System

### Font Families

- **Sans-serif**: Inter (primary interface font)
- **Serif**: Source Serif Pro (for select headings/content)
- **Monospace**: JetBrains Mono (for technical content)
- **RTL Support**: Open Sans Hebrew (for RTL languages)

### Text Styles

Pre-configured text styles combining font properties:

- **Headings**: h1 through h6 with appropriate sizing and weight
- **Body**: bodyLarge, bodyDefault, bodySmall
- **UI Elements**: buttonLabel, caption, overline

## Spacing System

Built on a base unit of 0.25rem (4px), our spacing system provides consistent rhythm through the application:

```
spacing-1: 0.25rem (4px)
spacing-2: 0.5rem (8px)
spacing-4: 1rem (16px)
...and so on
```

### Breakpoints

Standard responsive breakpoints:
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## Elevation System

### Shadows

Shadows create hierarchy and depth:

```
shadow-sm: Subtle elevation
shadow: Default elevation
shadow-md: Medium elevation
...and so on
```

### Border Radius

Consistent rounding:

```
rounded-none: 0
rounded: 0.25rem (4px)
rounded-md: 0.375rem (6px)
...and so on
```

## Implementation in Tailwind

The design tokens are integrated into Tailwind's configuration file (`tailwind.config.js`), making them available as utility classes while maintaining the token system's structure.

## Best Practices

1. **Never hardcode values** - Always use tokens for colors, spacing, typography, etc.
2. **Use semantic tokens** when available (e.g., use `error-500` instead of a generic red)
3. **Maintain the token hierarchy** - Don't bypass the system for quick fixes
4. **Document custom uses** - If extending the system, add documentation

## Contributing to the Design System

When adding new tokens or modifying existing ones:

1. Locate the appropriate token file in `src/styles/tokens/`
2. Add your token following the established pattern
3. Update the Tailwind configuration if necessary
4. Update this documentation
5. Create examples in Storybook to demonstrate usage 
