// Cria (ou reaproveita) o banco "Inscrições · Colégio CPPEM" na página Sistemas
// Site do Notion. Recebe os envios do formulário de /matriculas/[segmento].
// Uso: node scripts/ensure-notion-inscricoes-database.mjs
import nextEnv from "@next/env";
import { Client } from "@notionhq/client";

nextEnv.loadEnvConfig(process.cwd());

if (!process.env.NOTION_TOKEN) throw new Error("Defina NOTION_TOKEN no .env.local.");

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const parentPageId = "3abbbae8-074c-802a-a85e-dfc8e1b37adc";
const databaseTitle = "Inscrições · Colégio CPPEM";

async function findExistingDatabase() {
  if (process.env.NOTION_ENROLLMENTS_DATABASE_ID) {
    return notion.databases.retrieve({ database_id: process.env.NOTION_ENROLLMENTS_DATABASE_ID });
  }
  const search = await notion.search({ query: databaseTitle, filter: { property: "object", value: "data_source" }, page_size: 50 });
  for (const item of search.results) {
    if (item.object !== "data_source") continue;
    const dataSource = await notion.dataSources.retrieve({ data_source_id: item.id });
    const title = (dataSource.title ?? []).map((part) => part.plain_text).join("");
    if (title !== databaseTitle || dataSource.parent?.type !== "database_id") continue;
    const database = await notion.databases.retrieve({ database_id: dataSource.parent.database_id });
    if (database.parent?.type === "page_id" && database.parent.page_id === parentPageId) return database;
  }
  return null;
}

let database = await findExistingDatabase();
if (!database) {
  database = await notion.databases.create({
    parent: { type: "page_id", page_id: parentPageId },
    title: [{ type: "text", text: { content: databaseTitle } }],
    description: [{ type: "text", text: { content: "Inscrições de matrícula enviadas pelo site do Colégio CPPEM. Cada envio entra com Status Novo." } }],
    is_inline: false,
    initial_data_source: {
      properties: {
        Aluno: { title: {} },
        "Responsável": { rich_text: {} },
        Email: { email: {} },
        Telefone: { phone_number: {} },
        Segmento: { select: { options: [
          { name: "Fundamental 1", color: "blue" },
          { name: "Fundamental 2", color: "purple" },
          { name: "Ensino Médio", color: "yellow" },
        ] } },
        "Série": { select: { options: [
          "1º ano", "2º ano", "3º ano", "4º ano", "5º ano", "6º ano", "7º ano", "8º ano", "9º ano", "1ª série", "2ª série", "3ª série",
        ].map((name) => ({ name })) } },
        "Observações": { rich_text: {} },
        Status: { select: { options: [
          { name: "Novo", color: "green" },
          { name: "Em contato", color: "yellow" },
          { name: "Visita agendada", color: "orange" },
          { name: "Matriculado", color: "blue" },
          { name: "Descartado", color: "gray" },
        ] } },
        "Recebido em": { created_time: {} },
      },
    },
  });
  console.log(`Banco criado: ${database.id}`);
} else {
  console.log(`Banco existente: ${database.id}`);
}

console.log(`NOTION_ENROLLMENTS_DATABASE_ID=${database.id}`);
