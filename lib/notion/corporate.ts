import "server-only";
import { notion } from "@/lib/notion/client";
import { resolveDataSourceId } from "@/lib/notion/properties";

// Banco "Convênios empresariais · Colégio CPPEM", na página Sistemas Site.
const CORPORATE_DATABASE_ID = process.env.NOTION_CORPORATE_DATABASE_ID || "bc738925-88f5-45da-998b-6ba1cf4a2010";

export const EMPLOYEE_RANGES = ["Até 20", "21 a 50", "51 a 100", "101 a 300", "Mais de 300"] as const;

export type CorporateRequest = {
  company: string;
  cnpj: string;
  industry: string;
  employees: string;
  contact: string;
  role: string;
  phone: string;
  email: string;
  message: string;
};

const text = (content: string) => (content ? [{ type: "text" as const, text: { content } }] : []);

/** Grava o pedido de convênio com Status "Novo". Lança erro se não conseguir. */
export async function saveCorporateRequest(request: CorporateRequest): Promise<void> {
  if (!notion) throw new Error("Notion não configurado");
  const dataSourceId = await resolveDataSourceId(CORPORATE_DATABASE_ID, notion);
  if (!dataSourceId) throw new Error("Banco de convênios sem fonte de dados");

  await notion.pages.create({
    parent: { type: "data_source_id", data_source_id: dataSourceId },
    properties: {
      Empresa: { title: text(request.company) },
      CNPJ: { rich_text: text(request.cnpj) },
      Ramo: { rich_text: text(request.industry) },
      "Nº de funcionários": { select: { name: request.employees } },
      "Responsável": { rich_text: text(request.contact) },
      Cargo: { rich_text: text(request.role) },
      Telefone: { phone_number: request.phone },
      Email: { email: request.email },
      Mensagem: { rich_text: text(request.message) },
      Status: { select: { name: "Novo" } },
    },
  });
}
