/**
 * Navigation Components Index
 * 
 * This file exports all navigation components to make imports cleaner.
 */

export { default as Breadcrumb } from "./Breadcrumb";
export { default as Pagination } from "./Pagination";
export { default as Tabs } from "./Tabs";
export { default as DropdownMenu } from "./DropdownMenu";

// Export types
export type { BreadcrumbItem, BreadcrumbProps } from "./Breadcrumb";
export type { PaginationProps } from "./Pagination";
export type { TabItem, TabsProps } from "./Tabs";
export type { 
  DropdownMenuItem, 
  DropdownMenuGroup, 
  DropdownMenuProps 
} from "./DropdownMenu"; 
