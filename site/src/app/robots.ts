import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.buscouai.com/sitemap.xml",
    host: "https://www.buscouai.com",
  };
}
