import React from 'react';
import Head from 'next/head';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedCategories } from '@/components/home/FeaturedCategories';
import { ProductCarousel } from '@/components/home/ProductCarousel';
import { BrandStory, BrandIcons } from '@/components/home/BrandStory';

// Mock data for featured categories
const featuredCategories = [
  {
    id: 'cat-1',
    name: 'Electronics',
    slug: 'electronics',
    image: '/images/categories/electronics.jpg',
    productCount: 124,
  },
  {
    id: 'cat-2',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    image: '/images/categories/home-kitchen.jpg',
    productCount: 89,
  },
  {
    id: 'cat-3',
    name: 'Fashion',
    slug: 'fashion',
    image: '/images/categories/fashion.jpg',
    productCount: 156,
  },
];

// Mock data for featured products
const featuredProducts = [
  {
    id: 'prod-1',
    name: 'Wireless Noise-Cancelling Headphones',
    slug: 'wireless-noise-cancelling-headphones',
    price: 249.99,
    image: '/images/products/headphones.jpg',
    rating: 4.8,
    reviewCount: 156,
    isNew: true,
  },
  {
    id: 'prod-2',
    name: 'Smart Watch Pro',
    slug: 'smart-watch-pro',
    price: 399.99,
    image: '/images/products/smartwatch.jpg',
    rating: 4.6,
    reviewCount: 98,
    isOnSale: true,
    discount: 15,
  },
  {
    id: 'prod-3',
    name: 'Ultra HD 4K Monitor',
    slug: 'ultra-hd-4k-monitor',
    price: 599.99,
    image: '/images/products/monitor.jpg',
    rating: 4.9,
    reviewCount: 72,
  },
  {
    id: 'prod-4',
    name: 'Ergonomic Office Chair',
    slug: 'ergonomic-office-chair',
    price: 249.99,
    image: '/images/products/chair.jpg',
    rating: 4.7,
    reviewCount: 124,
  },
  {
    id: 'prod-5',
    name: 'Mechanical Keyboard',
    slug: 'mechanical-keyboard',
    price: 129.99,
    image: '/images/products/keyboard.jpg',
    rating: 4.5,
    reviewCount: 87,
    isNew: true,
  },
  {
    id: 'prod-6',
    name: 'Wireless Gaming Mouse',
    slug: 'wireless-gaming-mouse',
    price: 79.99,
    image: '/images/products/mouse.jpg',
    rating: 4.4,
    reviewCount: 63,
    isOnSale: true,
    discount: 10,
  },
  {
    id: 'prod-7',
    name: 'Portable Bluetooth Speaker',
    slug: 'portable-bluetooth-speaker',
    price: 89.99,
    image: '/images/products/speaker.jpg',
    rating: 4.3,
    reviewCount: 42,
  },
  {
    id: 'prod-8',
    name: 'Laptop Stand',
    slug: 'laptop-stand',
    price: 49.99,
    image: '/images/products/laptop-stand.jpg',
    rating: 4.2,
    reviewCount: 38,
  },
];

// Mock data for new arrivals
const newArrivals = featuredProducts.filter(product => product.isNew);

// Mock data for brand story highlights
const brandHighlights = [
  {
    id: 'highlight-1',
    title: 'Premium Quality',
    description: 'We source only the highest quality materials for our products, ensuring durability and satisfaction.',
    icon: BrandIcons.Quality,
  },
  {
    id: 'highlight-2',
    title: 'Innovative Design',
    description: 'Our team of designers constantly push the boundaries to create innovative and functional products.',
    icon: BrandIcons.Innovation,
  },
  {
    id: 'highlight-3',
    title: 'Sustainable Practices',
    description: 'We are committed to sustainable manufacturing practices and reducing our environmental footprint.',
    icon: BrandIcons.Sustainability,
  },
];

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Luma | Premium E-Commerce Experience</title>
        <meta name="description" content="Discover premium products with exceptional quality and design at Luma." />
      </Head>

      <HeroSection
        title="Elevate Your Everyday"
        subtitle="Discover premium products designed to enhance your life with exceptional quality and thoughtful design."
        ctaText="Shop Now"
        ctaLink="/products"
        secondaryCtaText="Learn More"
        secondaryCtaLink="/about"
        backgroundImage="/images/hero-background.jpg"
      />

      <FeaturedCategories
        title="Shop by Category"
        subtitle="Explore our wide range of premium products across popular categories"
        categories={featuredCategories}
      />

      <ProductCarousel
        title="Featured Products"
        subtitle="Our most popular products based on sales"
        products={featuredProducts}
        viewAllLink="/products"
        autoAdvanceInterval={6000}
      />

      <BrandStory
        title="Our Commitment to Excellence"
        subtitle="Discover what makes Luma different from other e-commerce platforms"
        highlights={brandHighlights}
      />

      <ProductCarousel
        title="New Arrivals"
        subtitle="The latest additions to our collection"
        products={newArrivals.length > 0 ? newArrivals : featuredProducts.slice(0, 4)}
        viewAllLink="/products?sort=newest"
        autoAdvanceInterval={5000}
      />
    </Layout>
  );
}
