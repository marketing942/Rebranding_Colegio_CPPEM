import "server-only";
import { unstable_cache } from "next/cache";
import { notion, NOTION_CACHE_SECONDS } from "@/lib/notion/client";
import { plainText, readCheckbox, readNumber, readSelect, readSiteUrl, resolveDataSourceId } from "@/lib/notion/properties";
import type { EventItem } from "@/types/content";

type Properties = Record<string, unknown>;

// Banco "Eventos · Colégio CPPEM", na página Sistemas Site. O ID não é segredo:
// fica como padrão para o menu funcionar sem configurar variável nova. A
// variável continua valendo se um dia o banco mudar.
const EVENTS_DATABASE_ID = process.env.NOTION_EVENTS_DATABASE_ID || "fe6fb53c-3381-4154-a3f7-a0c233d9acdd";

// ordem de exibição: o que dá para participar agora vem primeiro
const statusOrder: Record<string, number> = { "Ao vivo": 0, "Inscrições abertas": 1, "Em breve": 2, "Lista de espera": 3, Encerrado: 4 };

function readDate(value: unknown): string | null {
  const start = (value as { date?: { start?: string } | null } | undefined)?.date?.start;
  return typeof start === "string" ? start.slice(0, 10) : null;
}

const richText = (value: unknown) => plainText((value as { rich_text?: unknown })?.rich_text);

async function lerEventos(): Promise<EventItem[]> {
  if (!notion) return [];

  try {
    const dataSourceId = await resolveDataSourceId(EVENTS_DATABASE_ID);
    if (!dataSourceId) return [];
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: { property: "Ativo", checkbox: { equals: true } },
      page_size: 100,
    });

    const events = response.results.flatMap((page) => {
      const properties = (page as { properties?: Properties }).properties;
      if (!properties) return [];
      const name = plainText((properties.Nome as { title?: unknown })?.title);
      const href = readSiteUrl(properties.Link);
      if (!name || !href) {
        console.warn(`[notion] Evento "${name || "sem nome"}" ignorado: ${name ? "Link precisa ser https://... ou um caminho do site (ex.: /matriculas/fundamental-1)" : "falta o Nome"}.`);
        return [];
      }
      const event: EventItem = {
        id: (page as { id: string }).id,
        name,
        description: richText(properties["Descrição"]),
        href,
        status: readSelect(properties.Status) || "Em breve",
        date: readDate(properties.Data),
        time: richText(properties["Horário"]),
        place: richText(properties.Local),
        format: readSelect(properties.Formato),
        imageUrl: readSiteUrl(properties.Imagem) || null,
        label: richText(properties.Etiqueta),
        featured: readCheckbox(properties.Destaque),
      };
      return [{ event, order: readNumber(properties.Ordem) ?? Number.MAX_SAFE_INTEGER }];
    });

    return events
      .sort((a, b) => Number(b.event.featured) - Number(a.event.featured) || (statusOrder[a.event.status] ?? 9) - (statusOrder[b.event.status] ?? 9) || a.order - b.order)
      .map(({ event }) => event);
  } catch (error) {
    console.error("[notion] Falha ao carregar eventos:", error instanceof Error ? error.message : "erro desconhecido");
    return [];
  }
}

export const getEvents = unstable_cache(lerEventos, ["colegio-eventos", String(NOTION_CACHE_SECONDS)], { revalidate: NOTION_CACHE_SECONDS, tags: ["eventos"] });
