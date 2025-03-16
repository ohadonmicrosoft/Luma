import { Category } from "@/types/product";

/**
 * Service for handling product category operations
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

/**
 * Get all categories
 */
export async function getAllCategories(
  locale = "en",
  includeInactive = false
): Promise<Category[]> {
  try {
    const params = new URLSearchParams();
    params.append("locale", locale);

    if (!includeInactive) {
      params.append("isActive", "true");
    }

    const response = await fetch(
      `${API_BASE_URL}/categories?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
}

/**
 * Get category by ID
 */
export async function getCategoryById(
  id: string,
  locale = "en"
): Promise<Category> {
  try {
    const params = new URLSearchParams();
    params.append("locale", locale);

    const response = await fetch(
      `${API_BASE_URL}/categories/${id}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching category: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch category with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(
  slug: string,
  locale = "en"
): Promise<Category> {
  try {
    const params = new URLSearchParams();
    params.append("locale", locale);

    const response = await fetch(
      `${API_BASE_URL}/categories/slug/${slug}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching category: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch category with slug ${slug}:`, error);
    throw error;
  }
}

/**
 * Get category hierarchy
 * Returns categories in a hierarchical tree structure
 */
export async function getCategoryHierarchy(
  locale = "en",
  rootCategoryId?: string
): Promise<Category[]> {
  try {
    const params = new URLSearchParams();
    params.append("locale", locale);
    params.append("hierarchical", "true");
    params.append("isActive", "true");

    if (rootCategoryId) {
      params.append("rootCategoryId", rootCategoryId);
    }

    const response = await fetch(
      `${API_BASE_URL}/categories/hierarchy?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching category hierarchy: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch category hierarchy:", error);
    throw error;
  }
}

/**
 * Get child categories
 */
export async function getChildCategories(
  parentId: string,
  locale = "en",
  includeInactive = false
): Promise<Category[]> {
  try {
    const params = new URLSearchParams();
    params.append("locale", locale);
    params.append("parentId", parentId);

    if (!includeInactive) {
      params.append("isActive", "true");
    }

    const response = await fetch(
      `${API_BASE_URL}/categories?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching child categories: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(
      `Failed to fetch child categories for parent ${parentId}:`,
      error
    );
    throw error;
  }
}

/**
 * Get category breadcrumbs
 */
export async function getCategoryBreadcrumbs(
  categoryId: string,
  locale = "en"
): Promise<Category[]> {
  try {
    const params = new URLSearchParams();
    params.append("locale", locale);

    const response = await fetch(
      `${API_BASE_URL}/categories/${categoryId}/breadcrumbs?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching category breadcrumbs: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(
      `Failed to fetch breadcrumbs for category ${categoryId}:`,
      error
    );
    throw error;
  }
}

/**
 * Get featured categories
 */
export async function getFeaturedCategories(
  limit = 5,
  locale = "en"
): Promise<Category[]> {
  try {
    const params = new URLSearchParams();
    params.append("locale", locale);
    params.append("featured", "true");
    params.append("isActive", "true");
    params.append("_limit", limit.toString());

    const response = await fetch(
      `${API_BASE_URL}/categories?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching featured categories: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch featured categories:", error);
    throw error;
  }
}

/**
 * Get category product count
 */
export async function getCategoryProductCount(
  categoryId: string,
  includeChildren = true
): Promise<number> {
  try {
    const params = new URLSearchParams();
    params.append("includeChildren", includeChildren.toString());

    const response = await fetch(
      `${API_BASE_URL}/categories/${categoryId}/product-count?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching category product count: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error(
      `Failed to fetch product count for category ${categoryId}:`,
      error
    );
    throw error;
  }
}

/**
 * Search categories
 */
export async function searchCategories(
  query: string,
  locale = "en",
  limit = 10
): Promise<Category[]> {
  try {
    const params = new URLSearchParams();
    params.append("locale", locale);
    params.append("q", query);
    params.append("_limit", limit.toString());
    params.append("isActive", "true");

    const response = await fetch(
      `${API_BASE_URL}/categories/search?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Error searching categories: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to search categories with query "${query}":`, error);
    throw error;
  }
}

/**
 * Get related categories
 */
export async function getRelatedCategories(
  categoryId: string,
  limit = 5,
  locale = "en"
): Promise<Category[]> {
  try {
    const params = new URLSearchParams();
    params.append("locale", locale);
    params.append("_limit", limit.toString());
    params.append("isActive", "true");

    const response = await fetch(
      `${API_BASE_URL}/categories/${categoryId}/related?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching related categories: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(
      `Failed to fetch related categories for category ${categoryId}:`,
      error
    );
    throw error;
  }
}
