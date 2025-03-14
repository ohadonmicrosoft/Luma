import React from "react";
import { cn } from "@/utils/cn";
import { useDirectionalStyles } from "@/utils/rtl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { LocalizedContent } from "@/components/localization/LocalizedContent";
import { LocalizedString } from "@/types/product";
import { useNumberFormatter } from "@/utils/number";

export interface Specification {
  id: string;
  name: LocalizedString;
  value: string | number;
  unit?: string;
  category?: string;
  isHighlight?: boolean;
}

export interface SpecificationCategory {
  id: string;
  name: LocalizedString;
  specs: Specification[];
}

export interface TechnicalSpecsProps {
  specifications: Specification[] | SpecificationCategory[];
  showHighlightsOnly?: boolean;
  onToggleHighlights?: (showHighlightsOnly: boolean) => void;
  canCompare?: boolean;
  isComparing?: boolean;
  onCompareToggle?: () => void;
  layout?: "grid" | "list";
  className?: string;
}

export const SpecificationItem: React.FC<{
  spec: Specification;
  className?: string;
}> = ({ spec, className }) => {
  const { isRTL } = useDirectionalStyles();
  const { formatWithUnit } = useNumberFormatter();

  // Format the value with its unit if available
  const formattedValue =
    spec.unit && typeof spec.value === "number"
      ? formatWithUnit(spec.value, spec.unit)
      : spec.value.toString();

  return (
    <div
      className={cn(
        "flex justify-between py-2 border-b border-neutral-200",
        spec.isHighlight &&
          "font-medium text-primary-700 bg-primary-50 px-2 -mx-2 rounded",
        isRTL ? "flex-row-reverse" : "flex-row",
        className
      )}
    >
      <div className="text-neutral-700">
        <LocalizedContent content={spec.name} />
      </div>
      <div className="text-neutral-900 font-medium">{formattedValue}</div>
    </div>
  );
};

export const TechnicalSpecs: React.FC<TechnicalSpecsProps> = ({
  specifications,
  showHighlightsOnly = false,
  onToggleHighlights,
  canCompare = false,
  isComparing = false,
  onCompareToggle,
  layout = "list",
  className,
}) => {
  const { isRTL } = useDirectionalStyles();

  // Check if specifications is an array of SpecificationCategory
  const hasCategories =
    specifications.length > 0 && "specs" in specifications[0];

  // Filter specifications if showing highlights only
  const filteredSpecs = showHighlightsOnly
    ? hasCategories
      ? (specifications as SpecificationCategory[]).map((category) => ({
          ...category,
          specs: category.specs.filter((spec) => spec.isHighlight),
        }))
      : (specifications as Specification[]).filter((spec) => spec.isHighlight)
    : specifications;

  return (
    <Card className={cn("max-w-3xl mx-auto", className)}>
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <CardTitle className="flex-1">
          {isRTL ? "מפרט טכני" : "Technical Specifications"}
        </CardTitle>
        <div
          className={cn(
            "flex flex-col sm:flex-row items-start sm:items-center gap-2",
            isRTL ? "sm:flex-row-reverse" : "sm:flex-row"
          )}
        >
          {onToggleHighlights && (
            <div className="flex items-center gap-2">
              <Checkbox
                id="highlights"
                checked={showHighlightsOnly}
                onCheckedChange={(checked: boolean) =>
                  onToggleHighlights(checked)
                }
              />
              <label
                htmlFor="highlights"
                className="text-sm cursor-pointer select-none"
              >
                {isRTL ? "הצג רק נקודות מרכזיות" : "Show highlights only"}
              </label>
            </div>
          )}

          {canCompare && onCompareToggle && (
            <Button
              size="sm"
              variant={isComparing ? "primary" : "outline"}
              onClick={onCompareToggle}
            >
              {isComparing
                ? isRTL
                  ? "מסומן להשוואה"
                  : "Selected for comparison"
                : isRTL
                ? "הוסף להשוואה"
                : "Add to comparison"}
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {hasCategories ? (
          // Render with categories
          <div className="space-y-6">
            {(filteredSpecs as SpecificationCategory[]).map((category) => (
              <div key={category.id} className="space-y-3">
                <h4
                  className={cn(
                    "font-medium text-lg border-b border-neutral-300 pb-1",
                    isRTL ? "text-right" : "text-left"
                  )}
                >
                  <LocalizedContent content={category.name} />
                </h4>
                <div
                  className={cn(
                    layout === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2"
                      : "space-y-1"
                  )}
                >
                  {category.specs.map((spec) => (
                    <SpecificationItem key={spec.id} spec={spec} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Render flat list
          <div
            className={cn(
              layout === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2"
                : "space-y-1"
            )}
          >
            {(filteredSpecs as Specification[]).map((spec) => (
              <SpecificationItem key={spec.id} spec={spec} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
