/**
 * Product type definitions for Luma e-commerce platform
 * Focused on tactical/outdoor equipment and home accessories
 */

// Base product interface with common properties
export interface BaseProduct {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  currency: 'USD' | 'ILS'; // US Dollar or Israeli Shekel
  images: ProductImage[];
  thumbnail: string;
  brand?: string;
  categories: string[];
  tags: string[];
  rating?: number;
  reviewCount?: number;
  stockQuantity: number;
  isInStock: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  discount?: number;
  createdAt: string;
  updatedAt: string;
  locale: 'en' | 'he'; // English or Hebrew
  translations?: {
    [key: string]: {
      name: string;
      description: string;
      shortDescription?: string;
    }
  };
}

// Product image interface
export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isDefault: boolean;
  sortOrder: number;
}

// Common dimensions interface
export interface Dimensions {
  length: number;
  width: number;
  height: number;
  weight: number;
  unit: 'cm' | 'in' | 'mm'; // Centimeters, Inches, or Millimeters
  weightUnit: 'kg' | 'g' | 'lb' | 'oz'; // Kilograms, Grams, Pounds, or Ounces
}

// Technical specifications for tactical products
export interface TacticalSpecifications {
  material: string[];
  waterResistance?: string; // e.g., "IPX7", "Water-repellent"
  durability?: string; // e.g., "Military-grade", "Heavy-duty"
  batteryLife?: string; // For electronic tactical equipment
  powerSource?: string; // e.g., "Solar", "Battery", "Manual"
  operatingTemperature?: {
    min: number;
    max: number;
    unit: 'C' | 'F'; // Celsius or Fahrenheit
  };
  certifications?: string[]; // e.g., "MIL-STD-810G", "IP68"
  warranty?: string;
  countryOfOrigin?: string;
}

// Tactical product interface
export interface TacticalProduct extends BaseProduct {
  type: 'tactical';
  dimensions: Dimensions;
  specifications: TacticalSpecifications;
  features: string[]; // Key product features
  includedItems?: string[]; // Items included in the package
  compatibleWith?: string[]; // Compatible products or accessories
  usageInstructions?: string;
  careInstructions?: string;
}

// Home accessory specifications
export interface HomeSpecifications {
  material: string[];
  color: string[];
  pattern?: string;
  style?: string; // e.g., "Modern", "Rustic", "Industrial"
  careInstructions: string;
  assembly?: {
    required: boolean;
    estimatedTime?: string;
    toolsRequired?: string[];
  };
  warranty?: string;
  certifications?: string[];
  sustainabilityFeatures?: string[]; // e.g., "Eco-friendly", "Recycled materials"
  countryOfOrigin?: string;
}

// Home accessory product interface
export interface HomeProduct extends BaseProduct {
  type: 'home';
  dimensions: Dimensions;
  specifications: HomeSpecifications;
  features: string[]; // Key product features
  roomSuggestions?: string[]; // e.g., "Living room", "Bedroom"
  styleCompatibility?: string[]; // e.g., "Modern", "Minimalist"
  careInstructions: string;
  assemblyInstructions?: string;
}

// Union type for all product types
export type Product = TacticalProduct | HomeProduct;

// Product variant interface
export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  name: string;
  attributes: {
    [key: string]: string; // e.g., { "color": "black", "size": "medium" }
  };
  price: number;
  compareAtPrice?: number;
  stockQuantity: number;
  isInStock: boolean;
  images: ProductImage[];
}

// Product filter options
export interface ProductFilterOptions {
  categories?: string[];
  brands?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  ratings?: number[];
  inStock?: boolean;
  onSale?: boolean;
  attributes?: {
    [key: string]: string[];
  };
} 
