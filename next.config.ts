import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/services", destination: "/operations-core", permanent: true },
      { source: "/services/:path*", destination: "/operations-core", permanent: true },
    ];
  },
};

export default nextConfig;
