import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const tagVariants = cva(
  'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary hover:bg-primary/20',
        secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20',
        destructive: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
        success: 'bg-green-100 text-green-800 hover:bg-green-200',
        warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        info: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        className={cn(tagVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Tag.displayName = 'Tag'; 
