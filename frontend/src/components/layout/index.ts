/**
 * Layout Components Index
 * 
 * This file exports all layout components to make imports cleaner.
 */

export { Layout } from "./Layout";
export { Header } from "./Header";
export { Footer } from "./Footer";
export { RtlWrapper } from "./RtlWrapper";
export { default as SectionLayout } from "./SectionLayout";
export { default as GridLayout } from "./GridLayout";
export { default as StackLayout } from "./StackLayout";
export { default as ContainerLayout } from "./ContainerLayout";

// Export responsive components
export { 
  Hide, 
  Show, 
  Visible, 
  ResponsiveSpacing 
} from './responsive';

// Export types
export type { LayoutProps } from "./Layout";
export type { HeaderProps } from "./Header";
export type { SectionLayoutProps } from "./SectionLayout";
export type { GridLayoutProps } from "./GridLayout";
export type { StackLayoutProps } from "./StackLayout";
export type { ContainerLayoutProps } from "./ContainerLayout";

// Export responsive component types
export type { 
  HideProps, 
  ShowProps, 
  VisibleProps,
  ResponsiveSpacingProps, 
  SpacingSize, 
  SpacingConfig, 
  Breakpoint 
} from './responsive'; 
