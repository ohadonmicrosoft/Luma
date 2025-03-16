import React from 'react';
import DirectionSwitcher from '@/components/common/DirectionSwitcher';
import type { ComponentProps } from 'react';

type DirectionSwitcherProps = ComponentProps<typeof DirectionSwitcher>;

const meta: ReactStorybook.Meta<DirectionSwitcherProps> = {
  title: 'Common/DirectionSwitcher',
  component: DirectionSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = ReactStorybook.Story<DirectionSwitcherProps>;

export const Default: Story = {
  args: {
    className: '',
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'bg-blue-100 text-blue-800 border-blue-300',
  },
};
