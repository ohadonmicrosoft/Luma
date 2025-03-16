import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DirectionSwitcher } from '@/components/common/DirectionSwitcher';

const meta = {
  title: 'Common/DirectionSwitcher',
  component: DirectionSwitcher,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof DirectionSwitcher>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomLabels: Story = {
  args: {
    ltrLabel: "Left-to-Right",
    rtlLabel: "Right-to-Left"
  },
};

export const WithIconOnly: Story = {
  args: {
    showLabels: false
  },
};

export const WithCustomSize: Story = {
  args: {
    size: "sm"
  },
}; 
