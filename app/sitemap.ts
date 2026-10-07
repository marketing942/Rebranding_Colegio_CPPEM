import type { MetadataRoute } from "next";
import { curriculum } from "@/lib/curriculum";
import { segments } from "@/lib/segments";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteConfig.url).toString();
  const lastModified = new Date();

  return [
    { url: url("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: url("/sobre"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/grade-curricular"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...curriculum.map((axis) => ({ url: url(`/grade-curricular/${axis.id}`), lastModified, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: url("/parceiros"), lastModified, changeFrequency: "weekly", priority: 0.6 },
    ...segments.map((segment) => ({ url: url(`/matriculas/${segment.id}`), lastModified, changeFrequency: "monthly" as const, priority: 0.9 })),
  ];
}
