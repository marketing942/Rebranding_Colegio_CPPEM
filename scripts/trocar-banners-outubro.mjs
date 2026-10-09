// Troca os 3 banners do carrossel da Home no Notion (banco "Banners").
// Uso: node scripts/trocar-banners-outubro.mjs novos     -> Matrículas 2027, Provão 31/10 e Bolsa Atleta
//      node scripts/trocar-banners-outubro.mjs antigos   -> volta os 3 anteriores
// ATENÇÃO: rode "novos" só depois de os arquivos de public/banners/ estarem publicados (deploy),
// senão o carrossel do site no ar aponta para imagens que ainda não existem.
import nextEnv from "@next/env";
import { Client } from "@notionhq/client";

nextEnv.loadEnvConfig(process.cwd());
if (!process.env.NOTION_TOKEN) throw new Error("Defina NOTION_TOKEN no .env.local.");
const notion = new Client({ auth: process.env.NOTION_TOKEN });

const rows = {
  "3f1bbae8-074c-81fb-a593-c424c159c454": {
    novos: { nome: "Matrículas 2027 abertas — do Fundamental ao Ensino Médio", banner: "/banners/matriculas-2027-abertas-alunos.webp", link: "/#segmentos", fim: null },
    antigos: { nome: "Matrículas abertas para 2027", banner: "/banners/matriculas-abertas.webp", link: "/#segmentos", fim: null },
  },
  "3f1bbae8-074c-811b-8a7c-e6ec183e68da": {
    // o Provão é dia 31/10: o banner sai sozinho na véspera, às 21h, como o evento no menu
    novos: { nome: "Provão CPPEM 31/10 — inscrições abertas", banner: "/banners/provao-2027-31-10-alunos.webp", link: "https://provao.colegio.cppem.com.br", fim: "2026-10-30T21:00:00.000-03:00" },
    antigos: { nome: "Formando jovens com fé, disciplina e direcionamento", banner: "/banners/formando-jovens.webp", link: "/sobre", fim: null },
  },
  "3f1bbae8-074c-8176-b3fd-dd7249327635": {
    novos: { nome: "Bolsa Atleta — pré-candidaturas abertas", banner: "/banners/bolsa-atleta-alunos.webp", link: "https://atletas.cppem.com.br", fim: null },
    antigos: { nome: "Formando quem fará diferença no amanhã", banner: "/banners/fara-diferenca.webp", link: "/#segmentos", fim: null },
  },
};

const mode = process.argv[2];
if (mode !== "novos" && mode !== "antigos") throw new Error('Informe "novos" ou "antigos".');

for (const [pageId, options] of Object.entries(rows)) {
  const row = options[mode];
  await notion.pages.update({
    page_id: pageId,
    properties: {
      Nome: { title: [{ type: "text", text: { content: row.nome } }] },
      "Banner desktop": { url: row.banner },
      Link: { url: row.link },
      Fim: { date: row.fim ? { start: row.fim } : null },
    },
  });
  console.log(`${mode}: ${row.nome} -> ${row.banner}`);
}
