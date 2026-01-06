/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Node.js compatibility for Cloudflare Workers
  experimental: {
    runtime: 'experimental-edge',
  },
  
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
