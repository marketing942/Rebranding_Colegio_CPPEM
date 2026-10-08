import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";

/*
 * Proteção dos formulários públicos (inscrição, parceiro, convênio).
 *
 * Fica na memória da instância do servidor: barra rajadas e reenvios na hora, sem custo.
 * Na Vercel podem existir várias instâncias ao mesmo tempo, então cada gravação também
 * confere no Notion se a mesma solicitação já foi registrada (ver lib/notion/dedupe.ts).
 */

const RATE_WINDOW_MS = 10 * 60_000;
/** Envios aceitos por formulário em 10 minutos: por pessoa (IP) e no total da instância. */
const RATE_LIMITS = { perClient: 5, perForm: 60 };

/** Por quanto tempo a mesma solicitação é tratada como repetição. */
export const DEDUPE_WINDOW_MS = 30 * 60_000;

export type GuardedForm = "inscricao" | "parceiro" | "convenio";

export const RATE_LIMIT_MESSAGE = "Recebemos muitos envios em pouco tempo. Aguarde alguns minutos e tente de novo.";

const hits = new Map<string, number[]>();
const completed = new Map<string, number>();
const inFlight = new Map<string, Promise<unknown>>();

function prune(now: number) {
  if (hits.size > 5000) for (const [key, list] of hits) if (list.every((time) => now - time >= RATE_WINDOW_MS)) hits.delete(key);
  if (completed.size > 5000) for (const [key, time] of completed) if (now - time >= DEDUPE_WINDOW_MS) completed.delete(key);
}

function take(key: string, max: number, now: number): boolean {
  const recent = (hits.get(key) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  const allowed = recent.length < max;
  if (allowed) recent.push(now);
  hits.set(key, recent);
  return allowed;
}

async function clientIp(): Promise<string> {
  const list = await headers();
  return list.get("x-forwarded-for")?.split(",")[0]?.trim() || list.get("x-real-ip")?.trim() || "desconhecido";
}

/** Conta um envio. false = passou do limite e o envio deve ser recusado. */
export async function allowSubmission(form: GuardedForm): Promise<boolean> {
  const now = Date.now();
  prune(now);
  const ip = await clientIp();
  return take(`${form}:${ip}`, RATE_LIMITS.perClient, now) && take(`${form}:*`, RATE_LIMITS.perForm, now);
}

/** Impressão digital da solicitação: mesmos dados (sem diferença de caixa e espaços) = mesma solicitação. */
export function fingerprint(form: GuardedForm, parts: string[]): string {
  const normalized = parts.map((part) => part.trim().toLowerCase().replace(/\s+/g, " "));
  return createHash("sha256").update([form, ...normalized].join("\u0000")).digest("hex");
}

/** Mesma solicitação já gravada nesta instância há pouco (reenvio, duplo clique, nova tentativa). */
export function isRecentDuplicate(key: string): boolean {
  const time = completed.get(key);
  return time !== undefined && Date.now() - time < DEDUPE_WINDOW_MS;
}

/**
 * Executa a gravação uma única vez por solicitação. Tentativas simultâneas esperam a primeira;
 * se ela gravou, as outras viram "duplicate" sem criar registro. Se falhou, a próxima tenta de novo.
 */
export async function runOnce(key: string, task: () => Promise<"created" | "duplicate">): Promise<"created" | "duplicate"> {
  const pending = inFlight.get(key);
  if (pending) await pending.catch(() => undefined);
  if (isRecentDuplicate(key)) return "duplicate";

  const run = task();
  inFlight.set(key, run);
  try {
    const result = await run;
    completed.set(key, Date.now());
    return result;
  } finally {
    inFlight.delete(key);
  }
}
