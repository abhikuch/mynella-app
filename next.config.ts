import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@portabletext/react"],
  },
  /** Pin workspace root so Turbopack does not pick a parent folder when multiple lockfiles exist. */
  turbopack: {
    root: process.cwd(),
  },
  poweredByHeader: false,
  async redirects() {
    return [];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  images: {
    /** Prefer AVIF/WebP when the browser supports them (Next defaults; explicit for clarity). */
    formats: ["image/avif", "image/webp"],
    /** Align with CMS cache window; on-demand revalidate keeps HTML fresh. */
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
