import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '@/components/layout';

const meta = {
  title: 'Layout/Container',
  component: Container,
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
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default Container Story
 */
export const Default: Story = {
  args: {
    children: (
      <div className="bg-white p-6 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Default Container</h2>
        <p className="text-gray-700">
          This is the default container with standard max-width and padding.
          The container adds responsive padding to the sides and centers the content.
        </p>
      </div>
    ),
  },
};

/**
 * Narrow Container
 */
export const Narrow: Story = {
  args: {
    maxWidth: 'narrow',
    children: (
      <div className="bg-white p-6 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Narrow Container</h2>
        <p className="text-gray-700">
          This is a narrow container, useful for content that should be constrained to a smaller width,
          such as articles or forms.
        </p>
      </div>
    ),
  },
};

/**
 * Wide Container
 */
export const Wide: Story = {
  args: {
    maxWidth: 'wide',
    children: (
      <div className="bg-white p-6 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Wide Container</h2>
        <p className="text-gray-700">
          This is a wide container, useful for layouts that need more horizontal space,
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
 * Container with Custom Padding
 */
export const CustomPadding: Story = {
  args: {
    px: '8',
    py: '10',
    children: (
      <div className="bg-white rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Container with Custom Padding</h2>
        <p className="text-gray-700">
          This container has custom padding values applied to all sides.
          The container's px and py props allow for custom padding control.
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
    <Container maxWidth="wide" className="bg-blue-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Outer Container (Wide)</h2>
      <p className="mb-6">
        This is the outer container with wide max-width. It can contain other nested containers.
      </p>
      
      <Container maxWidth="narrow" className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Inner Container (Narrow)</h3>
        <p className="text-gray-700">
          This is a nested inner container with narrow max-width.
          Nesting containers can be useful for creating complex layouts.
        </p>
      </Container>
    </Container>
  ),
};

/**
 * Container with Responsive Padding
 */
export const ResponsivePadding: Story = {
  render: () => (
    <Container 
      px={{ base: '4', md: '8', lg: '12' }}
      py={{ base: '6', md: '8', lg: '10' }}
      className="bg-white rounded-lg shadow-sm"
    >
      <h2 className="text-xl font-semibold mb-4">Container with Responsive Padding</h2>
      <p className="text-gray-700 mb-4">
        This container has padding that changes at different breakpoints:
      </p>
      <ul className="list-disc pl-5 text-gray-700">
        <li>Small screens: px-4 py-6</li>
        <li>Medium screens: px-8 py-8</li>
        <li>Large screens: px-12 py-10</li>
      </ul>
      <p className="text-gray-700 mt-4">
        Try resizing the browser to see the padding change.
      </p>
    </Container>
  ),
}; 
