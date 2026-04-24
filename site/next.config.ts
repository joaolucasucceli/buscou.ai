import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@buscou/design-system"],
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/landing.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
