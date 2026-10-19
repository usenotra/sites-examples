import type { MetadataRoute } from "next";

// Replace www.pathway.com with your domain.
const SITE_URL = "https://www.pathway.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: [`${SITE_URL}/blog/sitemap.xml`, `${SITE_URL}/changelog/sitemap.xml`],
  };
}
