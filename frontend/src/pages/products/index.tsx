import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { FilterSidebar, FilterCategory, RangeFilter } from '@/components/products/FilterSidebar';
import { ProductResultsGrid, SortOption } from '@/components/products/ProductResultsGrid';
import { useDirectionalStyles } from '@/utils/rtl';
import { usePriceFormatter } from '@/hooks/usePriceFormatter';
import { Layout } from '@/components/layout/Layout';
import { useTranslation } from 'next-i18next';
import { getI18nServerSideProps } from '@/utils/i18n';

// Helper function to create a properly typed rangeValues tuple
const createRangeValues = (min: number, max: number): [number, number] => {
  return [min, max];
};

// Sample mock data - in real application this would come from API
const mockProducts = Array.from({ length: 24 }).map((_, index) => ({
  id: `prod-${index + 1}`,
  slug: `product-${index + 1}`,
  name: {
    en: `Product ${index + 1}`,
    he: `מוצר ${index + 1}`
  },
  description: {
    en: `This is a sample product description for product ${index + 1}`,
    he: `זהו תיאור מוצר לדוגמה עבור מוצר ${index + 1}`
  },
  price: 500 + Math.floor(Math.random() * 1500),
  currency: 'USD',
  discountedPrice: Math.random() > 0.7 ? (500 + Math.floor(Math.random() * 1000)) : undefined,
  mainImage: `/images/products/product-${(index % 6) + 1}.jpg`,
  images: [
    `/images/products/product-${(index % 6) + 1}.jpg`,
    `/images/products/product-${((index + 2) % 6) + 1}.jpg`,
  ],
  specifications: Array.from({ length: 3 }).map((_, specIndex) => ({
    id: `spec-${specIndex}`,
    name: {
      en: ['Resolution', 'Memory', 'Processor'][specIndex] || `Spec ${specIndex}`,
      he: ['רזולוציה', 'זיכרון', 'מעבד'][specIndex] || `מפרט ${specIndex}`
    },
    value: {
      en: ['4K', '16GB', '2.4GHz'][specIndex] || `Value ${specIndex}`,
      he: ['4K', '16GB', '2.4GHz'][specIndex] || `ערך ${specIndex}`
    },
    category: {
      en: 'Technical',
      he: 'טכני'
    },
    isHighlighted: specIndex === 0,
    sortOrder: specIndex
  })),
  badges: Math.random() > 0.7 ? [{
    text: {
      en: 'New',
      he: 'חדש'
    },
    type: 'new'
  }] : [],
  category: {
    id: `cat-${index % 3}`,
    name: {
      en: ['Electronics', 'Computers', 'Phones'][index % 3],
      he: ['אלקטרוניקה', 'מחשבים', 'טלפונים'][index % 3]
    }
  },
  brand: {
    id: `brand-${index % 4}`,
    name: {
      en: ['Apple', 'Samsung', 'Dell', 'Sony'][index % 4],
      he: ['אפל', 'סמסונג', 'דל', 'סוני'][index % 4]
    }
  },
  rating: 3 + Math.floor(Math.random() * 2.5),
  reviewCount: Math.floor(Math.random() * 100),
  isInStock: Math.random() > 0.2,
  stockQuantity: Math.floor(Math.random() * 100),
}));

