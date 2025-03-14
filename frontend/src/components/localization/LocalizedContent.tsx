import React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useLocalizedContent } from '@/services/translationService';
import { useLayout } from '@/contexts/LayoutContext';
import { LocalizedString } from '@/types/product';
import { cn } from '@/utils/cn';

interface LocalizedContentProps {
  content?: LocalizedString;
  fallback?: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  html?: boolean;
}

/**
 * Component for displaying localized content
 * Automatically uses the current locale and falls back to default locale if needed
 */
export const LocalizedContent: React.FC<LocalizedContentProps> = ({
  content,
  fallback = '',
  as: Component = 'span',
  className = '',
  html = false,
}) => {
  const { getContent } = useLocalizedContent();
  const { isRTL } = useLayout();
  
  // Get content in current locale with fallback
  // Handle case where content might be undefined
  const localizedContent = content ? getContent(content) || fallback : fallback;
  
  // Direction-specific class
  const dirClass = isRTL ? 'rtl' : 'ltr';
  const combinedClass = `${className} ${dirClass}`.trim();
  
  // Handle HTML content
  if (html && localizedContent) {
    return (
      <Component
        className={combinedClass}
        dangerouslySetInnerHTML={{ __html: localizedContent }}
      />
    );
  }
  
  // Regular text content
  return <Component className={combinedClass}>{localizedContent}</Component>;
};

interface LocalizedTextProps {
  textKey: string;
  ns?: string;
  fallback?: string;
  values?: Record<string, string | number>;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  html?: boolean;
}

/**
 * Component for displaying translated text from translation files
 * Uses i18next for translations
 */
export const LocalizedText: React.FC<LocalizedTextProps> = ({
  textKey,
  ns,
  fallback = '',
  values = {},
  as: Component = 'span',
  className = '',
  html = false,
}) => {
  const { t } = useTranslation(ns);
  const { isRTL } = useLayout();
  
  // Get translated text
  const translatedText = t(textKey, { ...values, defaultValue: fallback });
  
  // Direction-specific class
  const dirClass = isRTL ? 'rtl' : 'ltr';
  const combinedClass = `${className} ${dirClass}`.trim();
  
  // Handle HTML content
  if (html) {
    return (
      <Component
        className={combinedClass}
        dangerouslySetInnerHTML={{ __html: translatedText }}
      />
    );
  }
  
  // Regular text content
  return <Component className={combinedClass}>{translatedText}</Component>;
};

interface LocaleSwitcherProps {
  className?: string;
  compact?: boolean;
}

/**
 * Component for switching between available locales
 */
export const LocaleSwitcher: React.FC<LocaleSwitcherProps> = ({
  className = '',
  compact = false,
}) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const { isRTL } = useLayout();
  
  // Available locales (should be configured in next-i18next.config.js)
  const locales = router.locales || ['en', 'he'];
  
  // Get locale display names in their native language
  const localeNames: Record<string, string> = {
    en: 'English',
    he: 'עברית',
    ar: 'العربية',
    fr: 'Français',
    es: 'Español',
    de: 'Deutsch',
  };
  
  const handleLocaleChange = (locale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale });
  };
  
  // Compact version (just a selector)
  if (compact) {
    return (
      <select
        value={i18n.language}
        onChange={(e) => handleLocaleChange(e.target.value)}
        className={`locale-switcher ${className}`}
        aria-label="Select language"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeNames[locale] || locale}
          </option>
        ))}
      </select>
    );
  }
  
  // Full version (links with flags)
  return (
    <div className={`locale-switcher-full flex gap-2 ${className} ${isRTL ? 'rtl' : 'ltr'}`}>
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleLocaleChange(locale)}
          className={`locale-button px-2 py-1 rounded ${
            i18n.language === locale ? 'active font-bold' : ''
          }`}
          aria-label={`Switch to ${localeNames[locale] || locale}`}
        >
          {localeNames[locale] || locale}
        </button>
      ))}
    </div>
  );
};
