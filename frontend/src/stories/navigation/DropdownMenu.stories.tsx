import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "../../components/navigation";
import { Button } from "../../components/ui/Button";
import { DirectionProvider } from "../../contexts/DirectionContext";
import { ReactNode, useState } from "react";
import { 
  User, 
  Settings, 
  LogOut, 
  Edit, 
  Copy, 
  Trash, 
  Heart, 
  Share,
  ChevronDown,
  ShoppingCart,
  CreditCard,
  Bell,
  Globe,
  PenTool,
  Shield
} from "lucide-react";

// Common decorator to provide direction context
const withDirectionProvider = (Story: () => ReactNode) => (
  <DirectionProvider>
    <Story />
  </DirectionProvider>
);

// DropdownMenu stories
const meta = {
  title: "Navigation/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [(Story: () => ReactNode) => withDirectionProvider(Story)],
} as const;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    return (
      <DropdownMenu
        trigger={<Button>Options</Button>}
        items={[
          { id: "edit", label: "Edit", icon: <Edit size={16} />, onClick: () => console.log("Edit clicked") },
          { id: "duplicate", label: "Duplicate", icon: <Copy size={16} />, onClick: () => console.log("Duplicate clicked") },
          { id: "delete", label: "Delete", icon: <Trash size={16} />, variant: "danger", onClick: () => console.log("Delete clicked") },
        ]}
      />
    );
  },
};

export const WithGroups: Story = {
  render: function Render() {
    return (
      <DropdownMenu
        trigger={<Button variant="primary">Account</Button>}
        items={[
          { 
            id: "profile-group", 
            label: "Profile", 
            items: [
              { id: "edit-profile", label: "Edit Profile", icon: <User size={16} />, onClick: () => console.log("Edit Profile clicked") },
              { id: "settings", label: "Settings", icon: <Settings size={16} />, onClick: () => console.log("Settings clicked") },
            ]
          },
          { 
            id: "account-group", 
            label: "Account", 
            items: [
              { id: "billing", label: "Billing", icon: <CreditCard size={16} />, onClick: () => console.log("Billing clicked") },
              { id: "notifications", label: "Notifications", icon: <Bell size={16} />, onClick: () => console.log("Notifications clicked") },
              { id: "logout", label: "Log Out", icon: <LogOut size={16} />, variant: "danger", onClick: () => console.log("Log Out clicked") },
            ]
          },
        ]}
        width="lg"
      />
    );
  },
};

export const WithDividers: Story = {
  render: function Render() {
    return (
      <DropdownMenu
        trigger={<Button variant="secondary">Actions</Button>}
        items={[
          { id: "edit", label: "Edit", icon: <Edit size={16} />, onClick: () => console.log("Edit clicked") },
          { id: "share", label: "Share", icon: <Share size={16} />, onClick: () => console.log("Share clicked") },
          { id: "favorite", label: "Add to Favorites", icon: <Heart size={16} />, onClick: () => console.log("Favorite clicked") },
          { divider: true, id: "divider-1" },
          { id: "duplicate", label: "Duplicate", icon: <Copy size={16} />, onClick: () => console.log("Duplicate clicked") },
          { divider: true, id: "divider-2" },
          { id: "delete", label: "Delete", icon: <Trash size={16} />, variant: "danger", onClick: () => console.log("Delete clicked") },
        ]}
      />
    );
  },
};

export const WithLinks: Story = {
  render: function Render() {
    return (
      <DropdownMenu
        trigger={<Button variant="ghost">Navigate To</Button>}
        items={[
          { id: "home", label: "Home", href: "#home" },
          { id: "products", label: "Products", href: "#products" },
          { id: "blog", label: "Blog", href: "#blog" },
          { id: "about", label: "About Us", href: "#about" },
          { id: "contact", label: "Contact", href: "#contact" },
        ]}
        align="center"
      />
    );
  },
};

export const DifferentAlignments: Story = {
  render: function Render() {
    return (
      <div className="flex justify-between w-full max-w-2xl mx-auto">
        <DropdownMenu
          trigger={<Button variant="outline" size="sm">Align Start</Button>}
          items={[
            { id: "item1", label: "Option 1" },
            { id: "item2", label: "Option 2" },
            { id: "item3", label: "Option 3" },
          ]}
          align="start"
        />
        
        <DropdownMenu
          trigger={<Button variant="outline" size="sm">Align Center</Button>}
          items={[
            { id: "item1", label: "Option 1" },
            { id: "item2", label: "Option 2" },
            { id: "item3", label: "Option 3" },
          ]}
          align="center"
        />
        
        <DropdownMenu
          trigger={<Button variant="outline" size="sm">Align End</Button>}
          items={[
            { id: "item1", label: "Option 1" },
            { id: "item2", label: "Option 2" },
            { id: "item3", label: "Option 3" },
          ]}
          align="end"
        />
      </div>
    );
  },
};

export const RTLDropdown: Story = {
  render: function Render() {
    return (
      <DirectionProvider>
        <div dir="rtl" className="rtl">
          <DropdownMenu
            trigger={<Button>القائمة</Button>}
            items={[
              { id: "edit", label: "تعديل", icon: <Edit size={16} /> },
              { id: "settings", label: "الإعدادات", icon: <Settings size={16} /> },
              { divider: true, id: "divider" },
              { id: "logout", label: "تسجيل خروج", icon: <LogOut size={16} />, variant: "danger" },
            ]}
          />
        </div>
      </DirectionProvider>
    );
  },
}; 
