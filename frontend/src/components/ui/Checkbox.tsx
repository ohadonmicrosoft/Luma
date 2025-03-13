import * as React from "react";
import { cn } from "@/utils/cn";
import { useDirectionalStyles } from "@/utils/rtl";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, label, description, ...props }, ref) => {
    const { isRTL, direction } = useDirectionalStyles();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onCheckedChange) {
        onCheckedChange(e.target.checked);
      }
    };
    
    return (
      <div className={cn("flex items-center", isRTL ? "flex-row-reverse" : "flex-row")}>
        <input
          type="checkbox"
          className={cn(
            "h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500",
            className
          )}
          checked={checked}
          onChange={handleChange}
          dir={direction}
          ref={ref}
          {...props}
        />
        {(label || description) && (
          <div className={cn("flex flex-col", isRTL ? "mr-2 text-right" : "ml-2 text-left")}>
            {label && (
              <span className="text-sm font-medium text-neutral-700">
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-neutral-500">
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox"; 
