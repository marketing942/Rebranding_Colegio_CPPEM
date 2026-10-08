/**
 * Origem do lead: de onde a pessoa veio (UTM) e em que página se inscreveu.
 *
 * As UTMs só existem na URL do PRIMEIRO acesso. Se a pessoa navega até o
 * formulário, o `?utm_source=` já não está lá na hora do envio. Por isso elas
 * ficam no sessionStorage assim que o site carrega (ver UtmCapture) e são lidas
 * de lá no envio. Storage bloqueado (aba anônima, ITP): o lead segue sem UTM.
 */
export const UTM_KEYS = ["utm_source", "utm_campaign"] as const;
export type UtmKey = (typeof UTM_KEYS)[number];

/** Nomes dos campos ocultos que levam a origem no formulário de inscrição. */
export const ORIGIN_FIELDS = { utm_source: "utm_source", utm_campaign: "utm_campaign", page: "pagina_url" } as const;

export function storeUtmsFromUrl(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (!value) continue;
    try {
      window.sessionStorage.setItem(key, value.slice(0, 255));
    } catch {
      /* storage indisponível: segue sem persistir */
    }
  }
}

/** UTM da URL atual ou, se não houver, a guardada no primeiro acesso. */
export function readUtm(key: UtmKey): string {
  if (typeof window === "undefined") return "";
  const fromUrl = new URLSearchParams(window.location.search).get(key);
  if (fromUrl) return fromUrl.slice(0, 255);
  try {
    return window.sessionStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}
