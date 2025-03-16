# RTL Support in Luma

This document outlines the Right-to-Left (RTL) support implementation in the Luma e-commerce platform.

## Overview

Luma supports both Left-to-Right (LTR) and Right-to-Left (RTL) text directions to accommodate languages like Hebrew and Arabic. The implementation includes a comprehensive approach with:

1. Direction context management
2. CSS logical properties
3. Direction-aware utility classes
4. Language detection and switching

## Direction Context

The `DirectionContext` provides application-wide direction management:

```tsx
// Usage example
import { useDirection } from '@/contexts/DirectionContext';

const MyComponent = () => {
  const { direction, isRtl, toggleDirection } = useDirection();
  
  return (
    <div>
      <p>Current direction: {direction}</p>
      <button onClick={toggleDirection}>Toggle Direction</button>
    </div>
  );
};
```

The `DirectionProvider` should wrap your application:

```tsx
// In _app.tsx
import { DirectionProvider } from '@/contexts/DirectionContext';

function MyApp({ Component, pageProps }) {
  return (
    <DirectionProvider>
      <Component {...pageProps} />
    </DirectionProvider>
  );
}
```

## CSS Logical Properties

We use CSS logical properties to ensure consistent layouts in both LTR and RTL modes:

```css
/* Instead of this */
.element {
  margin-left: 1rem;
  padding-right: 1rem;
}

/* Use this */
.element {
  margin-inline-start: 1rem;
  padding-inline-end: 1rem;
}
```

Our `rtl.css` file provides utility classes for common logical properties:

- `.margin-start` / `.margin-end`
- `.padding-start` / `.padding-end`
- `.border-start` / `.border-end`
- `.position-start` / `.position-end`
- `.text-align-logical`
- `.float-logical`

## Direction-Aware Utilities

For more complex scenarios, we provide direction-aware utility classes:

- `.flex-row-logical` - Automatically reverses flex direction in RTL
- `.rtl-mirror` - Flips elements horizontally in RTL mode
- `.flip-in-rtl` - Specifically for icons that need to be flipped

Example usage:

```tsx
<div className="flex flex-row-logical">
  <div className="margin-start">This will be on the correct side</div>
  <ArrowIcon className="flip-in-rtl" />
</div>
```

## Language Switching

The `LanguageSwitcher` component allows users to switch between languages:

```tsx
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';

const Header = () => (
  <header>
    <LanguageSwitcher />
  </header>
);
```

For development and testing, we also provide a `DirectionSwitcher` component that directly toggles the direction without changing the language:

```tsx
import { DirectionSwitcher } from '@/components/common/DirectionSwitcher';

const DevTools = () => (
  <div>
    <DirectionSwitcher />
  </div>
);
```

## Internationalization (i18n)

Our RTL support is integrated with Next.js internationalization:

```js
// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "he"],
    localeDetection: false,
  },
  // ...
};
```

Translation files are located in `public/locales/[locale]/[namespace].json`.

## Best Practices

1. **Use logical properties** - Always use logical properties instead of physical ones
2. **Test in both directions** - Regularly test your UI in both LTR and RTL modes
3. **Be mindful of icons** - Use the `.flip-in-rtl` class for directional icons
4. **Check text alignment** - Ensure text is properly aligned in both directions
5. **Use the context** - Use the `useDirection` hook to adapt components based on direction

## Troubleshooting

If you encounter layout issues in RTL mode:

1. Check if you're using physical properties (left/right) instead of logical ones
2. Verify that flex directions are properly handled
3. Ensure icons are correctly flipped when needed
4. Check if text alignment is properly set

## Resources

- [CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values)
- [RTL Styling Best Practices](https://rtlstyling.com/posts/rtl-styling)
- [Next.js Internationalization](https://nextjs.org/docs/advanced-features/i18n-routing) 
