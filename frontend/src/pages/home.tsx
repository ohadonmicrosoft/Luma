import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryShowcase } from '@/components/categories/CategoryShowcase';
import { heroSlides } from '@/data/heroSlides';
import { mainCategories, tacticalCategories, outdoorCategories, homeDefenseCategories } from '@/data/categories';
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
      
      {/* Main Categories */}
      <CategoryShowcase 
        title="categories.title"
        description="categories.description"
        categories={mainCategories}
        variant="featured"
      />
      
      {/* Tactical Categories */}
      <div className="bg-neutral-50 dark:bg-neutral-900">
        <CategoryShowcase 
          title="categories.tactical.title"
          description="categories.tactical.description"
          categories={tacticalCategories}
          variant="grid"
        />
      </div>
      
      {/* Outdoor Categories */}
      <CategoryShowcase 
        title="categories.outdoor.title"
        description="categories.outdoor.description"
        categories={outdoorCategories}
        variant="carousel"
      />
      
      {/* Home Defense Categories */}
      <div className="bg-neutral-50 dark:bg-neutral-900">
        <CategoryShowcase 
          title="categories.homeDefense.title"
          description="categories.homeDefense.description"
          categories={homeDefenseCategories}
          variant="grid"
        />
      </div>
      
      {/* Site Information */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">
            <LocalizedText textKey="site.tagline" ns="common" />
          </h2>
          
          <p className="text-lg mb-8 text-center text-neutral-700 dark:text-neutral-300">
            <LocalizedText textKey="site.description" ns="common" />
          </p>
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
