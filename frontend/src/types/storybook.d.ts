/**
 * Type declarations for Storybook
 *
 * These types are used to fix linting errors when using Storybook.
 */

declare module "@storybook/react" {
  import { ComponentType, ReactElement } from "react";

  export interface Meta<T> {
    title: string;
    component: ComponentType<T>;
    parameters?: Record<string, unknown>;
    argTypes?: Record<string, unknown>;
    args?: Partial<T>;
    tags?: string[];
  }

  export interface StoryObj<T> {
    args?: Partial<T>;
    render?: (args: T) => ReactElement;
    name?: string;
    parameters?: Record<string, unknown>;
    play?: (context: unknown) => Promise<void> | void;
  }
}
