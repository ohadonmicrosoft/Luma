import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SectionLayout } from '@/components/layout';

const meta = {
  title: 'Layout/SectionLayout',
  component: SectionLayout,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof SectionLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default Section Layout
 */
export const Default: Story = {
  args: {
    children: (
      <div className="bg-white p-6 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Default Section</h2>
        <p className="text-gray-700">
          This is a default section layout with standard spacing and padding.
          Sections are building blocks for page layouts, providing consistent vertical rhythm.
        </p>
      </div>
    ),
  },
};

/**
 * Section with Background
 */
export const WithBackground: Story = {
  args: {
    background: 'light',
    children: (
      <div className="p-6 rounded">
        <h2 className="text-xl font-semibold mb-4">Section with Background</h2>
        <p className="text-gray-700">
          This section has a light background to visually separate it from other sections.
          Backgrounds help create visual hierarchy on the page.
        </p>
      </div>
    ),
  },
};

/**
 * Section with Custom Spacing
 */
export const CustomSpacing: Story = {
  args: {
    spacing: 'lg',
    children: (
      <div className="bg-white p-6 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Section with Large Spacing</h2>
        <p className="text-gray-700">
          This section has larger vertical spacing, giving content more breathing room.
          Use larger spacing for important sections or to create focus.
        </p>
      </div>
    ),
  },
};

/**
 * Full-Width Section
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: (
      <div className="bg-blue-50 p-6">
        <h2 className="text-xl font-semibold mb-4">Full-Width Section</h2>
        <p className="text-gray-700">
          This section extends to the full width of the viewport.
          Full-width sections are useful for hero sections, banners, or visual breaks.
        </p>
      </div>
    ),
  },
};

/**
 * Section with Heading
 */
export const WithHeading: Story = {
  args: {
    title: "Featured Products",
    subtitle: "Explore our most popular tactical gear",
    children: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white p-4 rounded shadow-sm">
            <div className="bg-gray-200 h-40 mb-3 rounded"></div>
            <h3 className="font-medium">Product {item}</h3>
            <p className="text-sm text-gray-600">Product description goes here</p>
          </div>
        ))}
      </div>
    ),
  },
};

/**
 * Nested Sections
 */
export const NestedSections: Story = {
  render: () => (
    <SectionLayout background="light">
      <h2 className="text-2xl font-bold mb-6">Parent Section</h2>
      
      <SectionLayout background="white" className="rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Nested Section 1</h3>
        <p className="text-gray-700 mb-4">
          Sections can be nested to create complex layouts with proper spacing.
          This nested section has a white background inside the parent section.
        </p>
      </SectionLayout>
      
      <SectionLayout background="white" className="rounded-lg shadow-sm mt-6">
        <h3 className="text-xl font-semibold mb-4">Nested Section 2</h3>
        <p className="text-gray-700 mb-4">
          Multiple nested sections maintain their own spacing while contributing to the overall layout.
          This creates a structured yet flexible composition.
        </p>
      </SectionLayout>
    </SectionLayout>
  ),
}; 
