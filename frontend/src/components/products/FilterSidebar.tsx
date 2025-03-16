import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { useDirectionalStyles } from "@/utils/rtl";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { LocalizedContent } from "@/components/localization/LocalizedContent";
import { LocalizedString } from "@/types/product";

export interface RangeFilter {
  id: string;
  name: LocalizedString;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  rangeValues: [number, number]; // Current values as [min, max]
}

export interface SelectionFilter {
  id: string;
  name: LocalizedString;
  options: {
    id: string;
    name: LocalizedString;
    count?: number;
    selected: boolean;
  }[];
  multiSelect?: boolean;
}

export interface FilterCategory {
  id: string;
  name: LocalizedString;
  selectionFilters?: SelectionFilter[];
  rangeFilters?: RangeFilter[];
  isExpanded?: boolean;
}

export interface FilterSidebarProps {
  categories: FilterCategory[];
  onFilterChange: (categoryId: string, filterId: string, value: any) => void;
  onResetFilters: () => void;
  onApplyFilters?: () => void;
  filtersCount?: number;
  mobileView?: boolean;
  onClose?: () => void;
  className?: string;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  onFilterChange,
  onResetFilters,
  onApplyFilters,
  filtersCount = 0,
  mobileView = false,
  onClose,
  className,
}) => {
  const { isRTL } = useDirectionalStyles();
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >(
    categories.reduce((acc, category) => {
      acc[category.id] = category.isExpanded !== false; // Default to true unless explicitly set to false
      return acc;
    }, {} as Record<string, boolean>)
  );

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Handle changes to checkbox filters
  const handleCheckboxChange = (
    categoryId: string,
    filterId: string,
    optionId: string,
    multiSelect: boolean,
    checked: boolean
  ) => {
    onFilterChange(categoryId, filterId, { optionId, checked, multiSelect });
  };

  // Handle changes to range filters
  const handleRangeChange = (
    categoryId: string,
    filterId: string,
    index: 0 | 1, // 0 for min, 1 for max
    value: number
  ) => {
    const rangeFilter = categories
      .find((c) => c.id === categoryId)
      ?.rangeFilters?.find((f) => f.id === filterId);

    if (!rangeFilter) return;

    const newValues = [...rangeFilter.rangeValues] as [number, number];
    newValues[index] = value;

    // Ensure min <= max
    if (index === 0 && newValues[0] > newValues[1]) {
      newValues[0] = newValues[1];
    } else if (index === 1 && newValues[1] < newValues[0]) {
      newValues[1] = newValues[0];
    }

    onFilterChange(categoryId, filterId, newValues);
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-full overflow-hidden bg-white",
        mobileView ? "w-full" : "w-72 border-r border-neutral-200",
        className
      )}
    >
      {/* Mobile header */}
      {mobileView && onClose && (
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <h2 className="font-medium text-lg">
            {isRTL ? "סינון מוצרים" : "Filter Products"}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            {isRTL ? "סגור" : "Close"}
          </Button>
        </div>
      )}

      {/* Filter header */}
      <div className="flex items-center justify-between p-4">
        <h2 className="font-medium text-lg">
          {isRTL ? "סנן לפי" : "Filter By"}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetFilters}
          className="text-sm"
        >
          {isRTL ? "נקה הכל" : "Clear All"}
        </Button>
      </div>

      {/* Filters content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="border-b border-neutral-200 pb-4 last:border-0"
          >
            <button
              className={cn(
                "w-full flex items-center justify-between py-2 text-left font-medium",
                isRTL ? "text-right" : "text-left"
              )}
              onClick={() => toggleCategory(category.id)}
            >
              <LocalizedContent content={category.name} />
              <span className="transform transition-transform">
                {expandedCategories[category.id] ? "−" : "+"}
              </span>
            </button>

            {expandedCategories[category.id] && (
              <div className="mt-2 space-y-4">
                {/* Selection/checkbox filters */}
                {category.selectionFilters?.map((filter) => (
                  <div key={filter.id} className="space-y-2">
                    <h4 className="text-sm font-medium text-neutral-500">
                      <LocalizedContent content={filter.name} />
                    </h4>
                    <div className="space-y-1 max-h-60 overflow-y-auto">
                      {filter.options.map((option) => (
                        <div
                          key={option.id}
                          className={cn(
                            "flex items-center group",
                            isRTL ? "flex-row-reverse" : "flex-row"
                          )}
                        >
                          <Checkbox
                            id={`${filter.id}-${option.id}`}
                            checked={option.selected}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(
                                category.id,
                                filter.id,
                                option.id,
                                !!filter.multiSelect,
                                !!checked
                              )
                            }
                          />
                          <label
                            htmlFor={`${filter.id}-${option.id}`}
                            className={cn(
                              "text-sm cursor-pointer select-none flex-1",
                              isRTL ? "mr-2" : "ml-2"
                            )}
                          >
                            <span className="flex-1">
                              <LocalizedContent content={option.name} />
                            </span>
                            {option.count !== undefined && (
                              <span className="text-neutral-400 text-xs">
                                ({option.count})
                              </span>
                            )}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Range filters */}
                {category.rangeFilters?.map((filter) => (
                  <div key={filter.id} className="space-y-2">
                    <h4 className="text-sm font-medium text-neutral-500 flex justify-between">
                      <LocalizedContent content={filter.name} />
                      <span className="text-xs text-neutral-500">
                        {`${filter.rangeValues[0]}${
                          filter.unit ? filter.unit : ""
                        } - ${filter.rangeValues[1]}${
                          filter.unit ? filter.unit : ""
                        }`}
                      </span>
                    </h4>

                    {/* Range inputs */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Input
                          type="range"
                          min={filter.min}
                          max={filter.max}
                          step={filter.step || 1}
                          value={filter.rangeValues[0]}
                          onChange={(e) =>
                            handleRangeChange(
                              category.id,
                              filter.id,
                              0,
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="range"
                          min={filter.min}
                          max={filter.max}
                          step={filter.step || 1}
                          value={filter.rangeValues[1]}
                          onChange={(e) =>
                            handleRangeChange(
                              category.id,
                              filter.id,
                              1,
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full"
                        />
                      </div>

                      {/* Min/Max inputs */}
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min={filter.min}
                          max={filter.max}
                          step={filter.step || 1}
                          value={filter.rangeValues[0]}
                          onChange={(e) =>
                            handleRangeChange(
                              category.id,
                              filter.id,
                              0,
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-1/2"
                        />
                        <span className="text-neutral-500">-</span>
                        <Input
                          type="number"
                          min={filter.min}
                          max={filter.max}
                          step={filter.step || 1}
                          value={filter.rangeValues[1]}
                          onChange={(e) =>
                            handleRangeChange(
                              category.id,
                              filter.id,
                              1,
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-1/2"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile footer */}
      {mobileView && onApplyFilters && (
        <div className="p-4 border-t border-neutral-200">
          <Button onClick={onApplyFilters} fullWidth>
            {isRTL
              ? `החל ${filtersCount > 0 ? `(${filtersCount})` : ""}`
              : `Apply Filters ${filtersCount > 0 ? `(${filtersCount})` : ""}`}
          </Button>
        </div>
      )}
    </aside>
  );
};
