import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { DirectionProvider } from "../contexts/DirectionContext";

// Metadata for the component
const meta = {
  title: "UI/Card",
  component: Card as any,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "tactical",
        "outdoor",
        "primary",
        "secondary",
      ],
      description: "The visual style of the card",
    },
    elevation: {
      control: "select",
      options: ["flat", "sm", "md", "lg"],
      description: "The elevation/shadow level of the card",
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description: "The padding inside the card",
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
      description: "The border radius of the card",
    },
    fullWidth: {
      control: "boolean",
      description:
        "Whether the card should take up the full width of its container",
    },
    clickable: {
      control: "boolean",
      description:
        "Whether the card should have hover/active states like a clickable element",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<any>;

// Base Card Story
export const Default: Story = {
  args: {
    children: "Card Content",
    variant: "default",
    elevation: "md",
    padding: "md",
  },
};

// Card with Header, Content, and Footer
export const WithSections: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader
        title="Card Title"
        subtitle="Card Subtitle"
        action={
          <Button size="sm" variant="ghost">
            Action
          </Button>
        }
      />
      <CardContent>
        <p>
          This is the main content of the card. It can contain any React
          elements.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="primary" size="sm">
          Primary Action
        </Button>
        <Button variant="outline" size="sm" className="ml-2">
          Secondary Action
        </Button>
      </CardFooter>
    </Card>
  ),
};

// Card Variants
export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Card variant="default" className="p-4">
        <p className="font-medium">Default</p>
      </Card>
      <Card variant="outline" className="p-4">
        <p className="font-medium">Outline</p>
      </Card>
      <Card variant="tactical" className="p-4">
        <p className="font-medium">Tactical</p>
      </Card>
      <Card variant="outdoor" className="p-4">
        <p className="font-medium">Outdoor</p>
      </Card>
      <Card variant="primary" className="p-4">
        <p className="font-medium">Primary</p>
      </Card>
      <Card variant="secondary" className="p-4">
        <p className="font-medium">Secondary</p>
      </Card>
    </div>
  ),
};

// Card Elevations
export const Elevations: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card elevation="flat" className="p-4">
        <p className="font-medium">Flat</p>
      </Card>
      <Card elevation="sm" className="p-4">
        <p className="font-medium">Small</p>
      </Card>
      <Card elevation="md" className="p-4">
        <p className="font-medium">Medium</p>
      </Card>
      <Card elevation="lg" className="p-4">
        <p className="font-medium">Large</p>
      </Card>
    </div>
  ),
};

// Clickable Card
export const Clickable: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card clickable className="p-4" onClick={() => alert("Card clicked!")}>
        <p className="font-medium">Click me!</p>
        <p className="text-sm text-gray-500">This card is clickable</p>
      </Card>
    </div>
  ),
};

// Product Card Example
export const ProductCard: Story = {
  render: () => (
    <Card className="w-64 overflow-hidden">
      <div className="h-40 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">Product Image</span>
      </div>
      <div className="p-4">
        <h3 className="font-medium">Tactical Backpack</h3>
        <p className="text-sm text-gray-500 mb-2">Military-grade durability</p>
        <div className="flex justify-between items-center">
          <span className="font-bold">$129.99</span>
          <Button size="sm" variant="primary">
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  ),
};

// RTL Support
export const RTLSupport: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-lg font-medium mb-2">LTR (Left-to-Right)</h3>
        <Card className="w-80">
          <CardHeader
            title="Card Title"
            subtitle="Card Subtitle"
            action={
              <Button size="sm" variant="ghost">
                Action
              </Button>
            }
          />
          <CardContent>
            <p>This is the main content of the card with left-to-right text.</p>
          </CardContent>
          <CardFooter>
            <Button variant="primary" size="sm">
              Primary
            </Button>
            <Button variant="outline" size="sm" className="ml-2">
              Secondary
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">RTL (Right-to-Left)</h3>
        <DirectionProvider>
          <div dir="rtl">
            <Card className="w-80">
              <CardHeader
                title="عنوان البطاقة"
                subtitle="العنوان الفرعي"
                action={
                  <Button size="sm" variant="ghost">
                    إجراء
                  </Button>
                }
              />
              <CardContent>
                <p>
                  هذا هو المحتوى الرئيسي للبطاقة مع نص من اليمين إلى اليسار.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="primary" size="sm">
                  الإجراء الرئيسي
                </Button>
                <Button variant="outline" size="sm" className="mr-2">
                  الإجراء الثانوي
                </Button>
              </CardFooter>
            </Card>
          </div>
        </DirectionProvider>
      </div>
    </div>
  ),
};
