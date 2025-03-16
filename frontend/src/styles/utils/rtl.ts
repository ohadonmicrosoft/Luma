/**
 * RTL Utilities
 *
 * Helper functions for RTL/LTR styling and layout management.
 * These utilities help create bidirectional layouts that work in both RTL and LTR contexts.
 */

import { useDirection } from "@/contexts/DirectionContext";

/**
 * Conditionally applies RTL or LTR specific classes
 *
 * @param ltrClasses - Classes to apply in LTR mode
 * @param rtlClasses - Classes to apply in RTL mode
 * @returns The appropriate classes based on current direction
 */
export const directionClass = (
  ltrClasses: string,
  rtlClasses: string
): string => {
  // This is used during SSR when the direction context isn't available
  if (typeof document !== "undefined") {
    const dir = document.documentElement.dir;
    return dir === "rtl" ? rtlClasses : ltrClasses;
  }

  // Default to LTR for SSR
  return ltrClasses;
};

/**
 * React hook for direction-aware class application
 *
 * @param ltrClasses - Classes to apply in LTR mode
 * @param rtlClasses - Classes to apply in RTL mode
 * @returns The appropriate classes based on current direction
 */
export const useDirectionClass = (
  ltrClasses: string,
  rtlClasses: string
): string => {
  const { isRtl } = useDirection();
  return isRtl ? rtlClasses : ltrClasses;
};

/**
 * Applies logical margin classes based on direction
 *
 * @param start - Margin for the start (left in LTR, right in RTL)
 * @param end - Margin for the end (right in LTR, left in RTL)
 * @returns Tailwind margin classes that work in both directions
 */
export const logicalMargin = (start?: string, end?: string): string => {
  const classes: string[] = [];

  if (start) {
    classes.push(`ms-${start}`);
  }

  if (end) {
    classes.push(`me-${end}`);
  }

  return classes.join(" ");
};

/**
 * Applies logical padding classes based on direction
 *
 * @param start - Padding for the start (left in LTR, right in RTL)
 * @param end - Padding for the end (right in LTR, left in RTL)
 * @returns Tailwind padding classes that work in both directions
 */
export const logicalPadding = (start?: string, end?: string): string => {
  const classes: string[] = [];

  if (start) {
    classes.push(`ps-${start}`);
  }

  if (end) {
    classes.push(`pe-${end}`);
  }

  return classes.join(" ");
};

/**
 * Creates a logical border (start/end) based on direction
 *
 * @param startWidth - Border width for start side
 * @param endWidth - Border width for end side
 * @param color - Border color
 * @returns Tailwind border classes that work in both directions
 */
export const logicalBorder = (
  startWidth?: string,
  endWidth?: string,
  color: string = "gray-200"
): string => {
  const classes: string[] = [];

  if (startWidth) {
    classes.push(`border-s-${startWidth} border-s-${color}`);
  }

  if (endWidth) {
    classes.push(`border-e-${endWidth} border-e-${color}`);
  }

  return classes.join(" ");
};

/**
 * Applies logical positioning classes based on direction
 *
 * @param start - Position from start (left in LTR, right in RTL)
 * @param end - Position from end (right in LTR, left in RTL)
 * @returns Tailwind positioning classes that work in both directions
 */
export const logicalPosition = (start?: string, end?: string): string => {
  const classes: string[] = [];

  if (start) {
    classes.push(`inset-inline-start-${start}`);
  }

  if (end) {
    classes.push(`inset-inline-end-${end}`);
  }

  return classes.join(" ");
};

/**
 * Applies logical text alignment based on direction
 *
 * @param alignment - 'start', 'end', or 'center'
 * @returns Tailwind text alignment class that works in both directions
 */
export const logicalTextAlign = (
  alignment: "start" | "end" | "center"
): string => {
  if (alignment === "center") return "text-center";
  return alignment === "start" ? "text-start" : "text-end";
};

/**
 * Reverses a value based on the current direction
 * Useful for animations, transforms, etc.
 *
 * @param value - The value to potentially reverse
 * @returns The original value in LTR mode, or the reversed value in RTL mode
 */
export const directionAwareValue = (value: number): number => {
  // This is used during SSR when the direction context isn't available
  if (typeof document !== "undefined") {
    const dir = document.documentElement.dir;
    return dir === "rtl" ? -value : value;
  }

  // Default to LTR for SSR
  return value;
};

/**
 * React hook for direction-aware values
 *
 * @param value - The value to potentially reverse
 * @returns The original value in LTR mode, or the reversed value in RTL mode
 */
export const useDirectionAwareValue = (value: number): number => {
  const { isRtl } = useDirection();
  return isRtl ? -value : value;
};
