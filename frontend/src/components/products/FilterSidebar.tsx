import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

export interface FilterOption {
  id: string;
  label: string;
  count: number;
}

export interface FilterGroup {
  id: string;
  name: string;
  options: FilterOption[];
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface FilterSidebarProps {
  categories: FilterGroup;
  brands: FilterGroup;
  attributes: FilterGroup[];
  priceRange: PriceRange;
  selectedFilters: {
    categories: string[];
    brands: string[];
    attributes: Record<string, string[]>;
    price: PriceRange;
  };
  onFilterChange: (filterType: string, filterId: string, groupId?: string) => void;
  onPriceChange: (range: PriceRange) => void;
  onClearFilters: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function FilterSidebar({
  categories,
  brands,
  attributes,
  priceRange,
  selectedFilters,
  onFilterChange,
  onPriceChange,
  onClearFilters,
  isMobileOpen = false,
  onMobileClose,
}: FilterSidebarProps) {
  const [localPriceRange, setLocalPriceRange] = useState<PriceRange>(selectedFilters.price);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    categories: true,
    brands: true,
  });

  // Initialize attribute groups as expanded
  React.useEffect(() => {
    const initialExpanded = { ...expanded };
    attributes.forEach(attr => {
      initialExpanded[attr.id] = true;
    });
    setExpanded(initialExpanded);
  }, [attributes, expanded]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = parseInt(e.target.value, 10) || 0;
    const newRange = { ...localPriceRange, [type]: value };
    setLocalPriceRange(newRange);
  };

  const applyPriceRange = () => {
    onPriceChange(localPriceRange);
  };

