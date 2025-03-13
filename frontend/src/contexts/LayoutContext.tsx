import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/router';

type Direction = 'ltr' | 'rtl';

interface LayoutContextType {
  direction: Direction;
  isRTL: boolean;
  setDirection: (direction: Direction) => void;
  toggleDirection: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const router = useRouter();
  const { locale } = router;
  
  // Determine initial direction based on locale
  const getInitialDirection = useCallback((): Direction => {
    const rtlLocales = ['he', 'ar', 'fa', 'ur'];
    return rtlLocales.some(rtlLocale => locale?.startsWith(rtlLocale)) ? 'rtl' : 'ltr';
  }, [locale]);
  
  const [direction, setDirection] = useState<Direction>(getInitialDirection());
  
  // Update direction when locale changes
  useEffect(() => {
    const newDirection = getInitialDirection();
    setDirection(newDirection);
    
    // Set direction on html element
    document.documentElement.dir = newDirection;
    document.documentElement.setAttribute('lang', locale || 'en');
    
    // Set RTL-specific CSS variables
    const root = document.documentElement;
    if (newDirection === 'rtl') {
      root.style.setProperty('--start', 'right');
      root.style.setProperty('--end', 'left');
      root.style.setProperty('--text-align', 'right');
      root.style.setProperty('--float', 'right');
    } else {
      root.style.setProperty('--start', 'left');
      root.style.setProperty('--end', 'right');
      root.style.setProperty('--text-align', 'left');
      root.style.setProperty('--float', 'left');
    }
    
  }, [locale, getInitialDirection]);
  
  const toggleDirection = () => {
    const newDirection = direction === 'ltr' ? 'rtl' : 'ltr';
    setDirection(newDirection);
    document.documentElement.dir = newDirection;
    
    // Update RTL-specific CSS variables
    const root = document.documentElement;
    if (newDirection === 'rtl') {
      root.style.setProperty('--start', 'right');
      root.style.setProperty('--end', 'left');
      root.style.setProperty('--text-align', 'right');
      root.style.setProperty('--float', 'right');
    } else {
      root.style.setProperty('--start', 'left');
      root.style.setProperty('--end', 'right');
      root.style.setProperty('--text-align', 'left');
      root.style.setProperty('--float', 'left');
    }
  };
  
  return (
    <LayoutContext.Provider
      value={{
        direction,
        isRTL: direction === 'rtl',
        setDirection,
        toggleDirection,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}; 
