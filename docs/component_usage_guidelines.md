# Luma Component Usage Guidelines

This document provides guidelines for using the components in the Luma design system. It covers best practices, accessibility considerations, and examples for each component type.

## Table of Contents

1. [Core UI Components](#core-ui-components)
2. [Layout Components](#layout-components)
3. [Navigation Components](#navigation-components)
4. [Component Composition](#component-composition)
5. [Accessibility Guidelines](#accessibility-guidelines)
6. [RTL Considerations](#rtl-considerations)

## Core UI Components

### Button Component

The Button component is used for actions and form submissions.

#### Variants

- **Primary**: For main actions and key CTAs
- **Secondary**: For secondary actions
- **Tertiary**: For less important actions
- **Ghost**: For subtle actions that don't require visual prominence
- **Outline**: For actions with a border but transparent background
- **Link**: For actions that appear as text links
- **Tactical**: Designed for tactical/military product categories
- **Outdoor**: Designed for outdoor product categories
- **Danger**: For destructive actions

#### Sizes

- **XS**: Extra small, for compact UIs
- **SM**: Small, for tight spaces
- **MD**: Medium, the default size
- **LG**: Large, for prominent actions
- **XL**: Extra large, for high-emphasis actions

#### Example

```tsx
// Primary button in medium size
<Button variant="primary" size="md">
  Add to Cart
</Button>

// Outline button with icon
<Button variant="outline" size="sm" leftIcon={<ShoppingCart size={16} />}>
  Add to Cart
</Button>

// Full-width danger button
<Button variant="danger" size="lg" fullWidth>
  Delete Account
</Button>
```

#### Accessibility

- Use `aria-label` for buttons with only icons
- Ensure buttons have sufficient contrast
- Use appropriate hover and focus states

### Card Component

The Card component is used for displaying content in a container.

#### Variants

- **Default**: Standard card with subtle shadow
- **Outline**: Card with border instead of shadow
- **Flat**: Card without shadow or border
- **Interactive**: Card with hover and focus states for clickable areas

#### Example

```tsx
// Basic card
<Card>
  <h3>Product Title</h3>
  <p>Product description goes here</p>
</Card>

// Interactive card with padding and rounded corners
<Card
  variant="interactive"
  padding="md"
  radius="lg"
  onClick={() => handleCardClick()}
>
  <CardContent>
    <h3>Product Title</h3>
    <p>Product description goes here</p>
  </CardContent>
  <CardFooter>
    <Button>View Details</Button>
  </CardFooter>
</Card>
```

### TextField Component

The TextField component is used for user input with labels and validation.

#### Variants

- **Default**: Standard input field
- **Outline**: Input with border
- **Filled**: Input with background color

#### States

- **Default**: Normal state
- **Focused**: When the input is focused
- **Disabled**: When the input is disabled
- **Error**: When the input has validation errors
- **Success**: When the input has valid content

#### Example

```tsx
// Basic text field
<TextField
  label="Email Address"
  placeholder="Enter your email"
  type="email"
  required
/>

// Text field with error
<TextField
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
  helperText="Use a strong password with letters, numbers, and symbols"
/>

// Disabled text field
<TextField
  label="Username"
  value="johnsmith"
  disabled
/>
```

## Layout Components

### SectionLayout

SectionLayout creates consistent page sections with appropriate spacing and backgrounds.

#### Props

- **background**: Section background color
- **paddingY**: Vertical padding size
- **fullWidth**: Whether the section should be full width
- **maxWidth**: Maximum width of the section content
- **divider**: Whether to show dividers
- **dividerPosition**: Position of dividers (top, bottom, both)

#### Example

```tsx
// Basic section with white background
<SectionLayout>
  <h2>Featured Products</h2>
  <p>Check out our most popular items</p>
</SectionLayout>

// Primary background section with large padding
<SectionLayout
  background="primary"
  paddingY="xl"
>
  <h2>Limited Time Offer</h2>
  <p>Get 20% off all tactical gear</p>
</SectionLayout>
```

### GridLayout

GridLayout creates responsive grid-based layouts.

#### Props

- **columns**: Number of columns at each breakpoint
- **gap**: Space between grid items
- **alignItems**: Vertical alignment of items
- **justifyItems**: Horizontal alignment of items

#### Example

```tsx
// Responsive grid with 3 columns on desktop, 2 on tablet, 1 on mobile
<GridLayout columns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }} gap="md">
  <ProductCard />
  <ProductCard />
  <ProductCard />
</GridLayout>
```

### StackLayout

StackLayout arranges children vertically or horizontally with consistent spacing.

#### Props

- **direction**: "vertical" or "horizontal"
- **gap**: Space between items
- **alignItems**: Alignment of items
- **justifyContent**: Justification of items
- **wrap**: Whether items should wrap
- **dividers**: Whether to show dividers between items
- **responsive**: Whether to stack vertically on mobile

#### Example

```tsx
// Vertical stack with medium gap
<StackLayout direction="vertical" gap="md">
  <h2>Product Details</h2>
  <p>Description goes here</p>
  <Button>Add to Cart</Button>
</StackLayout>

// Horizontal stack with items centered
<StackLayout
  direction="horizontal"
  gap="sm"
  alignItems="center"
  justifyContent="between"
>
  <Logo />
  <Navigation />
  <AccountMenu />
</StackLayout>
```

### ContainerLayout

ContainerLayout provides consistent container widths and padding.

#### Props

- **maxWidth**: Maximum width of the container
- **padding**: Horizontal padding
- **centered**: Whether to center the container
- **fluid**: Whether to use full width

#### Example

```tsx
// Standard container
<ContainerLayout>
  <PageContent />
</ContainerLayout>

// Narrow container with large padding
<ContainerLayout
  maxWidth="sm"
  padding="lg"
>
  <AccountForm />
</ContainerLayout>
```

## Navigation Components

### Breadcrumb Component

Breadcrumb shows the current page location in a hierarchy.

#### Props

- **items**: Array of breadcrumb items
- **separator**: Custom separator element
- **showHomeIcon**: Whether to show home icon
- **ariaLabel**: ARIA label for the breadcrumb

#### Example

```tsx
<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Tactical", href: "/products/tactical" },
    { label: "Backpacks" },
  ]}
/>
```

### Pagination Component

Pagination enables navigation between pages of content.

#### Props

- **currentPage**: Current active page
- **totalPages**: Total number of pages
- **onPageChange**: Function called when page changes
- **showFirstLast**: Whether to show first/last buttons
- **showPrevNext**: Whether to show prev/next buttons
- **siblingCount**: Number of siblings to show around active page
- **size**: Size of pagination items

#### Example

```tsx
<Pagination
  currentPage={3}
  totalPages={10}
  onPageChange={(page) => setCurrentPage(page)}
  showFirstLast={true}
  showPrevNext={true}
  siblingCount={1}
  size="md"
/>
```

### Tabs Component

Tabs enable switching between different content sections.

#### Props

- **tabs**: Array of tab items
- **defaultTabId**: ID of the default active tab
- **orientation**: "horizontal" or "vertical"
- **variant**: "line", "pill", "enclosed", "unstyled"
- **size**: Size of tabs
- **fullWidth**: Whether tabs should take full width
- **onChange**: Function called when active tab changes

#### Example

```tsx
<Tabs
  tabs={[
    {
      id: "description",
      label: "Description",
      content: <ProductDescription />,
    },
    {
      id: "specs",
      label: "Specifications",
      content: <ProductSpecs />,
    },
    {
      id: "reviews",
      label: "Reviews",
      content: <ProductReviews />,
    },
  ]}
  defaultTabId="description"
  variant="line"
  size="md"
/>
```

### DropdownMenu Component

DropdownMenu displays a menu of options in a dropdown.

#### Props

- **trigger**: Element that triggers the dropdown
- **items**: Array of dropdown items or groups
- **align**: Alignment of the dropdown
- **width**: Width of the dropdown
- **closeOnClick**: Whether to close on item click
- **showArrow**: Whether to show dropdown arrow

#### Example

```tsx
<DropdownMenu
  trigger={<Button>Options</Button>}
  items={[
    { id: "edit", label: "Edit", icon: <Edit size={16} /> },
    { id: "duplicate", label: "Duplicate", icon: <Copy size={16} /> },
    { divider: true },
    {
      id: "delete",
      label: "Delete",
      variant: "danger",
      icon: <Trash size={16} />,
    },
  ]}
  align="start"
  width="md"
/>
```

## Component Composition

Components are designed to be composed together to create complex UI patterns.

### Example: Product Card with Actions

```tsx
<Card variant="interactive">
  <img src="/product-image.jpg" alt="Product" />
  <CardContent>
    <StackLayout direction="vertical" gap="sm">
      <Tag>New Arrival</Tag>
      <h3>Tactical Backpack</h3>
      <p>$99.99</p>
    </StackLayout>
  </CardContent>
  <CardFooter>
    <StackLayout direction="horizontal" gap="sm">
      <Button variant="primary">Add to Cart</Button>
      <Button variant="outline" icon={<Heart />} />
    </StackLayout>
  </CardFooter>
</Card>
```

### Example: Form with Multiple Inputs

```tsx
<Card padding="lg">
  <form onSubmit={handleSubmit}>
    <StackLayout direction="vertical" gap="md">
      <h2>Contact Information</h2>
      <GridLayout columns={{ xs: 1, md: 2 }} gap="md">
        <TextField label="First Name" required />
        <TextField label="Last Name" required />
      </GridLayout>
      <TextField label="Email Address" type="email" required />
      <TextField label="Phone Number" type="tel" />
      <StackLayout direction="horizontal" gap="sm" justifyContent="end">
        <Button variant="tertiary" type="button">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </StackLayout>
    </StackLayout>
  </form>
</Card>
```

## Accessibility Guidelines

All components must be accessible and follow WCAG 2.1 AA standards.

### General Guidelines

- **Focus States**: Ensure visible focus states for all interactive elements
- **Keyboard Navigation**: All interactions must be possible with keyboard
- **Screen Readers**: Use appropriate ARIA attributes for screen reader support
- **Color Contrast**: Maintain proper contrast between text and background
- **Text Size**: Support text zoom up to 200% without breaking layout

### Specific Component Considerations

- **Buttons**: Use appropriate roles and aria-labels
- **Form Fields**: Associate labels with inputs using htmlFor/id
- **Navigation**: Use proper landmark roles and aria-current for current page
- **Modals**: Trap focus and use aria-modal for dialogs
- **Tabs**: Follow WAI-ARIA tab panel pattern
- **Dropdowns**: Ensure proper role="menu" and menu item patterns

## RTL Considerations

### Layout

- **Direction**: Use the `direction` property from `useDirection` hook
- **Padding/Margin**: Use logical properties (padding-inline-start/end)
- **Text Alignment**: Use `text-start` and `text-end` instead of left/right
- **Borders**: Use border-inline-start/end for RTL-aware borders

### Icons and Visual Elements

- **Icon Direction**: Swap directional icons (arrows, chevrons)
- **Icon Placement**: Adjust icon positioning for RTL
- **Visual Flow**: Consider reading direction for visual hierarchies

### Example: RTL-Aware Component

```tsx
const MyComponent = () => {
  const { isRtl } = useDirection();

  // Use isRtl to conditionally render elements
  const ArrowIcon = isRtl ? <ChevronLeft /> : <ChevronRight />;

  return <Button>Next {ArrowIcon}</Button>;
};
```

## Conclusion

Following these guidelines will ensure consistent, accessible, and maintainable UI components throughout the Luma e-commerce platform. For more detailed information on each component, refer to the Storybook documentation.