  const toggleExpand = (sectionId: string) => {
    setExpanded(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(0)}`;
  };

  // Count total active filters
  const countActiveFilters = () => {
    return (
      selectedFilters.categories.length +
      selectedFilters.brands.length +
      Object.values(selectedFilters.attributes).flat().length +
      (selectedFilters.price.min > priceRange.min || selectedFilters.price.max < priceRange.max ? 1 : 0)
    );
  };

  const activeFilterCount = countActiveFilters();

  return (
    <div
      className={`bg-white border-r border-neutral-200 h-full overflow-auto transition-all duration-300 ${
        isMobileOpen
          ? 'fixed inset-0 z-40 w-80 transform translate-x-0'
          : 'w-64 hidden lg:block'
      }`}
    >
      <div className="p-4 border-b border-neutral-200 sticky top-0 bg-white z-10">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Filters</h2>
          {isMobileOpen && onMobileClose && (
            <button
              onClick={onMobileClose}
              className="text-neutral-500 hover:text-neutral-700"
              aria-label="Close filters"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {activeFilterCount > 0 && (
          <div className="mt-2 flex justify-between items-center">
            <span className="text-sm text-neutral-600">
              {activeFilterCount} {activeFilterCount === 1 ? 'filter' : 'filters'} applied
            </span>
            <button
              onClick={onClearFilters}
              className="text-sm text-primary-600 hover:text-primary-800 font-medium"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      <div className="p-4 space-y-6">
        {/* Categories Filter */}
        <div className="border-b border-neutral-200 pb-4">
          <button
            className="flex justify-between items-center w-full text-left mb-2"
            onClick={() => toggleExpand('categories')}
          >
            <h3 className="text-md font-medium">Categories</h3>
            <svg
              className={`w-5 h-5 transition-transform ${expanded.categories ? 'transform rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expanded.categories && (
            <div className="mt-2 space-y-1">
              {categories.options.map((category) => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    checked={selectedFilters.categories.includes(category.id)}
                    onChange={() => onFilterChange('categories', category.id)}
                    className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-neutral-700">
                    {category.label} <span className="text-neutral-500">({category.count})</span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Brands Filter */}
        <div className="border-b border-neutral-200 pb-4">
          <button
            className="flex justify-between items-center w-full text-left mb-2"
            onClick={() => toggleExpand('brands')}
          >
            <h3 className="text-md font-medium">Brands</h3>
            <svg
              className={`w-5 h-5 transition-transform ${expanded.brands ? 'transform rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expanded.brands && (
            <div className="mt-2 space-y-1">
              {brands.options.map((brand) => (
                <div key={brand.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`brand-${brand.id}`}
                    checked={selectedFilters.brands.includes(brand.id)}
                    onChange={() => onFilterChange('brands', brand.id)}
                    className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor={`brand-${brand.id}`} className="ml-2 text-sm text-neutral-700">
                    {brand.label} <span className="text-neutral-500">({brand.count})</span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="border-b border-neutral-200 pb-4">
          <h3 className="text-md font-medium mb-2">Price Range</h3>
          <div className="flex items-center justify-between mb-4">
            <div className="w-[45%]">
              <label htmlFor="min-price" className="block text-xs text-neutral-500 mb-1">
                Min
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-neutral-500 text-sm">
                  $
                </span>
                <input
                  type="number"
                  id="min-price"
                  value={localPriceRange.min}
                  onChange={(e) => handlePriceChange(e, 'min')}
                  min={priceRange.min}
                  max={priceRange.max}
                  className="w-full pl-6 pr-2 py-1 border border-neutral-300 rounded text-sm"
                />
              </div>
            </div>
            <div className="text-neutral-400">—</div>
            <div className="w-[45%]">
              <label htmlFor="max-price" className="block text-xs text-neutral-500 mb-1">
                Max
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-neutral-500 text-sm">
                  $
                </span>
                <input
                  type="number"
                  id="max-price"
                  value={localPriceRange.max}
                  onChange={(e) => handlePriceChange(e, 'max')}
                  min={priceRange.min}
                  max={priceRange.max}
                  className="w-full pl-6 pr-2 py-1 border border-neutral-300 rounded text-sm"
                />
              </div>
            </div>
          </div>
          <div className="relative mb-4 px-2">
            <div className="h-1 bg-neutral-200 rounded-full">
              <div
                className="absolute h-1 bg-primary-600 rounded-full"
                style={{
                  left: `${((localPriceRange.min - priceRange.min) / (priceRange.max - priceRange.min)) * 100}%`,
                  right: `${100 - ((localPriceRange.max - priceRange.min) / (priceRange.max - priceRange.min)) * 100}%`,
                }}
              ></div>
            </div>
            <div className="relative">
              <div
                className="absolute w-4 h-4 bg-white border-2 border-primary-600 rounded-full -mt-1.5 cursor-pointer"
                style={{
                  left: `calc(${((localPriceRange.min - priceRange.min) / (priceRange.max - priceRange.min)) * 100}% - 8px)`,
                }}
              ></div>
              <div
                className="absolute w-4 h-4 bg-white border-2 border-primary-600 rounded-full -mt-1.5 cursor-pointer"
                style={{
                  left: `calc(${((localPriceRange.max - priceRange.min) / (priceRange.max - priceRange.min)) * 100}% - 8px)`,
                }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-neutral-500 mb-4">
            <span>{formatPrice(priceRange.min)}</span>
            <span>{formatPrice(priceRange.max)}</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={applyPriceRange}
          >
            Apply Price Range
          </Button>
        </div>

        {/* Attribute Filters */}
        {attributes.map((attribute) => (
          <div key={attribute.id} className="border-b border-neutral-200 pb-4">
            <button
              className="flex justify-between items-center w-full text-left mb-2"
              onClick={() => toggleExpand(attribute.id)}
            >
              <h3 className="text-md font-medium">{attribute.name}</h3>
              <svg
                className={`w-5 h-5 transition-transform ${expanded[attribute.id] ? 'transform rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expanded[attribute.id] && (
              <div className="mt-2 space-y-1">
                {attribute.options.map((option) => (
                  <div key={option.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`${attribute.id}-${option.id}`}
                      checked={selectedFilters.attributes[attribute.id]?.includes(option.id) || false}
                      onChange={() => onFilterChange('attributes', option.id, attribute.id)}
                      className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor={`${attribute.id}-${option.id}`} className="ml-2 text-sm text-neutral-700">
                      {option.label} <span className="text-neutral-500">({option.count})</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 
