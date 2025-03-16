# Responsive Components Documentation

## Overview

The responsive components in the Luma e-commerce platform provide a flexible and intuitive way to manage content visibility and spacing based on screen sizes. These components were designed to simplify responsive design implementation while maintaining clean, readable code.

## Available Components

### Hide Component

The `Hide` component conditionally hides content based on screen size breakpoints.

```tsx
import { Hide } from '@/components/layout';

// Hide content on screens smaller than medium breakpoint
<Hide below="md">
  This content is hidden on mobile devices
</Hide>

// Hide content on screens larger than large breakpoint
<Hide above="lg">
  This content is only visible on smaller screens
</Hide>

// Hide content only at specific breakpoints
<Hide at={['md']}>
  This content is hidden only at medium screen sizes
</Hide>
```

#### Props

| Prop      | Type             | Description                                   |
|-----------|------------------|-----------------------------------------------|
| children  | React.ReactNode  | Content to be conditionally hidden            |
| below     | Breakpoint       | Hide content below this breakpoint            |
| above     | Breakpoint       | Hide content above this breakpoint            |
| at        | Breakpoint[]     | Hide content at specific breakpoints          |
| className | string           | Additional CSS classes                        |

### Show Component

The `Show` component conditionally shows content based on screen size breakpoints. It's the logical opposite of the `Hide` component.

```tsx
import { Show } from '@/components/layout';

// Show content only on screens larger than medium breakpoint
<Show above="md">
  This content is visible on tablets and desktops
</Show>

// Show content only on screens smaller than large breakpoint
<Show below="lg">
  This content is visible on mobile and tablets
</Show>

// Show content only at specific breakpoints
<Show at={['md']}>
  This content is visible only at medium screen sizes
</Show>
```

#### Props

| Prop      | Type             | Description                                   |
|-----------|------------------|-----------------------------------------------|
| children  | React.ReactNode  | Content to be conditionally shown             |
| below     | Breakpoint       | Show content below this breakpoint            |
| above     | Breakpoint       | Show content above this breakpoint            |
| at        | Breakpoint[]     | Show content at specific breakpoints          |
| className | string           | Additional CSS classes                        |

### Visible Component

The `Visible` component renders content conditionally based on a boolean condition, with optional fallback content.

```tsx
import { Visible } from '@/components/layout';

// Simple conditional rendering
<Visible when={isLoggedIn}>
  Welcome back, User!
</Visible>

// With fallback content
<Visible 
  when={isLoggedIn} 
  fallback={<button>Sign In</button>}
>
  <button>My Account</button>
</Visible>
```

#### Props

| Prop      | Type             | Description                                   |
|-----------|------------------|-----------------------------------------------|
| children  | React.ReactNode  | Content to be conditionally shown             |
| when      | boolean          | Condition for showing the content             |
| fallback  | React.ReactNode  | Optional content to show when condition is false |
| className | string           | Additional CSS classes                        |

### ResponsiveSpacing Component

The `ResponsiveSpacing` component provides flexible, responsive control over margins and padding.

```tsx
import { ResponsiveSpacing } from '@/components/layout';

// Simple constant spacing
<ResponsiveSpacing m="4" p="6">
  Content with margin-4 and padding-6
</ResponsiveSpacing>

// Responsive spacing that changes at breakpoints
<ResponsiveSpacing 
  m={{ base: '2', md: '4', lg: '8' }}
  p={{ base: '2', md: '4', lg: '6' }}
>
  Content with responsive spacing
</ResponsiveSpacing>

// Different spacing on different sides
<ResponsiveSpacing 
  mt="4"
  mx={{ base: '2', md: '4', lg: '8' }}
  pb="2"
>
  Content with varied spacing
</ResponsiveSpacing>
```

#### Props

| Prop      | Type                      | Description                           |
|-----------|---------------------------|---------------------------------------|
| children  | React.ReactNode           | Child elements to be spaced           |
| m         | SpacingConfig \| SpacingSize | Margin on all sides                |
| mt        | SpacingConfig \| SpacingSize | Margin top                         |
| mr        | SpacingConfig \| SpacingSize | Margin right                       |
| mb        | SpacingConfig \| SpacingSize | Margin bottom                      |
| ml        | SpacingConfig \| SpacingSize | Margin left                        |
| mx        | SpacingConfig \| SpacingSize | Margin on x-axis (left and right)  |
| my        | SpacingConfig \| SpacingSize | Margin on y-axis (top and bottom)  |
| p         | SpacingConfig \| SpacingSize | Padding on all sides               |
| pt        | SpacingConfig \| SpacingSize | Padding top                        |
| pr        | SpacingConfig \| SpacingSize | Padding right                      |
| pb        | SpacingConfig \| SpacingSize | Padding bottom                     |
| pl        | SpacingConfig \| SpacingSize | Padding left                       |
| px        | SpacingConfig \| SpacingSize | Padding on x-axis (left and right) |
| py        | SpacingConfig \| SpacingSize | Padding on y-axis (top and bottom) |
| className | string                    | Additional CSS classes                |

## Types

### Breakpoint

Predefined screen size breakpoints used throughout the responsive components.

```tsx
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
```

The breakpoints correspond to Tailwind's default breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### SpacingSize

Predefined spacing sizes based on the design token system.

```tsx
type SpacingSize = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '20' | '24' | '32' | '40' | '48' | '64';
```

These values map to Tailwind CSS spacing scale. For example, `4` represents `1rem` (16px).

### SpacingConfig

Configuration object for responsive spacing.

```tsx
type SpacingConfig = {
  base?: SpacingSize;
  sm?: SpacingSize;
  md?: SpacingSize;
  lg?: SpacingSize;
  xl?: SpacingSize;
  '2xl'?: SpacingSize;
};
```

## Usage Guidelines

### When to Use Hide vs. Show

- Use `Hide` when you want to hide specific content at certain breakpoints but show it at others.
- Use `Show` when you have alternative content for different screen sizes placed side by side in your code.

### Best Practices

1. **Performance**: While these components make responsive design easier, they do not prevent content from being rendered in the DOM. For large content blocks, consider using more performance-optimized approaches if needed.

2. **Accessibility**: Ensure that hiding content doesn't negatively impact accessibility. Screen readers will still read hidden content that's in the DOM but visually hidden.

3. **Responsive Images**: For responsive images, consider using the native `<picture>` element or Next.js's `Image` component which are optimized for performance.

4. **Testing**: Always test responsive layouts on actual devices or using browser dev tools to ensure they behave as expected.

5. **Maintainability**: These components help make responsive behavior explicit in your code, improving maintainability compared to managing complex media queries in CSS.

## Examples

### Mobile-First Design Pattern

```tsx
// Default (mobile) view
<p>Mobile-optimized content</p>

// Additional content for larger screens
<Show above="md">
  <p>Additional content for larger screens</p>
</Show>
```

### Different Content for Different Screen Sizes

```tsx
// Mobile view
<Show below="md">
  <MobileMenu />
</Show>

// Desktop view
<Show above="md">
  <DesktopNavigation />
</Show>
```

### Responsive Spacing for Cards

```tsx
<ResponsiveSpacing 
  p={{ base: '4', md: '6', lg: '8' }}
  m={{ base: '2', md: '4' }}
  className="bg-white rounded-lg shadow-sm"
>
  <h2>Card Title</h2>
  <p>Card content with responsive spacing that increases on larger screens.</p>
</ResponsiveSpacing>
``` 
