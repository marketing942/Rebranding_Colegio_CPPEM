// Cria (ou reaproveita) o banco "Parceiros · Colégio CPPEM" na página Sistemas Site.
// Alimenta /parceiros (só Status "Ativo") e recebe as propostas do formulário (Status "Novo").
// Uso: node scripts/ensure-notion-parceiros-database.mjs
import nextEnv from "@next/env";
import { Client } from "@notionhq/client";

nextEnv.loadEnvConfig(process.cwd());
if (!process.env.NOTION_TOKEN) throw new Error("Defina NOTION_TOKEN no .env.local.");

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const parentPageId = "3abbbae8-074c-802a-a85e-dfc8e1b37adc";
const databaseTitle = "Parceiros · Colégio CPPEM";
const categories = ["Saúde", "Esporte", "Alimentação", "Papelaria e livros", "Transporte escolar", "Educação", "Serviços"];

async function findExisting() {
  if (process.env.NOTION_PARTNERS_DATABASE_ID) return notion.databases.retrieve({ database_id: process.env.NOTION_PARTNERS_DATABASE_ID });
  const search = await notion.search({ query: databaseTitle, filter: { property: "object", value: "data_source" }, page_size: 50 });
  for (const item of search.results) {
    const ds = await notion.dataSources.retrieve({ data_source_id: item.id });
    if ((ds.title ?? []).map((t) => t.plain_text).join("") !== databaseTitle || ds.parent?.type !== "database_id") continue;
    const db = await notion.databases.retrieve({ database_id: ds.parent.database_id });
    if (db.parent?.type === "page_id" && db.parent.page_id === parentPageId) return db;
  }
  return null;
}

let database = await findExisting();
if (!database) {
  database = await notion.databases.create({
    parent: { type: "page_id", page_id: parentPageId },
    title: [{ type: "text", text: { content: databaseTitle } }],
    description: [{ type: "text", text: { content: "Rede de parceiros do site do Colégio CPPEM. Propostas do formulário entram como Novo; só Ativo aparece no site." } }],
    is_inline: false,
    initial_data_source: {
      properties: {
        Nome: { title: {} },
        Status: { select: { options: [
          { name: "Ativo", color: "green" }, { name: "Novo", color: "blue" },
          { name: "Em análise", color: "yellow" }, { name: "Recusado", color: "gray" },
        ] } },
        Categoria: { select: { options: categories.map((name) => ({ name })) } },
        "Rótulo": { rich_text: {} },
        "Descrição": { rich_text: {} },
        "Benefício": { rich_text: {} },
        WhatsApp: { url: {} },
        Instagram: { url: {} },
        Logo: { files: {} },
        "Responsável": { rich_text: {} },
        "Telefone do contato": { phone_number: {} },
        Email: { email: {} },
        Destaque: { checkbox: {} },
        Ordem: { number: { format: "number" } },
        "Recebido em": { created_time: {} },
      },
    },
  });
  console.log(`Banco criado: ${database.id}`);
} else console.log(`Banco existente: ${database.id}`);

console.log(`NOTION_PARTNERS_DATABASE_ID=${database.id}`);
