# Accessibility Testing in Luma

This document outlines the accessibility testing setup for the Luma e-commerce platform.

## Overview

Accessibility is a critical aspect of our development process. We've implemented automated accessibility testing to help identify and fix accessibility issues during development.

## Tools and Configuration

### 1. Axe Core for React

We use [@axe-core/react](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/react) for automated accessibility testing during development. This tool runs in the browser and reports accessibility violations to the console.

#### Setup

The accessibility testing is automatically initialized in development mode through:

- A utility file (`src/utils/a11y.ts`) that initializes axe-core
- Integration in the main application file (`src/pages/_app.tsx`)

### 2. Storybook Accessibility Addon

We also use the [@storybook/addon-a11y](https://storybook.js.org/addons/@storybook/addon-a11y) addon for testing component accessibility in isolation within Storybook.

## Usage

### Development Mode

To run the development server with accessibility testing enabled:

```bash
npm run dev:a11y
```

This will start the Next.js development server with axe-core enabled. Any accessibility violations will be reported in the browser console.

### Storybook

To test components in isolation with accessibility checks:

```bash
npm run storybook
```

The accessibility panel in Storybook will show accessibility violations and suggestions for each component.

## Best Practices

1. **Check the console regularly** during development for accessibility violations
2. **Fix issues as they arise** rather than accumulating them
3. **Use semantic HTML** elements whenever possible
4. **Ensure proper color contrast** for all text elements
5. **Provide alternative text** for images and icons
6. **Ensure keyboard navigability** for all interactive elements
7. **Test with screen readers** periodically

## Resources

- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [Axe Core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/) 
