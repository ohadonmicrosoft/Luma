import type { Meta, StoryObj } from "@storybook/react";
import { SectionLayout } from "../components/layout";
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
