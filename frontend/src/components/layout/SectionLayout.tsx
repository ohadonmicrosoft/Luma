/**
 * Section Layout Component
 * 
 * A reusable layout component for page sections with consistent spacing and container settings.
 * Supports RTL layouts and various background styles.
 */

import React from "react";
import { cn } from "@/utils/classNames";
import { useDirection } from "@/contexts/DirectionContext";

export interface SectionLayoutProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
  background?: "white" | "light" | "primary" | "dark" | "tactical" | "outdoor" | "transparent";
  paddingY?: "none" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  divider?: boolean;
  dividerPosition?: "top" | "bottom" | "both";
}

/**
 * Section Layout component for consistent page sections
 */
export const SectionLayout: React.FC<SectionLayoutProps> = ({
  children,
  className,
  id,
  as: Component = "section",
  background = "white",
  paddingY = "lg",
  fullWidth = false,
  maxWidth = "xl",
  divider = false,
  dividerPosition = "bottom",
  ...props
}) => {
  const { direction } = useDirection();

  // Generate background classes
  const getBgColor = () => {
    switch (background) {
      case "white": return "bg-white";
      case "light": return "bg-gray-50";
      case "primary": return "bg-primary-50";
      case "dark": return "bg-gray-900 text-white";
      case "tactical": return "bg-tactical-50";
      case "outdoor": return "bg-outdoor-50";
      case "transparent": return "bg-transparent";
      default: return "bg-white";
    }
  };

  // Generate padding classes
  const getPaddingY = () => {
    switch (paddingY) {
      case "none": return "";
      case "sm": return "py-4";
      case "md": return "py-8";
      case "lg": return "py-12";
      case "xl": return "py-16";
      default: return "py-12";
    }
  };

  // Generate max width classes
  const getMaxWidth = () => {
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

  // Generate divider classes
  const getDividerClasses = () => {
    if (!divider) return "";
    
    const baseClass = "border-gray-200";
    
    switch (dividerPosition) {
      case "top": return `border-t ${baseClass}`;
      case "bottom": return `border-b ${baseClass}`;
      case "both": return `border-t border-b ${baseClass}`;
      default: return `border-b ${baseClass}`;
    }
  };

  return (
    <Component
      id={id}
      dir={direction}
      className={cn(
        getBgColor(),
        getPaddingY(),
        getDividerClasses(),
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "mx-auto px-4",
          fullWidth ? "w-full" : getMaxWidth()
        )}
      >
        {children}
      </div>
    </Component>
  );
};

export default SectionLayout; 
