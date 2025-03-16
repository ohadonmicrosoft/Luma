import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Hide, 
  Show, 
  Visible, 
  ResponsiveSpacing 
} from '@/components/layout';

const meta = {
  title: 'Layout/Responsive',
  component: () => null, // Placeholder component since we're showing multiple components
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<any>;

export default meta;

// Define a type for our component stories
type Story = StoryObj<typeof meta>;

/**
 * Hide Component Stories
 */
export const HideComponent: Story = {
  name: 'Hide',
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Hide Below Breakpoint</h2>
        <p className="text-sm text-gray-600 mb-4">
          This component will be hidden on screens smaller than the specified breakpoint.
        </p>
        
        <Hide below="md" className="p-4 bg-blue-100 rounded border border-blue-200">
          <p>This content is hidden on screens smaller than <strong>md</strong> breakpoint.</p>
          <p className="text-sm text-gray-600">Try resizing your browser to see it disappear.</p>
        </Hide>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">Hide Above Breakpoint</h2>
        <p className="text-sm text-gray-600 mb-4">
          This component will be hidden on screens larger than the specified breakpoint.
        </p>
        
        <Hide above="lg" className="p-4 bg-green-100 rounded border border-green-200">
          <p>This content is hidden on screens larger than <strong>lg</strong> breakpoint.</p>
          <p className="text-sm text-gray-600">Try resizing your browser to see it disappear.</p>
        </Hide>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">Hide At Specific Breakpoints</h2>
        <p className="text-sm text-gray-600 mb-4">
          This component will be hidden only at the specified breakpoints.
        </p>
        
        <Hide at={['md']} className="p-4 bg-purple-100 rounded border border-purple-200">
          <p>This content is hidden only at the <strong>md</strong> breakpoint.</p>
          <p className="text-sm text-gray-600">Try resizing your browser to see when it disappears.</p>
        </Hide>
      </div>
    </div>
  ),
};

/**
 * Show Component Stories
 */
export const ShowComponent: Story = {
  name: 'Show',
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Show Above Breakpoint</h2>
        <p className="text-sm text-gray-600 mb-4">
          This component will be shown only on screens larger than the specified breakpoint.
        </p>
        
        <Show above="md" className="p-4 bg-blue-100 rounded border border-blue-200">
          <p>This content is visible on screens larger than <strong>md</strong> breakpoint.</p>
          <p className="text-sm text-gray-600">Try resizing your browser to see it appear.</p>
        </Show>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">Show Below Breakpoint</h2>
        <p className="text-sm text-gray-600 mb-4">
          This component will be shown only on screens smaller than the specified breakpoint.
        </p>
        
        <Show below="lg" className="p-4 bg-green-100 rounded border border-green-200">
          <p>This content is visible on screens smaller than <strong>lg</strong> breakpoint.</p>
          <p className="text-sm text-gray-600">Try resizing your browser to see it appear.</p>
        </Show>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">Show At Specific Breakpoints</h2>
        <p className="text-sm text-gray-600 mb-4">
          This component will be shown only at the specified breakpoints.
        </p>
        
        <Show at={['md']} className="p-4 bg-purple-100 rounded border border-purple-200">
          <p>This content is visible only at the <strong>md</strong> breakpoint.</p>
          <p className="text-sm text-gray-600">Try resizing your browser to see when it appears.</p>
        </Show>
      </div>
    </div>
  ),
};

/**
 * Visible Component Stories
 */
export const VisibleComponent: Story = {
  name: 'Visible',
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Conditional Visibility</h2>
        <p className="text-sm text-gray-600 mb-4">
          This component renders content conditionally based on a boolean value.
        </p>
        
        <div className="flex space-x-4">
          <Visible 
            when={true} 
            className="p-4 bg-green-100 rounded border border-green-200"
          >
            <p>This content is visible because condition is <strong>true</strong>.</p>
          </Visible>
          
          <Visible 
            when={false} 
            fallback={
              <div className="p-4 bg-red-100 rounded border border-red-200">
                <p>This is the fallback content shown when condition is <strong>false</strong>.</p>
              </div>
            }
            className="p-4 bg-green-100 rounded border border-green-200"
          >
            <p>This content should not be visible since condition is false.</p>
          </Visible>
        </div>
      </div>
    </div>
  ),
};

/**
 * ResponsiveSpacing Component Stories
 */
export const ResponsiveSpacingComponent: Story = {
  name: 'ResponsiveSpacing',
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-2">Responsive Margin</h2>
        <p className="text-sm text-gray-600 mb-4">
          This component has different margins at different breakpoints.
        </p>
        
        <div className="bg-gray-200 p-1">
          <ResponsiveSpacing 
            m={{ base: '4', md: '8', lg: '12', xl: '16' }}
            className="bg-white p-4 border border-gray-300"
          >
            <p>This box has:</p>
            <ul className="list-disc pl-5">
              <li>m-4 on mobile</li>
              <li>m-8 on md screens</li>
              <li>m-12 on lg screens</li>
              <li>m-16 on xl screens</li>
            </ul>
          </ResponsiveSpacing>
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">Responsive Padding</h2>
        <p className="text-sm text-gray-600 mb-4">
          This component has different padding on different sides.
        </p>
        
        <ResponsiveSpacing 
          pt="4"
          pr={{ base: '2', md: '4', lg: '8' }}
          pb="2"
          pl={{ base: '2', md: '4', lg: '8' }}
          className="bg-blue-100 border border-blue-200"
        >
          <p>This box has:</p>
          <ul className="list-disc pl-5">
            <li>pt-4 (constant)</li>
            <li>pb-2 (constant)</li>
            <li>Horizontal padding that increases at breakpoints</li>
          </ul>
        </ResponsiveSpacing>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">Combined Responsive Spacing</h2>
        <p className="text-sm text-gray-600 mb-4">
          This component has responsive margin and padding that adapts to screen size.
        </p>
        
        <div className="bg-gray-200 p-1">
          <ResponsiveSpacing 
            m={{ base: '2', md: '4', lg: '8' }}
            p={{ base: '2', md: '4', lg: '6' }}
            className="bg-purple-100 border border-purple-200"
          >
            <p>This box has responsive margin and padding that increases at breakpoints.</p>
            <p className="text-sm text-gray-600 mt-2">Try resizing the browser to see the spacing change.</p>
          </ResponsiveSpacing>
        </div>
      </div>
    </div>
  ),
}; 
