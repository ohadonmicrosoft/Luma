import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { cn } from '@/utils/cn';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { useLayout } from '@/contexts/LayoutContext';
import { RtlWrapper } from './RtlWrapper';

export interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isRTL } = useLayout();
  const { t } = useTranslation('common');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initialize scroll state
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 bg-white transition-all duration-200',
        isScrolled ? 'shadow-md py-2' : 'py-4',
        className
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-primary-800">{t('site.name')}</span>
        </Link>
        
        <RtlWrapper preserveSpacing={true}>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-neutral-700 hover:text-primary-600 transition-colors">
              {t('navigation.products')}
            </Link>
            <Link href="/categories" className="text-neutral-700 hover:text-primary-600 transition-colors">
              {t('navigation.categories')}
            </Link>
            <Link href="/about" className="text-neutral-700 hover:text-primary-600 transition-colors">
              {t('navigation.about')}
            </Link>
            <Link href="/contact" className="text-neutral-700 hover:text-primary-600 transition-colors">
              {t('navigation.contact')}
            </Link>
          </nav>
        </RtlWrapper>
        
        <RtlWrapper preserveSpacing={true} className="flex items-center space-x-4">
          <LanguageSwitcher className={isRTL ? "ml-4" : "mr-4"} />
          
          <button 
            className="text-neutral-700 hover:text-primary-600 transition-colors"
            aria-label={t('navigation.search')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <Link 
            href="/cart"
            className="text-neutral-700 hover:text-primary-600 transition-colors"
            aria-label={t('cart.title')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </Link>
          
          <Link 
            href="/account"
            className="text-neutral-700 hover:text-primary-600 transition-colors"
            aria-label={t('account.profile')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
          
          <button 
            className="md:hidden text-neutral-700 hover:text-primary-600 transition-colors"
            aria-label={t('navigation.menu')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </RtlWrapper>
      </div>
    </header>
  );
} 
