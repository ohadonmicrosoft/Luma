import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import colors from '@/styles/tokens/colors';

/**
 * Color component to display a color swatch with its hex value
 */
const ColorSwatch = ({ color, name }: { color: string; name: string }) => (
  <div className="flex flex-col items-center">
    <div
      className="w-16 h-16 rounded mb-2"
      style={{ backgroundColor: color }}
    />
    <div className="text-xs font-mono">{name}</div>
    <div className="text-xs font-mono">{color}</div>
  </div>
);

/**
 * ColorPalette component to display a full color scale
 */
const ColorPalette = ({
  palette,
  title,
}: {
  palette: Record<string, string>;
  title: string;
}) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-4">
      {Object.entries(palette).map(([shade, value]) => (
        <ColorSwatch key={shade} color={value} name={`${title}-${shade}`} />
      ))}
    </div>
  </div>
);

/**
 * Story component to display all color tokens
 */
const Colors = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Color Tokens</h1>
      
      <h2 className="text-xl font-semibold mb-4">Brand Colors</h2>
      <ColorPalette palette={colors.primary} title="primary" />
      <ColorPalette palette={colors.secondary} title="secondary" />
      
      <h2 className="text-xl font-semibold mb-4 mt-8">Neutrals</h2>
      <ColorPalette palette={colors.gray} title="gray" />
      
      <h2 className="text-xl font-semibold mb-4 mt-8">Product Categories</h2>
      <ColorPalette palette={colors.tactical} title="tactical" />
      <ColorPalette palette={colors.outdoor} title="outdoor" />
      
      <h2 className="text-xl font-semibold mb-4 mt-8">Semantic Colors</h2>
      <ColorPalette palette={colors.ui.error} title="error" />
      <ColorPalette palette={colors.ui.warning} title="warning" />
      <ColorPalette palette={colors.ui.success} title="success" />
      <ColorPalette palette={colors.ui.info} title="info" />
    </div>
  );
};

// Storybook configuration
const meta: Meta<typeof Colors> = {
  title: 'Design System/Colors',
  component: Colors,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const ColorTokens: StoryObj<typeof Colors> = {
  render: () => <Colors />,
}; 
