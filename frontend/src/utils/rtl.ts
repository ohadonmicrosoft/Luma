/**
 * RTL/LTR utility functions for managing directional styling
 */

import { useLayout } from "@/contexts/LayoutContext";
import { useCallback } from "react";

/**
 * CSS logical properties mapping (physical to logical)
 */
export const LOGICAL_PROPERTIES: Record<
  string,
  string | Record<string, string>
> = {
  // Margins
  marginLeft: "marginInlineStart",
  marginRight: "marginInlineEnd",

  // Paddings
  paddingLeft: "paddingInlineStart",
  paddingRight: "paddingInlineEnd",

  // Positions
  left: "inset-inline-start",
  right: "inset-inline-end",

  // Borders
  borderLeft: "borderInlineStart",
  borderRight: "borderInlineEnd",
  borderTopLeft: "borderStartStart",
  borderTopRight: "borderStartEnd",
  borderBottomLeft: "borderEndStart",
  borderBottomRight: "borderEndEnd",

  // Text alignment
  textAlign: {
    left: "start",
    right: "end",
  },

  // Float
  float: {
    left: "inline-start",
    right: "inline-end",
  },
};

/**
 * Get a logical CSS property based on direction
 * @param property - The physical CSS property
 * @returns The logical CSS property
 */
export function getLogicalProperty(property: string): string {
  const value = LOGICAL_PROPERTIES[property];
  return typeof value === "string" ? value : property;
}

/**
 * Get a logical CSS value based on direction
 * @param property - The CSS property
 * @param value - The physical CSS value
 * @returns The logical CSS value
 */
export function getLogicalValue(property: string, value: string): string {
  const valueMap = LOGICAL_PROPERTIES[property];

  if (typeof valueMap === "object" && valueMap !== null) {
    return valueMap[value] || value;
  }

  return value;
}

/**
 * Custom hook for managing directional styles
 * Provides utilities for RTL-aware styling and values
 * @returns An object with RTL utilities and helpers
 */
export function useDirectionalStyles() {
  const { isRTL, direction } = useLayout();

  /**
   * Get a style object with logical properties
   * @param styles - The physical style object
   * @returns The logical style object
   */
  const getLogicalStyles = (
    styles: Record<string, any>
  ): Record<string, any> => {
    const logicalStyles: Record<string, any> = {};

    Object.entries(styles).forEach(([property, value]) => {
      // Handle property mappings
      const propValue = LOGICAL_PROPERTIES[property];
      const logicalProperty =
        typeof propValue === "string" ? propValue : property;

      // Handle value mappings for certain properties
      const valueMap = LOGICAL_PROPERTIES[property];
      let logicalValue = value;

      if (
        typeof valueMap === "object" &&
        valueMap !== null &&
        typeof value === "string"
      ) {
        logicalValue = valueMap[value] || value;
      }

      logicalStyles[logicalProperty] = logicalValue;
    });

    return logicalStyles;
  };

  /**
   * Get a class name with directional suffix
   * @param baseClassName - The base class name
   * @returns The directional class name
   */
  const getDirectionalClassName = (baseClassName: string): string => {
    return `${baseClassName}-${direction}`;
  };

  /**
   * Flip a value based on direction
   * @param ltrValue - The value for LTR
   * @param rtlValue - The value for RTL
   * @returns The appropriate value based on direction
   */
  const flip = <T>(ltrValue: T, rtlValue: T): T => {
    return isRTL ? rtlValue : ltrValue;
  };

  /**
   * Get a margin or padding CSS object with logical properties
   * @param top - Top value
   * @param right - Right value
   * @param bottom - Bottom value
   * @param left - Left value
   * @returns The logical spacing CSS object
   */
  const getSpacing = (
    top?: string | number,
    right?: string | number,
    bottom?: string | number,
    left?: string | number
  ): Record<string, string | number | undefined> => {
    return {
      marginTop: top,
      marginInlineEnd: isRTL ? left : right,
      marginBottom: bottom,
      marginInlineStart: isRTL ? right : left,
    };
  };

  /**
   * Swap values for RTL
   * @param value - The value to potentially swap
   * @returns The swapped value if RTL, original if LTR
   */
  const swap = <T>(value: [T, T]): T => {
    return isRTL ? value[1] : value[0];
  };

  /**
   * Apply RTL transform if needed
   * @param transformFn - The transform function to apply
   * @param value - The value to transform
   * @returns The transformed value if RTL, original if LTR
   */
  const transform = <T>(transformFn: (value: T) => T, value: T): T => {
    return isRTL ? transformFn(value) : value;
  };

  return {
    isRTL,
    direction,
    getLogicalStyles,
    getDirectionalClassName,
    flip,
    getSpacing,
    swap,
    transform,
  };
}

/**
 * Custom hook to help with RTL-aware styles
 * @returns Utility functions for RTL-aware styling
 */
export const useRtlUtils = () => {
  const { isRTL } = useLayout();

  /**
   * Returns the appropriate class based on the direction
   * @param ltrClass - Class to use in LTR mode
   * @param rtlClass - Class to use in RTL mode
   * @returns The appropriate class
   */
  const getDirectionalClass = useCallback(
    (ltrClass: string, rtlClass: string): string => {
      return isRTL ? rtlClass : ltrClass;
    },
    [isRTL]
  );

  /**
   * Creates a conditional class string for RTL/LTR scenarios
   * @param baseClasses - Classes to always apply
   * @param ltrClasses - Classes to apply only in LTR mode
   * @param rtlClasses - Classes to apply only in RTL mode
   * @returns Combined class string
   */
  const cx = useCallback(
    (baseClasses = "", ltrClasses = "", rtlClasses = ""): string => {
      const directionClasses = isRTL ? rtlClasses : ltrClasses;
      return `${baseClasses} ${directionClasses}`.trim();
    },
    [isRTL]
  );

  /**
   * Maps logical CSS properties to physical ones
   * @param property - The logical CSS property
   * @returns The physical CSS property
   */
  const mapLogicalToPhysical = useCallback(
    (property: string): string => {
      const mappings: Record<string, Record<string, string>> = {
        ltr: {
          "margin-inline-start": "margin-left",
          "margin-inline-end": "margin-right",
          "padding-inline-start": "padding-left",
          "padding-inline-end": "padding-right",
          "border-inline-start": "border-left",
          "border-inline-end": "border-right",
          "inset-inline-start": "left",
          "inset-inline-end": "right",
        },
        rtl: {
          "margin-inline-start": "margin-right",
          "margin-inline-end": "margin-left",
          "padding-inline-start": "padding-right",
          "padding-inline-end": "padding-left",
          "border-inline-start": "border-right",
          "border-inline-end": "border-left",
          "inset-inline-start": "right",
          "inset-inline-end": "left",
        },
      };

      const direction = isRTL ? "rtl" : "ltr";
      return mappings[direction][property] || property;
    },
    [isRTL]
  );

  return {
    isRTL,
    getDirectionalClass,
    cx,
    mapLogicalToPhysical,
  };
};

/**
 * Helper function for creating RTL-aware styles without using the hook
 * @param locale - Current locale string
 * @returns Whether the current locale is RTL
 */
export const isRtlLocale = (locale: string | undefined): boolean => {
  const rtlLocales = ["he", "ar", "fa", "ur"];
  return rtlLocales.some((rtlLocale) => locale?.startsWith(rtlLocale));
};
