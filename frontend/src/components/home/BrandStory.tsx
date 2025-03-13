import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { useDirectionalStyles } from '@/utils/rtl';
import { Button } from '@/components/ui/Button';
import { LocalizedContent } from '@/components/localization/LocalizedContent';
import { LocalizedString } from '@/types/product';

export interface BrandValue {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: string;
}

export interface BrandTestimonial {
  id: string;
  quote: LocalizedString;
  author: {
    name: LocalizedString;
    title?: LocalizedString;
    image?: string;
  };
}

export interface BrandStoryProps {
  title: LocalizedString;
  subtitle?: LocalizedString;
  description: LocalizedString;
  values?: BrandValue[];
  image: string;
  secondaryImage?: string;
  testimonial?: BrandTestimonial;
  ctaText?: LocalizedString;
  ctaLink?: string;
  statistics?: {
    value: string | number;
    label: LocalizedString;
  }[];
  badges?: {
    text: LocalizedString;
    icon?: string;
  }[];
  theme?: 'light' | 'dark';
  alignment?: 'left' | 'right';
  className?: string;
}

export const BrandStory: React.FC<BrandStoryProps> = ({
  title,
  subtitle,
  description,
  values,
  image,
  secondaryImage,
  testimonial,
  ctaText,
  ctaLink,
  statistics,
  badges,
  theme = 'light',
  alignment = 'left',
  className,
}) => {
  const { isRTL, direction, flip } = useDirectionalStyles();
  
  // Apply RTL adjustments to content alignment
  const contentAlignment = flip(alignment, alignment === 'left' ? 'right' : 'left');
  
  // Determine text colors based on theme
  const textColors = theme === 'dark' 
    ? { title: 'text-white', subtitle: 'text-white/90', description: 'text-white/80' } 
    : { title: 'text-neutral-900', subtitle: 'text-neutral-700', description: 'text-neutral-600' };
  
  return (
    <section 
      className={cn(
        "py-16",
        theme === 'dark' ? 'bg-neutral-900' : 'bg-white',
        className
      )}
      dir={direction}
    >
      <div className="container mx-auto px-4">
        <div className={cn(
          "flex flex-col lg:flex-row gap-12",
          contentAlignment === 'right' ? 'lg:flex-row-reverse' : ''
        )}>
          {/* Image column */}
          <div className="lg:w-1/2">
            <div className="relative h-[400px] lg:h-[600px] rounded-lg overflow-hidden">
              <Image
                src={image}
                alt={title.en || Object.values(title)[0]}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              
              {/* Secondary image overlay - tactical focus */}
              {secondaryImage && (
                <div className={cn(
                  "absolute w-2/3 h-1/2",
                  contentAlignment === 'right' ? 'bottom-8 left-0 -ml-5' : 'bottom-8 right-0 -mr-5'
                )}>
                  <div className="relative w-full h-full shadow-xl">
                    <Image
                      src={secondaryImage}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              )}
              
              {/* Badges */}
              {badges && badges.length > 0 && (
                <div className={cn(
                  "absolute top-4 flex flex-col gap-2",
                  contentAlignment === 'right' ? 'right-4' : 'left-4'
                )}>
                  {badges.map((badge, index) => (
                    <div 
                      key={index}
                      className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary-600 text-white text-sm font-medium"
                    >
                      {badge.icon && (
                        <Image
                          src={badge.icon}
                          alt=""
                          width={16}
                          height={16}
                          className={cn("object-contain", isRTL ? "ml-1.5" : "mr-1.5")}
                        />
                      )}
                      <LocalizedContent content={badge.text} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Content column */}
          <div className={cn(
            "lg:w-1/2 flex flex-col justify-center",
            isRTL ? "text-right" : "text-left"
          )}>
            {subtitle && (
              <div className={cn("mb-2 text-lg font-medium", textColors.subtitle)}>
                <LocalizedContent content={subtitle} />
              </div>
            )}
            
            <h2 className={cn("text-3xl md:text-4xl font-bold mb-6", textColors.title)}>
              <LocalizedContent content={title} />
            </h2>
            
            <div className={cn("prose max-w-none mb-8", textColors.description, theme === 'dark' ? 'prose-invert' : '')}>
              <LocalizedContent content={description} />
            </div>
            
            {/* Brand values - durability and reliability */}
            {values && values.length > 0 && (
              <div className="space-y-6 mb-8">
                {values.map(value => (
                  <div 
                    key={value.id}
                    className={cn(
                      "flex items-start",
                      isRTL ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <div className={cn(
                      "flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center",
                      isRTL ? "ml-4" : "mr-4"
                    )}>
                      <Image
                        src={value.icon}
                        alt=""
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className={cn("text-xl font-bold mb-1", textColors.title)}>
                        <LocalizedContent content={value.title} />
                      </h3>
                      <p className={cn("text-base", textColors.description)}>
                        <LocalizedContent content={value.description} />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Statistics */}
            {statistics && statistics.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {statistics.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={cn("text-3xl font-bold mb-1", textColors.title)}>
                      {stat.value}
                    </div>
                    <div className={cn("text-sm", textColors.description)}>
                      <LocalizedContent content={stat.label} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Testimonial */}
            {testimonial && (
              <div className={cn(
                "mb-8 p-4 border-l-4 border-primary-600",
                theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-50',
                isRTL ? "border-l-0 border-r-4 pr-4" : "pl-4"
              )}>
                <blockquote>
                  <p className={cn("text-lg italic mb-3", textColors.description)}>
                    <LocalizedContent content={testimonial.quote} />
                  </p>
                  <div className="flex items-center">
                    {testimonial.author.image && (
                      <div className={cn(
                        "flex-shrink-0",
                        isRTL ? "ml-3" : "mr-3"
                      )}>
                        <Image
                          src={testimonial.author.image}
                          alt={testimonial.author.name.en || Object.values(testimonial.author.name)[0]}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                    )}
                    <div>
                      <div className={cn("font-medium", textColors.title)}>
                        <LocalizedContent content={testimonial.author.name} />
                      </div>
                      {testimonial.author.title && (
                        <div className={cn("text-sm", textColors.description)}>
                          <LocalizedContent content={testimonial.author.title} />
                        </div>
                      )}
                    </div>
                  </div>
                </blockquote>
              </div>
            )}
            
            {/* CTA */}
            {ctaText && ctaLink && (
              <div className="mt-2">
                <Button size="lg" asChild>
                  <Link href={ctaLink}>
                    <LocalizedContent content={ctaText} />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Pre-defined paths for brand features icons
export const BrandFeatureIcons = {
  FastShipping: '/images/features/fast-shipping.svg',
  Quality: '/images/features/quality.svg',
  Support: '/images/features/support.svg',
  Rewards: '/images/features/rewards.svg',
}; 
