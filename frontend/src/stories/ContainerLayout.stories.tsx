import type { Meta, StoryObj } from "@storybook/react";
import { ContainerLayout } from "../components/layout";
import { DirectionProvider } from "../contexts/DirectionContext";
import { ReactNode } from "react";

// Common decorator to provide direction context
const withDirectionProvider = (Story: () => ReactNode) => (
  <DirectionProvider>
    <Story />
  </DirectionProvider>
);

// Container Layout stories
const meta = {
  title: "Layout/ContainerLayout",
  component: ContainerLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [(Story: () => ReactNode) => withDirectionProvider(Story)],
} as const;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultContainer: Story = {
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

export const ContainerWidths: Story = {
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
          <p>XL Container</p>
        </div>
      </ContainerLayout>
      
      <ContainerLayout maxWidth="full">
        <div className="h-16 bg-white border flex items-center justify-center">
          <p>Full Width Container</p>
        </div>
      </ContainerLayout>
    </div>
  ),
}; 
