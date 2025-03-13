import { Brand } from '@/types/product';

/**
 * Service for handling brand operations
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * Get all brands
 */
export async function getAllBrands(
  locale: string = 'en',
  includeInactive: boolean = false
): Promise<Brand[]> {
  try {
    const params = new URLSearchParams();
    params.append('locale', locale);
    
    if (!includeInactive) {
      params.append('isActive', 'true');
    }
    
    const response = await fetch(`${API_BASE_URL}/brands?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching brands: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch brands:', error);
    throw error;
  }
}

/**
 * Get brand by ID
 */
export async function getBrandById(
  id: string,
  locale: string = 'en'
): Promise<Brand> {
  try {
    const params = new URLSearchParams();
    params.append('locale', locale);
    
    const response = await fetch(`${API_BASE_URL}/brands/${id}?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching brand: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch brand with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Get brand by slug
 */
export async function getBrandBySlug(
  slug: string,
  locale: string = 'en'
): Promise<Brand> {
  try {
    const params = new URLSearchParams();
    params.append('locale', locale);
    
    const response = await fetch(`${API_BASE_URL}/brands/slug/${slug}?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching brand: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch brand with slug ${slug}:`, error);
    throw error;
  }
}

/**
 * Get featured brands
 */
export async function getFeaturedBrands(
  limit: number = 10,
  locale: string = 'en'
): Promise<Brand[]> {
  try {
    const params = new URLSearchParams();
    params.append('locale', locale);
    params.append('featured', 'true');
    params.append('isActive', 'true');
    params.append('_limit', limit.toString());
    
    const response = await fetch(`${API_BASE_URL}/brands?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching featured brands: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch featured brands:', error);
    throw error;
  }
}

/**
 * Get brand product count
 */
export async function getBrandProductCount(brandId: string): Promise<number> {
  try {
    const response = await fetch(`${API_BASE_URL}/brands/${brandId}/product-count`);
    
    if (!response.ok) {
      throw new Error(`Error fetching brand product count: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error(`Failed to fetch product count for brand ${brandId}:`, error);
    throw error;
  }
}

/**
 * Search brands
 */
export async function searchBrands(
  query: string,
  locale: string = 'en',
  limit: number = 10
): Promise<Brand[]> {
  try {
    const params = new URLSearchParams();
    params.append('locale', locale);
    params.append('q', query);
    params.append('_limit', limit.toString());
    params.append('isActive', 'true');
    
    const response = await fetch(`${API_BASE_URL}/brands/search?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error searching brands: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to search brands with query "${query}":`, error);
    throw error;
  }
}

/**
 * Get brands by category
 */
export async function getBrandsByCategory(
  categoryId: string,
  locale: string = 'en'
): Promise<Brand[]> {
  try {
    const params = new URLSearchParams();
    params.append('locale', locale);
    params.append('categoryId', categoryId);
    params.append('isActive', 'true');
    
    const response = await fetch(`${API_BASE_URL}/brands/by-category?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching brands by category: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch brands for category ${categoryId}:`, error);
    throw error;
  }
}

/**
 * Get popular brands
 */
export async function getPopularBrands(
  limit: number = 10,
  locale: string = 'en'
): Promise<Brand[]> {
  try {
    const params = new URLSearchParams();
    params.append('locale', locale);
    params.append('_sort', 'popularity');
    params.append('_order', 'desc');
    params.append('_limit', limit.toString());
    params.append('isActive', 'true');
    
    const response = await fetch(`${API_BASE_URL}/brands?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching popular brands: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch popular brands:', error);
    throw error;
  }
} 
