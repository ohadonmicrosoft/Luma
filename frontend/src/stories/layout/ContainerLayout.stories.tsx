import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ContainerLayout } from '@/components/layout';

const meta = {
  title: 'Layout/ContainerLayout',
  component: ContainerLayout,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-100 p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default Container Layout
 */
export const Default: Story = {
  args: {
    children: (
      <div className="bg-white p-6 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Default Container Layout</h2>
        <p className="text-gray-700">
          This is the default container with standard max-width and padding.
          The container adds responsive padding to the sides and centers the content.
        </p>
      </div>
    ),
    maxWidth: 'xl',
    padding: 'md',
    centered: true,
  },
};

/**
 * Small Container
 */
export const Small: Story = {
  args: {
    maxWidth: 'sm',
    children: (
      <div className="bg-white p-6 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Small Container</h2>
        <p className="text-gray-700">
          This is a small container, useful for content that should be constrained to a smaller width,
          such as forms or small dialogs.
        </p>
      </div>
    ),
  },
};

/**
 * Large Container
 */
export const Large: Story = {
  args: {
    maxWidth: 'lg',
    children: (
      <div className="bg-white p-6 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Large Container</h2>
        <p className="text-gray-700">
          This is a large container, useful for layouts that need more horizontal space,
          such as dashboards or data tables.
        </p>
      </div>
    ),
  },
};

/**
 * Full-Width Container
 */
export const FullWidth: Story = {
  args: {
    maxWidth: 'full',
    children: (
      <div className="bg-white p-6 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Full-Width Container</h2>
        <p className="text-gray-700">
          This container takes up the full width of its parent, with only padding on the edges.
          Useful for full-width sections or hero components.
        </p>
      </div>
    ),
  },
};

/**
 * Fluid Container
 */
export const Fluid: Story = {
  args: {
    fluid: true,
    children: (
      <div className="bg-white p-6 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Fluid Container</h2>
        <p className="text-gray-700">
          A fluid container spans the full width of its parent without any maximum width constraint.
          This is useful for full-width layouts or when you want the container to adapt to its parent.
        </p>
      </div>
    ),
  },
};

/**
 * Custom Padding
 */
export const CustomPadding: Story = {
  args: {
    padding: 'lg',
    children: (
      <div className="bg-white rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Large Padding Container</h2>
        <p className="text-gray-700">
          This container has larger horizontal padding, giving content more breathing room.
          The container's padding prop allows selecting from predefined padding options.
        </p>
      </div>
    ),
  },
};

/**
 * Nested Containers
 */
export const Nested: Story = {
  render: () => (
    <ContainerLayout maxWidth="2xl" className="bg-blue-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Outer Container (2XL)</h2>
      <p className="mb-6">
        This is the outer container with extra-large max-width. It can contain other nested containers.
      </p>
      
      <ContainerLayout maxWidth="sm" className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Inner Container (Small)</h3>
        <p className="text-gray-700">
          This is a nested inner container with small max-width.
          Nesting containers can be useful for creating complex layouts.
        </p>
      </ContainerLayout>
    </ContainerLayout>
  ),
}; 
