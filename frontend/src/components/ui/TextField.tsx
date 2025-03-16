/**
 * TextField Component
 *
 * A versatile text input component that supports various styles and RTL layouts.
 * Uses design tokens for consistent styling.
 */

import React, { InputHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/classNames";
import { useDirection } from "@/contexts/DirectionContext";
import { logicalPadding } from "@/styles/utils/rtl";

// Input variants using class-variance-authority
const inputVariants = cva(
  // Base styles
  "flex w-full rounded-md border bg-white px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-gray-300 focus:border-primary-500",
        error:
          "border-error-500 focus:border-error-500 focus-visible:ring-error-500",
        success:
          "border-success-500 focus:border-success-500 focus-visible:ring-success-500",
      },
      size: {
        sm: "h-8 text-xs",
        md: "h-10",
        lg: "h-12 text-base",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      fullWidth: true,
    },
  }
);

// TextField props interface
export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  hideLabel?: boolean;
}

/**
 * TextField Component
 *
 * A versatile text input component with RTL support and various style options.
 */
const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      label,
      helperText,
      errorText,
      startIcon,
      endIcon,
      hideLabel = false,
      id,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const { isRtl } = useDirection();
    const inputId =
      id || `text-field-${Math.random().toString(36).substring(2, 9)}`;

    // Determine variant based on error state
    const computedVariant = errorText ? "error" : variant;

    // Helper/Error text ID for aria-describedby
    const helperTextId = `${inputId}-helper-text`;
    const hasHelperText = !!(helperText || errorText);

    return (
      <div
        className={cn(
          "flex flex-col space-y-2",
          fullWidth ? "w-full" : "w-auto"
        )}
      >
        {label && !hideLabel && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium text-gray-700",
              disabled && "opacity-50",
              errorText && "text-error-600"
            )}
          >
            {label}
            {required && <span className="text-error-500 ms-1">*</span>}
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <div
              className={cn(
                "absolute inset-y-0 flex items-center",
                isRtl ? "right-3" : "left-3",
                disabled && "opacity-50"
              )}
            >
              {startIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            aria-invalid={!!errorText}
            aria-describedby={hasHelperText ? helperTextId : undefined}
            required={required}
            className={cn(
              inputVariants({ variant: computedVariant, size, fullWidth }),
              startIcon &&
                (isRtl ? logicalPadding("3", "9") : logicalPadding("9", "3")),
              endIcon &&
                (isRtl ? logicalPadding("9", "3") : logicalPadding("3", "9")),
              className
            )}
            {...props}
          />

          {endIcon && (
            <div
              className={cn(
                "absolute inset-y-0 flex items-center",
                isRtl ? "left-3" : "right-3",
                disabled && "opacity-50"
              )}
            >
              {endIcon}
            </div>
          )}
        </div>

        {hasHelperText && (
          <p
            id={helperTextId}
            className={cn(
              "text-xs",
              errorText ? "text-error-600" : "text-gray-500",
              disabled && "opacity-50"
            )}
          >
            {errorText || helperText}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export { TextField, inputVariants };
