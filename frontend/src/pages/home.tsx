import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { heroSlides } from '@/data/heroSlides';
import { LocalizedText } from '@/components/localization/LocalizedContent';
import { useLayout } from '@/contexts/LayoutContext';

export default function HomePage() {
  const { t } = useTranslation(['common', 'home']);
  const { isRTL } = useLayout();
  
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection 
        slides={heroSlides} 
        autoplay={true} 
        autoplaySpeed={6000}
      />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">
            <LocalizedText textKey="site.tagline" ns="common" />
          </h2>
          
          <p className="text-lg mb-8 text-center text-neutral-700 dark:text-neutral-300">
            <LocalizedText textKey="site.description" ns="common" />
          </p>
          
          {/* Additional content will be added in future updates */}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'home'])),
    },
  };
};
