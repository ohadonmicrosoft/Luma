/**
 * Direction Context Provider
 *
 * This context provides RTL/LTR direction management for the application.
 * It detects the current locale and sets the appropriate direction.
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

// Direction type
type Direction = "ltr" | "rtl";

// Direction context interface
interface DirectionContextType {
  direction: Direction;
  isRtl: boolean;
  setDirection: (dir: Direction) => void;
  toggleDirection: () => void;
}

// Create the context with default values
const DirectionContext = createContext<DirectionContextType>({
  direction: "ltr",
  isRtl: false,
  setDirection: () => {},
  toggleDirection: () => {},
});

// Props for the provider component
interface DirectionProviderProps {
  children: React.ReactNode;
}

/**
 * Direction Provider Component
 *
 * Provides direction context to the application and manages RTL/LTR state.
 */
export const DirectionProvider: React.FC<DirectionProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const { locale } = router;

  // RTL languages list
  const rtlLanguages = ["he", "ar", "fa", "ur"];

  // Determine if current locale is RTL
  const isRtlLocale = (locale?: string): boolean => {
    if (!locale) return false;
    return rtlLanguages.some((rtlLocale) => locale.startsWith(rtlLocale));
  };

  // Initialize direction state based on locale
  const [direction, setDirection] = useState<Direction>(
    isRtlLocale(locale) ? "rtl" : "ltr"
  );

  // Update direction when locale changes
  useEffect(() => {
    const newDirection = isRtlLocale(locale) ? "rtl" : "ltr";
    setDirection(newDirection);

    // Update document direction
    document.documentElement.dir = newDirection;
    document.documentElement.setAttribute("lang", locale || "en");

    // Set CSS logical properties
    updateCssVariables(newDirection);
  }, [locale]);

  // Update CSS variables for RTL/LTR support
  const updateCssVariables = (dir: Direction) => {
    const root = document.documentElement;

    if (dir === "rtl") {
      root.style.setProperty("--start", "right");
      root.style.setProperty("--end", "left");
      root.style.setProperty("--text-align", "right");
      root.style.setProperty("--float", "right");
    } else {
      root.style.setProperty("--start", "left");
      root.style.setProperty("--end", "right");
      root.style.setProperty("--text-align", "left");
      root.style.setProperty("--float", "left");
    }
  };

  // Toggle direction manually
  const toggleDirection = () => {
    const newDirection = direction === "ltr" ? "rtl" : "ltr";
    setDirection(newDirection);
    document.documentElement.dir = newDirection;
    updateCssVariables(newDirection);
  };

  // Context value
  const contextValue: DirectionContextType = {
    direction,
    isRtl: direction === "rtl",
    setDirection,
    toggleDirection,
  };

  return (
    <DirectionContext.Provider value={contextValue}>
      <div
        dir={direction}
        className={direction === "rtl" ? "font-hebrew" : "font-sans"}
      >
        {children}
      </div>
    </DirectionContext.Provider>
  );
};

/**
 * Hook to use the direction context
 */
export const useDirection = (): DirectionContextType => {
  const context = useContext(DirectionContext);

  if (!context) {
    throw new Error("useDirection must be used within a DirectionProvider");
  }

  return context;
};

export default DirectionProvider;
