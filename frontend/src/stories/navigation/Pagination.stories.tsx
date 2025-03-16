import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "../../components/navigation";
import { DirectionProvider } from "../../contexts/DirectionContext";
import { ReactNode, useState } from "react";

// Common decorator to provide direction context
const withDirectionProvider = (Story: () => ReactNode) => (
  <DirectionProvider>
    <Story />
  </DirectionProvider>
);

// Pagination stories
const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
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
    const [page, setPage] = useState(1);
    return (
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={setPage}
      />
    );
  },
};

export const WithManyPages: Story = {
  render: function Render() {
    const [page, setPage] = useState(5);
    return (
      <Pagination
        currentPage={page}
        totalPages={20}
        onPageChange={setPage}
      />
    );
  },
};

export const CompactPagination: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    return (
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={setPage}
        size="sm"
        showFirstLast={false}
      />
    );
  },
};

export const LargePagination: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    return (
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={setPage}
        size="lg"
        siblingCount={2}
      />
    );
  },
};

export const RTLPagination: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    return (
      <DirectionProvider>
        <div dir="rtl" className="rtl">
          <Pagination
            currentPage={page}
            totalPages={10}
            onPageChange={setPage}
            ariaLabel="تصفح الصفحات"
          />
        </div>
      </DirectionProvider>
    );
  },
}; 
