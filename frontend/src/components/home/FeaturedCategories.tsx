import React from 'react';
import Link from 'next/link';

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

export interface FeaturedCategoriesProps {
  title: string;
  subtitle?: string;
  categories: CategoryItem[];
}

export function FeaturedCategories({ title, subtitle, categories }: FeaturedCategoriesProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">{title}</h2>
          {subtitle && (
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white mb-1">{category.name}</h3>
                  <p className="text-white/80 text-sm">
                    {category.productCount} {category.productCount === 1 ? 'product' : 'products'}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 
