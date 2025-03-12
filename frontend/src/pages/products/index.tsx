import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout/Layout';
import { FilterSidebar, FilterGroup, PriceRange } from '@/components/products/FilterSidebar';
import { ProductGrid, ProductGridItem } from '@/components/products/ProductGrid';

// Mock data for products
const mockProducts: ProductGridItem[] = [
  {
    id: 'prod-1',
    name: 'Wireless Noise-Cancelling Headphones',
    slug: 'wireless-noise-cancelling-headphones',
    price: 249.99,
    image: '/images/products/headphones.svg',
    rating: 4.8,
    reviewCount: 156,
    isNew: true,
    brand: 'SoundMaster',
  },
  {
    id: 'prod-2',
    name: 'Smart Watch Pro',
    slug: 'smart-watch-pro',
    price: 399.99,
    image: '/images/products/smartwatch.svg',
    rating: 4.6,
    reviewCount: 98,
    isOnSale: true,
    discount: 15,
    brand: 'TechGear',
  },
  {
    id: 'prod-3',
    name: 'Ultra HD 4K Monitor',
    slug: 'ultra-hd-4k-monitor',
    price: 599.99,
    image: '/images/products/monitor.svg',
    rating: 4.9,
    reviewCount: 72,
    brand: 'VisualPro',
  },
  {
    id: 'prod-4',
    name: 'Ergonomic Office Chair',
    slug: 'ergonomic-office-chair',
    price: 249.99,
    image: '/images/products/chair.svg',
    rating: 4.7,
    reviewCount: 124,
    brand: 'ComfortPlus',
  },
  {
    id: 'prod-5',
    name: 'Mechanical Keyboard',
    slug: 'mechanical-keyboard',
    price: 129.99,
    image: '/images/products/keyboard.svg',
    rating: 4.5,
    reviewCount: 87,
    isNew: true,
    brand: 'TechGear',
  },
  {
    id: 'prod-6',
    name: 'Wireless Gaming Mouse',
    slug: 'wireless-gaming-mouse',
    price: 79.99,
    image: '/images/products/mouse.svg',
    rating: 4.4,
    reviewCount: 63,
    isOnSale: true,
    discount: 10,
    brand: 'GameMaster',
  },
  {
    id: 'prod-7',
    name: 'Portable Bluetooth Speaker',
    slug: 'portable-bluetooth-speaker',
    price: 89.99,
    image: '/images/products/speaker.svg',
    rating: 4.3,
    reviewCount: 42,
    brand: 'SoundMaster',
  },
  {
    id: 'prod-8',
    name: 'Laptop Stand',
    slug: 'laptop-stand',
    price: 49.99,
    image: '/images/products/laptop-stand.svg',
    rating: 4.2,
    reviewCount: 38,
    brand: 'WorkWell',
  },
  {
    id: 'prod-9',
    name: 'Wireless Earbuds',
    slug: 'wireless-earbuds',
    price: 129.99,
    image: '/images/products/earbuds.svg',
    rating: 4.6,
    reviewCount: 112,
    isNew: true,
    brand: 'SoundMaster',
  },
];

// Mock data for filter categories
const categoryFilters: FilterGroup = {
  id: 'categories',
  name: 'Categories',
  options: [
    { id: 'electronics', label: 'Electronics', count: 15 },
    { id: 'office', label: 'Office Supplies', count: 8 },
    { id: 'audio', label: 'Audio', count: 12 },
    { id: 'accessories', label: 'Accessories', count: 20 },
  ],
};

// Mock data for filter brands
const brandFilters: FilterGroup = {
  id: 'brands',
  name: 'Brands',
  options: [
    { id: 'soundmaster', label: 'SoundMaster', count: 8 },
    { id: 'techgear', label: 'TechGear', count: 12 },
    { id: 'visualpro', label: 'VisualPro', count: 5 },
    { id: 'comfortplus', label: 'ComfortPlus', count: 7 },
    { id: 'gamemaster', label: 'GameMaster', count: 9 },
    { id: 'workwell', label: 'WorkWell', count: 6 },
  ],
};

