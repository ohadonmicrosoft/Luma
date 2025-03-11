/**
 * Cloudinary configuration for Luma e-commerce platform
 * 
 * This file contains the configuration for Cloudinary, which is used for:
 * - Product image storage and optimization
 * - Image transformations (resizing, cropping, etc.)
 * - Responsive images with automatic format selection
 * - CDN delivery of images
 */

const cloudinaryConfig = {
  // Main configuration
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,

  // Folder structure
  folders: {
    products: 'luma/products',
    categories: 'luma/categories',
    banners: 'luma/banners',
    blog: 'luma/blog',
    users: 'luma/users'
  },

  // Image transformations
  transformations: {
    // Product image transformations
    productThumbnail: {
      width: 200,
      height: 200,
      crop: 'fill',
      quality: 'auto',
      format: 'auto',
      fetch_format: 'auto'
    },
    productCard: {
      width: 600,
      height: 600,
      crop: 'fill',
      quality: 'auto',
      format: 'auto',
      fetch_format: 'auto'
    },
    productDetail: {
      width: 1200,
      height: 1200,
      crop: 'limit',
      quality: 'auto',
      format: 'auto',
      fetch_format: 'auto'
    },
    // Category image transformations
    categoryThumbnail: {
      width: 300,
      height: 300,
      crop: 'fill',
      quality: 'auto',
      format: 'auto',
      fetch_format: 'auto'
    },
    // Banner image transformations
    banner: {
      width: 1920,
      height: 600,
      crop: 'fill',
      quality: 'auto',
      format: 'auto',
      fetch_format: 'auto'
    },
    mobileBanner: {
      width: 768,
      height: 500,
      crop: 'fill',
      quality: 'auto',
      format: 'auto',
      fetch_format: 'auto'
    }
  }
};

module.exports = cloudinaryConfig; 
