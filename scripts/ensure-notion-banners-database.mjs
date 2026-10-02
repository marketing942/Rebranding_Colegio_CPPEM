// Cria (ou reaproveita) o banco "Banners · Colégio CPPEM" na página Sistemas Site
// do Notion — mesma página-mãe dos bancos do siteCppemNovo e com o mesmo esquema
// de banners. Uso: node scripts/ensure-notion-banners-database.mjs
import nextEnv from "@next/env";
import { Client } from "@notionhq/client";

nextEnv.loadEnvConfig(process.cwd());

if (!process.env.NOTION_TOKEN) throw new Error("Defina NOTION_TOKEN no .env.local.");

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const parentPageId = "3abbbae8-074c-802a-a85e-dfc8e1b37adc";
const databaseTitle = "Banners · Colégio CPPEM";

async function findExistingDatabase() {
  if (process.env.NOTION_BANNERS_DATABASE_ID) {
    return notion.databases.retrieve({ database_id: process.env.NOTION_BANNERS_DATABASE_ID });
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
    description: [{ type: "text", text: { content: "Banners do carrossel principal do site do Colégio CPPEM. Só entram no ar os com Status Ativo e dentro do período Início/Fim." } }],
    is_inline: false,
    initial_data_source: {
      properties: {
        Nome: { title: {} },
        Status: { select: { options: [
          { name: "Ativo", color: "green" },
          { name: "Rascunho", color: "yellow" },
          { name: "Inativo", color: "gray" },
        ] } },
        "Banner desktop": { url: {} },
        "Banner mobile": { url: {} },
        Link: { url: {} },
        "Texto do botão": { rich_text: {} },
        Chamada: { rich_text: {} },
        "Início": { date: {} },
        Fim: { date: {} },
        Ordem: { number: { format: "number" } },
      },
    },
  });
  console.log(`Banco criado: ${database.id}`);

  const dataSourceId = database.data_sources?.[0]?.id;
  if (dataSourceId) {
    await notion.pages.create({
      parent: { type: "data_source_id", data_source_id: dataSourceId },
      properties: {
        Nome: { title: [{ type: "text", text: { content: "Exemplo — Matrículas 2027" } }] },
        Status: { select: { name: "Rascunho" } },
        Link: { url: "https://colegio.cppem.com.br/#matricula" },
        "Texto do botão": { rich_text: [{ type: "text", text: { content: "Garantir vaga" } }] },
        Chamada: { rich_text: [{ type: "text", text: { content: "Matrículas 2027 abertas" } }] },
        Ordem: { number: 1 },
      },
    });
    console.log("Banner de exemplo criado (Rascunho).");
  }
} else {
  console.log(`Banco existente: ${database.id}`);
}

console.log(`NOTION_BANNERS_DATABASE_ID=${database.id}`);
