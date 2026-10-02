import "server-only";
import { unstable_cache } from "next/cache";
import { notion, NOTION_CACHE_SECONDS } from "@/lib/notion/client";
import { plainText, readNumber, readSiteUrl, resolveDataSourceId } from "@/lib/notion/properties";
import type { CampaignBanner } from "@/types/content";

type ScheduledBanner = CampaignBanner & {
  startsAt: number | null;
  endsAt: number | null;
  order: number;
};

// data sem hora no "Fim" vale até o fim do dia: quem marca 30/09 espera o
// banner no ar durante todo o dia 30
function dateLimit(value: unknown, end: boolean): number | null {
  const date = (value as { date?: { start?: string; end?: string } } | undefined)?.date;
  const iso = end ? (date?.end ?? date?.start) : date?.start;
  if (!iso) return null;
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(iso);
  const timestamp = new Date(dateOnly && end ? `${iso}T23:59:59` : iso).getTime();
  return Number.isNaN(timestamp) ? null : timestamp;
}

async function lerBanners(): Promise<CampaignBanner[]> {
  const databaseId = process.env.NOTION_BANNERS_DATABASE_ID;
  if (!notion || !databaseId) {
    // sem isso a home cai no hero institucional em silêncio e parece que o banner sumiu
    console.warn(`[notion] Banners desativados: falta ${notion ? "NOTION_BANNERS_DATABASE_ID" : "NOTION_TOKEN"} no .env.local.`);
    return [];
  }

  try {
    const dataSourceId = await resolveDataSourceId(databaseId, notion);
    if (!dataSourceId) return [];
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: { property: "Status", select: { equals: "Ativo" } },
    });

    const scheduled: ScheduledBanner[] = [];
    for (const page of response.results) {
      const properties = (page as { properties?: Record<string, unknown> }).properties;
      if (!properties) continue;
      const desktopUrl = readSiteUrl(properties["Banner desktop"]);
      const href = readSiteUrl(properties.Link);
      if (!desktopUrl || !href) {
        // banner Ativo que não entra no ar: quase sempre é a arte com caminho do computador em vez de URL
        const nome = plainText((properties.Nome as { title?: unknown })?.title) || "sem nome";
        console.warn(`[notion] Banner "${nome}" ignorado: ${desktopUrl ? "Link" : "Banner desktop"} precisa ser https://... ou um caminho do site (ex.: /banners/arte.png).`);
        continue;
      }

      scheduled.push({
        id: (page as { id: string }).id,
        name: plainText((properties.Nome as { title?: unknown })?.title) || "Colégio CPPEM",
        desktopUrl,
        mobileUrl: readSiteUrl(properties["Banner mobile"]) || null,
        href,
        ctaLabel: plainText((properties["Texto do botão"] as { rich_text?: unknown })?.rich_text),
        callout: plainText((properties.Chamada as { rich_text?: unknown })?.rich_text),
        startsAt: dateLimit(properties["Início"], false),
        endsAt: dateLimit(properties.Fim, true),
        order: readNumber(properties.Ordem) ?? Number.MAX_SAFE_INTEGER,
      });
    }

    const now = Date.now();
    return scheduled
      .filter(({ startsAt, endsAt }) => (startsAt === null || now >= startsAt) && (endsAt === null || now <= endsAt))
      .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name, "pt-BR"))
      .map(({ id, name, desktopUrl, mobileUrl, ctaLabel, callout, href }) => ({ id, name, desktopUrl, mobileUrl, ctaLabel, callout, href }));
  } catch (error) {
    console.error("[notion] Falha ao carregar banners:", error instanceof Error ? error.message : "erro desconhecido");
    return [];
  }
}

// o cache é também a precisão com que Início/Fim entram e saem do ar
export const getBanners = unstable_cache(lerBanners, ["colegio-banners", String(NOTION_CACHE_SECONDS)], { revalidate: NOTION_CACHE_SECONDS, tags: ["banners"] });
