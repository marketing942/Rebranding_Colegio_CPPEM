import "server-only";
import { notion } from "@/lib/notion/client";
import { resolveDataSourceId } from "@/lib/notion/properties";

export type Enrollment = {
  guardian: string;
  student: string;
  email: string;
  phone: string;
  gender: string;
  segment: string;
  series: string;
  notes: string;
};

const text = (content: string) => (content ? [{ type: "text" as const, text: { content } }] : []);

/** Grava a inscrição no banco "Inscrições · Colégio CPPEM" e devolve o id da página. Lança erro se não conseguir. */
export async function saveEnrollment(enrollment: Enrollment): Promise<string> {
  const databaseId = process.env.NOTION_ENROLLMENTS_DATABASE_ID;
  if (!notion || !databaseId) throw new Error("Notion de inscrições não configurado");

  const dataSourceId = await resolveDataSourceId(databaseId, notion);
  if (!dataSourceId) throw new Error("Banco de inscrições sem fonte de dados");

  const page = await notion.pages.create({
    parent: { type: "data_source_id", data_source_id: dataSourceId },
    properties: {
      Aluno: { title: text(enrollment.student) },
      "Responsável": { rich_text: text(enrollment.guardian) },
      Email: { email: enrollment.email },
      Telefone: { phone_number: enrollment.phone },
      "Gênero": { select: { name: enrollment.gender } },
      Segmento: { select: { name: enrollment.segment } },
      "Série": { select: { name: enrollment.series } },
      "Observações": { rich_text: text(enrollment.notes) },
      Status: { select: { name: "Novo" } },
    },
  });
  return page.id;
}
