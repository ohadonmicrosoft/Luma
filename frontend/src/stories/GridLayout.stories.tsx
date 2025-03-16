import type { Meta, StoryObj } from "@storybook/react";
import { GridLayout } from "../components/layout";
import { DirectionProvider } from "../contexts/DirectionContext";
import { ReactNode } from "react";

// Common decorator to provide direction context
const withDirectionProvider = (Story: () => ReactNode) => (
  <DirectionProvider>
    <Story />
  </DirectionProvider>
);

// Grid Layout stories
const meta = {
  title: "Layout/GridLayout",
  component: GridLayout,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [(Story: () => ReactNode) => withDirectionProvider(Story)],
} as const;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultGrid: Story = {
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

export const ResponsiveGrid: Story = {
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
