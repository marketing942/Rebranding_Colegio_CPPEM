/**
 * Rastreamento: GTM server-side do CPPEM. A PixelX é carregada por uma tag de
 * dentro desse container — NÃO adicione o loader direto dela ao site, ou cada
 * evento (inclusive o Lead) passa a contar em dobro.
 */
export const GTM_SCRIPT_URL = "https://sgtm.cppem.com.br/metrics/";
export const GTM_NOSCRIPT_URL = "https://sgtm.cppem.com.br/ns.html?id=GTM-PJ379FLQ";

/**
 * Identificador do formulário de inscrição no painel da PixelX. A regra de Lead
 * de lá procura este valor como `id` do <form>; ele precisa estar no HTML desde
 * o carregamento e ser único na página. O site não chama `send_event`: quem
 * dispara o Lead é o painel, no envio do formulário.
 */
export const PIXELX_FORM_ID = "eiBtTROiAlNexbHXklSc";
