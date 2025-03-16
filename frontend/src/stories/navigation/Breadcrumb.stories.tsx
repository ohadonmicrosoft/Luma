import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "../../components/navigation";
import { DirectionProvider } from "../../contexts/DirectionContext";
import { ReactNode } from "react";
import { MapPin, ShoppingBag, Home } from "lucide-react";

// Common decorator to provide direction context
const withDirectionProvider = (Story: () => ReactNode) => (
  <DirectionProvider>
    <Story />
  </DirectionProvider>
);

// Breadcrumb stories
const meta = {
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [(Story: () => ReactNode) => withDirectionProvider(Story)],
} as const;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Tactical Gear", href: "/products/tactical" },
        { label: "Backpacks" },
      ]}
    />
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: "Home", href: "/", icon: <Home size={16} /> },
        { label: "Products", href: "/products", icon: <ShoppingBag size={16} /> },
        { label: "Stores", href: "/stores", icon: <MapPin size={16} /> },
        { label: "New York Store" },
      ]}
      showHomeIcon={false}
    />
  ),
};

export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Categories", href: "/products/categories" },
        { label: "Tactical Gear" },
      ]}
      separator={<span className="mx-1">/</span>}
    />
  ),
};

export const RTLBreadcrumb: Story = {
  render: () => (
    <DirectionProvider>
      <div dir="rtl" className="rtl">
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "المنتجات", href: "/products" },
            { label: "المعدات التكتيكية", href: "/products/tactical" },
            { label: "حقائب الظهر" },
          ]}
        />
      </div>
    </DirectionProvider>
  ),
}; 
