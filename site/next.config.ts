import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@buscou/design-system"],
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/landing.html" },
        { source: "/termos", destination: "/termos.html" },
        { source: "/privacidade", destination: "/privacidade.html" },
        { source: "/exemplo/blog", destination: "/exemplo/blog/index.html" },
        { source: "/exemplo/blog/artigo", destination: "/exemplo/blog/artigo.html" },
        { source: "/exemplo/blog/categoria", destination: "/exemplo/blog/categoria.html" },
        { source: "/exemplo/dashboard", destination: "/exemplo/dashboard/dashboard-home.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
