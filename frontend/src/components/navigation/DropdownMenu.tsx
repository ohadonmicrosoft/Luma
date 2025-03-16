/**
 * Dropdown Menu Component
 * 
 * A navigation component for displaying a menu of options in a dropdown.
 * Supports RTL layouts and provides accessibility features following WAI-ARIA guidelines.
 */

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/utils/classNames";
import { useDirection } from "@/contexts/DirectionContext";
import { ChevronDown } from "lucide-react";

export interface DropdownMenuItem {
  id: string;
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  divider?: boolean;
  variant?: "default" | "danger" | "success";
}

export interface DropdownMenuGroup {
  id: string;
  label: string;
  items: DropdownMenuItem[];
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: (DropdownMenuItem | DropdownMenuGroup)[];
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  align?: "start" | "center" | "end";
  width?: "auto" | "sm" | "md" | "lg" | "full";
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  renderItem?: (item: DropdownMenuItem) => React.ReactNode;
  closeOnClick?: boolean;
  showArrow?: boolean;
}

/**
 * Dropdown Menu component for displaying contextual options
 */
export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  className,
  triggerClassName,
  menuClassName,
  align = "start",
  width = "md",
  isOpen: controlledIsOpen,
  onOpenChange,
  renderItem,
  closeOnClick = true,
  showArrow = true,
}) => {
  const [isOpen, setIsOpen] = useState(controlledIsOpen || false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { direction } = useDirection();
  const isRtl = direction === "rtl";

  // Handle controlled state
  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen);
    }
  }, [controlledIsOpen]);

  const handleOpenChange = (open: boolean) => {
    if (controlledIsOpen === undefined) {
      setIsOpen(open);
    }
    onOpenChange?.(open);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleOpenChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        handleOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Get width class for dropdown
  const getWidthClass = () => {
    switch (width) {
      case "sm": return "w-40";
      case "md": return "w-56";
      case "lg": return "w-72";
      case "full": return "w-full";
      default: return "w-auto";
    }
  };

  // Get alignment class for dropdown
  const getAlignClass = () => {
    // When in RTL mode, swap alignment
    const effectiveAlign = isRtl ? 
      (align === "start" ? "end" : align === "end" ? "start" : align) : 
      align;

    switch (effectiveAlign) {
      case "center": return "left-1/2 -translate-x-1/2";
      case "end": return "right-0";
      default: return "left-0"; // start
    }
  };

  // Handle item click
  const handleItemClick = (item: DropdownMenuItem) => {
    if (item.disabled) return;
    
    item.onClick?.();
    
    if (closeOnClick) {
      handleOpenChange(false);
    }
  };

  // Render dropdown items
  const renderDropdownItem = (item: DropdownMenuItem, index: number | string) => {
    // For dividers
    if (item.divider) {
      return <div key={`divider-${index}`} className="h-px my-1 bg-gray-200" />;
    }

    const itemContent = renderItem ? (
      renderItem(item)
    ) : (
      <>
        {item.icon && (
          <span className="mr-2 rtl:mr-0 rtl:ml-2">{item.icon}</span>
        )}
        {item.label}
      </>
    );

    // Determine variant classes
    const variantClasses = () => {
      switch (item.variant) {
        case "danger": return "text-red-600 hover:bg-red-50 focus:bg-red-50";
        case "success": return "text-green-600 hover:bg-green-50 focus:bg-green-50";
        default: return "text-gray-700 hover:bg-gray-100 focus:bg-gray-100";
      }
    };

    // If there's an href, render as link
    if (item.href) {
      return (
        <a
          key={item.id}
          href={item.disabled ? undefined : item.href}
          className={cn(
            "flex items-center px-4 py-2 text-sm focus:outline-none",
            variantClasses(),
            item.disabled && "opacity-50 cursor-not-allowed"
          )}
          tabIndex={item.disabled ? -1 : 0}
          onClick={(e) => {
            if (item.disabled) {
              e.preventDefault();
              return;
            }
            if (closeOnClick) {
              handleOpenChange(false);
            }
          }}
        >
          {itemContent}
        </a>
      );
    }

    // Otherwise render as button
    return (
      <button
        key={item.id}
        className={cn(
          "flex w-full items-center px-4 py-2 text-sm text-left rtl:text-right focus:outline-none",
          variantClasses(),
          item.disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => handleItemClick(item)}
        disabled={item.disabled}
        tabIndex={item.disabled ? -1 : 0}
        role="menuitem"
      >
        {itemContent}
      </button>
    );
  };

  // Check if an item is a group
  const isGroup = (item: any): item is DropdownMenuGroup => {
    return 'items' in item;
  };

  return (
    <div className={cn("relative inline-block text-left", className)} ref={dropdownRef} dir={direction}>
      {/* Trigger button */}
      <div>
        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-500",
            triggerClassName
          )}
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => handleOpenChange(!isOpen)}
        >
          {trigger}
          {showArrow && (
            <ChevronDown 
              className={cn(
                "ml-2 h-4 w-4 transition-transform duration-200 rtl:ml-0 rtl:mr-2",
                isOpen && "transform rotate-180"
              )} 
            />
          )}
        </button>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className={cn(
            "absolute z-10 mt-2 origin-top-right rtl:origin-top-left",
            getWidthClass(),
            getAlignClass(),
            "rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
            menuClassName
          )}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {items.map((item, index) => {
              // If it's a group, render group label and items
              if (isGroup(item)) {
                return (
                  <div key={item.id} className="px-2 py-1">
                    <p className="text-xs font-medium text-gray-500 px-2 mb-1">{item.label}</p>
                    {item.items.map((subItem, subIndex) => renderDropdownItem(subItem, `${index}-${subIndex}`))}
                  </div>
                );
              }
              
              // Otherwise render a regular item
              return renderDropdownItem(item, index);
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu; 
