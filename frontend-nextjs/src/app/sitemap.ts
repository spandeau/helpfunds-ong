import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/don", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/projets", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/a-propos", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/equipe", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/valeurs", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/impact", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/rapports", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/actualites", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/mentions-legales", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/confidentialite", priority: 0.2, changeFrequency: "yearly" as const },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}