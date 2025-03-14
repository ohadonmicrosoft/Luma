import { Product } from "@/types/product";

/**
 * Service for handling product import and export operations
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

/**
 * Export format types
 */
export type ExportFormat = "csv" | "json" | "xlsx";

/**
 * Import format types
 */
export type ImportFormat = "csv" | "json" | "xlsx";

/**
 * Export status interface
 */
export interface ExportStatus {
  id: string;
  status: "pending" | "processing" | "completed" | "failed";
  format: ExportFormat;
  fileUrl?: string;
  totalProducts: number;
  exportedProducts: number;
  createdAt: string;
  completedAt?: string;
  error?: string;
}

/**
 * Import status interface
 */
export interface ImportStatus {
  id: string;
  status: "pending" | "validating" | "processing" | "completed" | "failed";
  format: ImportFormat;
  fileName: string;
  totalProducts: number;
  processedProducts: number;
  successfulProducts: number;
  failedProducts: number;
  createdAt: string;
  completedAt?: string;
  error?: string;
  validationErrors?: ImportValidationError[];
}

/**
 * Import validation error interface
 */
export interface ImportValidationError {
  row: number;
  column: string;
  message: string;
  value?: string;
}

/**
 * Export products to file
 */
export async function exportProducts(
  format: ExportFormat = "csv",
  filters?: Record<string, any>,
  includeVariants: boolean = true,
  includeImages: boolean = true,
  includeCategories: boolean = true,
  includeBrands: boolean = true,
  includeInventory: boolean = true,
  locales: string[] = ["en"]
): Promise<ExportStatus> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/export`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        format,
        filters,
        includeVariants,
        includeImages,
        includeCategories,
        includeBrands,
        includeInventory,
        locales,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error starting product export: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to start product export:", error);
    throw error;
  }
}

/**
 * Get export status
 */
export async function getExportStatus(exportId: string): Promise<ExportStatus> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/export/${exportId}/status`
    );

    if (!response.ok) {
      throw new Error(`Error fetching export status: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch export status for ID ${exportId}:`, error);
    throw error;
  }
}

/**
 * Download export file
 */
export function downloadExportFile(fileUrl: string, fileName: string): void {
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Import products from file
 */
export async function importProducts(
  file: File,
  updateExisting: boolean = true,
  createMissing: boolean = true,
  validateOnly: boolean = false,
  defaultLocale: string = "en"
): Promise<ImportStatus> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("updateExisting", updateExisting.toString());
    formData.append("createMissing", createMissing.toString());
    formData.append("validateOnly", validateOnly.toString());
    formData.append("defaultLocale", defaultLocale);

    const response = await fetch(`${API_BASE_URL}/products/import`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error starting product import: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to start product import:", error);
    throw error;
  }
}

/**
 * Get import status
 */
export async function getImportStatus(importId: string): Promise<ImportStatus> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/import/${importId}/status`
    );

    if (!response.ok) {
      throw new Error(`Error fetching import status: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch import status for ID ${importId}:`, error);
    throw error;
  }
}

/**
 * Cancel import
 */
export async function cancelImport(importId: string): Promise<ImportStatus> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/import/${importId}/cancel`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error(`Error canceling import: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to cancel import with ID ${importId}:`, error);
    throw error;
  }
}

/**
 * Get import template
 */
export async function getImportTemplate(
  format: ImportFormat = "csv",
  includeVariants: boolean = true,
  includeImages: boolean = true,
  includeCategories: boolean = true,
  includeBrands: boolean = true,
  includeInventory: boolean = true,
  locales: string[] = ["en"]
): Promise<string> {
  try {
    const params = new URLSearchParams();
    params.append("format", format);
    params.append("includeVariants", includeVariants.toString());
    params.append("includeImages", includeImages.toString());
    params.append("includeCategories", includeCategories.toString());
    params.append("includeBrands", includeBrands.toString());
    params.append("includeInventory", includeInventory.toString());
    params.append("locales", locales.join(","));

    const response = await fetch(
      `${API_BASE_URL}/products/import/template?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching import template: ${response.statusText}`);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Failed to fetch import template:", error);
    throw error;
  }
}

/**
 * Get import validation errors
 */
export async function getImportValidationErrors(
  importId: string,
  page: number = 1,
  limit: number = 100
): Promise<{
  errors: ImportValidationError[];
  total: number;
  page: number;
  totalPages: number;
}> {
  try {
    const params = new URLSearchParams();
    params.append("_page", page.toString());
    params.append("_limit", limit.toString());

    const response = await fetch(
      `${API_BASE_URL}/products/import/${importId}/errors?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching import validation errors: ${response.statusText}`
      );
    }

    const total = parseInt(response.headers.get("X-Total-Count") || "0", 10);
    const errors = await response.json();

    return {
      errors,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error(
      `Failed to fetch validation errors for import ${importId}:`,
      error
    );
    throw error;
  }
}

/**
 * Download import error report
 */
export async function downloadImportErrorReport(
  importId: string,
  format: "csv" | "json" = "csv"
): Promise<string> {
  try {
    const params = new URLSearchParams();
    params.append("format", format);

    const response = await fetch(
      `${API_BASE_URL}/products/import/${importId}/error-report?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching import error report: ${response.statusText}`
      );
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error(
      `Failed to fetch error report for import ${importId}:`,
      error
    );
    throw error;
  }
}