// Mock filter categories
const mockFilterCategories: FilterCategory[] = [
  {
    id: 'categories',
    name: {
      en: 'Categories',
      he: 'קטגוריות',
    },
    selectionFilters: [
      {
        id: 'product-categories',
        name: {
          en: 'Product Categories',
          he: 'קטגוריות מוצרים',
        },
        multiSelect: true,
        options: [
          {
            id: 'cat-0',
            name: {
              en: 'Electronics',
              he: 'אלקטרוניקה'
            },
            count: 8,
            selected: false,
          },
          {
            id: 'cat-1',
            name: {
              en: 'Computers',
              he: 'מחשבים'
            },
            count: 8,
            selected: false,
          },
          {
            id: 'cat-2',
            name: {
              en: 'Phones',
              he: 'טלפונים'
            },
            count: 8,
            selected: false,
          },
        ],
      },
    ],
  },
  {
    id: 'brands',
    name: {
      en: 'Brands',
      he: 'מותגים',
    },
    selectionFilters: [
      {
        id: 'product-brands',
        name: {
          en: 'Manufacturers',
          he: 'יצרנים',
        },
        multiSelect: true,
        options: [
          {
            id: 'brand-0',
            name: {
              en: 'Apple',
              he: 'אפל'
            },
            count: 6,
            selected: false,
          },
          {
            id: 'brand-1',
            name: {
              en: 'Samsung',
              he: 'סמסונג'
            },
            count: 6,
            selected: false,
          },
          {
            id: 'brand-2',
            name: {
              en: 'Dell',
              he: 'דל'
            },
            count: 6,
            selected: false,
          },
          {
            id: 'brand-3',
            name: {
              en: 'Sony',
              he: 'סוני'
            },
            count: 6,
            selected: false,
          },
        ],
      },
    ],
  },
  {
    id: 'price',
    name: {
      en: 'Price',
      he: 'מחיר',
    },
    rangeFilters: [
      {
        id: 'price-range',
        name: {
          en: 'Price Range',
          he: 'טווח מחירים',
        },
        min: 0,
        max: 2000,
        step: 10,
        unit: '$',
        rangeValues: createRangeValues(0, 2000),
      },
    ],
  },
  {
    id: 'tech-specs',
    name: {
      en: 'Technical Specifications',
      he: 'מפרט טכני',
    },
    selectionFilters: [
      {
        id: 'processor',
        name: {
          en: 'Processor',
          he: 'מעבד',
        },
        multiSelect: true,
        options: [
          {
            id: 'i5',
            name: {
              en: 'Intel i5',
              he: 'אינטל i5'
            },
            count: 4,
            selected: false,
          },
          {
            id: 'i7',
            name: {
              en: 'Intel i7',
              he: 'אינטל i7'
            },
            count: 6,
            selected: false,
          },
          {
            id: 'i9',
            name: {
              en: 'Intel i9',
              he: 'אינטל i9'
            },
            count: 2,
            selected: false,
          },
          {
            id: 'amd',
            name: {
              en: 'AMD Ryzen',
              he: 'AMD Ryzen'
            },
            count: 4,
            selected: false,
          },
        ],
      },
      {
        id: 'memory',
        name: {
          en: 'Memory',
          he: 'זיכרון',
        },
        multiSelect: true,
        options: [
          {
            id: '8gb',
            name: {
              en: '8GB',
              he: '8GB'
            },
            count: 5,
            selected: false,
          },
          {
            id: '16gb',
            name: {
              en: '16GB',
              he: '16GB'
            },
            count: 8,
            selected: false,
          },
          {
            id: '32gb',
            name: {
              en: '32GB',
              he: '32GB'
            },
            count: 3,
            selected: false,
          },
        ],
      },
    ],
  },
];

// Mock sort options
const mockSortOptions: SortOption[] = [
  {
    id: 'price-asc',
    name: {
      en: 'Price: Low to High',
      he: 'מחיר: מהנמוך לגבוה'
    }
  },
  {
    id: 'price-desc',
    name: {
      en: 'Price: High to Low',
      he: 'מחיר: מהגבוה לנמוך'
    }
  },
  {
    id: 'newest',
    name: {
      en: 'Newest First',
      he: 'החדש ביותר תחילה'
    }
  },
  {
    id: 'rating',
    name: {
      en: 'Highest Rated',
      he: 'דירוג גבוה ביותר'
    }
  },
];

interface ProductsPageProps {
  initialProducts: typeof mockProducts;
  initialFilters: ParsedUrlQuery;
}

