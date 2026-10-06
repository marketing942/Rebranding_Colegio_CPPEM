import "server-only";

/**
 * Avisa o n8n de uma inscrição nova, para ele mandar a mensagem no grupo de
 * WhatsApp da equipe (fluxo "Colégio CPPEM — Inscrições do site").
 *
 * Nunca lança erro: a inscrição já está gravada no Notion, e o próprio fluxo
 * varre o banco a cada 5 minutos atrás de inscrições "Novo" ainda não avisadas.
 * Se este aviso falhar, a mensagem sai por lá, só com alguns minutos de atraso.
 */
export async function notifyEnrollment(pageId: string): Promise<void> {
  const url = process.env.N8N_ENROLLMENT_WEBHOOK_URL;
  const secret = process.env.N8N_ENROLLMENT_WEBHOOK_SECRET;
  if (!url || !secret) return;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-colegio-secret": secret },
      body: JSON.stringify({ event: "colegio.inscricao.criada", pageId }),
      // a família está esperando a confirmação na tela: não segurar o envio por causa do aviso
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) console.warn(`[inscricao] Aviso ao n8n respondeu ${response.status}; o fluxo agendado cobre.`);
  } catch (error) {
    console.warn("[inscricao] Aviso ao n8n falhou; o fluxo agendado cobre:", error instanceof Error ? error.message : "erro desconhecido");
  }
}
