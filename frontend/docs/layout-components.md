# Layout Components Documentation

## Overview

The layout components in the Luma e-commerce platform provide a structured and consistent way to organize content. These components are designed to be flexible, responsive, and support the design system principles of the platform, including RTL layout support.

## Available Components

### ContainerLayout

The `ContainerLayout` component creates a responsive container with consistent maximum width and padding.

```tsx
import { ContainerLayout } from '@/components/layout';

// Default container
<ContainerLayout>
  Content with standard max-width and padding
</ContainerLayout>

// Container with custom maximum width
<ContainerLayout maxWidth="sm">
  Narrow content container
</ContainerLayout>

// Fluid container (full width)
<ContainerLayout fluid>
  Full-width container
</ContainerLayout>
```

#### Props

| Prop      | Type                                              | Default | Description                          |
|-----------|---------------------------------------------------|---------|--------------------------------------|
| children  | React.ReactNode                                   | -       | Content to be contained              |
| className | string                                            | -       | Additional CSS classes               |
| maxWidth  | 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full' \| 'none' | 'xl'   | Maximum width of the container      |
| padding   | 'none' \| 'sm' \| 'md' \| 'lg'                    | 'md'    | Horizontal padding of the container  |
| centered  | boolean                                           | true    | Center the container horizontally    |
| fluid     | boolean                                           | false   | Make the container full-width        |
| as        | React.ElementType                                 | 'div'   | HTML element to render               |

### SectionLayout

The `SectionLayout` component provides consistent vertical spacing and optional backgrounds for page sections.

```tsx
import { SectionLayout } from '@/components/layout';

// Default section
<SectionLayout>
  Section content with standard spacing
</SectionLayout>

// Section with background color
<SectionLayout background="light">
  Section with light background
</SectionLayout>

// Section with title and custom spacing
<SectionLayout 
  title="Featured Products" 
  subtitle="Explore our latest collection"
  spacing="lg"
>
  Products grid would go here
</SectionLayout>
```

#### Props

| Prop       | Type                                           | Default       | Description                         |
|------------|------------------------------------------------|---------------|-------------------------------------|
| children   | React.ReactNode                                | -             | Section content                     |
| className  | string                                         | -             | Additional CSS classes              |
| title      | string                                         | -             | Optional section title              |
| subtitle   | string                                         | -             | Optional section subtitle           |
| background | 'white' \| 'light' \| 'primary' \| 'dark' \| 'tactical' \| 'outdoor' \| 'transparent' | 'transparent' | Background color of the section  |
| spacing    | 'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'         | 'md'          | Vertical spacing of the section    |
| fullWidth  | boolean                                        | false         | Extend section to full viewport width |
| as         | React.ElementType                              | 'section'     | HTML element to render              |

### GridLayout

The `GridLayout` component creates responsive grid layouts with configuratable columns and gaps.

```tsx
import { GridLayout } from '@/components/layout';

// Basic grid with 3 columns
<GridLayout columns={3}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div>
  <div>Item 6</div>
</GridLayout>

// Responsive grid with different columns at breakpoints
<GridLayout columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}>
  {/* Grid items */}
</GridLayout>

// Grid with auto-fit columns
<GridLayout autoFit minChildWidth="200px">
  {/* Grid items will automatically fit based on container width */}
</GridLayout>
```

#### Props

| Prop           | Type                                    | Default | Description                                 |
|----------------|----------------------------------------|---------|---------------------------------------------|
| children       | React.ReactNode                        | -       | Grid items                                  |
| className      | string                                 | -       | Additional CSS classes                      |
| columns        | number \| { [key in Breakpoint]?: number } | 1       | Number of grid columns                     |
| gap            | number \| { [key in Breakpoint]?: number } | 4       | Gap between grid items (in spacing units)  |
| autoFit        | boolean                                | false   | Use auto-fit grid instead of fixed columns  |
| minChildWidth  | string                                 | '200px' | Minimum width for children when using autoFit |
| as             | React.ElementType                      | 'div'   | HTML element to render                      |

### StackLayout

The `StackLayout` component arranges children in a stack (vertical or horizontal) with consistent spacing.

```tsx
import { StackLayout } from '@/components/layout';

// Vertical stack (default)
<StackLayout spacing={4}>
  <div>First item</div>
  <div>Second item</div>
  <div>Third item</div>
</StackLayout>

// Horizontal stack
<StackLayout direction="horizontal" spacing={4}>
  <div>Item side by side</div>
  <div>Item side by side</div>
  <div>Item side by side</div>
</StackLayout>

// Responsive direction
<StackLayout direction={{ base: 'vertical', md: 'horizontal' }}>
  {/* Items stack vertically on mobile, horizontally on larger screens */}
</StackLayout>
```

#### Props

