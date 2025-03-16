import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "../../components/navigation";
import { DirectionProvider } from "../../contexts/DirectionContext";
import { ReactNode, useState } from "react";
import { Home, Settings, User, Bell } from "lucide-react";

// Common decorator to provide direction context
const withDirectionProvider = (Story: () => ReactNode) => (
  <DirectionProvider>
    <Story />
  </DirectionProvider>
);

// Sample tab content components
const HomeContent = () => (
  <div className="p-4">
    <h3 className="text-lg font-medium mb-2">Home Content</h3>
    <p>This is the content for the Home tab. Welcome to our application!</p>
  </div>
);

const ProfileContent = () => (
  <div className="p-4">
    <h3 className="text-lg font-medium mb-2">Profile Content</h3>
    <p>View and edit your profile information here.</p>
    <div className="mt-4 p-4 bg-gray-100 rounded-md">
      <p><strong>Name:</strong> John Doe</p>
      <p><strong>Email:</strong> john.doe@example.com</p>
    </div>
  </div>
);

const NotificationsContent = () => (
  <div className="p-4">
    <h3 className="text-lg font-medium mb-2">Notifications</h3>
    <p>Your recent notifications will appear here.</p>
    <ul className="mt-4 space-y-2">
      <li className="p-2 bg-primary-50 rounded-md">New product announcement</li>
      <li className="p-2 bg-gray-100 rounded-md">Your order has shipped</li>
      <li className="p-2 bg-gray-100 rounded-md">Payment successful</li>
    </ul>
  </div>
);

const SettingsContent = () => (
  <div className="p-4">
    <h3 className="text-lg font-medium mb-2">Settings</h3>
    <p>Adjust your application settings here.</p>
    <div className="mt-4 space-y-2">
      <div className="flex items-center justify-between">
        <span>Dark Mode</span>
        <input type="checkbox" className="ml-2" />
      </div>
      <div className="flex items-center justify-between">
        <span>Notifications</span>
        <input type="checkbox" className="ml-2" defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <span>Email Updates</span>
        <input type="checkbox" className="ml-2" />
      </div>
    </div>
  </div>
);

// Tabs stories
const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [(Story: () => ReactNode) => withDirectionProvider(Story)],
} as const;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    return (
      <Tabs
        tabs={[
          { id: "home", label: "Home", content: <HomeContent /> },
          { id: "profile", label: "Profile", content: <ProfileContent /> },
          { id: "notifications", label: "Notifications", content: <NotificationsContent /> },
          { id: "settings", label: "Settings", content: <SettingsContent /> },
        ]}
        defaultTabId="home"
      />
    );
  },
};

export const WithIcons: Story = {
  render: function Render() {
    return (
      <Tabs
        tabs={[
          { id: "home", label: "Home", content: <HomeContent />, icon: <Home size={16} /> },
          { id: "profile", label: "Profile", content: <ProfileContent />, icon: <User size={16} /> },
          { id: "notifications", label: "Notifications", content: <NotificationsContent />, icon: <Bell size={16} /> },
          { id: "settings", label: "Settings", content: <SettingsContent />, icon: <Settings size={16} /> },
        ]}
        defaultTabId="home"
      />
    );
  },
};

export const PillVariant: Story = {
  render: function Render() {
    return (
      <Tabs
        tabs={[
          { id: "home", label: "Home", content: <HomeContent /> },
          { id: "profile", label: "Profile", content: <ProfileContent /> },
          { id: "notifications", label: "Notifications", content: <NotificationsContent /> },
          { id: "settings", label: "Settings", content: <SettingsContent /> },
        ]}
        defaultTabId="home"
        variant="pill"
      />
    );
  },
};

export const VerticalTabs: Story = {
  render: function Render() {
    return (
      <Tabs
        tabs={[
          { id: "home", label: "Home", content: <HomeContent />, icon: <Home size={16} /> },
          { id: "profile", label: "Profile", content: <ProfileContent />, icon: <User size={16} /> },
          { id: "notifications", label: "Notifications", content: <NotificationsContent />, icon: <Bell size={16} /> },
          { id: "settings", label: "Settings", content: <SettingsContent />, icon: <Settings size={16} /> },
        ]}
        defaultTabId="home"
        orientation="vertical"
      />
    );
  },
};

export const FullWidthTabs: Story = {
  render: function Render() {
    return (
      <Tabs
        tabs={[
          { id: "home", label: "Home", content: <HomeContent /> },
          { id: "profile", label: "Profile", content: <ProfileContent /> },
          { id: "notifications", label: "Notifications", content: <NotificationsContent /> },
          { id: "settings", label: "Settings", content: <SettingsContent /> },
        ]}
        defaultTabId="home"
        fullWidth={true}
      />
    );
  },
};

export const RTLTabs: Story = {
  render: function Render() {
    return (
      <DirectionProvider>
        <div dir="rtl" className="rtl">
          <Tabs
            tabs={[
              { id: "home", label: "الرئيسية", content: <HomeContent />, icon: <Home size={16} /> },
              { id: "profile", label: "الملف الشخصي", content: <ProfileContent />, icon: <User size={16} /> },
              { id: "notifications", label: "الإشعارات", content: <NotificationsContent />, icon: <Bell size={16} /> },
              { id: "settings", label: "الإعدادات", content: <SettingsContent />, icon: <Settings size={16} /> },
            ]}
            defaultTabId="home"
          />
        </div>
      </DirectionProvider>
    );
  },
}; 
