import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { useDirectionalStyles } from '@/utils/rtl';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/products/ProductCard';
import { LocalizedContent } from '@/components/localization/LocalizedContent';
import { LocalizedString } from '@/types/product';

export interface SortOption {
  id: string;
  name: LocalizedString;
}

export interface ProductResultsGridProps {
  products: any[]; // Use your actual Product type here
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  sortOptions?: SortOption[];
  activeSort?: string;
  onSortChange?: (sortId: string) => void;
  resultsCount?: number;
  totalCount?: number;
  onToggleFilters?: () => void;
  onSelectProduct?: (productId: string, selected: boolean) => void;
  selectedProductIds?: string[];
  showMultiSelect?: boolean;
  gridColumns?: 2 | 3 | 4;
  emptyStateMessage?: LocalizedString;
  className?: string;
}

export const ProductResultsGrid: React.FC<ProductResultsGridProps> = ({
  products,
  loading = false,
  hasMore = false,
  onLoadMore,
  sortOptions = [],
  activeSort,
  onSortChange,
  resultsCount = 0,
  totalCount,
  onToggleFilters,
  onSelectProduct,
  selectedProductIds = [],
  showMultiSelect = false,
  gridColumns = 3,
  emptyStateMessage,
  className,
}) => {
  const { isRTL } = useDirectionalStyles();
  const [hoveredSortId, setHoveredSortId] = useState<string | null>(null);
  
  // Handle product selection
  const handleProductSelection = (productId: string, selected: boolean) => {
    if (onSelectProduct) {
      onSelectProduct(productId, selected);
    }
  };
  
  // Determine grid column classes
  const getGridColumnClass = () => {
    switch (gridColumns) {
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 4: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      case 3:
      default: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
    }
  };
  
  // Render empty state
  const renderEmptyState = () => {
    if (loading) return null;
    
    return (
      <div className="w-full py-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 mb-4 text-neutral-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        {emptyStateMessage && (
          <h3 className="text-lg font-medium text-neutral-700 mb-2">
            <LocalizedContent content={emptyStateMessage} />
          </h3>
        )}
        <p className="text-neutral-500">
          {isRTL ? 'נסה לחפש משהו אחר או לשנות את הסינון שלך' : 'Try searching for something else or changing your filters'}
        </p>
      </div>
    );
  };
  
  // Render loading state
  const renderLoadingState = () => {
    if (!loading) return null;
    
    return Array.from({ length: 6 }).map((_, index) => (
      <div 
        key={`skeleton-${index}`} 
        className="bg-neutral-100 rounded-md p-4 animate-pulse"
        style={{ height: '350px' }}
      />
    ));
  };
  
  // Render sorting options
  const renderSortOptions = () => {
    if (!sortOptions.length || !onSortChange) return null;
    
    return (
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setHoveredSortId(hoveredSortId ? null : 'sort-dropdown')}
          className="flex items-center gap-1"
        >
          <span>
            {isRTL ? 'מיון' : 'Sort'}
          </span>
          <svg 
            className={`w-4 h-4 transition-transform ${hoveredSortId === 'sort-dropdown' ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
        
        {hoveredSortId === 'sort-dropdown' && (
          <div className="absolute z-10 mt-1 bg-white border border-neutral-200 rounded-md shadow-lg">
            <ul className="py-1">
              {sortOptions.map(option => (
                <li key={option.id} className="px-0">
                  <button
                    type="button"
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 whitespace-nowrap",
                      isRTL ? "text-right" : "text-left",
                      activeSort === option.id ? "font-medium text-primary-600" : "text-neutral-700"
                    )}
                    onClick={() => {
                      onSortChange(option.id);
                      setHoveredSortId(null);
                    }}
                  >
                    <LocalizedContent content={option.name} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className={cn("flex flex-col", className)}>
      {/* Header section */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <div className="flex items-center gap-2">
          {onToggleFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleFilters}
              className="md:hidden"
            >
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              {isRTL ? 'סינון' : 'Filters'}
            </Button>
          )}
          <div className="text-sm text-neutral-600">
            {resultsCount > 0 && (
              <>
                {isRTL ? 'מציג' : 'Showing'} <span className="font-medium">{resultsCount}</span> 
                {totalCount ? (
                  <> {isRTL ? 'מתוך' : 'of'} <span className="font-medium">{totalCount}</span> </>
                ) : ''}
                {resultsCount === 1 ? (isRTL ? 'תוצאה' : 'result') : (isRTL ? 'תוצאות' : 'results')}
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {renderSortOptions()}
        </div>
      </div>
      
      {/* Products grid */}
      {products.length === 0 && !loading ? (
        renderEmptyState()
      ) : (
        <div className={cn(
          "grid gap-4 md:gap-6",
          getGridColumnClass()
        )}>
          {loading ? renderLoadingState() : (
            products.map(product => (
              <ProductCard
                key={product.id}
                {...product}
                isSelectable={showMultiSelect}
                isSelected={selectedProductIds.includes(product.id)}
                onSelectChange={(selected) => handleProductSelection(product.id, selected)}
              />
            ))
          )}
        </div>
      )}
      
      {/* Load more button */}
      {hasMore && !loading && (
        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            onClick={onLoadMore}
            disabled={loading}
          >
            {isRTL ? 'טען עוד מוצרים' : 'Load More Products'}
          </Button>
        </div>
      )}
    </div>
  );
}; 
