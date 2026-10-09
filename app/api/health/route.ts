// Verificação de saúde do container (healthcheck do Docker/Portainer). Sempre dinâmica e sem cache.
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ status: "ok", uptime: Math.round(process.uptime()) }, { headers: { "Cache-Control": "no-store" } });
}
