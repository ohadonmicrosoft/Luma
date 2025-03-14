import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryShowcase } from '@/components/categories/CategoryShowcase';
import { heroSlides } from '@/data/heroSlides';
import { mainCategories, tacticalCategories, outdoorCategories, homeDefenseCategories } from '@/data/categories';

export default function HomePage() {
  return (
    <Layout>
      <HeroSection slides={heroSlides} autoplay={true} autoplaySpeed={5000} />
      
      {/* Main Categories */}
      <CategoryShowcase
        title="Explore Our Categories"
        description="Discover our wide range of tactical and outdoor equipment"
        categories={mainCategories}
        variant="featured"
        className="mt-12"
      />
      
      {/* Tactical Categories */}
      <CategoryShowcase
        title="Tactical Equipment"
        description="Professional-grade gear for law enforcement, military, and security professionals"
        categories={tacticalCategories}
        variant="grid"
        className="mt-16"
      />
      
      {/* Outdoor Categories */}
      <CategoryShowcase
        title="Outdoor Adventure"
        description="Essential gear for camping, hiking, and outdoor exploration"
        categories={outdoorCategories}
        variant="carousel"
        className="mt-16"
      />
      
      {/* Home Defense Categories */}
      <CategoryShowcase
        title="Home Defense"
        description="Reliable solutions to protect what matters most"
        categories={homeDefenseCategories}
        variant="grid"
        className="mt-16 mb-20"
      />
      
      {/* Site Info */}
      <div className="bg-gray-100 py-16 mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Luma</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
              <p>All products are tested and verified to meet our high standards</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p>Our team of specialists is always ready to help with your questions</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p>Quick delivery options available for all orders</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
