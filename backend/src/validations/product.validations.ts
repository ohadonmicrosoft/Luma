import { z } from 'zod';

// Base product schema for shared fields
const productBaseSchema = {
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(5000),
  price: z.number().min(0),
  stock: z.number().int().min(0).default(0),
  category_id: z.string().uuid().optional(),
  sku: z.string().optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  images: z.array(z.string().url()).optional(),
  attributes: z
    .record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.array(z.string())]))
    .optional(),
};

// Schema for creating a new product
const createProductSchema = z.object({
  ...productBaseSchema,
  name: productBaseSchema.name,
  description: productBaseSchema.description,
  price: productBaseSchema.price,
});

// Schema for updating an existing product
const updateProductSchema = z.object({
  ...productBaseSchema,
}).partial();

// Schema for updating product stock
const updateStockSchema = z.object({
  quantity: z.number().int().min(0),
});

// Export validation schemas
export const productValidationSchemas = {
  createProduct: createProductSchema,
  updateProduct: updateProductSchema,
  updateStock: updateStockSchema,
}; 
