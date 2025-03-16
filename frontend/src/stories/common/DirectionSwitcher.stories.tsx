import React from "react";
import { DirectionSwitcher } from "@/components/common/DirectionSwitcher";

const meta: ReactStorybook.Meta<typeof DirectionSwitcher> = {
  title: "Common/DirectionSwitcher",
  component: DirectionSwitcher,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = ReactStorybook.Story<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomLabels: Story = {
  args: {
    ltrLabel: "Left-to-Right",
    rtlLabel: "Right-to-Left",
  },
};

export const WithIconOnly: Story = {
  args: {
    showLabels: false,
  },
};

export const WithCustomSize: Story = {
  args: {
    size: "sm",
  },
};
