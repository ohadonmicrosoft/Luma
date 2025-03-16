import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import elevationTokens from '@/styles/tokens/elevation';

/**
 * ShadowExample component to display a shadow value with visual representation
 */
const ShadowExample = ({ name, value }: { name: string; value: string }) => (
  <div className="mb-8">
    <div className="text-lg font-semibold mb-2">{name}</div>
    <div className="flex items-center">
      <div
        className="w-32 h-32 bg-white"
        style={{ boxShadow: value }}
      />
      <div className="ml-6 text-sm text-gray-500 font-mono">{value}</div>
    </div>
  </div>
);

/**
 * BorderRadiusExample component to display a border radius value
 */
const BorderRadiusExample = ({ name, value }: { name: string; value: string }) => (
  <div className="mb-8">
    <div className="text-lg font-semibold mb-2">{name}</div>
    <div className="flex items-center">
      <div
        className="w-32 h-32 bg-primary-100 border border-primary-300"
        style={{ borderRadius: value }}
      />
      <div className="ml-6 text-sm text-gray-500 font-mono">{value}</div>
    </div>
  </div>
);

/**
 * BorderWidthExample component to display a border width value
 */
const BorderWidthExample = ({ name, value }: { name: string; value: string }) => (
  <div className="mb-6">
    <div className="text-lg font-semibold mb-2">{name}</div>
    <div className="flex items-center">
      <div
        className="w-32 h-32 bg-gray-50"
        style={{ 
          border: `${value} solid var(--colors-primary-400)`,
          borderRadius: '0.5rem'
        }}
      />
      <div className="ml-6 text-sm text-gray-500 font-mono">{value}</div>
    </div>
  </div>
);

/**
 * OpacityExample component to display an opacity value
 */
const OpacityExample = ({ name, value }: { name: string; value: string }) => (
  <div className="mb-4">
    <div className="flex items-center">
      <div className="w-16 text-sm text-gray-500">{name}</div>
      <div
        className="w-16 h-16 bg-primary-500"
        style={{ opacity: value }}
      />
      <div className="ml-6 text-sm text-gray-500 font-mono">opacity: {value}</div>
    </div>
  </div>
);

/**
 * ElevationLevelExample component to display an elevation level
 */
const ElevationLevelExample = ({ name, value }: { name: string; value: string }) => (
  <div className="mb-8">
    <div className="text-lg font-semibold mb-2">{name}</div>
    <div className="flex items-center">
      <div
        className="w-40 h-40 bg-white p-4 flex items-center justify-center text-center text-sm"
        style={{ boxShadow: value }}
      >
        {name} <br />element
      </div>
      <div className="ml-6 text-sm text-gray-500 font-mono">{value}</div>
    </div>
  </div>
);

/**
 * Story component to display all elevation tokens
 */
const Elevation = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Elevation Tokens</h1>
      
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Shadows</h2>
        <p className="mb-6">Box shadow values for creating depth</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {Object.entries(elevationTokens.shadows)
            .filter(([name]) => name !== 'none')
            .map(([name, value]) => (
              <ShadowExample key={name} name={name} value={value} />
            ))}
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Border Radius</h2>
        <p className="mb-6">Border radius values for rounding corners</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {Object.entries(elevationTokens.borderRadius)
            .filter(([name]) => name !== 'none')
            .map(([name, value]) => (
              <BorderRadiusExample key={name} name={name} value={value} />
            ))}
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Border Width</h2>
        <p className="mb-6">Border width values for element borders</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {Object.entries(elevationTokens.borderWidth)
            .filter(([name, value]) => value !== '0')
            .map(([name, value]) => (
              <BorderWidthExample key={name} name={name} value={value} />
            ))}
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Opacity</h2>
        <p className="mb-6">Opacity values for transparency effects</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(elevationTokens.opacity)
            .filter(([_, value]) => value !== '0' && value !== '1')
            .map(([name, value]) => (
              <OpacityExample key={name} name={name} value={value} />
            ))}
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Elevation Levels</h2>
        <p className="mb-6">Semantic elevation levels for common UI elements</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {Object.entries(elevationTokens.elevationLevels)
            .map(([name, value]) => (
              <ElevationLevelExample key={name} name={name} value={value} />
            ))}
        </div>
      </section>
    </div>
  );
};

// Storybook configuration
const meta: Meta<typeof Elevation> = {
  title: 'Design System/Elevation',
  component: Elevation,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const ElevationTokens: StoryObj<typeof Elevation> = {
  render: () => <Elevation />,
}; 
