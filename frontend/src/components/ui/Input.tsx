import React from "react";
import { cn } from "@/utils/cn";
import { useDirectionalStyles } from "@/utils/rtl";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      error,
      label,
      helperText,
      type = "text",
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const id = props.id || generatedId;
    const { isRTL, direction, flip } = useDirectionalStyles();

    // Adjust icon positions for RTL layout
    const actualStartIcon = flip(startIcon, endIcon);
    const actualEndIcon = flip(endIcon, startIcon);

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "block text-sm font-medium text-neutral-700",
              isRTL ? "text-right" : "text-left"
            )}
            dir={direction}
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {actualStartIcon && (
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-neutral-500">
              {actualStartIcon}
            </div>
          )}
          <input
            id={id}
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1",
              error
                ? "border-red-300 bg-red-50 placeholder:text-red-400 focus:border-red-500 focus:ring-red-500"
                : "border-neutral-300 bg-white placeholder:text-neutral-400 focus:border-primary-500",
              startIcon && "ps-10",
              endIcon && "pe-10",
              isRTL ? "text-right" : "text-left",
              className
            )}
            dir={direction}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            {...props}
          />
          {actualEndIcon && (
            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none text-neutral-500">
              {actualEndIcon}
            </div>
          )}
        </div>
        {error && (
          <span
            id={`${id}-error`}
            className={cn(
              "text-sm text-red-500",
              isRTL ? "text-right block" : "text-left block"
            )}
            dir={direction}
          >
            {error}
          </span>
        )}
        {helperText && !error && (
          <span
            id={`${id}-helper`}
            className={cn(
              "text-sm text-neutral-500",
              isRTL ? "text-right block" : "text-left block"
            )}
            dir={direction}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
