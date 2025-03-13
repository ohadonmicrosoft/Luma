import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export interface ProductGridItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isOnSale?: boolean;
  discount?: number;
  brand?: string;
}

export interface ProductGridProps {
  products: ProductGridItem[];
  columns?: 2 | 3 | 4;
  showAddToCart?: boolean;
  onAddToCart?: (productId: string) => void;
  onAddToWishlist?: (productId: string) => void;
  isLoading?: boolean;
}

export function ProductGrid({
  products,
  columns = 3,
  showAddToCart = true,
  onAddToCart,
  onAddToWishlist,
  isLoading = false,
}: ProductGridProps) {
  // Format price function
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };
  
  // Calculate discounted price
  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  // Determine grid columns class based on the columns prop
  const getGridClass = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 sm:grid-cols-2';
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    }
  };

  // Render loading skeleton
  if (isLoading) {
    return (
      <div className={`grid ${getGridClass()} gap-6`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow animate-pulse">
            <div className="h-64 bg-neutral-200"></div>
            <div className="p-4">
              <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded w-1/2 mb-4"></div>
              <div className="h-6 bg-neutral-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Render empty state
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-neutral-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-neutral-900">No products found</h3>
        <p className="mt-1 text-sm text-neutral-500">
          Try adjusting your search or filter to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${getGridClass()} gap-6`}>
      {products.map((product) => (
        <div
          key={product.id}
          className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <Link href={`/products/${product.slug}`} className="block relative">
            <div className="relative h-64 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.isNew && (
                  <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
                    New
                  </span>
                )}
                {product.isOnSale && product.discount && (
                  <span className="bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
                    {product.discount}% Off
                  </span>
                )}
              </div>
              
              {/* Quick actions */}
              {onAddToWishlist && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onAddToWishlist(product.id);
                  }}
                  className="absolute top-2 right-2 bg-white bg-opacity-80 p-1.5 rounded-full text-neutral-600 hover:text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-label="Add to wishlist"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              )}
            </div>
          </Link>
          
          <div className="p-4">
            {product.brand && (
              <div className="text-sm text-neutral-500 mb-1">{product.brand}</div>
            )}
            
            <Link href={`/products/${product.slug}`} className="block">
              <h3 className="text-neutral-900 font-medium text-lg mb-1 group-hover:text-primary-600 transition-colors">
                {product.name}
              </h3>
            </Link>
            
            <div className="flex items-center justify-between mb-2">
              <div>
                {product.isOnSale && product.discount ? (
                  <div className="flex items-center gap-2">
                    <span className="text-red-600 font-semibold">
                      {formatPrice(calculateDiscountedPrice(product.price, product.discount))}
                    </span>
                    <span className="text-neutral-500 text-sm line-through">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                ) : (
                  <span className="text-neutral-900 font-semibold">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              
              {product.rating && (
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm text-neutral-600">
                    {product.rating} {product.reviewCount && `(${product.reviewCount})`}
                  </span>
                </div>
              )}
            </div>
            
            {showAddToCart && onAddToCart && (
              <Button
                variant="outline"
                className="w-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={() => onAddToCart(product.id)}
              >
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 
