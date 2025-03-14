import { Product, ProductVariant, ProductFilterOptions } from "@/types/product";
import { Category } from "@/types/categories";

/**
 * Service for handling product-related operations
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

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
): Promise<{
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const {
    filters,
    sort = "createdAt_desc",
    page = 1,
    limit = 12,
    locale = "en",
  } = options;

  // Create URL and params
  const url = new URL(`${API_BASE_URL}/products`);
  const params = new URLSearchParams();

  // Base params
  params.append("_page", page.toString());
  params.append("_limit", limit.toString());
  params.append("_sort", sort);
  params.append("locale", locale);

  // Add filter parameters if provided
  if (filters) {
    // Categories filter
    if (filters.categories && filters.categories.length > 0) {
      filters.categories.forEach((category) => {
        params.append("categories", category);
      });
    }

    // Category ID filter
    if (filters.categoryId) {
      params.append("categoryId", filters.categoryId);
    }

    // Price range filters
    if (filters.minPrice !== undefined) {
      params.append("price_gte", filters.minPrice.toString());
    }

    if (filters.maxPrice !== undefined) {
      params.append("price_lte", filters.maxPrice.toString());
    }

    // Brand filter
    if (filters.brands && filters.brands.length > 0) {
      filters.brands.forEach((brand) => {
        params.append("brand", brand);
      });
    }

    // Stock filter
    if (filters.inStock !== undefined) {
      params.append("inStock", filters.inStock.toString());
    }

    // Sale filter
    if (filters.onSale !== undefined) {
      params.append("onSale", filters.onSale.toString());
    }

    // Featured filter
    if (filters.featured !== undefined) {
      params.append("featured", filters.featured.toString());
    }

    // Search query
    if (filters.searchQuery) {
      params.append("q", filters.searchQuery);
    }

    // Attributes filter
    if (filters.attributes) {
      Object.entries(filters.attributes).forEach(([key, values]) => {
        values.forEach((value) => {
          params.append(`attributes.${key}`, value);
        });
      });
    }

    // Product type filter
    if (filters.productType) {
      params.append("productType", filters.productType);
    }

    // Technical specs filters
    if (filters.durabilityRating) {
      params.append("durabilityRating", filters.durabilityRating);
    }

    if (filters.weatherResistance) {
      params.append("weatherResistance", filters.weatherResistance);
    }

    if (filters.material) {
      params.append("material", filters.material);
    }

    if (filters.minWeight !== undefined) {
      params.append("minWeight", filters.minWeight.toString());
    }

    if (filters.maxWeight !== undefined) {
      params.append("maxWeight", filters.maxWeight.toString());
    }

    if (filters.hasTechnicalSpecs !== undefined) {
      params.append("hasTechnicalSpecs", filters.hasTechnicalSpecs.toString());
    }

    if (filters.compatibleWith && filters.compatibleWith.length > 0) {
      filters.compatibleWith.forEach((item) => {
        params.append("compatibleWith", item);
      });
    }

    if (filters.keywords && filters.keywords.length > 0) {
      filters.keywords.forEach((keyword) => {
        params.append("keywords", keyword);
      });
    }

    if (filters.brandName) {
      params.append("brandName", filters.brandName);
    }
  }

  // Add params to URL
  url.search = params.toString();

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error("Error fetching products");
    }

    const products = await response.json();
    const total = parseInt(response.headers.get("X-Total-Count") || "0", 10);
    const totalPages = Math.ceil(total / limit);

    return { products, total, page, totalPages };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], total: 0, page: 1, totalPages: 0 };
  }
}

/**
 * Fetch a single product by slug
 */
