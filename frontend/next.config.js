/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  distDir: '.next',
  // Disable ESLint during build
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Set up path aliases
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  }
};

module.exports = nextConfig;
