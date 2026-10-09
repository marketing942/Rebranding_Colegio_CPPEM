/** Notícias do site (/noticias). Os dados vêm do banco "Notícias · Colégio CPPEM" no Notion. */

export type NewsItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  /** Data de publicação, "AAAA-MM-DD". */
  date: string;
  /** Caminho do site ("/vida-escolar/foto-04.webp") ou URL https. Sem foto no Notion, vem a capa padrão. */
  imageUrl: string | null;
  imageAlt: string;
  featured: boolean;
};

/** Capa usada quando a notícia não tem foto própria (arte em public/noticias/). */
export const DEFAULT_NEWS_COVER = "/noticias/capa-noticias-cppem.webp";

export type NewsSpan = { text: string; bold?: boolean; italic?: boolean; href?: string };

export type NewsBlock =
  | { type: "paragraph"; spans: NewsSpan[] }
  | { type: "heading"; level: 2 | 3; spans: NewsSpan[] }
  | { type: "list"; ordered: boolean; items: NewsSpan[][] }
  | { type: "quote"; spans: NewsSpan[] }
  | { type: "image"; src: string; caption: string }
  | { type: "divider" };

export type NewsArticle = NewsItem & { blocks: NewsBlock[] };

/** "Dicas para escolher a escola" -> "dicas-para-escolher-a-escola" */
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/, "");
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "America/Recife" });

/** "2026-10-09" -> "9 de outubro de 2026" */
export function formatNewsDate(date: string): string {
  const parsed = new Date(`${date}T12:00:00-03:00`);
  return Number.isNaN(parsed.getTime()) ? "" : dateFormatter.format(parsed);
}

/**
 * Separa a notícia de destaque (cartão grande) das demais. Destaque marcado no Notion
 * tem prioridade; sem nenhum marcado, vale a mais recente.
 */
export function splitFeatured(items: NewsItem[]): { featured: NewsItem | null; others: NewsItem[] } {
  if (items.length === 0) return { featured: null, others: [] };
  const featured = items.find((item) => item.featured) ?? items[0];
  return { featured, others: items.filter((item) => item.id !== featured.id) };
}
