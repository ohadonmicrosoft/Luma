import { z } from "zod";
import {
  ProductType,
  DurabilityRating,
  WeatherResistance,
} from "../models/Product";

// Define enum schemas based on the actual values in the model
const productTypeEnum = z.enum([
  ProductType.STANDARD,
  ProductType.TACTICAL,
  ProductType.OUTDOOR,
  ProductType.HOME,
]);

const durabilityRatingEnum = z.enum([
  DurabilityRating.BASIC,
  DurabilityRating.STANDARD,
  DurabilityRating.ENHANCED,
  DurabilityRating.PROFESSIONAL,
  DurabilityRating.MILITARY,
]);

const weatherResistanceEnum = z.enum([
  WeatherResistance.NONE,
  WeatherResistance.WATER_RESISTANT,
  WeatherResistance.WEATHER_RESISTANT,
  WeatherResistance.WATERPROOF,
  WeatherResistance.ALL_WEATHER,
]);

// Technical specifications schema
const technicalSpecsSchema = z.object({
  material: z.string().optional(),
  weight: z.number().min(0).optional(),
  weightUnit: z.string().optional(),
  dimensions: z
    .object({
      length: z.number().min(0).optional(),
      width: z.number().min(0).optional(),
      height: z.number().min(0).optional(),
      unit: z.string().optional(),
    })
    .optional(),
  durabilityRating: durabilityRatingEnum.optional(),
  weatherResistance: weatherResistanceEnum.optional(),
  batteryLife: z.number().min(0).optional(),
  warrantyPeriod: z.string().optional(),
  certifications: z.array(z.string()).optional(),
  countryOfOrigin: z.string().optional(),
  loadCapacity: z.number().min(0).optional(),
  color: z.string().optional(),
  additionalFeatures: z.array(z.string()).optional(),
});

// Usage scenario schema
const usageScenarioSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  suitabilityRating: z.number().min(1).max(10),
  imageUrl: z.string().url().optional(),
});

// Localized data schema
const localizedDataSchema = z.record(
  z.string(),
  z.object({
    name: z.string().min(3).max(100).optional(),
    description: z.string().min(10).max(5000).optional(),
    features: z.array(z.string()).optional(),
  })
);

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
    .record(
      z.string(),
      z.union([z.string(), z.number(), z.boolean(), z.array(z.string())])
    )
    .optional(),
  // Add new fields
  productType: productTypeEnum.optional(),
  brandName: z.string().min(2).max(50).optional(),
  technicalSpecs: technicalSpecsSchema.optional(),
  usageScenarios: z.array(usageScenarioSchema).optional(),
  compatibleWith: z.array(z.string().uuid()).optional(),
  keywords: z.array(z.string()).optional(),
  metaTitle: z.string().max(100).optional(),
  metaDescription: z.string().max(200).optional(),
  localizedData: localizedDataSchema.optional(),
};

// Schema for creating a new product
const createProductSchema = z.object({
  ...productBaseSchema,
  name: productBaseSchema.name,
  description: productBaseSchema.description,
  price: productBaseSchema.price,
});

// Schema for updating an existing product
const updateProductSchema = z
  .object({
    ...productBaseSchema,
  })
  .partial();

// Schema for updating product stock
const updateStockSchema = z.object({
  quantity: z.number().int().min(0),
});

// Schema for updating technical specifications
const updateTechnicalSpecsSchema = z.object({
  technicalSpecs: technicalSpecsSchema,
});

// Schema for adding a usage scenario
const addUsageScenarioSchema = z.object({
  scenarioData: usageScenarioSchema,
});

// Export validation schemas
export const productValidationSchemas = {
  createProduct: createProductSchema,
  updateProduct: updateProductSchema,
  updateStock: updateStockSchema,
  updateTechnicalSpecs: updateTechnicalSpecsSchema,
  addUsageScenario: addUsageScenarioSchema,
};
