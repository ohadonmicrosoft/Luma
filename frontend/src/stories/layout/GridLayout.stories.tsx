import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GridLayout } from '@/components/layout';

const meta = {
  title: 'Layout/GridLayout',
  component: GridLayout,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof GridLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

// Sample grid item component for examples
const GridItem = ({ children, color = 'blue' }: { children: React.ReactNode; color?: string }) => (
  <div 
    className={`p-4 rounded shadow-sm flex items-center justify-center bg-${color}-100 border border-${color}-200 h-full`}
  >
    {children}
  </div>
);

/**
 * Default Grid Layout
 */
export const Default: Story = {
  args: {
    columns: 3,
    children: (
      <>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <GridItem key={item}>Item {item}</GridItem>
        ))}
      </>
    ),
  },
};

/**
 * Responsive Columns
 */
export const ResponsiveColumns: Story = {
  args: {
    columns: { sm: 1, md: 2, lg: 3, xl: 4 },
    children: (
      <>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <GridItem key={item}>Item {item}</GridItem>
        ))}
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'This grid changes the number of columns based on the screen size: 1 column on small screens, 2 on medium, 3 on large, and 4 on extra-large screens.',
      },
    },
  },
};

/**
 * Custom Gap
 */
export const CustomGap: Story = {
  args: {
    columns: 3,
    gap: '8' as any, // Using any to bypass type check temporarily
    children: (
      <>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <GridItem key={item}>Item {item}</GridItem>
        ))}
      </>
    ),
  },
};

/**
 * Responsive Gap
 */
export const ResponsiveGap: Story = {
  args: {
    columns: 3,
    gap: { sm: '2', md: '4', lg: '8' } as any, // Using any to bypass type check temporarily
    children: (
      <>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <GridItem key={item}>Item {item}</GridItem>
        ))}
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'This grid has a gap that changes based on screen size: smaller on mobile and larger on desktop.',
      },
    },
  },
};

/**
 * Auto-Fit Grid
 */
export const AutoFit: Story = {
  args: {
    autoFit: true,
    minChildWidth: '200px',
    children: (
      <>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
          <GridItem key={item}>Item {item}</GridItem>
        ))}
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'This grid automatically fits as many items as possible in each row, with each item being at least 200px wide.',
      },
    },
  },
};

/**
 * Grid with Different Item Sizes
 */
export const DifferentItemSizes: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-6 md:col-span-4">
        <GridItem color="purple">Span 4 columns</GridItem>
      </div>
      <div className="col-span-6 md:col-span-2">
        <GridItem color="green">Span 2 columns</GridItem>
      </div>
      <div className="col-span-6 md:col-span-3">
        <GridItem color="yellow">Span 3 columns</GridItem>
      </div>
      <div className="col-span-6 md:col-span-3">
        <GridItem color="red">Span 3 columns</GridItem>
      </div>
      <div className="col-span-6 md:col-span-2">
        <GridItem color="blue">Span 2 columns</GridItem>
      </div>
      <div className="col-span-6 md:col-span-4">
        <GridItem color="indigo">Span 4 columns</GridItem>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'This grid demonstrates how to create items of different sizes within a grid layout.',
      },
    },
  },
};

/**
 * Grid with Areas (Dashboard Layout)
 */
export const GridAreas: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 h-[500px]">
      {/* Header */}
      <div className="col-span-1 md:col-span-4 lg:col-span-6 bg-blue-100 rounded shadow-sm p-4">
        Header
      </div>
      
      {/* Sidebar */}
      <div className="col-span-1 md:col-span-1 lg:col-span-1 bg-green-100 rounded shadow-sm p-4">
        Sidebar
      </div>
      
      {/* Main Content */}
      <div className="col-span-1 md:col-span-3 lg:col-span-4 bg-purple-100 rounded shadow-sm p-4">
        Main Content
      </div>
      
      {/* Right Sidebar */}
      <div className="col-span-1 md:col-span-4 lg:col-span-1 bg-yellow-100 rounded shadow-sm p-4">
        Right Sidebar
      </div>
      
      {/* Footer */}
      <div className="col-span-1 md:col-span-4 lg:col-span-6 bg-red-100 rounded shadow-sm p-4">
        Footer
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'This demonstrates how to create a complex dashboard layout using grid areas.',
      },
    },
  },
}; 
