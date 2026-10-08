import "server-only";

/*
 * Espelho da inscrição na planilha central de leads do grupo CPPEM: o mesmo Apps Script
 * que recebe os leads de todos os sites, roteando pelo ?aba= (COLEGIO vai para a aba
 * COLEGIO_Novo). O Notion continua sendo a fonte de verdade: falha aqui é registrada
 * no log e nunca derruba a inscrição.
 */

const ORIGIN = "COLEGIO";

// Implantação pública do Apps Script (a mesma do site antigo, onde já trafegava no navegador).
// A variável permite apontar para outra implantação (teste, migração) sem mudar código.
const DEFAULT_URL =
  "https://script.google.com/macros/s/AKfycbxdFplWVSfhTjvyIA7HIWb645xRjGNhBVhTdTf5UMjo0lSpW_A_jCuys0qB4uImKXPQ/exec";

/** O Apps Script demora a responder em carga; sem limite, a inscrição ficaria presa esperando. */
const TIMEOUT_MS = 8000;

export type SheetLead = {
  guardian: string;
  email: string;
  phone: string;
  /** "Fundamental 2 · 6º ano" — vai para a coluna "Série que vão fazer". */
  series: string;
  pageUrl: string;
  utmSource: string;
  utmCampaign: string;
};

async function send(lead: SheetLead): Promise<void> {
  const base = process.env.GOOGLE_SHEETS_WEBHOOK_URL || DEFAULT_URL;
  // chaves em snake_case: é o dialeto que o Apps Script lê (montarLead)
  const body = {
    origem: ORIGIN,
    nome: lead.guardian,
    email: lead.email,
    telefone: lead.phone,
    pagina_url: lead.pageUrl,
    utm_source: lead.utmSource,
    utm_campaign: lead.utmCampaign,
    serie: lead.series,
  };

  const response = await fetch(`${base}?aba=${ORIGIN}`, {
    method: "POST",
    // o Apps Script lê o corpo cru (e.postData.contents); text/plain é o que os outros sites do grupo enviam
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`planilha respondeu ${response.status}`);

  const result = (await response.json()) as { status?: string; aba?: string; mensagem?: string };
  // "ignorado" = gravou na aba IGNORADOS: a origem não foi reconhecida, configuração quebrada
  if (result.status !== "ok") throw new Error(`planilha recusou o lead (status "${result.status}", aba "${result.aba}"): ${result.mensagem ?? "sem mensagem"}`);
}

/** Envia a inscrição para a planilha. Nunca lança erro. */
export async function mirrorEnrollmentToSheet(lead: SheetLead): Promise<void> {
  try {
    await send(lead);
  } catch (error) {
    console.error("[planilha] Falha ao espelhar a inscrição:", error instanceof Error ? error.message : "erro desconhecido");
  }
}
