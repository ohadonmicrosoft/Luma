/**
 * Button Component
 *
 * A versatile button component that supports various styles, sizes, and RTL layouts.
 * Uses design tokens for consistent styling.
 */

import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/classNames";
import { logicalPadding } from "@/styles/utils/rtl";
import { useDirection } from "@/contexts/DirectionContext";

// Button variants using class-variance-authority
const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800",
        secondary:
          "bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800",
        outline:
          "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
        tactical:
          "bg-tactical-600 text-white hover:bg-tactical-700 active:bg-tactical-800",
        outdoor:
          "bg-outdoor-600 text-white hover:bg-outdoor-700 active:bg-outdoor-800",
        danger:
          "bg-error-600 text-white hover:bg-error-700 active:bg-error-800",
        success:
          "bg-success-600 text-white hover:bg-success-700 active:bg-success-800",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
      },
      fullWidth: {
        true: "w-full",
      },
      iconPosition: {
        left: "flex-row",
        right: "flex-row-reverse",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      iconPosition: "left",
    },
  }
);

// Button props interface
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
}

/**
 * Button Component
 *
 * A versatile button component with RTL support and various style options.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      iconPosition: iconPositionProp,
      icon,
      children,
      disabled,
      loading,
      loadingText,
      ...props
    },
    ref
  ) => {
    const { isRtl } = useDirection();

    // Adjust icon position based on RTL
    const iconPosition =
      iconPositionProp === "left"
        ? isRtl
          ? "right"
          : "left"
        : isRtl
        ? "left"
        : "right";

    // Loading spinner
    const loadingSpinner = (
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    // Icon spacing class based on position and RTL
    const getIconSpacingClass = () => {
      if (!icon && !loading) return "";

      if (iconPosition === "left") {
        return logicalPadding("0", "2"); // Padding end (right in LTR, left in RTL)
      } else {
        return logicalPadding("2", "0"); // Padding start (left in LTR, right in RTL)
      }
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          buttonVariants({
            variant,
            size,
            fullWidth,
            iconPosition,
          }),
          className
        )}
        {...props}
      >
        {loading && loadingSpinner}

        {!loading && icon && (
          <span className={getIconSpacingClass()}>{icon}</span>
        )}

        {loading && loadingText ? loadingText : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
