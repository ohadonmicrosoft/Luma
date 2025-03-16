import React from "react";
import { useDirection } from "@/contexts/DirectionContext";

interface DirectionSwitcherProps {
  className?: string;
}

/**
 * DirectionSwitcher Component
 * 
 * A component that allows users to manually toggle between RTL and LTR text direction.
 * This is primarily for testing and development purposes.
 */
export const DirectionSwitcher: React.FC<DirectionSwitcherProps> = ({
  className = "",
}) => {
  const { direction, toggleDirection } = useDirection();

  return (
    <button
      onClick={toggleDirection}
      className={`flex items-center px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors ${className}`}
      aria-label={`Switch to ${direction === "ltr" ? "RTL" : "LTR"} mode`}
    >
      <span className="mr-2">{direction === "ltr" ? "→" : "←"}</span>
      <span>{direction === "ltr" ? "RTL" : "LTR"}</span>
    </button>
  );
};

export default DirectionSwitcher; 
