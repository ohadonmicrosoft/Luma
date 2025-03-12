/**
 * Product category classification system for Luma e-commerce platform
 * Focused on tactical/outdoor equipment and home accessories
 */

// Base category interface
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  level: number;
  imageUrl?: string;
  isActive: boolean;
  sortOrder: number;
  translations?: {
    [key: string]: {
      name: string;
      description?: string;
    }
  };
  attributes?: string[]; // IDs of attributes relevant to this category
}

// Category tree node for hierarchical representation
export interface CategoryTreeNode extends Category {
  children: CategoryTreeNode[];
}

// Predefined tactical/outdoor equipment categories
export const TACTICAL_CATEGORIES = {
  TACTICAL_GEAR: 'tactical-gear',
  OUTDOOR_EQUIPMENT: 'outdoor-equipment',
  SURVIVAL_TOOLS: 'survival-tools',
  TACTICAL_APPAREL: 'tactical-apparel',
  OPTICS: 'optics',
  NAVIGATION: 'navigation',
  LIGHTING: 'lighting',
  COMMUNICATION: 'communication',
  FIRST_AID: 'first-aid',
  HYDRATION: 'hydration',
  STORAGE: 'storage',
  TOOLS: 'tools',
};

// Predefined home accessories categories
export const HOME_CATEGORIES = {
  LIVING_ROOM: 'living-room',
  BEDROOM: 'bedroom',
  KITCHEN: 'kitchen',
  BATHROOM: 'bathroom',
  OFFICE: 'home-office',
  OUTDOOR_LIVING: 'outdoor-living',
  DECOR: 'decor',
  LIGHTING: 'home-lighting',
  STORAGE: 'home-storage',
  TEXTILES: 'textiles',
  FURNITURE: 'furniture',
  ORGANIZATION: 'organization',
};

