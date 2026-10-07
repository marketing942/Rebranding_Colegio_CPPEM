// Cria (ou reaproveita) o banco "Convênios empresariais · Colégio CPPEM" na página Sistemas Site.
// Recebe o formulário "Para empresas" de /parceiros: empresas que querem bolsa de estudo para os funcionários.
// Uso: node scripts/ensure-notion-convenios-database.mjs
import nextEnv from "@next/env";
import { Client } from "@notionhq/client";

nextEnv.loadEnvConfig(process.cwd());
if (!process.env.NOTION_TOKEN) throw new Error("Defina NOTION_TOKEN no .env.local.");

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const parentPageId = "3abbbae8-074c-802a-a85e-dfc8e1b37adc";
const databaseTitle = "Convênios empresariais · Colégio CPPEM";

async function findExisting() {
  if (process.env.NOTION_CORPORATE_DATABASE_ID) return notion.databases.retrieve({ database_id: process.env.NOTION_CORPORATE_DATABASE_ID });
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
    description: [{ type: "text", text: { content: "Empresas interessadas em bolsa de estudo no Colégio CPPEM para os filhos dos funcionários. Cada envio do site entra como Novo." } }],
    is_inline: false,
    initial_data_source: {
      properties: {
        Empresa: { title: {} },
        CNPJ: { rich_text: {} },
        Ramo: { rich_text: {} },
        "Nº de funcionários": { select: { options: ["Até 20", "21 a 50", "51 a 100", "101 a 300", "Mais de 300"].map((name) => ({ name })) } },
        "Responsável": { rich_text: {} },
        Cargo: { rich_text: {} },
        Telefone: { phone_number: {} },
        Email: { email: {} },
        Mensagem: { rich_text: {} },
        Status: { select: { options: [
          { name: "Novo", color: "blue" }, { name: "Em contato", color: "yellow" },
          { name: "Proposta enviada", color: "orange" }, { name: "Convênio fechado", color: "green" }, { name: "Descartado", color: "gray" },
        ] } },
        "Recebido em": { created_time: {} },
      },
    },
  });
  console.log(`Banco criado: ${database.id}`);
} else console.log(`Banco existente: ${database.id}`);
console.log(`NOTION_CORPORATE_DATABASE_ID=${database.id}`);
