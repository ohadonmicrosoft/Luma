/**
 * Responsive Components
 * 
 * Utility components for responsive layouts and visibility.
 */

import React from 'react';
import { cn } from '@/utils/classNames';

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Props for the Hide component
 */
export interface HideProps {
  /** Content to be conditionally hidden */
  children: React.ReactNode;
  /** Screen sizes at which content should be hidden */
  below?: Breakpoint;
  /** Screen sizes at which content should be hidden */
  above?: Breakpoint;
  /** Screen sizes at which content should be hidden */
  at?: Breakpoint[];
  /** Additional class names */
  className?: string;
}

/**
 * Hide component
 * 
 * Conditionally hides content based on screen size breakpoints.
 * Can hide content below, above, or at specific breakpoints.
 */
export const Hide: React.FC<HideProps> = ({
  children,
  below,
  above,
  at,
  className,
}) => {
  const getHideClasses = () => {
    const classes: string[] = [];
    
    if (below) {
      switch (below) {
        case 'sm': classes.push('sm:block hidden'); break;
        case 'md': classes.push('md:block hidden'); break;
        case 'lg': classes.push('lg:block hidden'); break;
        case 'xl': classes.push('xl:block hidden'); break;
        case '2xl': classes.push('2xl:block hidden'); break;
      }
    }
    
    if (above) {
      switch (above) {
        case 'sm': classes.push('hidden sm:hidden'); break;
        case 'md': classes.push('md:hidden'); break;
        case 'lg': classes.push('lg:hidden'); break;
        case 'xl': classes.push('xl:hidden'); break;
        case '2xl': classes.push('2xl:hidden'); break;
      }
    }
    
    if (at && at.length > 0) {
      at.forEach(breakpoint => {
        switch (breakpoint) {
          case 'sm': classes.push('sm:hidden md:block'); break;
          case 'md': classes.push('md:hidden lg:block sm:block'); break;
          case 'lg': classes.push('lg:hidden xl:block md:block'); break;
          case 'xl': classes.push('xl:hidden 2xl:block lg:block'); break;
          case '2xl': classes.push('2xl:hidden xl:block'); break;
        }
      });
    }
    
    return classes.join(' ');
  };
  
  return (
    <div className={cn(getHideClasses(), className)}>
      {children}
    </div>
  );
};

/**
 * Props for the Show component
 */
export interface ShowProps {
  /** Content to be conditionally shown */
  children: React.ReactNode;
  /** Screen sizes at which content should be shown */
  below?: Breakpoint;
  /** Screen sizes at which content should be shown */
  above?: Breakpoint;
  /** Screen sizes at which content should be shown */
  at?: Breakpoint[];
  /** Additional class names */
  className?: string;
}

/**
 * Show component
 * 
 * Conditionally shows content based on screen size breakpoints.
 * Can show content below, above, or at specific breakpoints.
 */
export const Show: React.FC<ShowProps> = ({
  children,
  below,
  above,
  at,
  className,
}) => {
  const getShowClasses = () => {
    const classes: string[] = [];
    
    if (below) {
      switch (below) {
        case 'sm': classes.push('hidden sm:hidden'); break;
        case 'md': classes.push('block sm:block md:hidden'); break;
        case 'lg': classes.push('block sm:block md:block lg:hidden'); break;
        case 'xl': classes.push('block sm:block md:block lg:block xl:hidden'); break;
        case '2xl': classes.push('block sm:block md:block lg:block xl:block 2xl:hidden'); break;
      }
    }
    
    if (above) {
      switch (above) {
        case 'sm': classes.push('sm:block hidden'); break;
        case 'md': classes.push('md:block hidden'); break;
        case 'lg': classes.push('lg:block hidden'); break;
        case 'xl': classes.push('xl:block hidden'); break;
        case '2xl': classes.push('2xl:block hidden'); break;
      }
    }
    
    if (at && at.length > 0) {
      const breakpointClasses = at.map(breakpoint => {
        switch (breakpoint) {
          case 'sm': return 'hidden sm:block md:hidden';
          case 'md': return 'hidden md:block lg:hidden';
          case 'lg': return 'hidden lg:block xl:hidden';
          case 'xl': return 'hidden xl:block 2xl:hidden';
          case '2xl': return 'hidden 2xl:block';
          default: return '';
        }
      });
      
      classes.push(breakpointClasses.join(' '));
    }
    
    return classes.join(' ');
  };
  
  return (
    <div className={cn(getShowClasses(), className)}>
      {children}
    </div>
  );
};

/**
 * Props for the Visible component
 */
export interface VisibleProps {
  /** Content to be conditionally visible */
  children: React.ReactNode;
  /** Whether the component should be visible */
  when: boolean;
  /** Fallback content when not visible */
  fallback?: React.ReactNode;
  /** Additional class names */
  className?: string;
}

/**
 * Visible component
 * 
 * Conditionally renders content based on a condition.
 * Can provide fallback content when the condition is not met.
 */
export const Visible: React.FC<VisibleProps> = ({
  children,
  when,
  fallback,
  className,
}) => {
  if (!when) {
    return fallback ? <>{fallback}</> : null;
  }
  
  return <div className={className}>{children}</div>;
}; 
