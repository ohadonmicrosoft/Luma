import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StackLayout } from '@/components/layout';

const meta = {
  title: 'Layout/StackLayout',
  component: StackLayout,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof StackLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

// Sample stack item component
const StackItem = ({ children, color = 'blue', className = '' }: { children: React.ReactNode; color?: string; className?: string }) => (
  <div 
    className={`p-4 rounded shadow-sm bg-${color}-100 border border-${color}-200 ${className}`}
  >
    {children}
  </div>
);

/**
 * Vertical Stack (Default)
 */
export const Vertical: Story = {
  args: {
    children: (
      <>
        <StackItem>First Item</StackItem>
        <StackItem color="green">Second Item</StackItem>
        <StackItem color="purple">Third Item</StackItem>
        <StackItem color="yellow">Fourth Item</StackItem>
      </>
    ),
  },
};

/**
 * Horizontal Stack
 */
export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    children: (
      <>
        <StackItem>First Item</StackItem>
        <StackItem color="green">Second Item</StackItem>
        <StackItem color="purple">Third Item</StackItem>
        <StackItem color="yellow">Fourth Item</StackItem>
      </>
    ),
  },
};

/**
 * Stack with Custom Spacing
 */
export const CustomSpacing: Story = {
  args: {
    spacing: '8' as any, // Using any to bypass type check temporarily
    children: (
      <>
        <StackItem>Item with large spacing</StackItem>
        <StackItem color="green">Item with large spacing</StackItem>
        <StackItem color="purple">Item with large spacing</StackItem>
      </>
    ),
  },
};

/**
 * Stack with Responsive Spacing
 */
export const ResponsiveSpacing: Story = {
  args: {
    spacing: { base: '2', md: '4', lg: '8' } as any, // Using any to bypass type check temporarily
    children: (
      <>
        <StackItem>Responsive spacing item</StackItem>
        <StackItem color="green">Responsive spacing item</StackItem>
        <StackItem color="purple">Responsive spacing item</StackItem>
        <StackItem color="yellow">Responsive spacing item</StackItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'This stack has spacing that changes based on screen size: smaller on mobile and larger on desktop.',
      },
    },
  },
};

/**
 * Stack with Dividers
 */
export const WithDividers: Story = {
  args: {
    dividers: true,
    children: (
      <>
        <StackItem>Item with divider below</StackItem>
        <StackItem color="green">Item with dividers</StackItem>
        <StackItem color="purple">Item with dividers</StackItem>
        <StackItem color="yellow">Item with divider above</StackItem>
      </>
    ),
  },
};

/**
 * Stack with Alignment
 */
export const Alignment: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-3">Start Alignment (Default)</h3>
        <div className="h-40 bg-gray-100 rounded p-4 flex flex-row items-start space-x-4">
          <StackItem>Short</StackItem>
          <StackItem color="green">Medium height item</StackItem>
          <StackItem color="purple" className="h-32">Tall item</StackItem>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Center Alignment</h3>
        <div className="h-40 bg-gray-100 rounded p-4 flex flex-row items-center space-x-4">
          <StackItem>Short</StackItem>
          <StackItem color="green">Medium height item</StackItem>
          <StackItem color="purple" className="h-32">Tall item</StackItem>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">End Alignment</h3>
        <div className="h-40 bg-gray-100 rounded p-4 flex flex-row items-end space-x-4">
          <StackItem>Short</StackItem>
          <StackItem color="green">Medium height item</StackItem>
          <StackItem color="purple" className="h-32">Tall item</StackItem>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Stretch Alignment</h3>
        <div className="h-40 bg-gray-100 rounded p-4 flex flex-row items-stretch space-x-4">
          <StackItem className="h-auto">Stretched</StackItem>
          <StackItem color="green" className="h-auto">Stretched</StackItem>
          <StackItem color="purple" className="h-auto">Stretched</StackItem>
        </div>
      </div>
    </div>
  ),
};

/**
 * Responsive Direction
 */
export const ResponsiveDirection: Story = {
  args: {
    direction: { base: 'vertical', md: 'horizontal' } as any, // Using any to bypass type check temporarily
    children: (
      <>
        <StackItem>First Item</StackItem>
        <StackItem color="green">Second Item</StackItem>
        <StackItem color="purple">Third Item</StackItem>
        <StackItem color="yellow">Fourth Item</StackItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'This stack changes direction based on screen size: vertical on mobile, horizontal on larger screens.',
      },
    },
  },
};

/**
 * Stack with Wrap
 */
export const WrappingStack: Story = {
  args: {
    direction: 'horizontal',
    wrap: true,
    spacing: '4' as any, // Using any to bypass type check temporarily
    children: (
      <>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="w-32">
            <StackItem color={item % 2 === 0 ? 'green' : 'blue'}>
              Item {item}
            </StackItem>
          </div>
        ))}
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'This horizontal stack wraps items to the next line when they exceed the container width.',
      },
    },
  },
}; 
