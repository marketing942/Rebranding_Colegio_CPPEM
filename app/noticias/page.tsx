import { Newspaper } from "lucide-react";
import { LightOrbs } from "@/components/home/light-orbs";
import { NewsCard } from "@/components/news/news-card";
import { NewsGrid, pickHighlights } from "@/components/news/news-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { getNews } from "@/lib/notion/news";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Notícias — Fique ligado no Colégio CPPEM",
  description: "Notícias, dicas para as famílias e o dia a dia do Colégio CPPEM, em Caruaru-PE: pilares, vida escolar, fé, disciplina e preparação para o futuro.",
  path: "/noticias",
});

// acompanha o cache do Notion: notícia marcada como Publicado aparece em até 5 min
export const revalidate = 300;

export default async function NewsPage() {
  const { featured, side, rest } = pickHighlights(await getNews());

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Notícias", path: "/noticias" }])} />

      <section className="surface-night overflow-hidden">
        <LightOrbs />
        <div className="mx-auto max-w-7xl px-4 pt-10 pb-12 sm:px-6 lg:px-8 lg:pt-12 lg:pb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-display text-xs font-black tracking-wider text-gold-300 uppercase">
            <Newspaper size={14} aria-hidden="true" />
            Notícias
          </span>
          <h1 className="mt-4 font-display text-[clamp(2.2rem,5.4vw,4rem)] leading-none font-black text-white">
            Fique <span className="bg-linear-to-r from-gold-300 via-gold to-gold-300 bg-clip-text text-transparent">ligado</span>
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-blue-100/85">Dicas para as famílias, os nossos pilares e o dia a dia do colégio.</p>

          {featured ? (
            <div className="mt-8">
              <NewsGrid featured={featured} side={side} priority />
            </div>
          ) : (
            <p className="mt-8 rounded-3xl border border-white/15 bg-white/6 px-6 py-10 text-center text-lg text-blue-100/85 backdrop-blur">
              Em breve, as primeiras notícias por aqui.
            </p>
          )}
        </div>
        <div className="gold-line" aria-hidden="true" />
      </section>

      {rest.length > 0 && (
        <section className="surface-day py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-l-4 border-gold pl-4">
              <p className="font-display text-sm font-extrabold tracking-widest text-blue-600 uppercase">Mais notícias</p>
              <h2 className="mt-1 font-display text-[clamp(1.7rem,3.4vw,2.4rem)] leading-tight font-black text-navy">Continue lendo</h2>
            </div>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((item) => (
                <li key={item.id}>
                  <NewsCard item={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
