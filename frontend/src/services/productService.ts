import { Product, TacticalProduct, HomeProduct, ProductVariant, ProductFilterOptions } from '@/types/product';
import { Category } from '@/types/categories';

/**
 * Service for handling product-related operations
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * Fetch products with optional filtering, sorting, and pagination
 */
export async function getProducts(
  options: {
    filters?: ProductFilterOptions;
    sort?: string;
    page?: number;
    limit?: number;
    locale?: string;
  } = {}
): Promise<{ products: Product[]; total: number; page: number; totalPages: number }> {
  const { filters, sort = 'featured', page = 1, limit = 12, locale = 'en' } = options;
  
  // Build query parameters
  const params = new URLSearchParams();
  params.append('_page', page.toString());
  params.append('_limit', limit.toString());
  params.append('_sort', sort);
  params.append('locale', locale);
  
  // Add filter parameters if provided
  if (filters) {
    if (filters.categories && filters.categories.length > 0) {
      filters.categories.forEach(category => {
        params.append('categories', category);
      });
    }
    
    if (filters.brands && filters.brands.length > 0) {
      filters.brands.forEach(brand => {
        params.append('brand', brand);
      });
    }
    
    if (filters.priceRange) {
      params.append('price_gte', filters.priceRange.min.toString());
      params.append('price_lte', filters.priceRange.max.toString());
    }
    
    if (filters.inStock !== undefined) {
      params.append('isInStock', filters.inStock.toString());
    }
    
    if (filters.onSale !== undefined) {
      params.append('isOnSale', filters.onSale.toString());
    }
    
    // Handle attribute filters
    if (filters.attributes) {
      Object.entries(filters.attributes).forEach(([key, values]) => {
        values.forEach(value => {
          params.append(`specifications.${key}`, value);
        });
      });
    }
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
    
    const total = parseInt(response.headers.get('X-Total-Count') || '0', 10);
    const products = await response.json();
    
    return {
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

/**
 * Fetch a single product by slug
 */
export async function getProductBySlug(
  slug: string,
  locale: string = 'en'
): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products?slug=${slug}&locale=${locale}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.statusText}`);
    }
    
    const products = await response.json();
    
    if (products.length === 0) {
      throw new Error(`Product not found: ${slug}`);
    }
    
    return products[0];
  } catch (error) {
    console.error(`Failed to fetch product with slug ${slug}:`, error);
    throw error;
  }
}

/**
 * Fetch related products
 */
export async function getRelatedProducts(
  productId: string,
  limit: number = 4,
  locale: string = 'en'
): Promise<Product[]> {
  try {
    // First get the product to find its categories
    const product = await getProductById(productId, locale);
    
    // Then fetch products in the same categories
    const categoryIds = product.categories;
    const params = new URLSearchParams();
    params.append('_limit', limit.toString());
    params.append('locale', locale);
    params.append('id_ne', productId); // Exclude the current product
    
    categoryIds.forEach(category => {
      params.append('categories', category);
    });
    
    const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching related products: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch related products for ${productId}:`, error);
    throw error;
  }
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(
  id: string,
  locale: string = 'en'
): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}?locale=${locale}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error);
    throw error;
  }
}

/**
 * Fetch product variants for a product
 */
export async function getProductVariants(
  productId: string,
  locale: string = 'en'
): Promise<ProductVariant[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/variants?productId=${productId}&locale=${locale}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching product variants: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch variants for product ${productId}:`, error);
    throw error;
  }
}

/**
 * Check if a product is in stock
 */
export async function checkProductStock(productId: string, variantId?: string): Promise<{
  isInStock: boolean;
  stockQuantity: number;
  lowStock?: boolean;
}> {
  try {
    const endpoint = variantId 
      ? `${API_BASE_URL}/inventory/check?productId=${productId}&variantId=${variantId}`
      : `${API_BASE_URL}/inventory/check?productId=${productId}`;
      
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`Error checking product stock: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to check stock for product ${productId}:`, error);
    throw error;
  }
}

/**
 * Get available filters for products
 */
export async function getProductFilters(
  categoryId?: string,
  locale: string = 'en'
): Promise<{
  categories: Category[];
  brands: string[];
  priceRange: { min: number; max: number };
  attributes: Record<string, string[]>;
}> {
  try {
    const params = new URLSearchParams();
    params.append('locale', locale);
    
    if (categoryId) {
      params.append('categoryId', categoryId);
    }
    
    const response = await fetch(`${API_BASE_URL}/filters?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching product filters: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch product filters:', error);
    throw error;
  }
}

/**
 * Export products to CSV/JSON
 */
export async function exportProducts(
  format: 'csv' | 'json' = 'csv',
  filters?: ProductFilterOptions
): Promise<Blob> {
  try {
    const params = new URLSearchParams();
    params.append('format', format);
    
    // Add filters if provided
    if (filters) {
      if (filters.categories && filters.categories.length > 0) {
        filters.categories.forEach(category => {
          params.append('categories', category);
        });
      }
      
      if (filters.brands && filters.brands.length > 0) {
        filters.brands.forEach(brand => {
          params.append('brand', brand);
        });
      }
    }
    
    const response = await fetch(`${API_BASE_URL}/products/export?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error exporting products: ${response.statusText}`);
    }
    
    return await response.blob();
  } catch (error) {
    console.error('Failed to export products:', error);
    throw error;
  }
}

/**
 * Import products from file
 */
export async function importProducts(file: File): Promise<{
  success: boolean;
  imported: number;
  errors?: Record<string, string>;
}> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/products/import`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Error importing products: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to import products:', error);
    throw error;
  }
}

/**
 * Get featured products
 */
export async function getFeaturedProducts(
  limit: number = 8,
  locale: string = 'en'
): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    params.append('_limit', limit.toString());
    params.append('featured', 'true');
    params.append('locale', locale);
    
    const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching featured products: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch featured products:', error);
    throw error;
  }
}

/**
 * Get new arrivals
 */
export async function getNewArrivals(
  limit: number = 8,
  locale: string = 'en'
): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    params.append('_limit', limit.toString());
    params.append('isNew', 'true');
    params.append('_sort', 'createdAt');
    params.append('_order', 'desc');
    params.append('locale', locale);
    
    const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching new arrivals: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch new arrivals:', error);
    throw error;
  }
}

/**
 * Get products on sale
 */
export async function getProductsOnSale(
  limit: number = 8,
  locale: string = 'en'
): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    params.append('_limit', limit.toString());
    params.append('isOnSale', 'true');
    params.append('locale', locale);
    
    const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching products on sale: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch products on sale:', error);
    throw error;
  }
} 
