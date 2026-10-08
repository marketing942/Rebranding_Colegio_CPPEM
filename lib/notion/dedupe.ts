import "server-only";
import { notion } from "@/lib/notion/client";
import { DEDUPE_WINDOW_MS } from "@/lib/request-guard";

type PropertyFilter = Record<string, unknown> & { property: string };

/**
 * Procura um registro criado há pouco com os mesmos dados. Cobre o reenvio que cai em
 * outra instância do servidor. Se a consulta falhar, segue com a gravação: perder a
 * solicitação é pior que, raramente, ter uma duplicada.
 */
export async function findRecentPage(dataSourceId: string, filters: PropertyFilter[]): Promise<string | null> {
  if (!notion) return null;
  try {
    const since = new Date(Date.now() - DEDUPE_WINDOW_MS).toISOString();
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: { and: [{ timestamp: "created_time", created_time: { on_or_after: since } }, ...filters] } as never,
      page_size: 1,
    });
    return response.results[0]?.id ?? null;
  } catch (error) {
    console.error("[dedupe] Falha ao consultar o Notion:", error instanceof Error ? error.message : "erro desconhecido");
    return null;
  }
}
