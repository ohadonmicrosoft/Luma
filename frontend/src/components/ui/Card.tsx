import React from "react";
import { cn } from "@/utils/cn";
import { useDirectionalStyles } from "@/utils/rtl";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, ...props }, ref) => {
    const { direction, isRTL } = useDirectionalStyles();

    return (
      <div
        ref={ref}
        dir={direction}
        className={cn(
          "bg-white rounded-lg shadow-md overflow-hidden",
          hoverable && "transition-all duration-300 hover:shadow-lg",
          isRTL ? "rtl" : "ltr",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isRTL } = useDirectionalStyles();

  return (
    <div
      ref={ref}
      className={cn(
        "p-6 border-b border-neutral-200",
        isRTL ? "text-right" : "text-left",
        className
      )}
      {...props}
    />
  );
});
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const { isRTL } = useDirectionalStyles();

  return (
    <h3
      ref={ref}
      className={cn(
        "text-xl font-semibold text-neutral-800",
        isRTL ? "text-right" : "text-left",
        className
      )}
      {...props}
    />
  );
});
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { isRTL } = useDirectionalStyles();

  return (
    <p
      ref={ref}
      className={cn(
        "text-sm text-neutral-500",
        isRTL ? "text-right" : "text-left",
        className
      )}
      {...props}
    />
  );
});
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isRTL } = useDirectionalStyles();

  return (
    <div
      ref={ref}
      className={cn("p-6", isRTL ? "text-right" : "text-left", className)}
      {...props}
    />
  );
});
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isRTL } = useDirectionalStyles();

  return (
    <div
      ref={ref}
      className={cn("p-6 pt-0", isRTL ? "text-right" : "text-left", className)}
      {...props}
    />
  );
});
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
