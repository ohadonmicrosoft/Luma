/**
 * Type declarations for Storybook
 *
 * These types are used to fix linting errors when using Storybook.
 */

import { Meta as StorybookMeta, StoryObj as StorybookStoryObj } from '@storybook/react';
import { FC, ComponentProps, ComponentType } from 'react';

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

/**
 * Fix for the error:
 * "Type 'FC<ComponentProps>' is not assignable to type 'ComponentType<FC<ComponentProps>>'"
 */
declare global {
  namespace ReactStorybook {
    interface Meta<T = any> extends Omit<StorybookMeta<T>, 'component'> {
      component?: ComponentType<any>;
    }
    
    interface Story<T = any> extends StorybookStoryObj<T> {}
  }
}

// This makes TypeScript treat the file as a module
export {};
