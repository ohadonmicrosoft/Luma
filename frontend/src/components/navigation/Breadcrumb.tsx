/**
 * Breadcrumb Component
 * 
 * A navigation component that shows the current page location in a hierarchy.
 * Supports RTL layouts and provides accessibility features for screen readers.
 */

import React from "react";
import Link from "next/link";
import { cn } from "@/utils/classNames";
import { useDirection } from "@/contexts/DirectionContext";
import { ChevronRight, ChevronLeft, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
  showHomeIcon?: boolean;
  ariaLabel?: string;
}

/**
 * Breadcrumb component for navigation hierarchies
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className,
  separator,
  showHomeIcon = true,
  ariaLabel = "Breadcrumb navigation",
}) => {
  const { isRtl } = useDirection();
  
  // Determine the separator based on direction
  const defaultSeparator = isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />;
  const actualSeparator = separator || defaultSeparator;

  return (
    <nav aria-label={ariaLabel} className={cn("flex", className)}>
      <ol className="flex flex-wrap items-center space-x-2 rtl:space-x-reverse">
        {showHomeIcon && (
          <li className="inline-flex items-center">
            <Link 
              href="/" 
              className="inline-flex items-center text-sm text-gray-500 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
              aria-label="Home"
            >
              <Home size={16} />
            </Link>
            <span className="mx-2 text-gray-400">{actualSeparator}</span>
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="inline-flex items-center">
              {item.href && !isLast ? (
                <>
                  <Link
                    href={item.href}
                    className="inline-flex items-center text-sm text-gray-500 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
                  >
                    {item.icon && <span className="mr-1.5 rtl:mr-0 rtl:ml-1.5">{item.icon}</span>}
                    {item.label}
                  </Link>
                  <span className="mx-2 text-gray-400">{actualSeparator}</span>
                </>
              ) : (
                <span 
                  className="text-sm font-medium text-gray-800" 
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.icon && <span className="mr-1.5 rtl:mr-0 rtl:ml-1.5">{item.icon}</span>}
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb; 
