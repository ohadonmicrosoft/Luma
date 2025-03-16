# Layout Components

This directory contains all the layout components used in the Luma e-commerce platform. These components provide the foundation for creating consistent, responsive, and accessible layouts throughout the application.

## Component Categories

The layout components are organized into the following categories:

### Core Layout Components

- **Layout**: The main layout wrapper that includes the header and footer
- **Header**: The site header component
- **Footer**: The site footer component

### Structural Components

- **ContainerLayout**: Responsive container with configurable max-width and padding
- **SectionLayout**: Page section with consistent vertical spacing and optional backgrounds
- **GridLayout**: Flexible grid system with responsive columns and gaps
- **StackLayout**: Component for stacking elements with consistent spacing

### Responsive Utilities

- **Hide**: Conditionally hide content based on breakpoints
- **Show**: Conditionally show content based on breakpoints
- **Visible**: Conditionally render content based on a boolean value
- **ResponsiveSpacing**: Apply responsive margin and padding

### Direction-Aware Components

- **RtlWrapper**: Wrapper that manages RTL text direction

## Usage Guidelines

### Importing Components

All layout components can be imported from the `@/components/layout` path:

```tsx
import { 
  ContainerLayout,
  SectionLayout,
  GridLayout,
  StackLayout,
  Hide,
  Show 
} from '@/components/layout';
```

### Typical Page Structure

A typical page structure using these components might look like:

```tsx
<Layout>
  {/* Header is included in the Layout component */}
  <main>
    <SectionLayout>
      <ContainerLayout>
        <h1>Page Title</h1>
        
        <GridLayout columns={{ sm: 1, md: 2, lg: 3 }}>
          {/* Grid items */}
        </GridLayout>
      </ContainerLayout>
    </SectionLayout>
  </main>
  {/* Footer is included in the Layout component */}
</Layout>
```

### Responsive Layout Example

Creating responsive layouts using the responsive utility components:

```tsx
<SectionLayout>
  <ContainerLayout>
    {/* Content for all screen sizes */}
    
    {/* Content only visible on mobile */}
    <Show below="md">
      <MobileComponent />
    </Show>
    
    {/* Content only visible on desktop */}
    <Show above="md">
      <DesktopComponent />
    </Show>
  </ContainerLayout>
</SectionLayout>
```

### Applying Responsive Spacing

```tsx
<ResponsiveSpacing 
  m={{ base: '4', md: '6', lg: '8' }}
  p={{ base: '4', md: '6' }}
>
  <Card>Content with responsive spacing</Card>
</ResponsiveSpacing>
```

## Documentation

Detailed documentation for each component can be found in the following files:

- [Layout Components Documentation](../../docs/layout-components.md)
- [Responsive Components Documentation](../../docs/responsive-components.md)

## RTL Support

All layout components are designed to support Right-to-Left (RTL) layouts. When wrapped in a `DirectionProvider` with RTL mode enabled, the components will automatically adjust their layout direction, spacing, and alignment.

## Accessibility

The layout components are built with accessibility in mind:

- Semantic HTML structure is used by default
- Components support the `as` prop to specify appropriate HTML elements
- Proper spacing ensures content is legible and distinguishable
- Layout shifts are minimized during responsive changes
- Focus order is maintained in all layouts

## Customization

These layout components can be customized in several ways:

1. **Using props**: Each component has a range of props to configure its appearance and behavior.
2. **Using `className`**: All components accept a `className` prop for additional styling.
3. **Using the design token system**: The underlying design tokens can be modified to change spacing, colors, and breakpoints.

## Extending the System

When creating new layout components:

1. Follow the naming convention: `[Name]Layout.tsx`
2. Export the component and its types from the appropriate index file
3. Ensure the component is responsive and supports RTL layouts
4. Add comprehensive prop types and documentation
5. Create Storybook stories to demonstrate usage

## Component Interfaces

All layout components follow a consistent prop interface pattern. Common props include:

- `children`: The content to be rendered
- `className`: Additional CSS classes to apply
- `as`: The HTML element to render (for semantic HTML)

Component-specific props are documented in each component file and in the detailed documentation. 
