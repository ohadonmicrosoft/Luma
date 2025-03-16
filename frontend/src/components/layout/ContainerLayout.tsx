/**
 * Container Layout Component
 * 
 * A flexible container layout with consistent padding and max-width settings.
 * Supports RTL layouts and can be centered or full-width.
 */

import React from "react";
import { cn } from "@/utils/classNames";
import { useDirection } from "@/contexts/DirectionContext";

export interface ContainerLayoutProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none";
  padding?: "none" | "sm" | "md" | "lg";
  centered?: boolean;
  fluid?: boolean;
  as?: React.ElementType;
}

/**
 * Container Layout component for consistent container layouts
 */
export const ContainerLayout: React.FC<ContainerLayoutProps> = ({
  children,
  className,
  maxWidth = "xl",
  padding = "md",
  centered = true,
  fluid = false,
  as: Component = "div",
}) => {
  const { direction } = useDirection();

  // Generate max width classes
  const getMaxWidthClass = () => {
    if (fluid) return "w-full";
    if (maxWidth === "none") return "";
    
    switch (maxWidth) {
      case "sm": return "max-w-screen-sm";
      case "md": return "max-w-screen-md";
      case "lg": return "max-w-screen-lg";
      case "xl": return "max-w-screen-xl";
      case "2xl": return "max-w-screen-2xl";
      case "full": return "max-w-full";
      default: return "max-w-screen-xl";
    }
  };

  // Generate padding classes
  const getPaddingClass = () => {
    switch (padding) {
      case "none": return "px-0";
      case "sm": return "px-3";
      case "md": return "px-4";
      case "lg": return "px-6";
      default: return "px-4";
    }
  };

  return (
    <Component
      dir={direction}
      className={cn(
        getMaxWidthClass(),
        getPaddingClass(),
        centered && !fluid ? "mx-auto" : "",
        className
      )}
    >
      {children}
    </Component>
  );
};

export default ContainerLayout; 
