/**
 * RTL utilities for managing direction-aware styling
 */

import { useLayout } from '@/contexts/LayoutContext';

/**
 * Create a direction-aware value based on the current layout direction
 * @param ltrValue - Value for left-to-right layout
 * @param rtlValue - Value for right-to-left layout
 * @returns The appropriate value based on the current direction
 */
export function useDirectionalValue<T>(ltrValue: T, rtlValue: T): T {
  const { isRTL } = useLayout();
  return isRTL ? rtlValue : ltrValue;
}

/**
 * Direction-aware margin
 * @param start - Margin at the start (left in LTR, right in RTL)
 * @param end - Margin at the end (right in LTR, left in RTL)
 * @returns CSS classes for margin
 */
export function useMarginDirectional(start: number, end: number): string {
  const { isRTL } = useLayout();
  
  if (isRTL) {
    return `mr-${start} ml-${end}`;
  }
  
  return `ml-${start} mr-${end}`;
}

/**
 * Direction-aware padding
 * @param start - Padding at the start (left in LTR, right in RTL)
 * @param end - Padding at the end (right in LTR, left in RTL)
 * @returns CSS classes for padding
 */
export function usePaddingDirectional(start: number, end: number): string {
  const { isRTL } = useLayout();
  
  if (isRTL) {
    return `pr-${start} pl-${end}`;
  }
  
  return `pl-${start} pr-${end}`;
}

/**
 * Create direction-aware class names
 * @param base - Base class name
 * @param ltrClasses - Classes to add in LTR mode
 * @param rtlClasses - Classes to add in RTL mode
 * @returns Combined class string
 */
export function useDirectionalClasses(
  base: string, 
  ltrClasses: string, 
  rtlClasses: string
): string {
  const { isRTL } = useLayout();
  
  return `${base} ${isRTL ? rtlClasses : ltrClasses}`;
}

/**
 * Map of CSS logical properties to their physical equivalents based on direction
 */
export const logicalToPhysical = {
  marginStart: 'marginLeft',
  marginEnd: 'marginRight',
  paddingStart: 'paddingLeft',
  paddingEnd: 'paddingRight',
  borderStart: 'borderLeft',
  borderEnd: 'borderRight',
  insetStart: 'left',
  insetEnd: 'right',
};

/**
 * Get the physical property name based on the logical property and direction
 * @param logicalProp - Logical property name
 * @param isRTL - Whether the direction is RTL
 * @returns Physical property name
 */
export function getPhysicalProperty(logicalProp: string, isRTL: boolean): string {
  if (!isRTL) {
    return logicalToPhysical[logicalProp as keyof typeof logicalToPhysical] || logicalProp;
  }
  
  // Swap left/right for RTL
  switch (logicalProp) {
    case 'marginStart': return 'marginRight';
    case 'marginEnd': return 'marginLeft';
    case 'paddingStart': return 'paddingRight';
    case 'paddingEnd': return 'paddingLeft';
    case 'borderStart': return 'borderRight';
    case 'borderEnd': return 'borderLeft';
    case 'insetStart': return 'right';
    case 'insetEnd': return 'left';
    default: return logicalProp;
  }
} 
