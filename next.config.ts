import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { domains: ["firebasestorage.googleapis.com", "res.cloudinary.com"] },
  modularizeImports: {
    "@aomdev/ui": {
      transform: "@aomdev/ui/src/{{ kebabCase member }}",
      skipDefaultConversion: true
    }
  }
};

export default nextConfig;
