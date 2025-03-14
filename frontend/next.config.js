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
  // Set up path aliases
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  }
};

module.exports = nextConfig;
