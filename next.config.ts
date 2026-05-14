import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Pin workspace root so Turbopack does not pick a parent folder when multiple lockfiles exist. */
  turbopack: {
    root: process.cwd(),
  },
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/guides",
        destination: "/blog/guides",
        permanent: true,
      },
      {
        source: "/guides/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/compare",
        destination: "/blog/compare",
        permanent: true,
      },
      {
        source: "/compare/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "iamclearmind.com" }],
        destination: "https://www.iamclearmind.com/:path*",
        permanent: true,
      },
    ];
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
    minimumCacheTTL: 60,
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
