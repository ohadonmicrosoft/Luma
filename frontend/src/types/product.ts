/**
 * Product types and interfaces for the Luma E-Commerce Platform
 * Includes multilingual support and enhanced product schema
 */

/**
 * Product filter options interface
 */
export interface ProductFilterOptions {
  categoryId?: string;
  categories?: string[];
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
  brands?: string[];
  inStock?: boolean;
  onSale?: boolean;
  featured?: boolean;
  attributes?: Record<string, string[]>;
  productType?: string;
  durabilityRating?: string;
  weatherResistance?: string;
  material?: string;
  minWeight?: number;
  maxWeight?: number;
  hasTechnicalSpecs?: boolean;
  compatibleWith?: string[];
  keywords?: string[];
  brandName?: string;
}

/**
 * Base product interface
 */
export interface Product {
  id: string;
  sku: string;
  slug: string;
  type: ProductType;
  status: ProductStatus;
  featured: boolean;
  categories: Category[];
  tags: string[];
  brand: Brand;
  
  // Multilingual content
  name: LocalizedString;
  description: LocalizedString;
  shortDescription?: LocalizedString;
  
  // Media
  images: ProductImage[];
  videos?: ProductVideo[];
  documents?: ProductDocument[];
  
  // Pricing
  price: Price;
  compareAtPrice?: Price;
  costPrice?: Price;
  
  // Variants
  hasVariants: boolean;
  variantAttributes?: VariantAttribute[];
  variants?: ProductVariant[];
  
  // Inventory
  inventoryManaged: boolean;
  stockQuantity?: number;
  lowStockThreshold?: number;
  
  // Shipping
  weight?: Weight;
  dimensions?: Dimensions;
  shippingClass?: string;
  
  // SEO
  seo?: SEO;
  
  // Dates
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  
  // Type-specific fields (will be populated based on product type)
  specifications?: Record<string, string | number | boolean | string[]>;
  typeSpecificFields?: Record<string, any>;
}

/**
 * Product variant interface
 */
export interface ProductVariant {
  id: string;
  sku: string;
  name: LocalizedString;
  attributeValues: VariantAttributeValue[];
  price: Price;
  compareAtPrice?: Price;
  costPrice?: Price;
  images: ProductImage[];
  stockQuantity?: number;
  weight?: Weight;
  dimensions?: Dimensions;
  isDefault: boolean;
}

/**
 * Product types
 */
export enum ProductType {
  PHYSICAL = 'physical',
  DIGITAL = 'digital',
  SERVICE = 'service',
  SUBSCRIPTION = 'subscription',
  BUNDLE = 'bundle',
  CONFIGURABLE = 'configurable',
  CLOTHING = 'clothing',
  ELECTRONICS = 'electronics',
  FURNITURE = 'furniture',
  FOOD = 'food',
  BOOK = 'book',
  JEWELRY = 'jewelry',
  COSMETICS = 'cosmetics',
  TOY = 'toy',
  GIFT_CARD = 'gift_card',
}

/**
 * Product status
 */
export enum ProductStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  OUT_OF_STOCK = 'out_of_stock',
  COMING_SOON = 'coming_soon',
  DISCONTINUED = 'discontinued',
}

/**
 * Localized string interface for multilingual support
 */
export interface LocalizedString {
  [locale: string]: string;
}

/**
 * Category interface
 */
export interface Category {
  id: string;
  slug: string;
  name: LocalizedString;
  description?: LocalizedString;
  image?: string;
  parentId?: string;
  level: number;
  path: string[];
  children?: Category[];
  productCount?: number;
  isActive: boolean;
  seo?: SEO;
}

/**
 * Brand interface
 */
export interface Brand {
  id: string;
  slug: string;
  name: LocalizedString;
  description?: LocalizedString;
  logo?: string;
  website?: string;
  isActive: boolean;
  seo?: SEO;
}

/**
 * Price interface
 */
export interface Price {
  amount: number;
  currency: string;
  formatted?: string;
  discountPercentage?: number;
  discountAmount?: number;
  taxIncluded?: boolean;
  taxRate?: number;
  taxAmount?: number;
}

/**
 * Product image interface
 */
export interface ProductImage {
  id: string;
  src: string;
  alt: LocalizedString;
  position: number;
  isDefault: boolean;
  width?: number;
  height?: number;
  thumbnails?: {
    small: string;
    medium: string;
    large: string;
  };
}

/**
 * Product video interface
 */
export interface ProductVideo {
  id: string;
  src: string;
  title: LocalizedString;
  description?: LocalizedString;
  thumbnail?: string;
  position: number;
  duration?: number;
  provider?: 'youtube' | 'vimeo' | 'self-hosted';
}

/**
 * Product document interface
 */
export interface ProductDocument {
  id: string;
  src: string;
  title: LocalizedString;
  description?: LocalizedString;
  type: string;
  size?: number;
  position: number;
}

/**
 * Variant attribute interface
 */
export interface VariantAttribute {
  id: string;
  name: LocalizedString;
  values: VariantAttributeValue[];
  position: number;
  isRequired: boolean;
  isVisibleInProductPage: boolean;
}

