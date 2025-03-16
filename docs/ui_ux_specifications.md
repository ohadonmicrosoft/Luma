# LUMA UI/UX DESIGN SPECIFICATIONS

## Table of Contents

1. [Design System Foundation](#design-system-foundation)
2. [Component Library Specifications](#component-library-specifications)
3. [Page Layout Specifications](#page-layout-specifications)
4. [Advanced UI/UX Features](#advanced-uiux-features)
5. [Internationalization & RTL Support](#internationalization--rtl-support)
6. [Performance Optimization Guidelines](#performance-optimization-guidelines)
7. [Technical Implementation Requirements](#technical-implementation-requirements)

<a id="design-system-foundation"></a>

## 1. Design System Foundation

### 1.1 Color System

#### Primary Palette

- **Primary**: #2A3B56 (deep navy)
- **Primary-light**: #3D5277
- **Primary-dark**: #1A2A45

#### Secondary Palette

- **Secondary**: #D8842A (copper/amber)
- **Secondary-light**: #F09A3E
- **Secondary-dark**: #B36F1C

#### Neutral Palette

- **Gray-100**: #F7F9FC
- **Gray-200**: #EDF1F7
- **Gray-300**: #E1E8F0
- **Gray-400**: #C9D4E4
- **Gray-500**: #9AABC2
- **Gray-600**: #627795
- **Gray-700**: #4A5A78
- **Gray-800**: #344056
- **Gray-900**: #1E2B3E

### 1.2 Typography System

#### Font Families

- **Primary font**: 'Inter' (sans-serif)
- **Secondary font**: 'Source Serif Pro' (serif)
- **Monospace font**: 'JetBrains Mono' (monospace)
- **Hebrew font**: 'Open Sans Hebrew' with custom kerning

#### Font Scale

- **text-xs**: 0.75rem (12px)
- **text-sm**: 0.875rem (14px)
- **text-base**: 1rem (16px)
- **text-lg**: 1.125rem (18px)
- **text-xl**: 1.25rem (20px)
- **text-2xl**: 1.5rem (24px)
- **text-3xl**: 1.875rem (30px)
- **text-4xl**: 2.25rem (36px)
- **text-5xl**: 3rem (48px)

#### Line Heights

- **leading-none**: 1
- **leading-tight**: 1.2
- **leading-snug**: 1.375
- **leading-normal**: 1.5
- **leading-relaxed**: 1.625
- **leading-loose**: 2

### 1.3 Spacing & Layout System

#### Base Unit

- Base spacing unit: 0.25rem (4px)

#### Spacing Scale

- **0**: 0
- **1**: 0.25rem (4px)
- **2**: 0.5rem (8px)
- **3**: 0.75rem (12px)
- **4**: 1rem (16px)
- **6**: 1.5rem (24px)
- **8**: 2rem (32px)
- **12**: 3rem (48px)
- **16**: 4rem (64px)
- **20**: 5rem (80px)
- **24**: 6rem (96px)

#### Container Widths

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

#### Grid System

- 12-column layout
- 1.5rem gutters

### 1.4 Design Elements

#### Border Radius System

- **rounded-none**: 0
- **rounded-sm**: 0.125rem (2px)
- **rounded**: 0.25rem (4px)
- **rounded-md**: 0.375rem (6px)
- **rounded-lg**: 0.5rem (8px)
- **rounded-xl**: 0.75rem (12px)
- **rounded-2xl**: 1rem (16px)
- **rounded-full**: 9999px

#### Shadow System

- **shadow-sm**: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
- **shadow**: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)
- **shadow-md**: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
- **shadow-lg**: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
- **shadow-xl**: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
- **shadow-inner**: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)

<a id="component-library-specifications"></a>

## 2. Component Library Specifications

### 2.1 Button Component System

#### Variants

- **Primary**: Solid background with high contrast
- **Secondary**: Outlined with hover effect
- **Tertiary**: Text-only with hover underline
- **Danger**: Red-based destructive actions
- **Success**: Green-based confirmation actions

#### States

- Default
- Hover
- Active
- Focused
- Disabled
- Loading

#### Sizes

- **xs**: h-6 px-2 text-xs
- **sm**: h-8 px-3 text-sm
- **md**: h-10 px-4 text-base
- **lg**: h-12 px-5 text-lg
- **xl**: h-14 px-6 text-xl

#### Features

- Icon support (left, right, only)
- Loading state with spinner
- Ripple effect on click
- Focus ring for accessibility

### 2.2 Form Component System

#### Input Variants

- **Outlined**: border with floating label
- **Filled**: subtle background with underline
- **Standard**: bottom border only

#### States

- Default
- Focus
- Error
- Disabled
- Loading

#### Validation Features

- Instant validation with icon feedback
- Error message animation
- Success checkmark animation

#### Advanced Features

- Auto-resize text areas
- Input masking and formatting
- Debounced validation
- Character/word counter

### 2.3 Card Component System

#### Variants

- **Default**: Standard padding with shadow
- **Elevated**: Larger shadow with hover effect
- **Outlined**: Border with subtle shadow
- **Interactive**: Clickable with hover effects

#### Features

- Media support (top, side, background)
- Header with optional avatar
- Action area with button slots
- Content area with typography styles
- Loading/skeleton state

### 2.4 Technical Product Card Design

- Primary image aspect ratio: 3:4 (vertical orientation)
- Quick specification indicators:
  - Material badge
  - Key technical stat (e.g., weight, capacity)
  - Compatibility badge
  - Usage environment icon (tactical, outdoor, etc.)
- Hover state reveals:
  - Quick view button
  - Specification snippet (3 key points)
  - Comparison checkbox
  - Availability indicator

<a id="page-layout-specifications"></a>

## 3. Page Layout Specifications

### 3.1 Home Page Layout

#### Hero Section (100vh max)

- Full-width background image/video with overlay
- Large headline (text-5xl on desktop, text-3xl on mobile)
- Subheadline (text-xl on desktop, text-base on mobile)
- Primary CTA button (lg size)
- Secondary text link
- Scroll indicator animation

#### Category Showcase (Section height: 80vh)

- 3-column grid on desktop (1-column on mobile)
- Category cards with:
  - 16:9 aspect ratio image
  - Category name overlay
  - Hover effect with scale transform (1.05)
  - Subtle text shadow for readability
- "View All" link with arrow animation

#### Featured Products (Section height: 60vh)

- Carousel with 3 visible slides
- Product cards with quick-view functionality
- Dot indicators with active state
- Arrow navigation with edge-aware logic
- Auto-advancing with pause on hover

#### Brand Story (Section height: 70vh)

- Split layout (image:text 50:50)
- Parallax scrolling effect on image
- Section heading (text-3xl)
- Body text (text-lg) with increased line height
- Secondary CTA button aligned left
- Subtle background pattern on text section

### 3.2 Product Listing Page Layout

#### Header Section (30vh max)

- Background image with category theme
- Category title (text-4xl) with breadcrumb navigation
- Category description (text-lg) with max-width: 70ch
- Filtering toggle button for mobile

#### Main Content Area

- Split view with:
  - Filters sidebar (25% width desktop, offcanvas on mobile)
  - Product grid (75% width desktop, 100% mobile)
- Sorting controls in sticky header
- Filter panel with:
  - Accordion sections for filter groups
  - Checkbox lists with counter indicators
  - Range sliders with dual handles
  - Color selectors with tooltips
  - Clear all button with count indicator
- Product Grid:
  - 3-column on desktop (lg)
  - 2-column on tablet (md)
  - 1-column on mobile (sm)
  - 16px gutters between cards
  - Infinite scroll with lazy loading
  - Load more button as fallback

### 3.3 Product Detail Page Layout

#### Main Product Section (60vh min-height)

- Split layout:
  - Media gallery (55% desktop, 100% mobile)
  - Product information (45% desktop, 100% mobile)
- Image Gallery:
  - Main image (16:9 aspect ratio)
  - Thumbnail strip (5-6 visible thumbnails)
  - Zoom on hover with lens effect
  - Lightbox on click
  - 360° view toggle when available
- Product Information:
  - Breadcrumb navigation
  - Product title (text-3xl)
  - Rating display with review count
  - Price display with sale indicator
  - Short description (3-4 lines max)
  - Variant selectors (color, size, style)
  - Quantity selector with +/- buttons
  - Add to cart button (full width)
  - Wishlist and compare buttons
  - Delivery information with icon

#### Technical Information Section

- Tabbed interface with sticky navigation:
  - Description tab
  - Specifications tab
  - Reviews tab
  - FAQ tab
- Specification Display:
  - Two-column definition list
  - Grouped by category with collapsible sections
  - Technical term with tooltip explanations
  - Unit conversion toggle where applicable
  - Visual indicators for key specifications

#### Related Products Section

- Heading with section description
- Horizontal scroll on mobile
- 4-column grid on desktop
- "You might also like" algorithm-based selection
- Quick-add functionality

<a id="advanced-uiux-features"></a>

## 4. Advanced UI/UX Features

### 4.1 Product Visualization Enhancements

#### 360° Product Viewer

- Drag to rotate interaction
- Auto-rotation toggle
- Zoom capability within viewer
- Hotspot annotations for key features

#### Feature Highlighting System

- Interactive overlay with feature callouts
- Pulsing indicators for key features
- Click/tap to reveal feature details
- Step-by-step guided tour option

#### AR Product Preview (for compatible devices)

- "View in your space" capability
- Scale controls with real-world dimension display
- Environment detection for accurate placement
- Screenshot capture functionality

#### Technical Product Visualization

- Multiple angles (minimum 5)
- Detail shots of key features
- In-use contextual shots
- Size reference comparison
- Technical diagram integration:
  - Annotated schematics for complex products
  - Exploded view for multi-part items
  - Dimension specifications with imperial/metric toggle
  - Material callouts with property indicators

### 4.2 Advanced Filtering & Search

#### Faceted Search Implementation

- Type-ahead suggestions with categories
- Results categorization (products, categories, content)
- Visual filter builders with drag-and-drop
- Saved search functionality

#### Technical Specification Filtering

- Range sliders with histogram distribution
- Multi-select capability with "OR" logic
- Compatible with unit system conversion
- Relative comparison options (greater than, less than)

#### Comparison Tool Design

- Side-by-side card layout
- Color-coded difference highlighting
- Specification alignment for direct comparison
- Collapsible categories for focused comparison
- Visual metric comparison with bar charts
- "Best for" recommendation indicators
- Printable/shareable comparison view

### 4.3 User Experience Enhancements

#### Page Transitions & Animations

- Route-based transitions (fade, slide, etc.)
- Content reveal animations on scroll
- Micro-interactions for feedback
- Loading state animations with branded elements

#### Intelligent Loading States

- Content-aware skeleton screens
- Progressive image loading with blur-up
- Staggered animation for list items
- Background data prefetching for common actions

#### Accessibility Enhancements

- High contrast mode toggle
- Font size controls (+/- 200%)
- Animation reduction option
- Screen reader-optimized navigation

<a id="internationalization--rtl-support"></a>

## 5. Internationalization & RTL Support

### 5.1 CSS Direction Management System

- Direction context provider using React Context:
  ```
  const DirectionContext = createContext({ isRtl: false });
  ```
- Directional utility classes:
  ```
  .margin-start: margin-left in LTR, margin-right in RTL
  .padding-end: padding-right in LTR, padding-left in RTL
  .float-start: float left in LTR, float right in RTL
  ```
- RTL-compatible Flexbox utilities with logical properties

### 5.2 Bidirectional Text Handling

- Unicode Bidirectional Algorithm support
- Tailwind with logical property mapping
- Directionality-aware component library
- RTL-specific icon flipping system

<a id="performance-optimization-guidelines"></a>

## 6. Performance Optimization Guidelines

### 6.1 Rendering Optimization Techniques

- React Server Components for static parts
- Strategic use of `React.memo` for expensive components
- Virtualization for lists with 20+ items
- Dynamic imports with loading boundaries
- Progressive hydration strategy

### 6.2 Asset Delivery Optimization

- Adaptive image serving based on:
  - Device pixel ratio
  - Network connection quality
  - Viewport size
  - Image importance
- Font loading optimization:
  - `font-display: swap` for critical text
  - Subset loading for large character sets
  - Preload critical fonts in document head
  - Variable fonts where possible

### 6.3 Advanced Caching Strategy

- Stale-while-revalidate pattern for:
  - Product listings
  - Category data
  - User profile information
- HTTP caching headers:
  - `Cache-Control: public, max-age=3600, stale-while-revalidate=86400` for product data
  - `Cache-Control: public, max-age=604800, immutable` for static assets
  - `Cache-Control: private, no-cache` for user-specific data

<a id="technical-implementation-requirements"></a>

## 7. Technical Implementation Requirements

### 7.1 Data Model - Product Schema Implementation

#### Base Product Entity

```
{
  id: UUID,
  slug: String (URL-friendly unique identifier),
  sku: String (Stock Keeping Unit),
  type: Enum (TACTICAL, OUTDOOR, HOME_ACCESSORY),
  status: Enum (DRAFT, PUBLISHED, ARCHIVED),
  visibility: Enum (VISIBLE, HIDDEN, FEATURED),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

#### Localized Content Entity (for each supported language)

```
{
  productId: UUID (foreign key),
  locale: String (e.g., 'en', 'he'),
  name: String,
  shortDescription: String (max 250 chars),
  fullDescription: Text,
  metaTitle: String,
  metaDescription: String,
  searchKeywords: String[]
}
```

#### Technical Specifications Schema

```
{
  productId: UUID (foreign key),
  specificationGroupId: UUID (foreign key),
  name: String,
  value: Any,
  unit: String,
  sortOrder: Integer,
  isFilterable: Boolean,
  isComparable: Boolean,
  displayType: Enum (TEXT, NUMBER, CHECKBOX, COLOR, BADGE)
}
```

### 7.2 Development Environment Technical Requirements

#### Docker Configuration Details

- Multi-stage Docker builds with separate development and production configurations
- Alpine-based images for minimal container size (Node 18+ Alpine)
- Volume mapping for hot-reloading: `/app/src:/src` for development
- Container health checks with readiness/liveness probes

#### TypeScript Configuration Enhancement

- Strict mode with `"strict": true` in tsconfig.json
- Path aliases for cleaner imports (e.g., `*`, `@services/*`)
- Compilation target to ES2022 for modern JavaScript features
- Barrel file pattern for clean module exports

#### Backend Architecture Specifications

- Repository pattern for data access abstraction
- Dependency Injection with TypeDI or similar framework
- Command/Query Responsibility Segregation (CQRS) pattern for complex operations
- Middleware composition pattern for request processing

#### API Standards & Documentation

- OpenAPI 3.1 for all endpoints with detailed schema definitions
- JSON:API specification for response formatting
- HATEOAS for discoverability
- Swagger UI with authentication integration