export async function getProductBySlug(
  slug: string,
  locale: string = "en"
): Promise<Product> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products?slug=${slug}&locale=${locale}`
    );

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
  locale: string = "en"
): Promise<Product[]> {
  try {
    // First get the product to find its categories
    const product = await getProductById(productId, locale);

    // Then fetch products in the same categories
    const categoryIds = product.categories.map((category) => category.id);
    const params = new URLSearchParams();
    params.append("_limit", limit.toString());
    params.append("locale", locale);
    params.append("id_ne", productId); // Exclude the current product

    categoryIds.forEach((categoryId) => {
      params.append("categories", categoryId);
    });

    const response = await fetch(
      `${API_BASE_URL}/products?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching related products: ${response.statusText}`
      );
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
  locale: string = "en"
): Promise<Product> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/${id}?locale=${locale}`
    );

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
  locale: string = "en"
): Promise<ProductVariant[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/variants?productId=${productId}&locale=${locale}`
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching product variants: ${response.statusText}`
      );
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
export async function checkProductStock(
  productId: string,
  variantId?: string
): Promise<{
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
  locale: string = "en"
): Promise<{
  categories: Category[];
  brands: string[];
  priceRange: { min: number; max: number };
  attributes: Record<string, string[]>;
}> {
  try {
    const params = new URLSearchParams();
    params.append("locale", locale);

    if (categoryId) {
      params.append("categoryId", categoryId);
    }

    const response = await fetch(
      `${API_BASE_URL}/filters?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching product filters: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch product filters:", error);
    throw error;
  }
}

/**
 * Export products to CSV/JSON
 */
export async function exportProducts(
  format: "csv" | "json" = "csv",
  filters?: ProductFilterOptions
): Promise<Blob> {
  try {
    const params = new URLSearchParams();
    params.append("format", format);

    // Add filters if provided
    if (filters) {
      if (filters.categories && filters.categories.length > 0) {
        filters.categories.forEach((category) => {
          params.append("categories", category);
        });
      }

      if (filters.brands && filters.brands.length > 0) {
        filters.brands.forEach((brand) => {
          params.append("brand", brand);
        });
      }
    }

    const response = await fetch(
      `${API_BASE_URL}/products/export?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Error exporting products: ${response.statusText}`);
    }

    return await response.blob();
  } catch (error) {
    console.error("Failed to export products:", error);
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
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/products/import`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error importing products: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to import products:", error);
    throw error;
  }
}

/**
 * Get featured products
 */
export async function getFeaturedProducts(
  limit: number = 8,
  locale: string = "en"
): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    params.append("_limit", limit.toString());
    params.append("featured", "true");
    params.append("locale", locale);

    const response = await fetch(
      `${API_BASE_URL}/products?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching featured products: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
    throw error;
  }
}

/**
 * Get new arrivals
 */
export async function getNewArrivals(
  limit: number = 8,
  locale: string = "en"
): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    params.append("_limit", limit.toString());
    params.append("isNew", "true");
    params.append("_sort", "createdAt");
    params.append("_order", "desc");
    params.append("locale", locale);

    const response = await fetch(
      `${API_BASE_URL}/products?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching new arrivals: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch new arrivals:", error);
    throw error;
  }
}

/**
 * Get products on sale
 */
export async function getProductsOnSale(
  limit: number = 8,
  locale: string = "en"
): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    params.append("_limit", limit.toString());
    params.append("isOnSale", "true");
    params.append("locale", locale);

    const response = await fetch(
      `${API_BASE_URL}/products?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching products on sale: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch products on sale:", error);
    throw error;
  }
}

/**
 * Fetch products by category
 */
export async function getProductsByCategory(
  categorySlug: string,
  options: {
    includeSubcategories?: boolean;
    page?: number;
    limit?: number;
    sort?: string;
    locale?: string;
  } = {}
): Promise<{
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const {
    includeSubcategories = true,
    page = 1,
    limit = 12,
    sort = "createdAt_desc",
    locale = "en",
  } = options;

  const filters: ProductFilterOptions = {
    categoryId: categorySlug,
  };

  return getProducts({
    filters,
    page,
    limit,
    sort,
    locale,
  });
}
