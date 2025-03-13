import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Button } from '@/components/ui/Button';

interface LanguageSwitcherProps {
  variant?: 'default' | 'minimal' | 'icon';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'default',
  className = '',
}) => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const { pathname, asPath, query } = router;
  
  // Get the current language and the alternative language
  const currentLocale = i18n.language || 'en';
  const alternateLocale = currentLocale === 'en' ? 'he' : 'en';
  
  // Language labels for display
  const languages = {
    en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
    he: { name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱' },
  };
  
  const handleLanguageChange = () => {
    document.documentElement.dir = alternateLocale === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = alternateLocale;
    
    router.push({ pathname, query }, asPath, { locale: alternateLocale });
  };
  
  // Icon-only version
  if (variant === 'icon') {
    return (
      <button
        onClick={handleLanguageChange}
        className={`p-2 rounded-full hover:bg-neutral-100 transition-colors ${className}`}
        aria-label={`Switch to ${languages[alternateLocale].name}`}
      >
        <span className="text-lg">{languages[alternateLocale].flag}</span>
      </button>
    );
  }
  
  // Minimal version (just the flag and abbreviated name)
  if (variant === 'minimal') {
    return (
      <button
        onClick={handleLanguageChange}
        className={`flex items-center space-x-1 px-2 py-1 rounded hover:bg-neutral-100 transition-colors ${className}`}
        aria-label={`Switch to ${languages[alternateLocale].name}`}
      >
        <span className="text-lg">{languages[alternateLocale].flag}</span>
        <span className="text-sm font-medium">{alternateLocale.toUpperCase()}</span>
      </button>
    );
  }
  
  // Default version
  return (
    <div className={className}>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleLanguageChange}
        className="flex items-center space-x-2"
      >
        <span className="text-lg">{languages[alternateLocale].flag}</span>
        <span>
          {currentLocale === 'en' 
            ? languages[alternateLocale].nativeName 
            : languages[alternateLocale].name}
        </span>
      </Button>
    </div>
  );
}; 
