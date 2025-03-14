import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export interface Product {
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
}

export interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  autoAdvanceInterval?: number; // in milliseconds
}

export function ProductCarousel({
  title,
  subtitle,
  products,
  viewAllLink,
  autoAdvanceInterval = 5000,
}: ProductCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const totalSlides = Math.ceil(products.length / 4);
  
  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % totalSlides);
  }, [totalSlides]);
  
  const prevSlide = useCallback(() => {
    setActiveIndex((current) => (current - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);
  
  // Auto-advance logic
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, autoAdvanceInterval);
    
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, autoAdvanceInterval, totalSlides]);
  
  // Format price function
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };
  
  // Calculate discounted price
  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">{title}</h2>
            {subtitle && <p className="text-lg text-neutral-600">{subtitle}</p>}
          </div>
          
          {viewAllLink && (
            <Link href={viewAllLink}>
              <Button variant="outline">View All</Button>
            </Link>
          )}
        </div>
        
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products
                    .slice(slideIndex * 4, slideIndex * 4 + 4)
                    .map((product) => (
                      <Link 
                        key={product.id}
                        href={`/products/${product.slug}`}
                        className="group"
                      >
                        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                          <div className="relative h-64 overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {product.isNew && (
                              <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                                NEW
                              </div>
                            )}
                            {product.isOnSale && (
                              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                SALE
                              </div>
                            )}
                          </div>
                          
                          <div className="p-4">
                            <h3 className="text-neutral-900 font-medium text-lg mb-1 group-hover:text-primary-600 transition-colors">
                              {product.name}
                            </h3>
                            
                            <div className="flex items-center justify-between">
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
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-md hover:bg-neutral-100 focus:outline-none z-10"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-md hover:bg-neutral-100 focus:outline-none z-10"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          
          {/* Dots indicator */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-6">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`mx-1 w-2.5 h-2.5 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-primary-600' : 'bg-neutral-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 