| Prop      | Type                                                | Default    | Description                           |
|-----------|-----------------------------------------------------|------------|---------------------------------------|
| children  | React.ReactNode                                     | -          | Stack items                           |
| className | string                                              | -          | Additional CSS classes                |
| direction | 'vertical' \| 'horizontal' \| { [key in Breakpoint]?: 'vertical' \| 'horizontal' } | 'vertical' | Stack direction |
| spacing   | number \| { [key in Breakpoint]?: number }          | 4          | Space between items (in spacing units)|
| dividers  | boolean                                             | false      | Show dividers between items           |
| wrap      | boolean                                             | false      | Allow items to wrap (for horizontal)  |
| as        | React.ElementType                                   | 'div'      | HTML element to render                |

## Integration with Responsive Components

The layout components work seamlessly with the responsive utility components (`Hide`, `Show`, etc.) to create adaptive layouts:

```tsx
import { SectionLayout, GridLayout, Hide, Show } from '@/components/layout';

<SectionLayout title="Featured Products">
  {/* Mobile view: List layout */}
  <Show below="md">
    <StackLayout>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </StackLayout>
  </Show>
  
  {/* Desktop view: Grid layout */}
  <Hide below="md">
    <GridLayout columns={{ md: 2, lg: 3, xl: 4 }}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </GridLayout>
  </Hide>
</SectionLayout>
```

## RTL Support

All layout components fully support RTL (Right-to-Left) layouts. When a component is rendered within a `DirectionProvider` with RTL mode enabled, the layout will automatically adjust:

- Padding and margins will flip sides
- Text alignment will adjust accordingly
- Grid and stack directions will reverse as needed

No additional configuration is needed to support RTL layouts.

## Composition Patterns

### Page Layout Pattern

```tsx
import { Layout, ContainerLayout, SectionLayout, GridLayout } from '@/components/layout';

<Layout>
  <Header />
  <main>
    {/* Hero section - full width */}
    <SectionLayout background="primary" fullWidth>
      <ContainerLayout>
        <HeroContent />
      </ContainerLayout>
    </SectionLayout>
    
    {/* Featured products - contained */}
    <SectionLayout title="Featured Products">
      <ContainerLayout>
        <GridLayout columns={{ sm: 2, md: 3, lg: 4 }}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </GridLayout>
      </ContainerLayout>
    </SectionLayout>
    
    {/* More sections... */}
  </main>
  <Footer />
</Layout>
```

### Form Layout Pattern

```tsx
import { ContainerLayout, StackLayout } from '@/components/layout';

<ContainerLayout maxWidth="sm">
  <form>
    <StackLayout spacing={6}>
      <h1>Create Account</h1>
      
      <StackLayout spacing={4}>
        <TextField label="Full Name" />
        <TextField label="Email" type="email" />
        <TextField label="Password" type="password" />
      </StackLayout>
      
      <Button type="submit" fullWidth>Create Account</Button>
    </StackLayout>
  </form>
</ContainerLayout>
```

### Dashboard Layout Pattern

```tsx
<GridLayout columns={{ base: 1, lg: 4 }} gap={4}>
  {/* Sidebar */}
  <div className="lg:col-span-1">
    <SidebarNavigation />
  </div>
  
  {/* Main content */}
  <div className="lg:col-span-3">
    <StackLayout spacing={6}>
      <DashboardHeader />
      
      <SectionLayout title="Overview">
        <GridLayout columns={{ base: 1, md: 2, xl: 4 }} gap={4}>
          <StatCard title="Orders" value={125} />
          <StatCard title="Revenue" value="$12,345" />
          <StatCard title="Customers" value={543} />
          <StatCard title="Conversion" value="3.2%" />
        </GridLayout>
      </SectionLayout>
      
      {/* More dashboard sections... */}
    </StackLayout>
  </div>
</GridLayout>
```

## Best Practices

1. **Nesting**: Layout components are designed to be nested. Use `ContainerLayout` for overall width constraints, `SectionLayout` for vertical sections, and `GridLayout` or `StackLayout` for arranging content within sections.

2. **Responsiveness**: Use the responsive props (`columns`, `spacing`, etc.) to create layouts that adapt to different screen sizes rather than creating separate layouts for mobile and desktop.

3. **Consistency**: Stick to the system's spacing scale rather than using custom values to maintain a consistent visual rhythm throughout the application.

4. **Semantic HTML**: Use the `as` prop to ensure the rendered HTML is semantically correct, especially for accessibility.

5. **Performance**: For very large lists or grids, consider using virtualization techniques in addition to these layout components for better performance.

## Customization

While the layout components provide a comprehensive system for most use cases, they can be extended in various ways:

1. **Custom Styling**: Use the `className` prop to apply custom styles to any layout component.

2. **Extended Components**: Create specialized layout components for specific use cases by composing these foundational components.

3. **Theme Customization**: The underlying design tokens can be adjusted to change the overall spacing, breakpoints, or colors used by the layout components.

## Breakpoints Reference

The layout system uses the following breakpoints, consistent with Tailwind CSS:

| Breakpoint | Screen Width |
|------------|--------------|
| sm         | 640px        |
| md         | 768px        |
| lg         | 1024px       |
| xl         | 1280px       |
| 2xl        | 1536px       |
``` 
