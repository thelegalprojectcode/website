/** @type {import('next').NextConfig} */
const nextConfig = {
/* config options here */
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Add empty turbopack config to silence the warning
  turbopack: {},
  
  // Cloudflare-specific configurations
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Polyfills for Node.js built-in modules in browser/edge runtime
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;


