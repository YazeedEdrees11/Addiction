import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  },
  experimental: {
    optimizePackageImports: ["lucide-react"]
  },
  async rewrites() {
    // Rewrite API requests to Vercel only when building for Cloudflare Workers CI
    if (process.env.WORKERS_CI === "1") {
      return [
        {
          source: "/api/:path*",
          destination: "https://addiction-eta.vercel.app/api/:path*"
        }
      ];
    }
    return [];
  }
};

// Initialize Cloudflare development environment
initOpenNextCloudflareForDev();

export default nextConfig;