// Mock data for attribute filters
const attributeFilters: FilterGroup[] = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { id: 'black', label: 'Black', count: 18 },
      { id: 'white', label: 'White', count: 12 },
      { id: 'silver', label: 'Silver', count: 8 },
      { id: 'blue', label: 'Blue', count: 5 },
      { id: 'red', label: 'Red', count: 3 },
    ],
  },
  {
    id: 'connectivity',
    name: 'Connectivity',
    options: [
      { id: 'wireless', label: 'Wireless', count: 14 },
      { id: 'bluetooth', label: 'Bluetooth', count: 10 },
      { id: 'usb', label: 'USB', count: 8 },
      { id: 'usb-c', label: 'USB-C', count: 6 },
    ],
  },
];

// Mock price range
const priceRangeFilter: PriceRange = {
  min: 0,
  max: 1000,
};

// Sort options
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

export default function ProductsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<ProductGridItem[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    attributes: {} as Record<string, string[]>,
    price: { ...priceRangeFilter },
  });

  // Initialize filters from URL query params
  useEffect(() => {
    if (!router.isReady) return;

    const { category, brand, sort, min, max, ...rest } = router.query;

    const newFilters = { ...selectedFilters };

    // Handle category filter
    if (category) {
      newFilters.categories = Array.isArray(category) ? category : [category];
    }

    // Handle brand filter
    if (brand) {
      newFilters.brands = Array.isArray(brand) ? brand : [brand];
    }

    // Handle price range
    if (min || max) {
      newFilters.price = {
        min: min ? parseInt(min as string, 10) : priceRangeFilter.min,
        max: max ? parseInt(max as string, 10) : priceRangeFilter.max,
      };
    }

    // Handle attribute filters
    attributeFilters.forEach((attr) => {
      const value = rest[attr.id];
      if (value) {
        newFilters.attributes[attr.id] = Array.isArray(value) ? value : [value as string];
      }
    });

    // Handle sort
    if (sort) {
      setSortBy(sort as string);
    }

    setSelectedFilters(newFilters);
    
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [router.isReady, router.query, selectedFilters]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...mockProducts];

    // Filter by category
    if (selectedFilters.categories.length > 0) {
      // In a real app, this would filter by category
      // For mock data, we'll just simulate filtering
      if (selectedFilters.categories.includes('audio')) {
        result = result.filter(p => 
          p.name.toLowerCase().includes('headphone') || 
          p.name.toLowerCase().includes('speaker') ||
          p.name.toLowerCase().includes('earbud')
        );
      }
    }

    // Filter by brand
    if (selectedFilters.brands.length > 0) {
      result = result.filter(p => 
        p.brand && selectedFilters.brands.some(b => 
          p.brand?.toLowerCase() === b.toLowerCase() ||
          brandFilters.options.find(opt => opt.id === b)?.label.toLowerCase() === p.brand?.toLowerCase()
        )
      );
    }

    // Filter by price range
    result = result.filter(p => {
      const finalPrice = p.isOnSale && p.discount 
        ? p.price - (p.price * p.discount / 100) 
        : p.price;
      return finalPrice >= selectedFilters.price.min && finalPrice <= selectedFilters.price.max;
    });

    // Sort products
    switch (sortBy) {
      case 'newest':
        // In a real app, this would sort by date
        // For mock data, we'll just sort by isNew flag
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-asc':
        result.sort((a, b) => {
          const aPrice = a.isOnSale && a.discount ? a.price - (a.price * a.discount / 100) : a.price;
          const bPrice = b.isOnSale && b.discount ? b.price - (b.price * b.discount / 100) : b.price;
          return aPrice - bPrice;
        });
        break;
      case 'price-desc':
        result.sort((a, b) => {
          const aPrice = a.isOnSale && a.discount ? a.price - (a.price * a.discount / 100) : a.price;
          const bPrice = b.isOnSale && b.discount ? b.price - (b.price * b.discount / 100) : b.price;
          return bPrice - aPrice;
        });
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default: // featured
        // Keep default order
        break;
    }

    setFilteredProducts(result);
  }, [selectedFilters, sortBy]);

  // Update URL with filters
  useEffect(() => {
    if (!router.isReady) return;

    const query: Record<string, string | string[]> = {};

    // Add categories to query
    if (selectedFilters.categories.length > 0) {
      query.category = selectedFilters.categories;
    }

    // Add brands to query
    if (selectedFilters.brands.length > 0) {
      query.brand = selectedFilters.brands;
    }

    // Add price range to query if different from default
    if (selectedFilters.price.min !== priceRangeFilter.min) {
      query.min = selectedFilters.price.min.toString();
    }
    if (selectedFilters.price.max !== priceRangeFilter.max) {
      query.max = selectedFilters.price.max.toString();
    }

    // Add attributes to query
    Object.entries(selectedFilters.attributes).forEach(([key, values]) => {
      if (values.length > 0) {
        query[key] = values;
      }
    });

    // Add sort to query if not default
    if (sortBy !== 'featured') {
      query.sort = sortBy;
    }

    // Update URL without triggering a navigation
    router.push({ pathname: router.pathname, query }, undefined, { shallow: true });
  }, [selectedFilters, sortBy, router.isReady, router]);

  const handleFilterChange = (filterType: string, filterId: string, groupId?: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };

      if (filterType === 'categories') {
        if (newFilters.categories.includes(filterId)) {
          newFilters.categories = newFilters.categories.filter(id => id !== filterId);
        } else {
          newFilters.categories = [...newFilters.categories, filterId];
        }
      } else if (filterType === 'brands') {
        if (newFilters.brands.includes(filterId)) {
          newFilters.brands = newFilters.brands.filter(id => id !== filterId);
        } else {
          newFilters.brands = [...newFilters.brands, filterId];
        }
      } else if (filterType === 'attributes' && groupId) {
        if (!newFilters.attributes[groupId]) {
          newFilters.attributes[groupId] = [];
        }

        if (newFilters.attributes[groupId].includes(filterId)) {
          newFilters.attributes[groupId] = newFilters.attributes[groupId].filter(id => id !== filterId);
          if (newFilters.attributes[groupId].length === 0) {
            delete newFilters.attributes[groupId];
          }
        } else {
          newFilters.attributes[groupId] = [...newFilters.attributes[groupId], filterId];
        }
      }

      return newFilters;
    });
  };

  const handlePriceChange = (range: PriceRange) => {
    setSelectedFilters(prev => ({
      ...prev,
      price: range,
    }));
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      categories: [],
      brands: [],
      attributes: {},
      price: { ...priceRangeFilter },
    });
    setSortBy('featured');
  };

  const handleAddToCart = (productId: string) => {
    // In a real app, this would add the product to the cart
    alert(`Added product ${productId} to cart!`);
  };

  const handleAddToWishlist = (productId: string) => {
    // In a real app, this would add the product to the wishlist
    alert(`Added product ${productId} to wishlist!`);
  };

  return (
    <Layout>
      <Head>
        <title>Products | Luma</title>
        <meta name="description" content="Browse our collection of premium products." />
      </Head>

      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <div className="fixed inset-0 flex z-40 lg:hidden" role="dialog" aria-modal="true" style={{ display: mobileFiltersOpen ? 'flex' : 'none' }}>
            <div className="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" onClick={() => setMobileFiltersOpen(false)}></div>
            
            <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-neutral-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-neutral-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile filters */}
              <FilterSidebar
                categories={categoryFilters}
                brands={brandFilters}
                attributes={attributeFilters}
                priceRange={priceRangeFilter}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onPriceChange={handlePriceChange}
                onClearFilters={handleClearFilters}
                isMobileOpen={true}
              />
            </div>
          </div>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 flex items-baseline justify-between pt-8 pb-6 border-b border-neutral-200">
              <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Products</h1>

              <div className="flex items-center">
                <div className="relative inline-block text-left">
                  <select
                    id="sort-by"
                    name="sort-by"
                    className="block w-full pl-3 pr-10 py-2 text-base border-neutral-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  className="p-2 -m-2 ml-4 sm:ml-6 text-neutral-400 hover:text-neutral-500 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">Products</h2>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                {/* Filters */}
                <FilterSidebar
                  categories={categoryFilters}
                  brands={brandFilters}
                  attributes={attributeFilters}
                  priceRange={priceRangeFilter}
                  selectedFilters={selectedFilters}
                  onFilterChange={handleFilterChange}
                  onPriceChange={handlePriceChange}
                  onClearFilters={handleClearFilters}
                />

                {/* Product grid */}
                <div className="lg:col-span-3">
                  <div className="h-full">
                    <ProductGrid
                      products={filteredProducts}
                      columns={3}
                      showAddToCart={true}
                      onAddToCart={handleAddToCart}
                      onAddToWishlist={handleAddToWishlist}
                      isLoading={isLoading}
                    />
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </Layout>
  );
} 
