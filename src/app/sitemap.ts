import type { MetadataRoute } from "next";
import { NAV, SITE } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return NAV.map((n) => ({
    url: `${SITE.url}${n.href}`,
    changeFrequency: n.href === "/" ? "weekly" : "monthly",
    priority: n.href === "/" ? 1 : 0.8,
  }));
}
