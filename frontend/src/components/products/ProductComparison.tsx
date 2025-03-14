import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { useDirectionalStyles } from "@/utils/rtl";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LocalizedContent } from "@/components/localization/LocalizedContent";
import { usePriceFormatter } from "@/utils/currency";
import { Currency } from "@/utils/currency";
import { Specification } from "./TechnicalSpecs";
import { useTranslation } from "next-i18next";
import { ChevronDown, ChevronUp, X } from "lucide-react";

export interface Product {
  id: string;
  slug: string;
  name: Record<string, string>;
  mainImage: string;
  price: number;
  currency?: Currency;
  discountedPrice?: number;
  specifications: Specification[];
  brand?: {
    id: string;
    name: Record<string, string>;
    logo?: string;
  };
}

export interface ProductComparisonProps {
  products: Product[];
  onRemoveProduct?: (productId: string) => void;
  showDifferences?: boolean;
  className?: string;
}

export const ProductComparison: React.FC<ProductComparisonProps> = ({
  products,
  onRemoveProduct,
  showDifferences = false,
  className,
}) => {
  const { isRTL } = useDirectionalStyles();
  const formatPrice = usePriceFormatter();

  // Group specifications by category
  const groupedSpecifications = useMemo(() => {
    // Get category name (moved inside useMemo)
    function getCategoryName(categoryId: string): string {
      if (categoryId === "default") return "General Specifications";

      // Try to find the category name from any product's specs
      for (const product of products) {
        for (const spec of product.specifications) {
          if (spec.category === categoryId && spec.name.en) {
            return spec.name.en;
          }
        }
      }

      return categoryId;
    }

    // Get Hebrew category name (moved inside useMemo)
    function getCategoryNameHebrew(categoryId: string): string {
      if (categoryId === "default") return "מפרט כללי";

      // Try to find the category name from any product's specs
      for (const product of products) {
        for (const spec of product.specifications) {
          if (spec.category === categoryId && spec.name.he) {
            return spec.name.he;
          }
        }
      }

      return categoryId;
    }

    // Get all unique spec IDs across products
    const allSpecIds = new Set<string>();
    products.forEach((product) =>
      product.specifications.forEach((spec) => allSpecIds.add(spec.id))
    );

    // If showing only differences, filter out specs with same values
    const relevantSpecIds = showDifferences
      ? Array.from(allSpecIds).filter((specId) =>
          hasDifferentValues(products, specId)
        )
      : Array.from(allSpecIds);

    // Collect all specifications
    const allSpecs: Specification[] = [];
    relevantSpecIds.forEach((specId) => {
      products.forEach((product) => {
        const spec = getProductSpec(product, specId);
        if (spec && !allSpecs.some((s) => s.id === spec.id)) {
          allSpecs.push(spec);
        }
      });
    });

    // Group by category
    const groupedSpecs: Record<string, Specification[]> = {};
    allSpecs.forEach((spec) => {
      const categoryId = spec.category || "default";
      if (!groupedSpecs[categoryId]) {
        groupedSpecs[categoryId] = [];
      }
      groupedSpecs[categoryId].push(spec);
    });

    // Format for rendering
    return Object.entries(groupedSpecs).map(([categoryId, specs]) => ({
      id: categoryId,
      name: {
        en: getCategoryName(categoryId),
        he: getCategoryNameHebrew(categoryId),
      },
      specs: specs.sort((a, b) => a.id.localeCompare(b.id)),
    }));
  }, [products, showDifferences]);

  function getProductSpec(
    product: Product,
    specId: string
  ): Specification | undefined {
    return product.specifications.find((spec) => spec.id === specId);
  }

  // Check if a specification has different values across products
  function hasDifferentValues(products: Product[], specId: string): boolean {
    const values = products
      .map(
        (product) => product.specifications.find((s) => s.id === specId)?.value
      )
      .filter((value) => value !== undefined);

    if (values.length <= 1) return false;

    const firstValue = values[0];
    return values.some((v) => v !== firstValue);
  }

  if (products.length === 0) {
    return (
      <Card className={cn("max-w-3xl mx-auto", className)}>
        <CardContent className="p-8 text-center">
          <p className="text-neutral-500">
            {isRTL
              ? "אין מוצרים להשוואה. אנא בחר מוצרים להשוואה."
              : "No products to compare. Please select products to compare."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("max-w-5xl mx-auto overflow-x-auto", className)}>
      <CardHeader>
        <CardTitle className="flex-1">
          {isRTL ? "השוואת מוצרים" : "Product Comparison"}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="min-w-max">
          {/* Product headers */}
          <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(180px,1fr))] border-b border-neutral-200">
            <div className="p-4 font-medium text-neutral-500"></div>

            {products.map((product) => (
              <div
                key={product.id}
                className="p-4 text-center border-l border-neutral-200"
              >
                <div className="relative mb-3 mx-auto w-24 h-24">
                  <Image
                    src={product.mainImage}
                    alt={product.name.en || Object.values(product.name)[0]}
                    fill
                    sizes="96px"
                    className="object-contain"
                  />
                </div>

                <h3 className="font-medium text-neutral-800 mb-1">
                  <Link
                    href={`/products/${product.slug}`}
                    className="hover:text-primary-600 hover:underline"
                  >
                    <LocalizedContent content={product.name} />
                  </Link>
                </h3>

                <div className="flex justify-center items-center gap-2 mb-1">
                  {product.discountedPrice !== undefined && (
                    <span className="text-red-600 font-medium">
                      {formatPrice(
                        product.discountedPrice,
                        product.currency || Currency.USD
                      )}
                    </span>
                  )}
                  <span
                    className={cn(
                      product.discountedPrice !== undefined
                        ? "text-neutral-500 line-through text-xs"
                        : "text-neutral-900"
                    )}
                  >
                    {formatPrice(
                      product.price,
                      product.currency || Currency.USD
                    )}
                  </span>
                </div>

                {onRemoveProduct && (
                  <button
                    onClick={() => onRemoveProduct(product.id)}
                    className="text-xs text-red-600 hover:underline mt-1"
                  >
                    {isRTL ? "הסר" : "Remove"}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Specifications by category */}
          {groupedSpecifications.map((category) => (
            <div key={category.id}>
              {/* Category header */}
              <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(180px,1fr))] bg-neutral-100">
                <div className="p-3 font-medium">
                  <LocalizedContent content={category.name} />
                </div>
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 border-l border-neutral-200"
                  ></div>
                ))}
              </div>

              {/* Specifications rows */}
              {category.specs.map((spec) => (
                <div
                  key={spec.id}
                  className={cn(
                    "grid grid-cols-[200px_repeat(auto-fill,minmax(180px,1fr))] border-t border-neutral-200",
                    hasDifferentValues(products, spec.id) ? "bg-amber-50" : ""
                  )}
                >
                  <div className="p-3 text-neutral-700">
                    <LocalizedContent content={spec.name} />
                  </div>

                  {products.map((product) => {
                    const productSpec = getProductSpec(product, spec.id);
                    return (
                      <div
                        key={product.id}
                        className="p-3 border-l border-neutral-200 text-center"
                      >
                        {productSpec ? (
                          <span
                            className={cn(
                              "font-medium",
                              hasDifferentValues(products, spec.id) &&
                                "text-primary-700"
                            )}
                          >
                            {productSpec.unit
                              ? `${productSpec.value} ${productSpec.unit}`
                              : String(productSpec.value)}
                          </span>
                        ) : (
                          <span className="text-neutral-400">&mdash;</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 flex justify-end">
        <Button
          variant="outline"
          onClick={() => window.print()}
          className="mr-2"
        >
          {isRTL ? "הדפס השוואה" : "Print Comparison"}
        </Button>
      </CardFooter>
    </Card>
  );
};