export default function ProductsPage({ initialProducts, initialFilters }: ProductsPageProps) {
  const router = useRouter();
  const { isRTL } = useDirectionalStyles();
  const { formatPrice } = usePriceFormatter();
  const { t, i18n } = useTranslation('common');
  
  // State for products list and loading state
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  // State for mobile filter visibility
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // State for applied filters
  const [filterCategories, setFilterCategories] = useState<FilterCategory[]>(mockFilterCategories);
  const [activeSort, setActiveSort] = useState<string>('newest');
  
  // State for multi-selection
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [showMultiSelect, setShowMultiSelect] = useState(false);
  
  // Count active filters
  const countActiveFilters = () => {
    let count = 0;
    
    filterCategories.forEach(category => {
      // Count selected options in selection filters
      category.selectionFilters?.forEach(filter => {
        count += filter.options.filter(opt => opt.selected).length;
      });
      
      // Count changed range filters
      category.rangeFilters?.forEach(filter => {
        if (filter.rangeValues[0] > filter.min || filter.rangeValues[1] < filter.max) {
          count += 1;
        }
      });
    });
    
    return count;
  };
  
  // Handle filter changes
  const handleFilterChange = (categoryId: string, filterId: string, value: unknown) => {
    setFilterCategories(prevCategories => {
      const newCategories = [...prevCategories];
      const categoryIndex = newCategories.findIndex(c => c.id === categoryId);
      
      if (categoryIndex === -1) return prevCategories;
      
      // Handle selection filters (checkboxes)
      if (typeof value === 'object' && value !== null && 'optionId' in value) {
        const { optionId, checked, multiSelect } = value as { 
          optionId: string; 
          checked: boolean; 
          multiSelect?: boolean 
        };
        
        const selectionFilterIndex = newCategories[categoryIndex].selectionFilters?.findIndex(
          f => f.id === filterId
        );
        
        if (selectionFilterIndex === undefined || selectionFilterIndex === -1) return prevCategories;
        
        const filter = newCategories[categoryIndex].selectionFilters![selectionFilterIndex];
        
        // Single select (radio) behavior
        if (!multiSelect) {
          filter.options.forEach(opt => {
            opt.selected = opt.id === optionId ? checked : false;
          });
        }
        // Multi-select (checkbox) behavior
        else {
          const optionIndex = filter.options.findIndex(opt => opt.id === optionId);
          if (optionIndex !== -1) {
            filter.options[optionIndex].selected = checked;
          }
        }
      }
      // Handle range filters
      else if (Array.isArray(value) && value.length === 2) {
        const rangeFilterIndex = newCategories[categoryIndex].rangeFilters?.findIndex(
          f => f.id === filterId
        );
        
        if (rangeFilterIndex === undefined || rangeFilterIndex === -1) return prevCategories;
        
        if (newCategories[categoryIndex].rangeFilters) {
          // Ensure value is properly typed as [number, number]
          const typedValue: [number, number] = [value[0], value[1]];
          newCategories[categoryIndex].rangeFilters![rangeFilterIndex].rangeValues = typedValue;
        }
      }
      
      return newCategories;
    });
    
    // Simulate loading new filtered products
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // In a real app, you would fetch filtered products from the API
    }, 800);
  };
  
  // Handle reset of all filters
  const handleResetFilters = () => {
    setFilterCategories(prevCategories => {
      const newCategories = [...prevCategories];
      
      newCategories.forEach(category => {
        // Reset selection filters
        category.selectionFilters?.forEach(filter => {
          filter.options.forEach(opt => {
            opt.selected = false;
          });
        });
        
        // Reset range filters with proper typing
        category.rangeFilters?.forEach(filter => {
          filter.rangeValues = createRangeValues(filter.min, filter.max);
        });
      });
      
      return newCategories;
    });
    
    // Simulate loading new filtered products
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // In a real app, you would fetch filtered products from the API
    }, 800);
  };
  
  // Handle sort changes
  const handleSortChange = (sortId: string) => {
    setActiveSort(sortId);
    
    // Simulate loading new sorted products
    setLoading(true);
    setTimeout(() => {
      const sortedProducts = [...products];
      
      switch (sortId) {
        case 'price-asc':
          sortedProducts.sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price));
          break;
        case 'price-desc':
          sortedProducts.sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price));
          break;
        case 'rating':
          sortedProducts.sort((a, b) => b.rating - a.rating);
          break;
        default:
          // For 'newest', we would normally sort by date, but in this mock we'll just use the original order
          break;
      }
      
      setProducts(sortedProducts);
      setLoading(false);
      // In a real app, you would fetch sorted products from the API
    }, 500);
  };
  
  // Handle load more button
  const handleLoadMore = () => {
    setLoading(true);
    
    // Simulate loading more products
    setTimeout(() => {
      // In a real app, you would fetch more products from the API
      // For this example, we'll just add the same products again
      if (products.length >= 48) {
        setHasMore(false);
      } else {
        setProducts(prev => [...prev, ...mockProducts.slice(0, 8)]);
      }
      setLoading(false);
    }, 1000);
  };
  
  // Handle product selection for multi-select actions
  const handleProductSelection = (productId: string, selected: boolean) => {
    if (selected) {
      setSelectedProductIds(prev => [...prev, productId]);
    } else {
      setSelectedProductIds(prev => prev.filter(id => id !== productId));
    }
  };
  
  // Handle toggle multi-select mode
  const toggleMultiSelect = () => {
    setShowMultiSelect(prev => !prev);
    if (showMultiSelect) {
      setSelectedProductIds([]);
    }
  };
  
  // Handle applying selected filters (for mobile view)
  const handleApplyFilters = () => {
    setShowMobileFilters(false);
    // Additional logic if needed
  };
  
  return (
    <Layout>
      <Head>
        <title>{isRTL ? t('products.page_title') : 'Products - Luma'}</title>
        <meta name="description" content={t('products.meta_description')} />
      </Head>
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile filters toggle */}
          {showMobileFilters && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setShowMobileFilters(false)} />
          )}
          
          {/* Filter sidebar */}
          <div className={`md:w-72 flex-shrink-0 ${showMobileFilters ? 'fixed inset-0 z-50 md:static md:z-auto' : 'hidden md:block'}`}>
            <FilterSidebar
              categories={filterCategories}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              onApplyFilters={handleApplyFilters}
              filtersCount={countActiveFilters()}
              mobileView={showMobileFilters}
              onClose={() => setShowMobileFilters(false)}
            />
          </div>
          
          {/* Product results */}
          <div className="flex-1">
            {/* Multi-select actions */}
            {showMultiSelect && selectedProductIds.length > 0 && (
              <div className="bg-white border border-neutral-200 rounded-md p-3 mb-4 flex justify-between items-center">
                <div>
                  <span className="font-medium">{selectedProductIds.length}</span> {selectedProductIds.length === 1 ? 'product' : 'products'} selected
                </div>
                <div className="flex gap-2">
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    {isRTL ? 'השווה' : 'Compare'}
                  </button>
                  <button className="text-sm text-red-600 hover:text-red-800">
                    {isRTL ? 'הסר' : 'Remove'}
                  </button>
                </div>
              </div>
            )}
            
            {/* Product grid */}
            <ProductResultsGrid
              products={products}
              loading={loading}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
              sortOptions={mockSortOptions}
              activeSort={activeSort}
              onSortChange={handleSortChange}
              resultsCount={products.length}
              totalCount={50} // Mock total count
              onToggleFilters={() => setShowMobileFilters(true)}
              onSelectProduct={handleProductSelection}
              selectedProductIds={selectedProductIds}
              showMultiSelect={showMultiSelect}
              gridColumns={3}
              emptyStateMessage={{
                en: 'No products found',
                he: 'לא נמצאו מוצרים'
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // In a real app, you would fetch products and filters based on query params
  const { query } = context;
  
  return {
    props: {
      initialProducts: mockProducts,
      initialFilters: query,
      ...(await getI18nServerSideProps(context))
    },
  };
}; 
