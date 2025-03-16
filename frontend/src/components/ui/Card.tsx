/**
 * Card Component
 *
 * A versatile card component that supports various styles and RTL layouts.
 * Uses design tokens for consistent styling.
 */

import React, { HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/classNames";
import { logicalPadding } from "@/styles/utils/rtl";

// Card variants using class-variance-authority
const cardVariants = cva(
  // Base styles
  "rounded-lg border bg-white shadow-sm transition-all",
  {
    variants: {
      variant: {
        default: "border-gray-200",
        outline: "border-gray-300",
        tactical: "border-tactical-200",
        outdoor: "border-outdoor-200",
        primary: "border-primary-200",
        secondary: "border-secondary-200",
      },
      elevation: {
        flat: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-2xl",
      },
      fullWidth: {
        true: "w-full",
      },
      clickable: {
        true: "cursor-pointer hover:shadow-md active:shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      elevation: "md",
      padding: "md",
      radius: "lg",
      fullWidth: false,
      clickable: false,
    },
  }
);

// Card props interface
export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: React.ElementType;
}

/**
 * Card Component
 *
 * A versatile card component with RTL support and various style options.
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      elevation,
      padding,
      radius,
      fullWidth,
      clickable,
      as: Component = "div",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          cardVariants({
            variant,
            elevation,
            padding,
            radius,
            fullWidth,
            clickable,
          }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = "Card";

// Card Header Component
interface CardHeaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, action, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-row items-start justify-between", className)}
        {...props}
      >
        <div className="space-y-1.5">
          {title && (
            <h3 className="text-lg font-semibold leading-none tracking-tight text-gray-900">
              {title}
            </h3>
          )}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          {children}
        </div>
        {action && <div className={logicalPadding("4", "0")}>{action}</div>}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

// Card Content Component
const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("pt-0", className)} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";

// Card Footer Component
const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center pt-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";

// Card Title Component
const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-gray-900",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
});

CardTitle.displayName = "CardTitle";

export { Card, CardHeader, CardContent, CardFooter, CardTitle, cardVariants };
