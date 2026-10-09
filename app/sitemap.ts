import type { MetadataRoute } from "next";
import { curriculum } from "@/lib/curriculum";
import { getNews } from "@/lib/notion/news";
import { segments } from "@/lib/segments";
import { siteConfig } from "@/lib/site";

// acompanha o cache do Notion: notícia nova entra no sitemap em até 5 min
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await getNews();
  const url = (path: string) => new URL(path, siteConfig.url).toString();
  const lastModified = new Date();

  return [
    { url: url("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: url("/sobre"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/grade-curricular"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...curriculum.map((axis) => ({ url: url(`/grade-curricular/${axis.id}`), lastModified, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: url("/parceiros"), lastModified, changeFrequency: "weekly", priority: 0.6 },
    { url: url("/empresas"), lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/noticias"), lastModified, changeFrequency: "daily", priority: 0.7 },
    ...news.map((item) => ({ url: url(`/noticias/${item.slug}`), lastModified: new Date(`${item.date}T08:00:00-03:00`), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...segments.map((segment) => ({ url: url(`/matriculas/${segment.id}`), lastModified, changeFrequency: "monthly" as const, priority: 0.9 })),
  ];
}
