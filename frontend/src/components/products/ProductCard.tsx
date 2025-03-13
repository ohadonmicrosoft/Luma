import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { useDirectionalStyles } from '@/utils/rtl';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { LocalizedContent } from '@/components/localization/LocalizedContent';
import { usePriceFormatter } from '@/utils/currency';
import { Currency } from '@/utils/currency';
import { Specification } from './TechnicalSpecs';

export interface ProductCardProps {
  id: string;
  slug: string;
  name: Record<string, string>;
  description?: Record<string, string>;
  price: number;
  currency?: Currency;
  discountedPrice?: number;
  mainImage: string;
  images?: string[];
  specifications?: Specification[];
  badges?: {
    text: Record<string, string>;
    variant: 'new' | 'sale' | 'featured' | 'limited';
  }[];
  category?: {
    id: string;
    name: Record<string, string>;
    slug: string;
  };
  brand?: {
    id: string;
    name: Record<string, string>;
    logo?: string;
  };
  rating?: number;
  reviewCount?: number;
  isInStock?: boolean;
  stockQuantity?: number;
  isSelectable?: boolean;
  isSelected?: boolean;
  onSelectChange?: (selected: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  slug,
  name,
  description,
  price,
  currency = Currency.USD,
  discountedPrice,
  mainImage,
  images,
  specifications = [],
  badges = [],
  category,
  brand,
  rating,
  reviewCount,
  isInStock = true,
  stockQuantity,
  isSelectable = false,
  isSelected = false,
  onSelectChange,
  size = 'md',
  className,
}) => {
  const { isRTL, direction } = useDirectionalStyles();
  const formatPrice = usePriceFormatter();
  
  // Filter out highlighted specifications
  const highlightedSpecs = specifications.filter(spec => spec.isHighlight).slice(0, 3);
  
  // Calculate discount percentage
  const hasDiscount = discountedPrice !== undefined && discountedPrice < price;
  const discountPercentage = hasDiscount 
    ? Math.round(((price - discountedPrice!) / price) * 100) 
    : 0;
    
  // Determine card size classes
  const sizeClasses = {
    sm: 'max-w-xs',
    md: 'max-w-sm',
    lg: 'max-w-md',
  };
  
  // Determine image size based on card size
  const imageSize = {
    sm: { width: 200, height: 200 },
    md: { width: 280, height: 280 },
    lg: { width: 320, height: 320 },
  };
  
  return (
    <Card 
      className={cn(
        "h-full transition-all duration-300 hover:shadow-lg",
        sizeClasses[size],
        className
      )}
    >
      <div className="relative">
        {/* Selection checkbox - top right corner */}
        {isSelectable && onSelectChange && (
          <div className={cn(
            "absolute z-10 m-2",
            isRTL ? "left-2" : "right-2",
            "top-2"
          )}>
            <Checkbox 
              checked={isSelected} 
              onCheckedChange={onSelectChange}
              className="h-5 w-5 border-2 bg-white/80"
            />
          </div>
        )}
        
        {/* Badges - top left corner */}
        {badges.length > 0 && (
          <div className={cn(
            "absolute z-10 m-2 flex flex-col gap-1",
            isRTL ? "right-2" : "left-2",
            "top-2"
          )}>
            {badges.map((badge, index) => (
              <span
                key={index}
                className={cn(
                  "inline-block px-2 py-1 text-xs font-medium text-white rounded",
                  badge.variant === 'new' && "bg-blue-500",
                  badge.variant === 'sale' && "bg-red-500",
                  badge.variant === 'featured' && "bg-amber-500",
                  badge.variant === 'limited' && "bg-purple-500"
                )}
              >
                <LocalizedContent content={badge.text} />
              </span>
            ))}
          </div>
        )}
        
        {/* Main product image */}
        <Link href={`/products/${slug}`} className="block overflow-hidden">
          <div className="relative mx-auto aspect-square">
            <Image
              src={mainImage}
              alt={name.en || Object.values(name)[0]}
              fill
              sizes={`(max-width: 640px) 100vw, (max-width: 768px) 50vw, ${imageSize[size].width}px`}
              className="object-contain transition-all duration-300 hover:scale-105"
              priority
            />
          </div>
        </Link>
        
        {/* Out of stock overlay */}
        {!isInStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white/90 text-red-600 font-medium px-4 py-2 rounded">
              {isRTL ? 'אזל מהמלאי' : 'Out of Stock'}
            </span>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        {/* Category & Brand */}
        {(category || brand) && (
          <div className={cn(
            "flex items-center justify-between text-sm text-neutral-500 mb-1",
            isRTL ? "flex-row-reverse" : "flex-row"
          )}>
            {category && (
              <Link 
                href={`/categories/${category.slug}`}
                className="hover:text-primary-600 hover:underline"
              >
                <LocalizedContent content={category.name} />
              </Link>
            )}
            {brand && (
              <div className="flex items-center gap-1">
                {brand.logo && (
                  <Image 
                    src={brand.logo} 
                    alt={brand.name.en || Object.values(brand.name)[0]} 
                    width={16} 
                    height={16} 
                    className="object-contain"
                  />
                )}
                <Link 
                  href={`/brands/${brand.id}`}
                  className="hover:text-primary-600 hover:underline"
                >
                  <LocalizedContent content={brand.name} />
                </Link>
              </div>
            )}
          </div>
        )}
        
        {/* Product name */}
        <h3 className="font-medium text-lg mb-1">
          <Link href={`/products/${slug}`} className="hover:text-primary-600 hover:underline">
            <LocalizedContent content={name} />
          </Link>
        </h3>
        
        {/* Price */}
        <div className={cn(
          "flex items-center gap-2 mb-3",
          isRTL ? "flex-row-reverse" : "flex-row"
        )}>
          {hasDiscount && (
            <span className="text-red-600 font-bold">
              {formatPrice(discountedPrice!, currency)}
            </span>
          )}
          <span className={cn(
            hasDiscount ? "text-neutral-500 line-through text-sm" : "text-neutral-900 font-bold"
          )}>
            {formatPrice(price, currency)}
          </span>
          {hasDiscount && discountPercentage > 0 && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
              {isRTL ? `-${discountPercentage}%` : `-${discountPercentage}%`}
            </span>
          )}
        </div>
        
        {/* Product description - only on larger cards */}
        {description && size === 'lg' && (
          <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
            <LocalizedContent content={description} />
          </p>
        )}
        
        {/* Technical specifications highlights */}
        {highlightedSpecs.length > 0 && (
          <div className="mt-3 space-y-1 border-t border-neutral-200 pt-2">
            {highlightedSpecs.map((spec) => (
              <div 
                key={spec.id}
                className={cn(
                  "flex text-sm justify-between",
                  isRTL ? "flex-row-reverse" : "flex-row"
                )}
              >
                <span className="text-neutral-500">
                  <LocalizedContent content={spec.name} />
                </span>
                <span className="font-medium">
                  {spec.unit
                    ? `${spec.value} ${spec.unit}`
                    : String(spec.value)}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button 
          variant="primary" 
          size={size === 'sm' ? 'sm' : 'md'}
          className={cn(
            "flex-1",
            !isInStock && "opacity-50 cursor-not-allowed"
          )}
          disabled={!isInStock}
        >
          {isRTL ? 'הוסף לסל' : 'Add to Cart'}
        </Button>
        
        <Button 
          variant="outline" 
          size={size === 'sm' ? 'sm' : 'md'}
          className="ml-2"
        >
          {isRTL ? 'פרטים' : 'Details'}
        </Button>
      </CardFooter>
    </Card>
  );
}; 
