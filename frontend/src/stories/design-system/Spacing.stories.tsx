import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import spacingTokens from '@/styles/tokens/spacing';

/**
 * SpacingExample component to display a spacing value with visual representation
 */
const SpacingExample = ({ name, value }: { name: string; value: string }) => (
  <div className="flex items-center mb-4">
    <div className="w-16 text-sm text-gray-500">{name}</div>
    <div
      className="bg-primary-200 border border-primary-400"
      style={{ width: value, height: '24px' }}
    />
    <div className="ml-4 text-sm text-gray-500">{value}</div>
  </div>
);

/**
 * BreakpointExample component to display a breakpoint value
 */
const BreakpointExample = ({ name, value }: { name: string; value: string }) => (
  <div className="mb-4 p-3 border rounded">
    <div className="text-lg font-semibold">{name}</div>
    <div className="text-sm text-gray-500">{value}</div>
    <div className="mt-2 h-4 bg-gradient-to-r from-primary-200 to-primary-400" 
         style={{ maxWidth: value }} />
  </div>
);

/**
 * ContainerExample component to display a container value
 */
const ContainerExample = ({ name, value }: { name: string; value: string }) => (
  <div className="mb-6">
    <div className="text-lg font-semibold mb-2">{name}</div>
    <div className="text-sm text-gray-500 mb-2">{value}</div>
    <div className="w-full overflow-hidden">
      <div className="h-6 bg-secondary-200 border border-secondary-400"
           style={{ maxWidth: value, minWidth: "200px" }} />
    </div>
  </div>
);

/**
 * ZIndexLayer component to display a z-index value
 */
const ZIndexLayer = ({ name, value, index }: { name: string; value: string | number; index: number }) => (
  <div 
    className="absolute bg-white border rounded p-2 shadow"
    style={{ 
      zIndex: value, 
      top: `${20 + index * 10}px`, 
      left: `${20 + index * 10}px`, 
      right: `${100 - index * 10}px`,
      backgroundColor: index % 2 === 0 ? '#EDF1F7' : '#ffffff'
    }}
  >
    <div className="text-sm font-semibold">{name}</div>
    <div className="text-xs text-gray-500">z-index: {value}</div>
  </div>
);

/**
 * Story component to display all spacing tokens
 */
const Spacing = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Spacing Tokens</h1>
      
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Spacing Scale</h2>
        <p className="mb-4">Base unit: {spacingTokens.BASE_UNIT}rem ({spacingTokens.BASE_UNIT * 16}px at 16px font size)</p>
        
        <div className="mt-6">
          {Object.entries(spacingTokens.spacing).map(([name, value]) => (
            <SpacingExample key={name} name={name} value={value} />
          ))}
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Container Widths</h2>
        <p className="mb-4">Max-width constraints for content containers</p>
        
        <div className="mt-6">
          {Object.entries(spacingTokens.containers).map(([name, value]) => (
            <ContainerExample key={name} name={name} value={value} />
          ))}
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Breakpoints</h2>
        <p className="mb-4">Responsive breakpoints for media queries</p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(spacingTokens.breakpoints).map(([name, value]) => (
            <BreakpointExample key={name} name={name} value={value} />
          ))}
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Z-Index Scale</h2>
        <p className="mb-4">Z-index values for controlling element stacking</p>
        
        <div className="mt-10 relative" style={{ height: '300px' }}>
          {Object.entries(spacingTokens.zIndex)
            .filter(([_, value]) => value !== 'auto' && !isNaN(Number(value)))
            .sort((a, b) => Number(a[1]) - Number(b[1]))
            .map(([name, value], index) => (
              <ZIndexLayer key={name} name={name} value={value} index={index} />
            ))}
        </div>
      </section>
    </div>
  );
};

// Storybook configuration
const meta: Meta<typeof Spacing> = {
  title: 'Design System/Spacing',
  component: Spacing,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const SpacingTokens: StoryObj<typeof Spacing> = {
  render: () => <Spacing />,
}; 
