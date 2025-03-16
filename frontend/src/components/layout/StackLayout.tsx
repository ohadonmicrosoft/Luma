/**
 * Stack Layout Component
 * 
 * A layout component that stacks children either vertically or horizontally with consistent spacing.
 * Supports responsive spacing adjustments and RTL layouts.
 */

import React from "react";
import { cn } from "@/utils/classNames";
import { useDirection } from "@/contexts/DirectionContext";

export interface StackLayoutProps {
  children: React.ReactNode;
  className?: string;
  direction?: "horizontal" | "vertical";
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  alignItems?: "start" | "center" | "end" | "stretch" | "baseline";
  justifyContent?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  dividers?: boolean;
  dividerColor?: "gray" | "primary" | "tactical" | "outdoor";
  reverse?: boolean;
  responsive?: boolean;
}

/**
 * Stack Layout component for stacking content with consistent spacing
 */
export const StackLayout: React.FC<StackLayoutProps> = ({
  children,
  className,
  direction = "vertical",
  gap = "md",
  alignItems = "start",
  justifyContent = "start",
  wrap = false,
  dividers = false,
  dividerColor = "gray",
  reverse = false,
  responsive = false,
}) => {
  const { direction: textDirection, isRtl } = useDirection();

  // Determine the flex direction based on stack direction and RTL
  const getFlexDirection = () => {
    if (direction === "vertical") {
      return reverse ? "flex-col-reverse" : "flex-col";
    }
    
    // For horizontal direction, consider RTL if reverse is not explicitly set
    if (isRtl && !reverse) {
      return "flex-row-reverse";
    }
    
    return reverse ? "flex-row-reverse" : "flex-row";
  };

  // Generate responsive class if needed
  const getResponsiveClass = () => {
    if (!responsive || direction === "vertical") return "";
    return "flex-col md:flex-row";
  };

  // Generate gap classes
  const getGapClass = () => {
    switch (gap) {
      case "none": return "gap-0";
      case "xs": return "gap-2";
      case "sm": return "gap-4";
      case "md": return "gap-6";
      case "lg": return "gap-8";
      case "xl": return "gap-12";
      default: return "gap-6";
    }
  };

  // Generate alignment classes
  const getAlignClass = () => {
    switch (alignItems) {
      case "start": return "items-start";
      case "center": return "items-center";
      case "end": return "items-end";
      case "stretch": return "items-stretch";
      case "baseline": return "items-baseline";
      default: return "items-start";
    }
  };

  // Generate justify content classes
  const getJustifyClass = () => {
    switch (justifyContent) {
      case "start": return "justify-start";
      case "center": return "justify-center";
      case "end": return "justify-end";
      case "between": return "justify-between";
      case "around": return "justify-around";
      case "evenly": return "justify-evenly";
      default: return "justify-start";
    }
  };

  // Generate wrap class
  const getWrapClass = () => {
    return wrap ? "flex-wrap" : "flex-nowrap";
  };

  // Get divider classes
  const getDividerClass = () => {
    if (!dividers) return "";

    const color = (() => {
      switch (dividerColor) {
        case "primary": return "divide-primary-200";
        case "tactical": return "divide-tactical-200";
        case "outdoor": return "divide-outdoor-200";
        default: return "divide-gray-200";
      }
    })();

    return `divide-${direction === "vertical" ? "y" : "x"} ${color}`;
  };

  return (
    <div
      dir={textDirection}
      className={cn(
        "flex",
        getResponsiveClass() || getFlexDirection(),
        getGapClass(),
        getAlignClass(),
        getJustifyClass(),
        getWrapClass(),
        getDividerClass(),
        className
      )}
    >
      {children}
    </div>
  );
};

export default StackLayout; 
