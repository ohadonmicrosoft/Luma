import { z } from "zod";

// Base category schema for shared fields
const categoryBaseSchema = {
  name: z.string().min(2).max(50),
  description: z.string().max(500).optional(),
  parent_id: z.string().uuid().optional().nullable(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
  attributes: z
    .record(
      z.string(),
      z.union([z.string(), z.number(), z.boolean(), z.array(z.string())])
    )
    .optional(),
  image: z.string().url().optional(),
};

// Schema for creating a new category
const createCategorySchema = z.object({
  ...categoryBaseSchema,
  name: categoryBaseSchema.name,
});

// Schema for updating an existing category
const updateCategorySchema = z
  .object({
    ...categoryBaseSchema,
  })
  .partial();

// Export validation schemas
export const categoryValidationSchemas = {
  createCategory: createCategorySchema,
  updateCategory: updateCategorySchema,
};
