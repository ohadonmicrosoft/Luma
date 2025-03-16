import type { Meta, StoryObj } from "@storybook/react";
import {
  SectionLayout,
  GridLayout,
  StackLayout,
  ContainerLayout,
} from "../components/layout";
import { DirectionProvider } from "../contexts/DirectionContext";
import { ReactNode } from "react";

// Common decorator to provide direction context
const withDirectionProvider = (Story: () => ReactNode) => (
  <DirectionProvider>
    <Story />
  </DirectionProvider>
);

// Section Layout stories
const meta = {
  title: "Layout/SectionLayout",
  component: SectionLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [(Story: () => ReactNode) => withDirectionProvider(Story)],
} as const;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSection: Story = {
  render: () => (
    <SectionLayout>
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        <p className="text-xl">Default Section Layout</p>
      </div>
    </SectionLayout>
  ),
};

export const SectionBackgrounds: Story = {
  render: () => (
    <div className="space-y-4">
      <SectionLayout background="white" paddingY="sm">
        <div className="h-24 flex items-center justify-center border">
          <p>White Background</p>
        </div>
      </SectionLayout>

      <SectionLayout background="light" paddingY="sm">
        <div className="h-24 flex items-center justify-center border">
          <p>Light Background</p>
        </div>
      </SectionLayout>

      <SectionLayout background="primary" paddingY="sm">
        <div className="h-24 flex items-center justify-center border">
          <p>Primary Background</p>
        </div>
      </SectionLayout>
      
      <SectionLayout background="tactical" paddingY="sm">
        <div className="h-24 flex items-center justify-center border">
          <p>Tactical Background</p>
        </div>
      </SectionLayout>
      
      <SectionLayout background="outdoor" paddingY="sm">
        <div className="h-24 flex items-center justify-center border">
          <p>Outdoor Background</p>
        </div>
      </SectionLayout>

      <SectionLayout background="dark" paddingY="sm">
        <div className="h-24 flex items-center justify-center border border-gray-600">
          <p>Dark Background</p>
        </div>
      </SectionLayout>
    </div>
  ),
};

// Grid Layout stories - export as its own story file
export const GridLayoutStory = {
  title: "Layout/GridLayout",
  component: GridLayout as any,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [withDirectionProvider],
};

type GridStory = StoryObj<any>;

export const DefaultGrid: GridStory = {
  render: () => (
    <GridLayout>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="h-24 bg-gray-100 border flex items-center justify-center"
        >
          <p>Grid Item {i + 1}</p>
        </div>
      ))}
    </GridLayout>
  ),
};

export const ResponsiveGrid: GridStory = {
  render: () => (
    <GridLayout
      columns={{
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 6,
      }}
      gap="md"
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="h-24 bg-gray-100 border flex items-center justify-center"
        >
          <p>Grid Item {i + 1}</p>
        </div>
      ))}
    </GridLayout>
  ),
};

// Stack Layout stories - export as its own story file
export const StackLayoutStory = {
  title: "Layout/StackLayout",
  component: StackLayout as any,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [withDirectionProvider],
};

type StackStory = StoryObj<any>;

export const VerticalStack: StackStory = {
  render: () => (
    <StackLayout direction="vertical" gap="md">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-16 bg-gray-100 border flex items-center justify-center w-full"
        >
          <p>Item {i + 1}</p>
        </div>
      ))}
    </StackLayout>
  ),
};

export const HorizontalStack: StackStory = {
  render: () => (
    <StackLayout direction="horizontal" gap="md" wrap={true}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-16 w-32 bg-gray-100 border flex items-center justify-center"
        >
          <p>Item {i + 1}</p>
        </div>
      ))}
    </StackLayout>
  ),
};

export const StackWithDividers: StackStory = {
  render: () => (
    <div className="space-y-8">
      <StackLayout direction="vertical" dividers={true} gap="md">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-16 bg-gray-100 border flex items-center justify-center w-full"
          >
            <p>Vertical Item {i + 1}</p>
          </div>
        ))}
      </StackLayout>

      <StackLayout direction="horizontal" dividers={true} gap="md">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-16 w-32 bg-gray-100 border flex items-center justify-center"
          >
            <p>Horizontal Item {i + 1}</p>
          </div>
        ))}
      </StackLayout>
    </div>
  ),
};

// Container Layout stories - export as its own story file
export const ContainerLayoutStory = {
  title: "Layout/ContainerLayout",
  component: ContainerLayout as any,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [withDirectionProvider],
};

type ContainerStory = StoryObj<any>;

export const DefaultContainer: ContainerStory = {
  render: () => (
    <div className="bg-gray-200 p-4">
      <ContainerLayout>
        <div className="h-32 bg-white border flex items-center justify-center">
          <p>Default Container</p>
        </div>
      </ContainerLayout>
    </div>
  ),
};

export const ContainerWidths: ContainerStory = {
  render: () => (
    <div className="bg-gray-200 p-4 space-y-8">
      <ContainerLayout maxWidth="sm">
        <div className="h-16 bg-white border flex items-center justify-center">
          <p>Small Container</p>
        </div>
      </ContainerLayout>
      
      <ContainerLayout maxWidth="md">
        <div className="h-16 bg-white border flex items-center justify-center">
          <p>Medium Container</p>
        </div>
      </ContainerLayout>
      
      <ContainerLayout maxWidth="lg">
        <div className="h-16 bg-white border flex items-center justify-center">
          <p>Large Container</p>
        </div>
      </ContainerLayout>
      
      <ContainerLayout maxWidth="xl">
        <div className="h-16 bg-white border flex items-center justify-center">
          <p>Extra Large Container</p>
        </div>
      </ContainerLayout>
      
      <ContainerLayout fluid={true}>
        <div className="h-16 bg-white border flex items-center justify-center">
          <p>Fluid Container</p>
        </div>
      </ContainerLayout>
    </div>
  ),
}; 
