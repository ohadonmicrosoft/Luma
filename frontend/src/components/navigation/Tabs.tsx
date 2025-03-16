/**
 * Tabs Component
 * 
 * A navigation component for switching between different content sections.
 * Supports RTL layouts and provides accessibility features following WAI-ARIA guidelines.
 */

import React, { useState, useEffect } from "react";
import { cn } from "@/utils/classNames";
import { useDirection } from "@/contexts/DirectionContext";

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  orientation?: "horizontal" | "vertical";
  variant?: "line" | "pill" | "enclosed" | "unstyled";
  size?: "sm" | "md" | "lg";
  className?: string;
  tabListClassName?: string;
  tabPanelClassName?: string;
  onChange?: (tabId: string) => void;
  fullWidth?: boolean;
  ariaLabel?: string;
}

/**
 * Tabs component for switching between content sections
 */
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabId,
  orientation = "horizontal",
  variant = "line",
  size = "md",
  className,
  tabListClassName,
  tabPanelClassName,
  onChange,
  fullWidth = false,
  ariaLabel = "Tabs",
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(defaultTabId || (tabs[0]?.id || ""));
  const { direction } = useDirection();

  useEffect(() => {
    if (defaultTabId) {
      setActiveTabId(defaultTabId);
    }
  }, [defaultTabId]);

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
    onChange?.(tabId);
  };

  // Get size-based classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-sm py-2 px-3";
      case "lg":
        return "text-lg py-4 px-6";
      default:
        return "text-base py-3 px-4";
    }
  };

  // Get variant-based classes for tab list
  const getTabListClasses = () => {
    const baseClasses = orientation === "vertical" 
      ? "flex-col" 
      : "flex-row";
    
    switch (variant) {
      case "pill":
        return cn(baseClasses, "bg-gray-100 p-1 rounded-lg gap-1");
      case "enclosed":
        return cn(baseClasses, "border-b border-gray-200");
      case "unstyled":
        return baseClasses;
      default: // line
        return cn(baseClasses, "border-b border-gray-200");
    }
  };

  // Get variant-based classes for individual tabs
  const getTabClasses = (isActive: boolean, isDisabled: boolean) => {
    const baseClasses = cn(
      getSizeClasses(),
      "font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 transition-colors",
      isDisabled && "opacity-50 cursor-not-allowed",
      fullWidth && orientation === "horizontal" && "flex-1 text-center",
    );
    
    switch (variant) {
      case "pill":
        return cn(
          baseClasses,
          "rounded-md",
          isActive 
            ? "bg-white text-primary-700 shadow-sm" 
            : "text-gray-600 hover:text-primary-600"
        );
      case "enclosed":
        return cn(
          baseClasses,
          "border-t border-l border-r rounded-t-md -mb-px",
          isActive 
            ? "text-primary-700 border-gray-200 border-b-white bg-white" 
            : "text-gray-600 hover:text-primary-600 bg-gray-50 border-transparent",
        );
      case "unstyled":
        return cn(
          baseClasses,
          isActive 
            ? "text-primary-700" 
            : "text-gray-600 hover:text-primary-600"
        );
      default: // line
        return cn(
          baseClasses,
          isActive 
            ? "text-primary-700 border-b-2 border-primary-500" 
            : "text-gray-600 hover:text-primary-600 border-b-2 border-transparent"
        );
    }
  };

  return (
    <div 
      className={cn(
        "w-full",
        orientation === "vertical" && "flex gap-4",
        className
      )}
      dir={direction}
    >
      {/* Tab navigation */}
      <div
        className={cn(
          "flex",
          getTabListClasses(),
          orientation === "vertical" && "flex-shrink-0",
          tabListClassName
        )}
        role="tablist"
        aria-orientation={orientation}
        aria-label={ariaLabel}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeTabId === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={activeTabId === tab.id ? 0 : -1}
            disabled={tab.disabled}
            className={getTabClasses(activeTabId === tab.id, !!tab.disabled)}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
          >
            {tab.icon && (
              <span className="inline-block mr-2 rtl:mr-0 rtl:ml-2">
                {tab.icon}
              </span>
            )}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div className={cn("flex-1 mt-4", orientation === "vertical" && "mt-0", tabPanelClassName)}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`tabpanel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            tabIndex={0}
            hidden={activeTabId !== tab.id}
            className={cn(activeTabId === tab.id ? "block" : "hidden")}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs; 
