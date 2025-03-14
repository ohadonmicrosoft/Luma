import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useLayout } from '@/contexts/LayoutContext';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { isRTL } = useLayout();
  
  const toggleLanguage = () => {
    const { pathname, asPath, query } = router;
    const newLocale = router.locale === 'en' ? 'he' : 'en';
    
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };
  
  return (
    <button 
      onClick={toggleLanguage}
      className={`flex items-center px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors ${className}`}
      aria-label={t('site.switch_language')}
    >
      <span className="mr-2">{isRTL ? '🇺🇸' : '🇮🇱'}</span>
      <span>{isRTL ? t('site.english') : t('site.hebrew')}</span>
    </button>
  );
};

export default LanguageSwitcher; 