// Category hierarchy definition
export const CATEGORY_HIERARCHY: CategoryTreeNode[] = [
  {
    id: '1',
    name: 'Tactical & Outdoor',
    slug: 'tactical-outdoor',
    description: 'High-quality tactical gear and outdoor equipment',
    level: 0,
    isActive: true,
    sortOrder: 1,
    children: [
      {
        id: '1-1',
        name: 'Tactical Gear',
        slug: TACTICAL_CATEGORIES.TACTICAL_GEAR,
        parentId: '1',
        level: 1,
        isActive: true,
        sortOrder: 1,
        children: [
          {
            id: '1-1-1',
            name: 'Bags & Packs',
            slug: 'bags-packs',
            parentId: '1-1',
            level: 2,
            isActive: true,
            sortOrder: 1,
            children: [],
          },
          {
            id: '1-1-2',
            name: 'Belts & Holsters',
            slug: 'belts-holsters',
            parentId: '1-1',
            level: 2,
            isActive: true,
            sortOrder: 2,
            children: [],
          },
          {
            id: '1-1-3',
            name: 'Tactical Vests',
            slug: 'tactical-vests',
            parentId: '1-1',
            level: 2,
            isActive: true,
            sortOrder: 3,
            children: [],
          },
        ],
      },
      {
        id: '1-2',
        name: 'Outdoor Equipment',
        slug: TACTICAL_CATEGORIES.OUTDOOR_EQUIPMENT,
        parentId: '1',
        level: 1,
        isActive: true,
        sortOrder: 2,
        children: [
          {
            id: '1-2-1',
            name: 'Camping Gear',
            slug: 'camping-gear',
            parentId: '1-2',
            level: 2,
            isActive: true,
            sortOrder: 1,
            children: [],
          },
          {
            id: '1-2-2',
            name: 'Hiking Equipment',
            slug: 'hiking-equipment',
            parentId: '1-2',
            level: 2,
            isActive: true,
            sortOrder: 2,
            children: [],
          },
          {
            id: '1-2-3',
            name: 'Outdoor Cooking',
            slug: 'outdoor-cooking',
            parentId: '1-2',
            level: 2,
            isActive: true,
            sortOrder: 3,
            children: [],
          },
        ],
      },
      {
        id: '1-3',
        name: 'Survival Tools',
        slug: TACTICAL_CATEGORIES.SURVIVAL_TOOLS,
        parentId: '1',
        level: 1,
        isActive: true,
        sortOrder: 3,
        children: [
          {
            id: '1-3-1',
            name: 'Multi-tools',
            slug: 'multi-tools',
            parentId: '1-3',
            level: 2,
            isActive: true,
            sortOrder: 1,
            children: [],
          },
          {
            id: '1-3-2',
            name: 'Survival Kits',
            slug: 'survival-kits',
            parentId: '1-3',
            level: 2,
            isActive: true,
            sortOrder: 2,
            children: [],
          },
          {
            id: '1-3-3',
            name: 'Emergency Supplies',
            slug: 'emergency-supplies',
            parentId: '1-3',
            level: 2,
            isActive: true,
            sortOrder: 3,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Home Accessories',
    slug: 'home-accessories',
    description: 'Stylish and functional accessories for your home',
    level: 0,
    isActive: true,
    sortOrder: 2,
    children: [
      {
        id: '2-1',
        name: 'Living Room',
        slug: HOME_CATEGORIES.LIVING_ROOM,
        parentId: '2',
        level: 1,
        isActive: true,
        sortOrder: 1,
        children: [
          {
            id: '2-1-1',
            name: 'Throw Pillows',
            slug: 'throw-pillows',
            parentId: '2-1',
            level: 2,
            isActive: true,
            sortOrder: 1,
            children: [],
          },
          {
            id: '2-1-2',
            name: 'Blankets & Throws',
            slug: 'blankets-throws',
            parentId: '2-1',
            level: 2,
            isActive: true,
            sortOrder: 2,
            children: [],
          },
          {
            id: '2-1-3',
            name: 'Wall Decor',
            slug: 'wall-decor',
            parentId: '2-1',
            level: 2,
            isActive: true,
            sortOrder: 3,
            children: [],
          },
        ],
      },
      {
        id: '2-2',
        name: 'Kitchen',
        slug: HOME_CATEGORIES.KITCHEN,
        parentId: '2',
        level: 1,
        isActive: true,
        sortOrder: 2,
        children: [
          {
            id: '2-2-1',
            name: 'Cookware',
            slug: 'cookware',
            parentId: '2-2',
            level: 2,
            isActive: true,
            sortOrder: 1,
            children: [],
          },
          {
            id: '2-2-2',
            name: 'Utensils',
            slug: 'utensils',
            parentId: '2-2',
            level: 2,
            isActive: true,
            sortOrder: 2,
            children: [],
          },
          {
            id: '2-2-3',
            name: 'Storage Solutions',
            slug: 'kitchen-storage',
            parentId: '2-2',
            level: 2,
            isActive: true,
            sortOrder: 3,
            children: [],
          },
        ],
      },
      {
        id: '2-3',
        name: 'Decor',
        slug: HOME_CATEGORIES.DECOR,
        parentId: '2',
        level: 1,
        isActive: true,
        sortOrder: 3,
        children: [
          {
            id: '2-3-1',
            name: 'Vases',
            slug: 'vases',
            parentId: '2-3',
            level: 2,
            isActive: true,
            sortOrder: 1,
            children: [],
          },
          {
            id: '2-3-2',
            name: 'Candles & Holders',
            slug: 'candles-holders',
            parentId: '2-3',
            level: 2,
            isActive: true,
            sortOrder: 2,
            children: [],
          },
          {
            id: '2-3-3',
            name: 'Decorative Objects',
            slug: 'decorative-objects',
            parentId: '2-3',
            level: 2,
            isActive: true,
            sortOrder: 3,
            children: [],
          },
        ],
      },
    ],
  },
];

/**
 * Get a flat list of all categories
 * @returns Array of all categories
 */
export function getAllCategories(): Category[] {
  const result: Category[] = [];
  
  function traverse(node: CategoryTreeNode) {
    // Omit the children property when adding to the result
    const { children, ...category } = node;
    result.push(category);
    
    // Recursively process children
    children.forEach(traverse);
  }
  
  CATEGORY_HIERARCHY.forEach(traverse);
  return result;
}

/**
 * Find a category by its slug
 * @param slug - The category slug
 * @returns The category or undefined if not found
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return getAllCategories().find(category => category.slug === slug);
}

/**
 * Get all subcategories of a given category
 * @param categoryId - The parent category ID
 * @returns Array of subcategories
 */
export function getSubcategories(categoryId: string): Category[] {
  return getAllCategories().filter(category => category.parentId === categoryId);
}

/**
 * Get the breadcrumb path for a category
 * @param categoryId - The category ID
 * @returns Array of categories representing the breadcrumb path
 */
export function getCategoryBreadcrumbs(categoryId: string): Category[] {
  const result: Category[] = [];
  const allCategories = getAllCategories();
  
  let currentCategory = allCategories.find(c => c.id === categoryId);
  
  while (currentCategory) {
    result.unshift(currentCategory);
    
    if (currentCategory.parentId) {
      currentCategory = allCategories.find(c => c.id === currentCategory!.parentId);
    } else {
      currentCategory = undefined;
    }
  }
  
  return result;
} 
