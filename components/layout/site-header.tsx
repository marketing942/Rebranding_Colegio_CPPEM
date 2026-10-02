import { SiteHeaderClient } from "@/components/layout/site-header-client";
import { getEvents } from "@/lib/notion/events";

/** Busca os eventos do Notion no servidor e entrega ao header interativo. */
export async function SiteHeader() {
  const events = await getEvents();
  return <SiteHeaderClient events={events} />;
}
