/**
 * Grid Layout Component
 * 
 * A flexible grid layout component with support for responsive columns and RTL layouts.
 * Uses CSS Grid for modern layout capabilities.
 */

import React from "react";
import { cn } from "@/utils/classNames";
import { useDirection } from "@/contexts/DirectionContext";

export interface GridLayoutProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  rowGap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  columnGap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  alignItems?: "start" | "center" | "end" | "stretch" | "baseline";
  justifyItems?: "start" | "center" | "end" | "stretch";
}

/**
 * Grid Layout component for flexible grid-based layouts
 */
export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  className,
  columns = { xs: 1, sm: 2, md: 3, lg: 3, xl: 4 },
  gap = "md",
  rowGap,
  columnGap,
  alignItems = "stretch",
  justifyItems = "stretch",
}) => {
  const { direction } = useDirection();

  // Generate grid template columns classes
  const getGridCols = () => {
    const gridClasses = [];

    if (columns.xs !== undefined) {
      gridClasses.push(`grid-cols-${columns.xs}`);
    }

    if (columns.sm !== undefined) {
      gridClasses.push(`sm:grid-cols-${columns.sm}`);
    }

    if (columns.md !== undefined) {
      gridClasses.push(`md:grid-cols-${columns.md}`);
    }

    if (columns.lg !== undefined) {
      gridClasses.push(`lg:grid-cols-${columns.lg}`);
    }

    if (columns.xl !== undefined) {
      gridClasses.push(`xl:grid-cols-${columns.xl}`);
    }

    return gridClasses.join(" ");
  };

  // Generate gap classes
  const getGapClass = () => {
    if (rowGap || columnGap) return "";
    
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

  // Generate row gap classes
  const getRowGapClass = () => {
    if (!rowGap) return "";
    
    switch (rowGap) {
      case "none": return "row-gap-0";
      case "xs": return "row-gap-2";
      case "sm": return "row-gap-4";
      case "md": return "row-gap-6";
      case "lg": return "row-gap-8";
      case "xl": return "row-gap-12";
      default: return "";
    }
  };

  // Generate column gap classes
  const getColumnGapClass = () => {
    if (!columnGap) return "";
    
    switch (columnGap) {
      case "none": return "col-gap-0";
      case "xs": return "col-gap-2";
      case "sm": return "col-gap-4";
      case "md": return "col-gap-6";
      case "lg": return "col-gap-8";
      case "xl": return "col-gap-12";
      default: return "";
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
      default: return "items-stretch";
    }
  };

  // Generate justify classes
  const getJustifyClass = () => {
    switch (justifyItems) {
      case "start": return "justify-items-start";
      case "center": return "justify-items-center";
      case "end": return "justify-items-end";
      case "stretch": return "justify-items-stretch";
      default: return "justify-items-stretch";
    }
  };

  return (
    <div
      dir={direction}
      className={cn(
        "grid",
        getGridCols(),
        getGapClass(),
        getRowGapClass(),
        getColumnGapClass(),
        getAlignClass(),
        getJustifyClass(),
        className
      )}
    >
      {children}
    </div>
  );
};

export default GridLayout; 
