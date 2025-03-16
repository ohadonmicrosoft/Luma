import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import typography from '@/styles/tokens/typography';

/**
 * FontFamily component to display a font family with a sample text
 */
const FontFamily = ({ name, family }: { name: string; family: string[] }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-2">{name}</h3>
    <p style={{ fontFamily: family.join(', ') }} className="text-lg">
      The quick brown fox jumps over the lazy dog. 0123456789
    </p>
    <p className="text-sm text-gray-500 mt-1">
      Font family: {family.join(', ')}
    </p>
  </div>
);

/**
 * FontSize component to display a font size with a sample text
 */
const FontSize = ({ name, size }: { name: string; size: string }) => (
  <div className="mb-4">
    <span className="inline-block w-12 text-sm text-gray-500">{name}</span>
    <span style={{ fontSize: size }} className="ml-4">
      {size} - The quick brown fox
    </span>
  </div>
);

/**
 * TextStyle component to display a text style preset
 */
const TextStyle = ({ 
  name, 
  style 
}: { 
  name: string; 
  style: { 
    fontFamily: string[]; 
    fontSize: string; 
    fontWeight: string; 
    lineHeight: number; 
    letterSpacing: string;
    textTransform?: string;
  } 
}) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-2">{name}</h3>
    <div
      style={{
        fontFamily: style.fontFamily.join(', '),
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
        textTransform: style.textTransform as any,
      }}
      className="mb-2"
    >
      The quick brown fox jumps over the lazy dog.
    </div>
    <div className="text-xs text-gray-500">
      <code>
        {JSON.stringify({
          fontFamily: style.fontFamily[0],
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          letterSpacing: style.letterSpacing,
          ...(style.textTransform && { textTransform: style.textTransform }),
        }, null, 2)}
      </code>
    </div>
  </div>
);

/**
 * Story component to display all typography tokens
 */
const Typography = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Typography Tokens</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Font Families</h2>
        <FontFamily name="Sans-serif (Default)" family={typography.fontFamily.sans} />
        <FontFamily name="Serif" family={typography.fontFamily.serif} />
        <FontFamily name="Monospace" family={typography.fontFamily.mono} />
        <FontFamily name="Hebrew (RTL)" family={typography.fontFamily.hebrew} />
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Font Sizes</h2>
        {Object.entries(typography.fontSize).map(([name, size]) => (
          <FontSize key={name} name={name} size={size} />
        ))}
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Font Weights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(typography.fontWeight).map(([name, weight]) => (
            <div key={name} className="mb-2">
              <span className="inline-block w-24 text-sm text-gray-500">{name}</span>
              <span style={{ fontWeight: weight }}>
                {weight} - Sample Text
              </span>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Line Heights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(typography.lineHeight).map(([name, height]) => (
            <div key={name} className="p-3 border rounded">
              <div className="text-sm text-gray-500 mb-2">{name} ({height})</div>
              <div style={{ lineHeight: height }} className="p-2 bg-gray-100">
                This is an example of text with {name} line height. See how it affects the
                spacing between multiple lines of text in a paragraph.
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Text Styles</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Headings</h3>
          <TextStyle name="h1" style={typography.textStyles.h1} />
          <TextStyle name="h2" style={typography.textStyles.h2} />
          <TextStyle name="h3" style={typography.textStyles.h3} />
          <TextStyle name="h4" style={typography.textStyles.h4} />
          <TextStyle name="h5" style={typography.textStyles.h5} />
          <TextStyle name="h6" style={typography.textStyles.h6} />
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Body Text</h3>
          <TextStyle name="bodyLarge" style={typography.textStyles.bodyLarge} />
          <TextStyle name="bodyDefault" style={typography.textStyles.bodyDefault} />
          <TextStyle name="bodySmall" style={typography.textStyles.bodySmall} />
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">UI Text</h3>
          <TextStyle name="buttonLabel" style={typography.textStyles.buttonLabel} />
          <TextStyle name="caption" style={typography.textStyles.caption} />
          <TextStyle name="overline" style={typography.textStyles.overline} />
        </div>
      </section>
    </div>
  );
};

// Storybook configuration
const meta: Meta<typeof Typography> = {
  title: 'Design System/Typography',
  component: Typography,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const TypographyTokens: StoryObj<typeof Typography> = {
  render: () => <Typography />,
}; 
