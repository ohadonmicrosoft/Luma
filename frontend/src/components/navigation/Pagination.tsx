/**
 * Pagination Component
 * 
 * A navigation component for moving between pages of content.
 * Supports RTL layouts and provides accessibility features.
 */

import React from "react";
import { cn } from "@/utils/classNames";
import { useDirection } from "@/contexts/DirectionContext";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  siblingCount?: number;
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
}

/**
 * Pagination component for navigating between pages
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  showFirstLast = true,
  showPrevNext = true,
  siblingCount = 1,
  size = "md",
  ariaLabel = "Pagination navigation",
}) => {
  const { isRtl } = useDirection();
  
  // Calculate the range of page numbers to display
  const getPageRange = () => {
    const totalNumbers = siblingCount * 2 + 3; // siblingCount on each side + current + first + last
    const totalBlocks = totalNumbers + 2; // +2 for the ellipses

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      return [
        ...Array.from({ length: leftItemCount }, (_, i) => i + 1),
        "ellipsis",
        totalPages,
      ];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      return [
        1,
        "ellipsis",
        ...Array.from(
          { length: rightItemCount },
          (_, i) => totalPages - rightItemCount + i + 1
        ),
      ];
    }

    return [
      1,
      "ellipsis",
      ...Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      ),
      "ellipsis",
      totalPages,
    ];
  };

  // Get size-based classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-8 w-8 text-sm";
      case "lg":
        return "h-12 w-12 text-lg";
      default:
        return "h-10 w-10 text-base";
    }
  };

  // Generate page items
  const pageRange = getPageRange();
  const sizeClasses = getSizeClasses();

  // Swap prev/next icons based on direction
  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <nav aria-label={ariaLabel} className={cn("flex justify-center", className)}>
      <ul className="flex items-center -space-x-px rtl:space-x-reverse">
        {/* First page button */}
        {showFirstLast && (
          <li>
            <button
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className={cn(
                sizeClasses,
                "flex items-center justify-center border border-gray-300 rounded-l-lg rtl:rounded-l-none rtl:rounded-r-lg",
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-500 hover:bg-gray-50 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
              )}
              aria-label="Go to first page"
            >
              <span className="sr-only">First page</span>
              <span className="flex items-center">
                <ChevronLeft size={16} />
                <ChevronLeft size={16} className="-ml-2" />
              </span>
            </button>
          </li>
        )}

        {/* Previous page button */}
        {showPrevNext && (
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={cn(
                sizeClasses,
                "flex items-center justify-center border border-gray-300",
                !showFirstLast && "rounded-l-lg rtl:rounded-l-none rtl:rounded-r-lg",
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-500 hover:bg-gray-50 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
              )}
              aria-label="Go to previous page"
            >
              <span className="sr-only">Previous page</span>
              <PrevIcon size={16} />
            </button>
          </li>
        )}

        {/* Page numbers */}
        {pageRange.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <li key={`ellipsis-${index}`}>
                <span
                  className={cn(
                    sizeClasses,
                    "flex items-center justify-center border border-gray-300 bg-white text-gray-500"
                  )}
                >
                  <MoreHorizontal size={16} />
                </span>
              </li>
            );
          }

          return (
            <li key={`page-${page}`}>
              <button
                onClick={() => onPageChange(page as number)}
                aria-current={currentPage === page ? "page" : undefined}
                className={cn(
                  sizeClasses,
                  "flex items-center justify-center border",
                  currentPage === page
                    ? "z-10 bg-primary-50 border-primary-500 text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                )}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            </li>
          );
        })}

        {/* Next page button */}
        {showPrevNext && (
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={cn(
                sizeClasses,
                "flex items-center justify-center border border-gray-300",
                !showFirstLast && "rounded-r-lg rtl:rounded-r-none rtl:rounded-l-lg",
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-500 hover:bg-gray-50 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
              )}
              aria-label="Go to next page"
            >
              <span className="sr-only">Next page</span>
              <NextIcon size={16} />
            </button>
          </li>
        )}

        {/* Last page button */}
        {showFirstLast && (
          <li>
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={cn(
                sizeClasses,
                "flex items-center justify-center border border-gray-300 rounded-r-lg rtl:rounded-r-none rtl:rounded-l-lg",
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-500 hover:bg-gray-50 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
              )}
              aria-label="Go to last page"
            >
              <span className="sr-only">Last page</span>
              <span className="flex items-center">
                <ChevronRight size={16} className="-mr-2" />
                <ChevronRight size={16} />
              </span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination; 
