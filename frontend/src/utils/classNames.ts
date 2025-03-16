/**
 * Class Names Utility
 *
 * A utility for conditionally joining class names together.
 * Based on the popular clsx/classnames libraries.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges multiple class names together and optimizes Tailwind classes
 *
 * @param inputs - Class names or conditional class objects
 * @returns Merged and optimized class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
