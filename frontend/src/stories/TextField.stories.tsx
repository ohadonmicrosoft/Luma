import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "../components/ui/TextField";
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

const LockIcon = () => (
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
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

// Metadata for the component
const meta = {
  title: "UI/TextField",
  component: TextField as any,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error", "success"],
      description: "The visual style of the text field",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the text field",
    },
    fullWidth: {
      control: "boolean",
      description:
        "Whether the text field should take up the full width of its container",
    },
    label: {
      control: "text",
      description: "The label for the text field",
    },
    helperText: {
      control: "text",
      description: "Helper text to display below the text field",
    },
    errorText: {
      control: "text",
      description: "Error message to display below the text field",
    },
    hideLabel: {
      control: "boolean",
      description: "Whether to hide the label",
    },
    disabled: {
      control: "boolean",
      description: "Whether the text field is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the text field is required",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel", "url"],
      description: "The type of the input",
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<any>;

// Base TextField Story
export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    helperText: "Helper text",
  },
};

// TextField Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <TextField
        label="Default"
        placeholder="Default variant"
        helperText="This is the default variant"
      />
      <TextField
        label="Error"
        placeholder="Error variant"
        errorText="This field has an error"
      />
      <TextField
        label="Success"
        placeholder="Success variant"
        variant="success"
        helperText="This field is valid"
      />
    </div>
  ),
};

// TextField Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <TextField size="sm" label="Small" placeholder="Small size" />
      <TextField size="md" label="Medium" placeholder="Medium size" />
      <TextField size="lg" label="Large" placeholder="Large size" />
    </div>
  ),
};

// TextField with Icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <TextField
        label="Search"
        placeholder="Search..."
        startIcon={<SearchIcon />}
      />
      <TextField
        label="Password"
        type="password"
        placeholder="Enter password"
        startIcon={<LockIcon />}
      />
      <TextField
        label="With both icons"
        placeholder="Type something"
        startIcon={<SearchIcon />}
        endIcon={<LockIcon />}
      />
    </div>
  ),
};

// TextField States
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <TextField label="Required" placeholder="Required field" required />
      <TextField
        label="Disabled"
        placeholder="Disabled field"
        disabled
        helperText="This field is disabled"
      />
      <TextField
        label="Read Only"
        value="Read-only value"
        readOnly
        helperText="This field is read-only"
      />
    </div>
  ),
};

// Input Types
export const InputTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <TextField label="Text" type="text" placeholder="Text input" />
      <TextField label="Email" type="email" placeholder="Email input" />
      <TextField
        label="Password"
        type="password"
        placeholder="Password input"
      />
      <TextField label="Number" type="number" placeholder="Number input" />
    </div>
  ),
};

// RTL Support
export const RTLSupport: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-lg font-medium mb-2">LTR (Left-to-Right)</h3>
        <div className="w-80">
          <TextField
            label="Search"
            placeholder="Search..."
            startIcon={<SearchIcon />}
            helperText="Enter search terms"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">RTL (Right-to-Left)</h3>
        <DirectionProvider>
          <div dir="rtl" className="w-80">
            <TextField
              label="بحث"
              placeholder="ابحث هنا..."
              startIcon={<SearchIcon />}
              helperText="أدخل مصطلحات البحث"
            />
          </div>
        </DirectionProvider>
      </div>
    </div>
  ),
};
