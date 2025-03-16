import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/ui/Button";
import { DirectionProvider } from "../contexts/DirectionContext";

// Icons for demonstration
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// Metadata for the component
const meta = {
  title: "UI/Button",
  component: Button as any,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "outline",
        "ghost",
        "tactical",
        "outdoor",
        "danger",
        "success",
      ],
      description: "The visual style of the button",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "The size of the button",
    },
    fullWidth: {
      control: "boolean",
      description:
        "Whether the button should take up the full width of its container",
    },
    iconPosition: {
      control: "select",
      options: ["left", "right"],
      description: "The position of the icon relative to the text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    loading: {
      control: "boolean",
      description: "Whether the button is in a loading state",
    },
    loadingText: {
      control: "text",
      description: "Text to display when the button is loading",
    },
    icon: {
      control: { disable: true },
      description: "Icon to display in the button",
    },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<any>;

// Base Button Story
export const Default: Story = {
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
  },
};

// Button Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button variant="tactical">Tactical</Button>
        <Button variant="outdoor">Outdoor</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="success">Success</Button>
      </div>
    </div>
  ),
};

// Button Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

// Button with Icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <Button icon={<SearchIcon />}>Search</Button>
        <Button icon={<ArrowRightIcon />} iconPosition="right">
          Next
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button variant="outline" icon={<SearchIcon />}>
          Search
        </Button>
        <Button
          variant="outline"
          icon={<ArrowRightIcon />}
          iconPosition="right"
        >
          Next
        </Button>
      </div>
    </div>
  ),
};

// Button States
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
        <Button loading loadingText="Loading...">
          Submit
        </Button>
      </div>
    </div>
  ),
};

// Full Width Button
export const FullWidth: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Button fullWidth>Full Width Button</Button>
      <Button fullWidth variant="secondary">
        Full Width Secondary
      </Button>
    </div>
  ),
};

// RTL Support
export const RTLSupport: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-lg font-medium mb-2">LTR (Left-to-Right)</h3>
        <div className="flex flex-wrap gap-4">
          <Button icon={<SearchIcon />}>Search</Button>
          <Button icon={<ArrowRightIcon />} iconPosition="right">
            Next
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">RTL (Right-to-Left)</h3>
        <DirectionProvider>
          <div dir="rtl" className="flex flex-wrap gap-4">
            <Button icon={<SearchIcon />}>بحث</Button>
            <Button icon={<ArrowRightIcon />} iconPosition="right">
              التالي
            </Button>
          </div>
        </DirectionProvider>
      </div>
    </div>
  ),
};
