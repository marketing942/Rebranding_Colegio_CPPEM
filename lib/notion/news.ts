import "server-only";
import { unstable_cache } from "next/cache";
import { notion, NOTION_CACHE_SECONDS } from "@/lib/notion/client";
import { plainText, readCheckbox, readSelect, readSiteUrl, resolveDataSourceId } from "@/lib/notion/properties";
import { DEFAULT_NEWS_COVER, slugify, type NewsArticle, type NewsBlock, type NewsItem, type NewsSpan } from "@/lib/news";

type Properties = Record<string, unknown>;

// Banco "Notícias · Colégio CPPEM", na página Sistemas Site. O ID não é segredo:
// fica como padrão para a página funcionar sem variável nova.
const NEWS_DATABASE_ID = process.env.NOTION_NEWS_DATABASE_ID || "30531adb-5e5a-403e-8ea0-e37223596c62";

const richText = (value: unknown) => plainText((value as { rich_text?: unknown })?.rich_text);

/** Foto enviada à mão (campo Foto, URL temporária do Notion ou link externo) ou, na falta, o campo "Foto URL". */
function readImage(properties: Properties): string | null {
  const files = (properties.Foto as { files?: Array<{ file?: { url?: string }; external?: { url?: string } }> } | undefined)?.files;
  const uploaded = files?.[0]?.file?.url ?? files?.[0]?.external?.url ?? "";
  if (uploaded.startsWith("https://")) return uploaded;
  return readSiteUrl(properties["Foto URL"]) || null;
}

function readDate(properties: Properties, createdTime: string): string {
  const start = (properties.Data as { date?: { start?: string } | null } | undefined)?.date?.start;
  return (typeof start === "string" ? start : createdTime).slice(0, 10);
}

/** Hoje no fuso do colégio, "AAAA-MM-DD": notícia com Data futura fica agendada. */
function today(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Recife" }).format(new Date());
}

async function readNews(): Promise<NewsItem[]> {
  if (!notion) return [];

  try {
    const dataSourceId = await resolveDataSourceId(NEWS_DATABASE_ID);
    if (!dataSourceId) return [];

    const pages: Array<{ id: string; created_time: string; properties: Properties }> = [];
    let cursor: string | undefined;
    do {
      const response = await notion.dataSources.query({
        data_source_id: dataSourceId,
        filter: { property: "Status", select: { equals: "Publicado" } },
        page_size: 100,
        start_cursor: cursor,
      });
      for (const page of response.results) if ("properties" in page) pages.push(page as never);
      cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
    } while (cursor && pages.length < 500);

    const limit = today();
    const usedSlugs = new Set<string>();
    const items = pages
      .map((page) => {
        const title = plainText((page.properties["Título"] as { title?: unknown })?.title);
        return { page, title, date: readDate(page.properties, page.created_time) };
      })
      .filter(({ title, date }) => title && date <= limit)
      // mais antigas primeiro só para a regra do slug repetido: quem publicou antes fica com o endereço limpo
      .sort((a, b) => a.date.localeCompare(b.date) || a.page.created_time.localeCompare(b.page.created_time))
      .map(({ page, title, date }): NewsItem => {
        const { properties } = page;
        let slug = slugify(richText(properties.Slug) || title) || page.id.replace(/-/g, "").slice(0, 12);
        if (usedSlugs.has(slug)) slug = `${slug}-${page.id.replace(/-/g, "").slice(0, 6)}`;
        usedSlugs.add(slug);
        return {
          id: page.id,
          slug,
          title,
          summary: richText(properties.Resumo),
          category: readSelect(properties.Categoria),
          date,
          imageUrl: readImage(properties) ?? DEFAULT_NEWS_COVER,
          imageAlt: richText(properties["Descrição da foto"]) || title,
          featured: readCheckbox(properties.Destaque),
        };
      });

    return items.reverse();
  } catch (error) {
    console.error("[notion] Falha ao carregar notícias:", error instanceof Error ? error.message : "erro desconhecido");
    return [];
  }
}

