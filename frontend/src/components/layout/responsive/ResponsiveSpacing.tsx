/**
 * Responsive Spacing Component
 * 
 * Provides responsive spacing (margins and paddings) based on breakpoints.
 */

import React from 'react';
import { cn } from '@/utils/classNames';

export type SpacingSize = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '20' | '24' | '32' | '40' | '48' | '64';
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type SpacingConfig = {
  base?: SpacingSize;
  sm?: SpacingSize;
  md?: SpacingSize;
  lg?: SpacingSize;
  xl?: SpacingSize;
  '2xl'?: SpacingSize;
};

export interface ResponsiveSpacingProps {
  /** Child elements to be spaced */
  children: React.ReactNode;
  /** Margin top responsive configuration */
  mt?: SpacingConfig | SpacingSize;
  /** Margin right responsive configuration */
  mr?: SpacingConfig | SpacingSize;
  /** Margin bottom responsive configuration */
  mb?: SpacingConfig | SpacingSize;
  /** Margin left responsive configuration */
  ml?: SpacingConfig | SpacingSize;
  /** Margin x-axis (left and right) responsive configuration */
  mx?: SpacingConfig | SpacingSize;
  /** Margin y-axis (top and bottom) responsive configuration */
  my?: SpacingConfig | SpacingSize;
  /** Margin on all sides responsive configuration */
  m?: SpacingConfig | SpacingSize;
  /** Padding top responsive configuration */
  pt?: SpacingConfig | SpacingSize;
  /** Padding right responsive configuration */
  pr?: SpacingConfig | SpacingSize;
  /** Padding bottom responsive configuration */
  pb?: SpacingConfig | SpacingSize;
  /** Padding left responsive configuration */
  pl?: SpacingConfig | SpacingSize;
  /** Padding x-axis (left and right) responsive configuration */
  px?: SpacingConfig | SpacingSize;
  /** Padding y-axis (top and bottom) responsive configuration */
  py?: SpacingConfig | SpacingSize;
  /** Padding on all sides responsive configuration */
  p?: SpacingConfig | SpacingSize;
  /** Additional class names */
  className?: string;
}

/**
 * Helper to convert a spacing configuration to Tailwind classes
 */
const getSpacingClasses = (
  prefix: string,
  config: SpacingConfig | SpacingSize | undefined
): string => {
  if (!config) return '';
  
  if (typeof config === 'string') {
    return `${prefix}-${config}`;
  }
  
  const classes: string[] = [];
  
  if (config.base) classes.push(`${prefix}-${config.base}`);
  if (config.sm) classes.push(`sm:${prefix}-${config.sm}`);
  if (config.md) classes.push(`md:${prefix}-${config.md}`);
  if (config.lg) classes.push(`lg:${prefix}-${config.lg}`);
  if (config.xl) classes.push(`xl:${prefix}-${config.xl}`);
  if (config['2xl']) classes.push(`2xl:${prefix}-${config['2xl']}`);
  
  return classes.join(' ');
};

/**
 * Responsive Spacing Component
 * 
 * Provides flexible, responsive spacing control with support for 
 * different values at different breakpoints.
 */
export const ResponsiveSpacing: React.FC<ResponsiveSpacingProps> = ({
  children,
  m,
  mt,
  mr,
  mb,
  ml,
  mx,
  my,
  p,
  pt,
  pr,
  pb,
  pl,
  px,
  py,
  className,
}) => {
  // Generate individual spacing classes
  const marginClasses = cn(
    getSpacingClasses('m', m),
    getSpacingClasses('mt', mt),
    getSpacingClasses('mr', mr),
    getSpacingClasses('mb', mb),
    getSpacingClasses('ml', ml),
    getSpacingClasses('mx', mx),
    getSpacingClasses('my', my)
  );
  
  const paddingClasses = cn(
    getSpacingClasses('p', p),
    getSpacingClasses('pt', pt),
    getSpacingClasses('pr', pr),
    getSpacingClasses('pb', pb),
    getSpacingClasses('pl', pl),
    getSpacingClasses('px', px),
    getSpacingClasses('py', py)
  );
  
  return (
    <div className={cn(marginClasses, paddingClasses, className)}>
      {children}
    </div>
  );
};

export default ResponsiveSpacing; 
