# Luma E-commerce Platform - Developer Documentation

## Overview

This document provides comprehensive documentation for developers working on the Luma e-commerce platform frontend. It covers the design system architecture, component usage, and development guidelines.

## Table of Contents

1. [Design System Architecture](#design-system-architecture)
2. [Getting Started](#getting-started)
3. [Design Tokens](#design-tokens)
4. [Component Architecture](#component-architecture)
5. [RTL Support](#rtl-support)
6. [Storybook](#storybook)
7. [Development Workflow](#development-workflow)
8. [Performance Optimization](#performance-optimization)

## Design System Architecture

The Luma design system follows a token-based architecture that promotes consistency and flexibility across the application. It is built on top of React, Next.js, TypeScript, and Tailwind CSS.

### Key Principles

- **Consistency**: Using design tokens ensures visual consistency
- **Flexibility**: Components support various props for customization
- **Accessibility**: WCAG 2.1 AA compliance is built into components
- **RTL Support**: Bidirectional text support for multilingual experiences
- **Performance**: Optimized components minimize bundle size and rendering time

### Directory Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/             # Core UI components
│   │   ├── layout/         # Layout components
│   │   ├── navigation/     # Navigation components
│   │   └── ...
│   ├── contexts/           # React contexts (including DirectionContext)
│   ├── styles/
│   │   ├── tokens/         # Design tokens
│   │   └── globals.css     # Global styles
│   ├── utils/              # Utility functions
│   └── stories/            # Storybook stories
├── .storybook/             # Storybook configuration
└── tailwind.config.js      # Tailwind configuration
```

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd frontend
npm install
```

### Running Development Server

```bash
npm run dev
```

### Running Storybook

```bash
npm run storybook
```

## Design Tokens

Design tokens are the foundation of our design system. They are stored in the `frontend/src/styles/tokens/` directory and are used to maintain consistency across the application.

### Token Categories

- **Colors**: Brand colors, neutrals, and semantic colors
- **Typography**: Font families, sizes, weights, etc.
- **Spacing**: Margin, padding, and layout spacing
- **Elevation**: Shadows, z-indices, border radii, etc.

### Usage Example

```typescript
import { tokens } from "@/styles/tokens";

// Using color tokens
<div className="bg-primary-500 text-white">Button</div>;

// The design tokens are integrated with Tailwind CSS
// so you can use them directly in your className
```

## Component Architecture

Components are built using a composition pattern, focusing on reusability and flexibility. All components support RTL layouts and follow a consistent API.

### Component Structure

Each component typically includes:

1. Component props interface
2. The functional component with typed props
3. Default export for the component

Example:

```typescript
export interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  // ...other props
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  // ...other props
}) => {
  // Component implementation
};

export default Button;
```

### Core UI Components

- **Button**: For actions and form submission
- **Card**: For presenting content in a container
- **TextField**: For user input
- **Tag**: For displaying badges or labels
- **Input**: For basic form inputs
- **Modal**: For displaying content in an overlay
- **Checkbox**: For binary input options

### Layout Components

- **SectionLayout**: For page sections with consistent spacing
- **GridLayout**: For responsive grid-based layouts
- **StackLayout**: For vertical/horizontal arrangement
- **ContainerLayout**: For consistent container width/padding

### Navigation Components

- **Breadcrumb**: For hierarchical navigation
- **Pagination**: For navigating between pages
- **Tabs**: For switching between content views
- **DropdownMenu**: For contextual actions

## RTL Support

The design system includes comprehensive RTL support for multi-language experiences.

### DirectionContext

The `DirectionContext` provides the current text direction (`ltr` or `rtl`) to components:

```typescript
import { useDirection } from "@/contexts/DirectionContext";

const MyComponent = () => {
  const { direction, isRtl } = useDirection();
  // Use direction or isRtl to conditionally render content
};
```

### RTL CSS Utilities

Tailwind CSS is configured with RTL utilities like `rtl:mr-0` which only apply in RTL mode.

## Storybook

Storybook is used to document and showcase components in isolation.

### Running Storybook

```bash
npm run storybook
```

### Story Structure

Each component has its own story file in the `src/stories/` directory, demonstrating various use cases and prop combinations.

## Development Workflow

### Code Standards

- Use TypeScript for type safety
- Follow the established component patterns
- Write meaningful component and prop names
- Document complex logic with comments

### Testing

- Test components in Storybook for visual correctness
- Ensure components work in both LTR and RTL modes
- Test for accessibility using the Storybook a11y addon

### Performance Considerations

- Minimize re-renders with memoization where appropriate
- Keep bundle size small by avoiding large dependencies
- Be mindful of expensive calculations in render functions

## Performance Optimization

### Strategies

- **Code Splitting**: Components are designed for code splitting
- **Lazy Loading**: Components can be lazy loaded where appropriate
- **Memoization**: Use React.memo for pure components
- **Virtualization**: For long lists, use virtualization

### Monitoring

Monitor performance metrics using:

- Lighthouse scores
- Bundle analyzer
- React DevTools profiler

## Component Usage Guidelines

Each component has specific usage guidelines. Refer to the Component Usage Guidelines document for detailed information.

## Conclusion

This documentation provides an overview of the Luma design system. For more detailed information, refer to the specific sections or the Component Usage Guidelines document. If you have any questions or suggestions, please reach out to the frontend team.
