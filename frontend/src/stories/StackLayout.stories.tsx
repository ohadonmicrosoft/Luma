import type { Meta, StoryObj } from "@storybook/react";
import { StackLayout } from "../components/layout";
import { DirectionProvider } from "../contexts/DirectionContext";
import { ReactNode } from "react";

// Common decorator to provide direction context
const withDirectionProvider = (Story: () => ReactNode) => (
  <DirectionProvider>
    <Story />
  </DirectionProvider>
);

// Stack Layout stories
const meta = {
  title: "Layout/StackLayout",
  component: StackLayout,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [(Story: () => ReactNode) => withDirectionProvider(Story)],
} as const;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerticalStack: Story = {
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

export const HorizontalStack: Story = {
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

export const StackWithDividers: Story = {
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