/** Notícias publicadas, da mais recente para a mais antiga. As fotos enviadas ao Notion têm URL que vence em 1 hora; o cache curto renova antes disso. */
export const getNews = unstable_cache(readNews, ["colegio-noticias", String(NOTION_CACHE_SECONDS)], { revalidate: NOTION_CACHE_SECONDS, tags: ["noticias"] });

// ---------- corpo da notícia (blocos da página do Notion) ----------

type RichTextItem = { plain_text?: string; href?: string | null; annotations?: { bold?: boolean; italic?: boolean } };
type NotionBlock = { type: string; [key: string]: unknown };

function toSpans(value: unknown): NewsSpan[] {
  if (!Array.isArray(value)) return [];
  return (value as RichTextItem[])
    .filter((item) => item.plain_text)
    .map((item) => ({
      text: item.plain_text ?? "",
      ...(item.annotations?.bold ? { bold: true } : {}),
      ...(item.annotations?.italic ? { italic: true } : {}),
      // só links https ou caminhos do próprio site
      ...(item.href && (item.href.startsWith("https://") || item.href.startsWith("/")) ? { href: item.href } : {}),
    }));
}

function toBlocks(raw: NotionBlock[]): NewsBlock[] {
  const blocks: NewsBlock[] = [];
  for (const block of raw) {
    const data = block[block.type] as { rich_text?: unknown; caption?: unknown; file?: { url?: string }; external?: { url?: string } } | undefined;
    const spans = toSpans(data?.rich_text);

    if (block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
      const ordered = block.type === "numbered_list_item";
      const last = blocks.at(-1);
      // itens seguidos do mesmo tipo formam uma lista só
      if (last?.type === "list" && last.ordered === ordered) last.items.push(spans);
      else blocks.push({ type: "list", ordered, items: [spans] });
    } else if (block.type === "paragraph") {
      if (spans.length > 0) blocks.push({ type: "paragraph", spans });
    } else if (block.type === "heading_1" || block.type === "heading_2") {
      if (spans.length > 0) blocks.push({ type: "heading", level: 2, spans });
    } else if (block.type === "heading_3") {
      if (spans.length > 0) blocks.push({ type: "heading", level: 3, spans });
    } else if (block.type === "quote" || block.type === "callout") {
      if (spans.length > 0) blocks.push({ type: "quote", spans });
    } else if (block.type === "image") {
      const src = data?.file?.url ?? data?.external?.url ?? "";
      if (src.startsWith("https://")) blocks.push({ type: "image", src, caption: plainText(data?.caption) });
    } else if (block.type === "divider") {
      blocks.push({ type: "divider" });
    }
  }
  return blocks;
}

async function readBlocks(pageId: string): Promise<NewsBlock[]> {
  if (!notion) return [];
  try {
    const raw: NotionBlock[] = [];
    let cursor: string | undefined;
    do {
      const response = await notion.blocks.children.list({ block_id: pageId, page_size: 100, start_cursor: cursor });
      for (const block of response.results) if ("type" in block) raw.push(block as unknown as NotionBlock);
      cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
    } while (cursor && raw.length < 400);
    return toBlocks(raw);
  } catch (error) {
    console.error("[notion] Falha ao carregar o texto da notícia:", error instanceof Error ? error.message : "erro desconhecido");
    return [];
  }
}

const getBlocks = unstable_cache(readBlocks, ["colegio-noticia-texto", String(NOTION_CACHE_SECONDS)], { revalidate: NOTION_CACHE_SECONDS, tags: ["noticias"] });

/** Uma notícia publicada, com o texto. null se o endereço não existir. */
export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  const item = (await getNews()).find((news) => news.slug === slug);
  if (!item) return null;
  return { ...item, blocks: await getBlocks(item.id) };
}
