import type { MetadataRoute } from "next";
import { segments } from "@/lib/segments";
import { siteConfig } from "@/lib/site";

// /grade-curricular fica de fora enquanto for só uma página de espera
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteConfig.url).toString();
  const lastModified = new Date();

  return [
    { url: url("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: url("/sobre"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...segments.map((segment) => ({ url: url(`/matriculas/${segment.id}`), lastModified, changeFrequency: "monthly" as const, priority: 0.9 })),
  ];
}
