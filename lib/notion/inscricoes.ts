import "server-only";
import { notion } from "@/lib/notion/client";
import { findRecentPage } from "@/lib/notion/dedupe";
import { resolveDataSourceId } from "@/lib/notion/properties";

export type Enrollment = {
  guardian: string;
  student: string;
  email: string;
  phone: string;
  segment: string;
  series: string;
  notes: string;
};

const text = (content: string) => (content ? [{ type: "text" as const, text: { content } }] : []);

/**
 * Grava a inscrição no banco "Inscrições · Colégio CPPEM". Se a mesma inscrição (e-mail, aluno e série)
 * já foi gravada há pouco, não cria outra e devolve duplicate. Lança erro se não conseguir gravar.
 */
export async function saveEnrollment(enrollment: Enrollment): Promise<{ pageId: string; duplicate: boolean }> {
  const databaseId = process.env.NOTION_ENROLLMENTS_DATABASE_ID;
  if (!notion || !databaseId) throw new Error("Notion de inscrições não configurado");

  const dataSourceId = await resolveDataSourceId(databaseId, notion);
  if (!dataSourceId) throw new Error("Banco de inscrições sem fonte de dados");

  const existing = await findRecentPage(dataSourceId, [
    { property: "Email", email: { equals: enrollment.email } },
    { property: "Aluno", title: { equals: enrollment.student } },
    { property: "Série", select: { equals: enrollment.series } },
  ]);
  if (existing) return { pageId: existing, duplicate: true };

  const page = await notion.pages.create({
    parent: { type: "data_source_id", data_source_id: dataSourceId },
    properties: {
      Aluno: { title: text(enrollment.student) },
      "Responsável": { rich_text: text(enrollment.guardian) },
      Email: { email: enrollment.email },
      Telefone: { phone_number: enrollment.phone },
      Segmento: { select: { name: enrollment.segment } },
      "Série": { select: { name: enrollment.series } },
      "Observações": { rich_text: text(enrollment.notes) },
      Status: { select: { name: "Novo" } },
    },
  });
  return { pageId: page.id, duplicate: false };
}
