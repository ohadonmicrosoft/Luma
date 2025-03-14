import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { useDirectionalStyles } from "@/utils/rtl";
import {
  LocalizedContent,
  LocalizedText,
} from "@/components/localization/LocalizedContent";
import { LocalizedString } from "@/types/product";

export interface CategoryFeature {
  id: string;
  title: LocalizedString;
  description?: LocalizedString;
  icon: string;
}

export interface CategoryCard {
  id: string;
  name: LocalizedString;
  description?: LocalizedString;
  image: string;
  slug: string;
  features?: CategoryFeature[];
}

export interface CategoryShowcaseProps {
  title: string;
  description?: string;
  categories: CategoryCard[];
  className?: string;
  variant?: "grid" | "featured" | "carousel";
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  title,
  description,
  categories,
  className,
  variant = "grid",
}) => {
  const { isRTL, direction } = useDirectionalStyles();

  const renderGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="group block overflow-hidden bg-white rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="relative h-52 w-full">
            <Image
              src={category.image}
              alt={category.name.en || Object.values(category.name)[0]}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 to-neutral-900/0" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-xl font-bold">
                <LocalizedContent content={category.name} />
              </h3>
              {category.description && (
                <p className="mt-1 text-sm text-white/80">
                  <LocalizedContent content={category.description} />
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  const renderFeatured = () => (
    <div className="mt-8">
      {categories.slice(0, 1).map((category) => (
        <div key={category.id} className="relative rounded-lg overflow-hidden">
          <div className="relative aspect-[21/9]">
            <Image
              src={category.image}
              alt={category.name.en || Object.values(category.name)[0]}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/70 to-neutral-900/0" />
          </div>

          <div className="absolute inset-0 flex items-center">
            <div
              className={cn(
                "container mx-auto px-4",
                isRTL ? "text-right" : "text-left"
              )}
            >
              <div className="max-w-lg">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  <LocalizedContent content={category.name} />
                </h3>
                {category.description && (
                  <p className="text-white/80 mb-4 text-sm md:text-base">
                    <LocalizedContent content={category.description} />
                  </p>
                )}
                <Link
                  href={`/categories/${category.slug}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <LocalizedText textKey="buttons.continue" ns="common" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {categories.slice(1).map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group block overflow-hidden bg-white rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="relative h-44 w-full">
              <Image
                src={category.image}
                alt={category.name.en || Object.values(category.name)[0]}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 to-neutral-900/0" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-bold">
                  <LocalizedContent content={category.name} />
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  const renderCarousel = () => (
    <div className="mt-8 relative">
      <div
        className="flex space-x-6 overflow-x-auto pb-4 snap-x"
        dir={direction}
      >
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group block flex-shrink-0 w-72 overflow-hidden bg-white rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 snap-start"
          >
            <div className="relative h-44 w-full">
              <Image
                src={category.image}
                alt={category.name.en || Object.values(category.name)[0]}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 to-neutral-900/0" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-bold">
                  <LocalizedContent content={category.name} />
                </h3>
              </div>
            </div>
            {category.features && category.features.length > 0 && (
              <div className="p-3">
                <div className="flex flex-wrap gap-2">
                  {category.features.map((feature) => (
                    <div
                      key={feature.id}
                      className="flex items-center bg-neutral-100 rounded-full px-3 py-1 text-xs font-medium text-neutral-800"
                    >
                      <Image
                        src={feature.icon}
                        alt=""
                        width={14}
                        height={14}
                        className="mr-1"
                      />
                      <span>
                        <LocalizedContent content={feature.title} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <section className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            <LocalizedText textKey={title} ns="home" />
          </h2>
          {description && (
            <p className="mt-4 text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              <LocalizedText textKey={description} ns="home" />
            </p>
          )}
        </div>

        {variant === "grid" && renderGrid()}
        {variant === "featured" && renderFeatured()}
        {variant === "carousel" && renderCarousel()}
      </div>
    </section>
  );
};
