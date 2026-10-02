// Cria (ou reaproveita) o banco "Eventos · Colégio CPPEM" na página Sistemas Site
// do Notion, com as mesmas colunas do "Eventos CPPEM" do siteCppemNovo. Alimenta
// o menu Eventos do site. Uso: node scripts/ensure-notion-eventos-database.mjs
import nextEnv from "@next/env";
import { Client } from "@notionhq/client";

nextEnv.loadEnvConfig(process.cwd());

if (!process.env.NOTION_TOKEN) throw new Error("Defina NOTION_TOKEN no .env.local.");

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const parentPageId = "3abbbae8-074c-802a-a85e-dfc8e1b37adc";
const databaseTitle = "Eventos · Colégio CPPEM";

async function findExistingDatabase() {
  if (process.env.NOTION_EVENTS_DATABASE_ID) {
    return notion.databases.retrieve({ database_id: process.env.NOTION_EVENTS_DATABASE_ID });
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

const text = (content) => [{ type: "text", text: { content } }];

let database = await findExistingDatabase();
if (!database) {
  database = await notion.databases.create({
    parent: { type: "page_id", page_id: parentPageId },
    title: text(databaseTitle),
    description: text("Itens do menu Eventos do site do Colégio CPPEM. Só aparecem os marcados como Ativo. Link e Imagem aceitam https://... ou um caminho do próprio site (ex.: /matriculas/fundamental-1, /eventos/arte.webp)."),
    is_inline: false,
    initial_data_source: {
      properties: {
        Nome: { title: {} },
        "Descrição": { rich_text: {} },
        Link: { url: {} },
        Imagem: { url: {} },
        Status: { select: { options: [
          { name: "Inscrições abertas", color: "green" },
          { name: "Em breve", color: "yellow" },
          { name: "Lista de espera", color: "orange" },
          { name: "Ao vivo", color: "red" },
          { name: "Encerrado", color: "gray" },
        ] } },
        Data: { date: {} },
        "Horário": { rich_text: {} },
        Local: { rich_text: {} },
        Formato: { select: { options: [
          { name: "Presencial", color: "blue" },
          { name: "Online", color: "purple" },
          { name: "Híbrido", color: "pink" },
        ] } },
        "Preço": { rich_text: {} },
        Etiqueta: { rich_text: {} },
        Destaque: { checkbox: {} },
        Ativo: { checkbox: {} },
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
        Nome: { title: text("Nova sede do Colégio CPPEM") },
        "Descrição": { rich_text: text("Conheça o projeto da nova sede na Zona Norte de Caruaru: salas amplas e climatizadas, quadras, biblioteca e estacionamento.") },
        Link: { url: "https://novasede.cppem.com.br" },
        Imagem: { url: "/eventos/nova-sede.webp" },
        Status: { select: { name: "Em breve" } },
        Local: { rich_text: text("PE-095, 562 · Luiz Gonzaga") },
        Formato: { select: { name: "Presencial" } },
        Etiqueta: { rich_text: text("Novidade") },
        Destaque: { checkbox: true },
        Ativo: { checkbox: true },
        Ordem: { number: 1 },
      },
    });
    console.log("Evento inicial criado: Nova sede.");
  }
} else {
  console.log(`Banco existente: ${database.id}`);
}

console.log(`NOTION_EVENTS_DATABASE_ID=${database.id}`);
