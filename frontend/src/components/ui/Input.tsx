import React from 'react';
import { cn } from '@/utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, helperText, type = 'text', ...props }, ref) => {
    const generatedId = React.useId();
    const id = props.id || generatedId;
    
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
            error
              ? 'border-red-300 bg-red-50 placeholder:text-red-400 focus:border-red-500 focus:ring-red-500'
              : 'border-neutral-300 bg-white placeholder:text-neutral-400 focus:border-primary-500',
            className
          )}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          {...props}
        />
        {error && (
          <span id={`${id}-error`} className="text-sm text-red-500">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span id={`${id}-helper`} className="text-sm text-neutral-500">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input }; 