/**
 * Variant attribute value interface
 */
export interface VariantAttributeValue {
  id: string;
  attributeId: string;
  value: LocalizedString;
  position: number;
  colorCode?: string;
  image?: string;
}

/**
 * Weight interface
 */
export interface Weight {
  value: number;
  unit: 'g' | 'kg' | 'oz' | 'lb';
}

/**
 * Dimensions interface
 */
export interface Dimensions {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'in' | 'm';
}

/**
 * SEO interface
 */
export interface SEO {
  title: LocalizedString;
  description: LocalizedString;
  keywords: LocalizedString;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: string;
}

/**
 * Product filter interface
 */
export interface ProductFilter {
  id: string;
  name: LocalizedString;
  type: 'category' | 'brand' | 'price' | 'attribute' | 'rating' | 'tag';
  values: ProductFilterValue[];
}

/**
 * Product filter value interface
 */
export interface ProductFilterValue {
  id: string;
  value: string | number | boolean;
  label: LocalizedString;
  count: number;
  selected?: boolean;
}

/**
 * Product sort options
 */
export enum ProductSortOption {
  NEWEST = 'newest',
  PRICE_LOW_TO_HIGH = 'price_asc',
  PRICE_HIGH_TO_LOW = 'price_desc',
  NAME_A_TO_Z = 'name_asc',
  NAME_Z_TO_A = 'name_desc',
  BEST_SELLING = 'best_selling',
  TRENDING = 'trending',
  TOP_RATED = 'top_rated',
}

/**
 * Product pagination interface
 */
export interface ProductPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Product search params interface
 */
export interface ProductSearchParams {
  query?: string;
  categories?: string[];
  brands?: string[];
  priceMin?: number;
  priceMax?: number;
  attributes?: Record<string, string[]>;
  tags?: string[];
  inStock?: boolean;
  onSale?: boolean;
  featured?: boolean;
  sort?: ProductSortOption;
  page?: number;
  limit?: number;
  locale?: string;
}

/**
 * Product search response interface
 */
export interface ProductSearchResponse {
  products: Product[];
  filters: ProductFilter[];
  pagination: ProductPagination;
  appliedFilters?: ProductSearchParams;
}

/**
 * Type-specific interfaces for different product types
 */

/**
 * Digital product specific fields
 */
export interface DigitalProductFields {
  fileType: string;
  fileSize?: number;
  downloadLimit?: number;
  downloadExpiry?: number;
  sampleFile?: string;
  requirements?: LocalizedString;
  version?: string;
}

/**
 * Clothing product specific fields
 */
export interface ClothingProductFields {
  material: LocalizedString;
  careInstructions: LocalizedString;
  season?: string[];
  gender?: 'men' | 'women' | 'unisex' | 'boys' | 'girls';
  style?: string[];
  fit?: string;
  collar?: string;
  sleeve?: string;
  pattern?: string;
}

/**
 * Electronics product specific fields
 */
export interface ElectronicsProductFields {
  manufacturer: string;
  model: string;
  warranty?: string;
  powerRequirements?: string;
  connectivity?: string[];
  operatingSystem?: string;
  storageCapacity?: string;
  processorType?: string;
  memorySize?: string;
  screenSize?: string;
  resolution?: string;
  batteryLife?: string;
  cameraResolution?: string;
}

/**
 * Furniture product specific fields
 */
export interface FurnitureProductFields {
  material: string[];
  style: string;
  roomType: string[];
  assemblyRequired: boolean;
  assemblyTime?: string;
  careInstructions: LocalizedString;
  maxWeight?: string;
  warranty?: string;
}

/**
 * Book product specific fields
 */
export interface BookProductFields {
  author: string[];
  publisher: string;
  publicationDate: string;
  isbn: string;
  language: string[];
  pages: number;
  format: string;
  genre: string[];
  edition?: string;
  tableOfContents?: LocalizedString;
}

/**
 * Food product specific fields
 */
export interface FoodProductFields {
  ingredients: LocalizedString;
  nutritionalInfo: LocalizedString;
  allergens: string[];
  dietaryInfo: string[];
  servingSize: string;
  servingsPerContainer: number;
  storageInstructions: LocalizedString;
  shelfLife: string;
  countryOfOrigin: string;
  preparationInstructions?: LocalizedString;
}

/**
 * Subscription product specific fields
 */
export interface SubscriptionProductFields {
  billingPeriod: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'biannually' | 'annually';
  trialPeriod?: number;
  trialPeriodUnit?: 'day' | 'week' | 'month';
  subscriptionLength?: number;
  subscriptionLengthUnit?: 'day' | 'week' | 'month' | 'year';
  features: LocalizedString[];
  cancellationPolicy: LocalizedString;
}

/**
 * Bundle product specific fields
 */
export interface BundleProductFields {
  bundledProducts: {
    productId: string;
    quantity: number;
    discountPercentage?: number;
  }[];
  bundleType: 'fixed' | 'dynamic';
  minProducts?: number;
  maxProducts?: number;
} 
