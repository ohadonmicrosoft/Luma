import React, { useEffect, useCallback, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { useDirectionalStyles } from '@/utils/rtl';
import { Button } from '@/components/ui/Button';
import { LocalizedContent } from '@/components/localization/LocalizedContent';
import { LocalizedString } from '@/types/product';

export interface HeroFeature {
  id: string;
  title: LocalizedString;
  description?: LocalizedString;
  icon: string;
}

export interface HeroSlide {
  id: string;
  title: LocalizedString;
  subtitle?: LocalizedString;
  description?: LocalizedString;
  image: string;
  mobileImage?: string;
  actionLabel: LocalizedString;
  actionUrl: string;
  secondaryActionLabel?: LocalizedString;
  secondaryActionUrl?: string;
  features?: HeroFeature[];
  theme?: 'light' | 'dark';
  align?: 'left' | 'right' | 'center';
}

export interface HeroSectionProps {
  slides: HeroSlide[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  slides,
  autoplay = true,
  autoplaySpeed = 5000,
  className,
}) => {
  const { isRTL, direction, flip } = useDirectionalStyles();
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  
  // Handle slide change
  const changeSlide = useCallback((index: number) => {
    if (isAnimating || index === activeSlide) return;
    
    setIsAnimating(true);
    setActiveSlide(index);
    
    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [isAnimating, activeSlide]);
  
  // Next slide
  const nextSlide = useCallback(() => {
    const nextIndex = (activeSlide + 1) % slides.length;
    changeSlide(nextIndex);
  }, [activeSlide, slides.length, changeSlide]);
  
  // Previous slide
  const prevSlide = useCallback(() => {
    const prevIndex = (activeSlide - 1 + slides.length) % slides.length;
    changeSlide(prevIndex);
  }, [activeSlide, slides.length, changeSlide]);
  
  // Set up autoplay interval
  useEffect(() => {
    if (autoplay && slides.length > 1) {
      const interval = setInterval(() => {
        nextSlide();
      }, autoplaySpeed);
      
      // Clear interval on cleanup
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplaySpeed, slides.length, nextSlide]);
  
  // Set up keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        void (isRTL ? nextSlide() : prevSlide());
      } else if (e.key === 'ArrowRight') {
        void (isRTL ? prevSlide() : nextSlide());
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRTL, nextSlide, prevSlide]);
  
  if (slides.length === 0) return null;
  
  const currentSlide = slides[activeSlide];
  const slideAlign = currentSlide.align || 'center';
  const slideTheme = currentSlide.theme || 'light';
  
  // Apply RTL adjustments to content alignment
  const contentAlign = flip(slideAlign, slideAlign === 'left' ? 'right' : slideAlign === 'right' ? 'left' : 'center');
  
  // Determine text colors based on theme
  const textColors = slideTheme === 'dark' 
    ? { title: 'text-white', subtitle: 'text-white/90', description: 'text-white/80' } 
    : { title: 'text-neutral-900', subtitle: 'text-neutral-800', description: 'text-neutral-700' };
  
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Main slide */}
      <div 
        className="relative h-[550px] sm:h-[600px] lg:h-[650px] w-full overflow-hidden"
        dir={direction}
      >
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full transition-opacity duration-500">
          {!imageError[currentSlide.id] ? (
            <Image
              src={currentSlide.image}
              alt={currentSlide.title.en || Object.values(currentSlide.title)[0]}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: contentAlign === 'left' ? 'right center' : contentAlign === 'right' ? 'left center' : 'center center' }}
              onError={() => {
                console.error(`Failed to load image: ${currentSlide.image}`);
                setImageError(prev => ({ ...prev, [currentSlide.id]: true }));
              }}
            />
          ) : (
            <div className={cn(
              "w-full h-full flex items-center justify-center",
              slideTheme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-100'
            )}>
              <div className="text-center p-8">
                <div className="text-4xl mb-4">
                  {currentSlide.id === 'tactical' ? '🛡️' : 
                   currentSlide.id === 'outdoor' ? '🏕️' : '🏠'}
                </div>
                <h3 className={cn("text-xl font-medium", slideTheme === 'dark' ? 'text-white' : 'text-neutral-800')}>
                  {currentSlide.title.en || Object.values(currentSlide.title)[0]}
                </h3>
              </div>
            </div>
          )}
          
          {/* Overlay gradient */}
          <div 
            className={cn(
              "absolute inset-0",
              slideTheme === 'dark' 
                ? "bg-gradient-to-t from-black/80 via-black/50 to-black/30"
                : "bg-gradient-to-t from-white/70 via-white/40 to-white/20"
            )}
          />
        </div>
        
        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div 
              className={cn(
                "max-w-xl transition-all duration-500 space-y-4 animate-fadeIn",
                contentAlign === 'left' ? 'text-left mr-auto' : 
                contentAlign === 'right' ? 'text-right ml-auto' : 
                'text-center mx-auto',
                isRTL && contentAlign !== 'center' && (contentAlign === 'left' ? 'text-right' : 'text-left')
              )}
            >
              {currentSlide.subtitle && (
                <h2 className={cn("text-lg sm:text-xl font-medium", textColors.subtitle)}>
                  <LocalizedContent content={currentSlide.subtitle} />
                </h2>
              )}
              
              <h1 className={cn("text-4xl sm:text-5xl lg:text-6xl font-bold", textColors.title)}>
                <LocalizedContent content={currentSlide.title} />
              </h1>
              
              {currentSlide.description && (
                <p className={cn("text-lg sm:text-xl", textColors.description)}>
                  <LocalizedContent content={currentSlide.description} />
                </p>
              )}
              
              <div className={cn(
                "flex gap-3 mt-6",
                contentAlign === 'center' ? 'justify-center' : 
                contentAlign === 'right' ? 'justify-end' : 'justify-start',
                isRTL && contentAlign !== 'center' && (contentAlign === 'left' ? 'justify-end' : 'justify-start')
              )}>
                <Button size="lg" asChild>
                  <Link href={currentSlide.actionUrl}>
                    <LocalizedContent content={currentSlide.actionLabel} />
                  </Link>
                </Button>
                
                {currentSlide.secondaryActionLabel && currentSlide.secondaryActionUrl && (
                  <Button size="lg" variant="outline" asChild>
                    <Link href={currentSlide.secondaryActionUrl}>
                      <LocalizedContent content={currentSlide.secondaryActionLabel} />
                    </Link>
                  </Button>
                )}
              </div>
              
              {/* Feature highlights */}
              {currentSlide.features && currentSlide.features.length > 0 && (
                <div className="mt-8 pt-4">
                  <div className={cn(
                    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-white/90 dark:bg-black/60 backdrop-blur-sm rounded-lg p-4 shadow-lg",
                    contentAlign === 'center' ? 'mx-auto max-w-3xl' : 
                    contentAlign === 'right' ? 'ml-auto max-w-xl' : 'mr-auto max-w-xl'
                  )}>
                    {currentSlide.features.map((feature) => (
                      <div 
                        key={feature.id} 
                        className={cn(
                          "flex items-start space-x-3 p-2 hover:bg-white/30 dark:hover:bg-black/30 rounded-md transition-colors",
                          isRTL ? "flex-row-reverse space-x-reverse" : "flex-row"
                        )}
                      >
                        <div className="flex-shrink-0 text-primary-600">
                          <Image 
                            src={feature.icon} 
                            alt="" 
                            width={28} 
                            height={28} 
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-neutral-900 dark:text-white">
                            <LocalizedContent content={feature.title} />
                          </h3>
                          {feature.description && (
                            <p className="text-sm text-neutral-700 dark:text-neutral-300">
                              <LocalizedContent content={feature.description} />
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <div className="flex items-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => changeSlide(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all",
                  index === activeSlide 
                    ? "bg-primary-600 scale-125" 
                    : "bg-white/50 hover:bg-white/80"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Navigation arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className={cn(
              "absolute top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-neutral-800 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all",
              isRTL ? "right-4" : "left-4"
            )}
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className={cn(
              "absolute top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-neutral-800 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all",
              isRTL ? "left-4" : "right-4"
            )}
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}; 
