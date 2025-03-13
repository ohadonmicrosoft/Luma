import React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { useDirectionalStyles } from '@/utils/rtl';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700',
        secondary: 'bg-secondary-600 text-white hover:bg-secondary-700',
        outline: 'border border-neutral-300 bg-transparent hover:bg-neutral-100',
        ghost: 'hover:bg-neutral-100 hover:text-neutral-900',
        link: 'text-primary-600 underline-offset-4 hover:underline',
        danger: 'bg-red-600 text-white hover:bg-red-700',
      },
      size: {
        sm: 'h-9 px-3 rounded-md',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
      },
      direction: {
        rtl: 'direction-rtl',
        ltr: 'direction-ltr',
      },
      iconPosition: {
        start: 'flex-row',
        end: 'flex-row-reverse', 
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      iconPosition: 'start',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  iconPosition?: 'start' | 'end';
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, iconPosition, icon, children, ...props }, ref) => {
    const { direction, isRTL, flip } = useDirectionalStyles();
    
    // If iconPosition is specified, use it; otherwise determine based on direction
    const effectiveIconPosition = iconPosition || (isRTL ? 'end' : 'start');
    
    // Adjust icon position for RTL
    const rtlAdjustedIconPosition = flip(
      effectiveIconPosition,
      effectiveIconPosition === 'start' ? 'end' : 'start'
    );
    
    return (
      <button
        className={cn(
          buttonVariants({
            variant,
            size,
            fullWidth,
            direction: direction as any,
            iconPosition: rtlAdjustedIconPosition as any,
            className: cn(className, isRTL ? 'rtl' : 'ltr'),
          })
        )}
        dir={direction}
        ref={ref}
        {...props}
      >
        {icon && <span className={cn("inline-block", size === 'icon' ? '' : 'mr-2')}>{icon}</span>}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants }; 
