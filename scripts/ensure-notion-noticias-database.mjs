// Cria (ou reaproveita) o banco "Notícias · Colégio CPPEM" na página Sistemas Site.
// Alimenta /noticias. Recebe as notícias escritas pela IA (n8n) e as criadas à mão pela equipe.
// O TEXTO da notícia é o corpo da página do Notion (parágrafos, títulos, listas, imagens).
// Uso: node scripts/ensure-notion-noticias-database.mjs
import nextEnv from "@next/env";
import { Client } from "@notionhq/client";

nextEnv.loadEnvConfig(process.cwd());
if (!process.env.NOTION_TOKEN) throw new Error("Defina NOTION_TOKEN no .env.local.");

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const parentPageId = "3abbbae8-074c-802a-a85e-dfc8e1b37adc";
const databaseTitle = "Notícias · Colégio CPPEM";

async function findExisting() {
  if (process.env.NOTION_NEWS_DATABASE_ID) return notion.databases.retrieve({ database_id: process.env.NOTION_NEWS_DATABASE_ID });
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
    description: [{ type: "text", text: { content: "Notícias do site (/noticias). Só aparece o que estiver com Status Publicado e Data até hoje. O texto é o corpo da página. Marque Destaque para o cartão grande." } }],
    is_inline: false,
    initial_data_source: {
      properties: {
        "Título": { title: {} },
        Status: { select: { options: [
          { name: "Publicado", color: "green" }, { name: "Rascunho", color: "yellow" }, { name: "Arquivado", color: "gray" },
        ] } },
        // cartão grande da grade "Fique ligado"; se houver mais de um, vale o mais recente
        Destaque: { checkbox: {} },
        Data: { date: {} },
        Resumo: { rich_text: {} },
        Categoria: { select: { options: [
          { name: "Pilares", color: "yellow" }, { name: "Dicas para famílias", color: "blue" }, { name: "Vida escolar", color: "green" },
          { name: "Fé e valores", color: "purple" }, { name: "Concursos e futuro", color: "orange" }, { name: "Eventos", color: "red" },
        ] } },
        // foto enviada à mão no Notion (tem prioridade)
        Foto: { files: {} },
        // caminho de uma foto do site ("/vida-escolar/foto-04.webp") ou link https; usado pela automação
        "Foto URL": { url: {} },
        "Descrição da foto": { rich_text: {} },
        // opcional: endereço da notícia. Vazio = gerado a partir do título
        Slug: { rich_text: {} },
        Origem: { select: { options: [{ name: "Manual", color: "blue" }, { name: "IA", color: "pink" }] } },
        // pauta usada pela automação, para não repetir tema
        Tema: { rich_text: {} },
        "Criado em": { created_time: {} },
      },
    },
  });
  console.log(`Banco criado: ${database.id}`);
} else console.log(`Banco existente: ${database.id}`);
console.log(`NOTION_NEWS_DATABASE_ID=${database.id}`);
console.log(`data_source_id=${database.data_sources?.[0]?.id}`);
