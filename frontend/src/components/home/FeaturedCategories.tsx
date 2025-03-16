import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { useDirectionalStyles } from "@/utils/rtl";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LocalizedContent } from "@/components/localization/LocalizedContent";
import { LocalizedString } from "@/types/product";

export interface CategoryItem {
  id: string;
  name: LocalizedString;
  description?: LocalizedString;
  image: string;
  slug: string;
  featuredProducts?: number;
  usageScenarios?: {
    name: LocalizedString;
    icon?: string;
  }[];
}

export interface CategoryGroup {
  id: string;
  title: LocalizedString;
  description?: LocalizedString;
  categories: CategoryItem[];
  viewAllUrl: string;
  viewAllLabel: LocalizedString;
  layout?: "grid" | "showcase" | "compact";
}

export interface FeaturedCategoriesProps {
  categoryGroups: CategoryGroup[];
  className?: string;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({
  categoryGroups,
  className,
}) => {
  const { isRTL } = useDirectionalStyles();

  if (categoryGroups.length === 0) return null;

  return (
    <div className={cn("py-12 space-y-16", className)}>
      {categoryGroups.map((group) => (
        <section key={group.id} className="container mx-auto px-4">
          <div
            className={cn(
              "flex items-end justify-between mb-8",
              isRTL ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div className={cn(isRTL ? "text-right" : "text-left")}>
              <h2 className="text-3xl font-bold text-neutral-900">
                <LocalizedContent content={group.title} />
              </h2>
              {group.description && (
                <p className="mt-2 text-neutral-600 max-w-2xl">
                  <LocalizedContent content={group.description} />
                </p>
              )}
            </div>

            <Link
              href={group.viewAllUrl}
              className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
            >
              <LocalizedContent content={group.viewAllLabel} />
              <svg
                className={cn(
                  "w-5 h-5 ml-1",
                  isRTL ? "transform rotate-180 mr-1 ml-0" : "ml-1"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>

          {/* Grid Layout */}
          {group.layout === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.categories.map((category) => (
                <Card
                  key={category.id}
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg"
                  clickable
                >
                  <Link href={`/categories/${category.slug}`} className="block">
                    <div className="relative h-48 w-full">
                      <Image
                        src={category.image}
                        alt={
                          category.name.en || Object.values(category.name)[0]
                        }
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </Link>

                  <CardContent className="p-4">
                    <Link
                      href={`/categories/${category.slug}`}
                      className={cn(
                        "block",
                        isRTL ? "text-right" : "text-left"
                      )}
                    >
                      <h3 className="text-xl font-semibold text-neutral-900 mb-1 hover:text-primary-600">
                        <LocalizedContent content={category.name} />
                      </h3>
                    </Link>

                    {category.description && (
                      <p
                        className={cn(
                          "text-neutral-600 mb-3 line-clamp-2",
                          isRTL ? "text-right" : "text-left"
                        )}
                      >
                        <LocalizedContent content={category.description} />
                      </p>
                    )}

                    {/* Usage scenarios */}
                    {category.usageScenarios &&
                      category.usageScenarios.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {category.usageScenarios.map((scenario, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800"
                            >
                              {scenario.icon && (
                                <Image
                                  src={scenario.icon}
                                  alt=""
                                  width={12}
                                  height={12}
                                  className={cn(
                                    "object-contain",
                                    isRTL ? "ml-1" : "mr-1"
                                  )}
                                />
                              )}
                              <LocalizedContent content={scenario.name} />
                            </span>
                          ))}
                        </div>
                      )}

                    <div
                      className={cn("mt-4", isRTL ? "text-right" : "text-left")}
                    >
                      <Link
                        href={`/categories/${category.slug}`}
                        className="inline-block"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="font-medium"
                        >
                          {isRTL ? "استعرض الفئة" : "Explore Category"}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Showcase Layout - for highlighting tactical and outdoor categories */}
          {group.layout === "showcase" && (
            <div className="space-y-10">
              {group.categories.map((category, index) => (
                <div
                  key={category.id}
                  className={cn(
                    "flex flex-col lg:flex-row gap-6",
                    index % 2 === 1 && "lg:flex-row-reverse"
                  )}
                >
                  <div className="lg:w-1/2">
                    <div className="relative rounded-lg overflow-hidden h-80 lg:h-full">
                      <Image
                        src={category.image}
                        alt={
                          category.name.en || Object.values(category.name)[0]
                        }
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />

                      {/* Category label overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full mb-2">
                            <LocalizedContent content={category.name} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "lg:w-1/2 flex flex-col justify-center",
                      isRTL ? "text-right" : "text-left"
                    )}
                  >
                    <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                      <LocalizedContent content={category.name} />
                    </h3>

                    {category.description && (
                      <p className="text-neutral-600 mb-6">
                        <LocalizedContent content={category.description} />
                      </p>
                    )}

                    {/* Usage scenarios */}
                    {category.usageScenarios &&
                      category.usageScenarios.length > 0 && (
                        <div className="space-y-3 mb-6">
                          <h4 className="font-medium text-neutral-800">
                            {isRTL
                              ? "سيناريوهات الاستخدام:"
                              : "Usage Scenarios:"}
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {category.usageScenarios.map((scenario, idx) => (
                              <div
                                key={idx}
                                className={cn(
                                  "flex items-center p-2 bg-neutral-50 rounded-lg",
                                  isRTL ? "flex-row-reverse" : "flex-row"
                                )}
                              >
                                {scenario.icon && (
                                  <div className="flex-shrink-0">
                                    <Image
                                      src={scenario.icon}
                                      alt=""
                                      width={20}
                                      height={20}
                                      className={cn(
                                        "object-contain",
                                        isRTL ? "ml-2" : "mr-2"
                                      )}
                                    />
                                  </div>
                                )}
                                <span className="text-sm font-medium text-neutral-800">
                                  <LocalizedContent content={scenario.name} />
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    <div>
                      <Link
                        href={`/categories/${category.slug}`}
                        className="inline-block"
                      >
                        <Button>
                          {isRTL ? "استعرض المنتجات" : "Browse Products"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Compact Layout - for small categories list */}
          {group.layout === "compact" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {group.categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group"
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-neutral-100 flex items-center justify-center">
                      <Image
                        src={category.image}
                        alt={
                          category.name.en || Object.values(category.name)[0]
                        }
                        fill
                        sizes="(max-width: 640px) 96px, 128px"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-neutral-800 group-hover:text-primary-600">
                      <LocalizedContent content={category.name} />
                    </h3>
                    {category.featuredProducts !== undefined && (
                      <span className="text-xs text-neutral-500">
                        {category.featuredProducts}{" "}
                        {isRTL ? "منتجات" : "products"}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
};
