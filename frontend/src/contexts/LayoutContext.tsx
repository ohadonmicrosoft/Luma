import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Direction = 'ltr' | 'rtl';

interface LayoutContextType {
  direction: Direction;
  isRTL: boolean;
  setDirection: (dir: Direction) => void;
}

const LayoutContext = createContext<LayoutContextType>({
  direction: 'ltr',
  isRTL: false,
  setDirection: () => {},
});

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { locale } = router;
  
  // Set initial direction based on the current locale
  const initialDirection: Direction = locale === 'he' ? 'rtl' : 'ltr';
  
  const [direction, setDirection] = useState<Direction>(initialDirection);
  const isRTL = direction === 'rtl';
  
  // Update direction when locale changes
  useEffect(() => {
    const newDirection: Direction = locale === 'he' ? 'rtl' : 'ltr';
    setDirection(newDirection);
    
    // Update HTML dir attribute
    document.documentElement.dir = newDirection;
    
    // Update HTML lang attribute
    document.documentElement.lang = locale || 'en';
    
    // Add appropriate class to body for RTL styles
    if (newDirection === 'rtl') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [locale]);
  
  return (
    <LayoutContext.Provider value={{ direction, isRTL, setDirection }}>
      {children}
    </LayoutContext.Provider>
  );
}; 
