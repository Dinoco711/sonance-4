/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  
  images: {
    domains: ['images.unsplash.com', 'i.scdn.co', 'source.unsplash.com', 'picsum.photos', 'placehold.co','/public/cover','/public'],
    unoptimized: process.env.NODE_ENV === "development",
  },
  poweredByHeader: false,
  compress: true,
  eslint: {
    // Temporarily disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Temporarily disable TypeScript errors during builds
    ignoreBuildErrors: true,
  },
  // Enable React strict mode for better development
  reactStrictMode: true,
  // Disable development indicators
  devIndicators: false,
};

module.exports = nextConfig;
