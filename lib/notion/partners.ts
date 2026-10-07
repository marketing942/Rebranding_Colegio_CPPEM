import "server-only";
import { unstable_cache } from "next/cache";
import { notion, NOTION_CACHE_SECONDS } from "@/lib/notion/client";
import { isSafeWebUrl, plainText, readCheckbox, readNumber, readSelect, readUrl, resolveDataSourceId } from "@/lib/notion/properties";
import { normalizePartnerKey, type Partner } from "@/lib/partners";

// Banco "Parceiros · Colégio CPPEM", na página Sistemas Site. O ID não é segredo:
// fica como padrão para a página funcionar sem variável nova.
const PARTNERS_DATABASE_ID = process.env.NOTION_PARTNERS_DATABASE_ID || "16fe8c02-23ac-4bfe-89a5-b55a5df2fe27";

const richText = (value: unknown) => plainText((value as { rich_text?: unknown })?.rich_text);

function safeUrl(value: unknown) {
  const url = readUrl(value);
  return url && isSafeWebUrl(url) ? url : null;
}

/** Primeiro arquivo do campo Logo: enviado pelo formulário (URL temporária do Notion) ou link externo. */
function readLogo(value: unknown): string | null {
  const files = (value as { files?: Array<{ type?: string; file?: { url?: string }; external?: { url?: string } }> } | undefined)?.files;
  const first = files?.[0];
  const url = first?.file?.url ?? first?.external?.url ?? "";
  return url && isSafeWebUrl(url) ? url : null;
}

async function lerParceiros(): Promise<Partner[]> {
  if (!notion) return [];

  try {
    const dataSourceId = await resolveDataSourceId(PARTNERS_DATABASE_ID, notion);
    if (!dataSourceId) return [];

    const rows: Array<{ partner: Partner; order: number }> = [];
    let cursor: string | undefined;
    do {
      const response = await notion.dataSources.query({
        data_source_id: dataSourceId,
        filter: { property: "Status", select: { equals: "Ativo" } },
        start_cursor: cursor,
        page_size: 100,
      });

      for (const page of response.results) {
        const props = (page as { properties?: Record<string, unknown> }).properties;
        if (!props) continue;
        const name = plainText((props.Nome as { title?: unknown })?.title);
        if (!name) continue;
        const category = readSelect(props.Categoria);
        rows.push({
          partner: {
            id: (page as { id: string }).id,
            name,
            categoryKey: normalizePartnerKey(category),
            categoryLabel: richText(props["Rótulo"]) || category || "Parceiro CPPEM",
            description: richText(props["Descrição"]),
            benefit: richText(props["Benefício"]),
            whatsappUrl: safeUrl(props.WhatsApp),
            siteUrl: safeUrl(props.Site),
            instagramUrl: safeUrl(props.Instagram),
            logoUrl: readLogo(props.Logo),
            featured: readCheckbox(props.Destaque),
          },
          order: readNumber(props.Ordem) ?? Number.MAX_SAFE_INTEGER,
        });
      }
      cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
    } while (cursor);

    return rows
      .sort((a, b) => Number(b.partner.featured) - Number(a.partner.featured) || a.order - b.order || a.partner.name.localeCompare(b.partner.name, "pt-BR"))
      .map(({ partner }) => partner);
  } catch (error) {
    console.error("[notion] Falha ao carregar parceiros:", error instanceof Error ? error.message : "erro desconhecido");
    return [];
  }
}

// As logos enviadas ao Notion têm URL que vence em 1 hora; o cache curto renova antes disso.
export const getPartners = unstable_cache(lerParceiros, ["colegio-parceiros", String(NOTION_CACHE_SECONDS)], { revalidate: NOTION_CACHE_SECONDS, tags: ["parceiros"] });

export type PartnerProposal = {
  company: string;
  category: string;
  contact: string;
  phone: string;
  email: string;
  benefit: string;
  instagram: string;
  logo: { data: Blob; filename: string; contentType: string } | null;
};

const text = (content: string) => (content ? [{ type: "text" as const, text: { content } }] : []);

/** Envia a logo para o Notion e devolve o id do arquivo, ou null se não der. */
async function uploadLogo(logo: NonNullable<PartnerProposal["logo"]>): Promise<string | null> {
  if (!notion) return null;
  try {
    const upload = await notion.fileUploads.create({ mode: "single_part", filename: logo.filename, content_type: logo.contentType });
    await notion.fileUploads.send({ file_upload_id: upload.id, file: { data: logo.data, filename: logo.filename } });
    return upload.id;
  } catch (error) {
    // a proposta vale mais que a logo: segue sem ela
    console.error("[parceiros] Falha ao enviar a logo:", error instanceof Error ? error.message : "erro desconhecido");
    return null;
  }
}

/** Grava a proposta como Status "Novo" (não aparece no site até a equipe mudar para "Ativo"). Lança erro se não conseguir. */
export async function savePartnerProposal(proposal: PartnerProposal): Promise<void> {
  if (!notion) throw new Error("Notion não configurado");
  const dataSourceId = await resolveDataSourceId(PARTNERS_DATABASE_ID, notion);
  if (!dataSourceId) throw new Error("Banco de parceiros sem fonte de dados");

  const logoId = proposal.logo ? await uploadLogo(proposal.logo) : null;

  await notion.pages.create({
    parent: { type: "data_source_id", data_source_id: dataSourceId },
    properties: {
      Nome: { title: text(proposal.company) },
      Status: { select: { name: "Novo" } },
      Categoria: { select: { name: proposal.category } },
      "Benefício": { rich_text: text(proposal.benefit) },
      "Responsável": { rich_text: text(proposal.contact) },
      "Telefone do contato": { phone_number: proposal.phone },
      Email: { email: proposal.email },
      ...(proposal.instagram ? { Instagram: { url: proposal.instagram } } : {}),
      ...(logoId ? { Logo: { files: [{ type: "file_upload", file_upload: { id: logoId }, name: proposal.logo!.filename }] } } : {}),
    },
  });
}
