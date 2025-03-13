import { Product, ProductVariant } from '@/types/product';

/**
 * Service for handling inventory-related operations
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * Interface for inventory item
 */
export interface InventoryItem {
  id: string;
  productId: string;
  variantId?: string;
  sku: string;
  stockQuantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  lowStockThreshold: number;
  isLowStock: boolean;
  isInStock: boolean;
  lastRestocked?: string;
  warehouseLocation?: string;
}

/**
 * Interface for inventory history entry
 */
export interface InventoryHistoryEntry {
  id: string;
  productId: string;
  variantId?: string;
  sku: string;
  date: string;
  type: 'restock' | 'sale' | 'return' | 'adjustment' | 'reservation';
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  notes?: string;
  userId?: string;
  orderId?: string;
}

/**
 * Get inventory status for a product
 */
export async function getInventoryStatus(
  productId: string,
  variantId?: string
): Promise<InventoryItem> {
  try {
    const endpoint = variantId
      ? `${API_BASE_URL}/inventory/status?productId=${productId}&variantId=${variantId}`
      : `${API_BASE_URL}/inventory/status?productId=${productId}`;
      
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`Error fetching inventory status: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch inventory status for product ${productId}:`, error);
    throw error;
  }
}

/**
 * Get inventory history for a product
 */
export async function getInventoryHistory(
  productId: string,
  variantId?: string,
  limit: number = 10
): Promise<InventoryHistoryEntry[]> {
  try {
    const params = new URLSearchParams();
    params.append('productId', productId);
    params.append('_limit', limit.toString());
    params.append('_sort', 'date');
    params.append('_order', 'desc');
    
    if (variantId) {
      params.append('variantId', variantId);
    }
    
    const response = await fetch(`${API_BASE_URL}/inventory/history?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching inventory history: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch inventory history for product ${productId}:`, error);
    throw error;
  }
}

/**
 * Get low stock products
 */
export async function getLowStockProducts(
  limit: number = 20,
  page: number = 1
): Promise<{ items: InventoryItem[]; total: number; page: number; totalPages: number }> {
  try {
    const params = new URLSearchParams();
    params.append('isLowStock', 'true');
    params.append('_page', page.toString());
    params.append('_limit', limit.toString());
    params.append('_sort', 'stockQuantity');
    params.append('_order', 'asc');
    
    const response = await fetch(`${API_BASE_URL}/inventory/status?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching low stock products: ${response.statusText}`);
    }
    
    const total = parseInt(response.headers.get('X-Total-Count') || '0', 10);
    const items = await response.json();
    
    return {
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('Failed to fetch low stock products:', error);
    throw error;
  }
}

/**
 * Update inventory quantity
 */
export async function updateInventoryQuantity(
  productId: string,
  quantity: number,
  variantId?: string,
  notes?: string
): Promise<InventoryItem> {
  try {
    const response = await fetch(`${API_BASE_URL}/inventory/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        variantId,
        quantity,
        notes,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Error updating inventory: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to update inventory for product ${productId}:`, error);
    throw error;
  }
}

/**
 * Set low stock threshold
 */
export async function setLowStockThreshold(
  productId: string,
  threshold: number,
  variantId?: string
): Promise<InventoryItem> {
  try {
    const response = await fetch(`${API_BASE_URL}/inventory/threshold`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        variantId,
        threshold,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Error setting low stock threshold: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to set low stock threshold for product ${productId}:`, error);
    throw error;
  }
}

/**
 * Get product replacement suggestions
 */
export async function getReplacementSuggestions(
  productId: string,
  limit: number = 5,
  locale: string = 'en'
): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    params.append('productId', productId);
    params.append('_limit', limit.toString());
    params.append('locale', locale);
    
    const response = await fetch(`${API_BASE_URL}/products/replacements?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching replacement suggestions: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch replacement suggestions for product ${productId}:`, error);
    throw error;
  }
}

/**
 * Reserve inventory
 */
export async function reserveInventory(
  productId: string,
  quantity: number,
  variantId?: string,
  orderId?: string
): Promise<InventoryItem> {
  try {
    const response = await fetch(`${API_BASE_URL}/inventory/reserve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        variantId,
        quantity,
        orderId,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Error reserving inventory: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to reserve inventory for product ${productId}:`, error);
    throw error;
  }
}

/**
 * Release reserved inventory
 */
export async function releaseReservedInventory(
  productId: string,
  quantity: number,
  variantId?: string,
  orderId?: string
): Promise<InventoryItem> {
  try {
    const response = await fetch(`${API_BASE_URL}/inventory/release`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        variantId,
        quantity,
        orderId,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Error releasing reserved inventory: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to release reserved inventory for product ${productId}:`, error);
    throw error;
  }
}

/**
 * Get inventory alerts
 */
export async function getInventoryAlerts(
  limit: number = 10,
  page: number = 1
): Promise<{ alerts: any[]; total: number; page: number; totalPages: number }> {
  try {
    const params = new URLSearchParams();
    params.append('_page', page.toString());
    params.append('_limit', limit.toString());
    params.append('_sort', 'createdAt');
    params.append('_order', 'desc');
    
    const response = await fetch(`${API_BASE_URL}/inventory/alerts?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching inventory alerts: ${response.statusText}`);
    }
    
    const total = parseInt(response.headers.get('X-Total-Count') || '0', 10);
    const alerts = await response.json();
    
    return {
      alerts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('Failed to fetch inventory alerts:', error);
    throw error;
  }
} 
