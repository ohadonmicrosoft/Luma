import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { useDirectionalStyles } from '@/utils/rtl';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/products/ProductCard';
import { LocalizedContent } from '@/components/localization/LocalizedContent';
import { LocalizedString } from '@/types/product';

export interface ProductHighlightsProps {
  title: LocalizedString;
  subtitle?: LocalizedString;
  products: any[]; // Use your actual product type from ProductCard
  viewAllUrl?: string;
  viewAllLabel?: LocalizedString;
  compareUrl?: string;
  compareLabel?: LocalizedString;
  selectableProducts?: boolean;
  layout?: 'grid' | 'carousel' | 'featured';
  className?: string;
}

export const ProductHighlights: React.FC<ProductHighlightsProps> = ({
  title,
  subtitle,
  products,
  viewAllUrl,
  viewAllLabel,
  compareUrl,
  compareLabel,
  selectableProducts = false,
  layout = 'carousel',
  className,
}) => {
  const { isRTL, direction } = useDirectionalStyles();
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Handle product selection for comparison
  const handleProductSelect = (productId: string, selected: boolean) => {
    if (selected) {
      setSelectedProductIds(prev => [...prev, productId]);
    } else {
      setSelectedProductIds(prev => prev.filter(id => id !== productId));
    }
  };
  
  // Handle mouse drag for carousel
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current || layout !== 'carousel') return;
    
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = 'grabbing';
    scrollRef.current.style.userSelect = 'none';
  };
  
  const handleMouseLeave = () => {
    if (!scrollRef.current || layout !== 'carousel') return;
    
    setIsDragging(false);
    scrollRef.current.style.cursor = 'grab';
    scrollRef.current.style.removeProperty('user-select');
  };
  
  const handleMouseUp = () => {
    if (!scrollRef.current || layout !== 'carousel') return;
    
    setIsDragging(false);
    scrollRef.current.style.cursor = 'grab';
    scrollRef.current.style.removeProperty('user-select');
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current || layout !== 'carousel') return;
    
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  
  // Scroll to previous set of products
  const scrollPrev = () => {
    if (!scrollRef.current) return;
    
    const containerWidth = scrollRef.current.clientWidth;
    const scrollAmount = containerWidth * 0.8; // Scroll 80% of the visible width
    
    scrollRef.current.scrollBy({
      left: isRTL ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };
  
  // Scroll to next set of products
  const scrollNext = () => {
    if (!scrollRef.current) return;
    
    const containerWidth = scrollRef.current.clientWidth;
    const scrollAmount = containerWidth * 0.8; // Scroll 80% of the visible width
    
    scrollRef.current.scrollBy({
      left: isRTL ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };
  
  // Check if content overflows to show/hide scroll buttons
  useEffect(() => {
    const checkOverflow = () => {
      if (!scrollRef.current) return;
      
      const hasHorizontalOverflow = scrollRef.current.scrollWidth > scrollRef.current.clientWidth;
      setHasOverflow(hasHorizontalOverflow);
    };
    
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    
    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [products, layout]);
  
  return (
    <section className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={cn(
          "flex items-end justify-between mb-8",
          isRTL ? "flex-row-reverse" : "flex-row"
        )}>
          <div className={cn("max-w-xl", isRTL ? "text-right" : "text-left")}>
            <h2 className="text-3xl font-bold text-neutral-900">
              <LocalizedContent content={title} />
            </h2>
            {subtitle && (
              <p className="mt-2 text-neutral-600">
                <LocalizedContent content={subtitle} />
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {/* View all link */}
            {viewAllUrl && viewAllLabel && (
              <Link 
                href={viewAllUrl}
                className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
              >
                <LocalizedContent content={viewAllLabel} />
                <svg 
                  className={cn(
                    "w-5 h-5 ml-1",
                    isRTL ? "transform rotate-180 mr-1 ml-0" : "ml-1"
                  )} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            )}
            
            {/* Carousel navigation buttons - not shown on mobile */}
            {layout === 'carousel' && hasOverflow && (
              <div className="hidden md:flex gap-2">
                <button 
                  onClick={scrollPrev}
                  className="p-2 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                  aria-label={isRTL ? "Next" : "Previous"}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
                  </svg>
                </button>
                <button 
                  onClick={scrollNext}
                  className="p-2 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                  aria-label={isRTL ? "Previous" : "Next"}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Selected products comparison bar */}
        {selectableProducts && selectedProductIds.length > 0 && (
          <div className="mb-4 p-3 bg-primary-50 border border-primary-200 rounded-lg flex items-center justify-between">
            <div>
              <span className="font-medium">
                {selectedProductIds.length} {isRTL ? 'منتجات محددة' : 'products selected'}
              </span>
            </div>
            <div className="flex gap-3">
              {compareUrl && compareLabel && (
                <Button
                  variant="primary"
                  size="sm"
                  asChild
                >
                  <Link href={`${compareUrl}?ids=${selectedProductIds.join(',')}`}>
                    <LocalizedContent content={compareLabel} />
                  </Link>
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedProductIds([])}
              >
                {isRTL ? 'إلغاء التحديد' : 'Clear selection'}
              </Button>
            </div>
          </div>
        )}
        
        {/* Grid layout */}
        {layout === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                {...product}
                isSelectable={selectableProducts}
                isSelected={selectedProductIds.includes(product.id)}
                onSelectChange={(selected) => handleProductSelect(product.id, selected)}
              />
            ))}
          </div>
        )}
        
        {/* Carousel layout */}
        {layout === 'carousel' && (
          <div className="relative">
            <div
              ref={scrollRef}
              className={cn(
                "flex overflow-x-auto gap-6 pb-4 scrollbar-hide",
                isDragging ? "cursor-grabbing" : "cursor-grab"
              )}
              style={{ scrollBehavior: 'smooth', direction: direction }}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {products.map(product => (
                <div key={product.id} className="flex-shrink-0 w-72 sm:w-80 md:w-[340px]">
                  <ProductCard
                    {...product}
                    isSelectable={selectableProducts}
                    isSelected={selectedProductIds.includes(product.id)}
                    onSelectChange={(selected) => handleProductSelect(product.id, selected)}
                  />
                </div>
              ))}
            </div>
            
            {/* Mobile scroll indicator dots */}
            {layout === 'carousel' && hasOverflow && (
              <div className="flex justify-center mt-4 md:hidden">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                  <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
                  <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Featured layout - one large product + grid of smaller ones */}
        {layout === 'featured' && products.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured large product */}
            <div className="lg:col-span-1 lg:row-span-2">
              <ProductCard
                {...products[0]}
                size="lg"
                isSelectable={selectableProducts}
                isSelected={selectedProductIds.includes(products[0].id)}
                onSelectChange={(selected) => handleProductSelect(products[0].id, selected)}
              />
            </div>
            
            {/* Grid of smaller products */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {products.slice(1, 5).map(product => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    size="sm"
                    isSelectable={selectableProducts}
                    isSelected={selectedProductIds.includes(product.id)}
                    onSelectChange={(selected) => handleProductSelect(product.id, selected)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}; 
