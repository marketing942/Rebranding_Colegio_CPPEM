import "server-only";
import { Client } from "@notionhq/client";

const token = process.env.NOTION_TOKEN;

type OpcoesNotion = NonNullable<ConstructorParameters<typeof Client>[0]>;

// O Notion aceita ~3 requisicoes por segundo por integracao. Em build ou em
// revalidacao varias paginas pedem dados ao mesmo tempo e estouram esse teto,
// entao toda chamada passa por aqui e sai espacada.
const INTERVALO_MS = 340;
let proximaSaida = 0;

async function aguardarVez() {
  const agora = Date.now();
  const inicio = Math.max(agora, proximaSaida);
  proximaSaida = inicio + INTERVALO_MS;
  if (inicio > agora) await new Promise((resolve) => setTimeout(resolve, inicio - agora));
}

const fetchRitmado: NonNullable<OpcoesNotion["fetch"]> = async (url, init) => {
  await aguardarVez();
  return fetch(url, init as RequestInit);
};

export const notion = token
  ? new Client({
      auth: token,
      fetch: fetchRitmado,
      // o menu de eventos é lido em todas as páginas: se o Notion estiver lento,
      // é melhor desistir cedo e mostrar o site sem ele do que segurar a página
      timeoutMs: 8000,
      retry: { maxRetries: 2, initialRetryDelayMs: 900 },
    })
  : null;

// Em produção, 5 min de cache nas leituras. Em desenvolvimento, 10 s, para ver
// logo o que foi mudado no Notion.
export const NOTION_CACHE_SECONDS = process.env.NODE_ENV === "development" ? 10 : 300;
