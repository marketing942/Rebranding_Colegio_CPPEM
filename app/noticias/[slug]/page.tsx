import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, ClipboardPen } from "lucide-react";
import { LightOrbs } from "@/components/home/light-orbs";
import { NewsBody } from "@/components/news/news-body";
import { NewsCard, NewsImage } from "@/components/news/news-card";
import { JsonLd } from "@/components/seo/json-ld";
import { formatNewsDate } from "@/lib/news";
import { getNews, getNewsArticle } from "@/lib/notion/news";
import { breadcrumbJsonLd, OG_IMAGE, pageMetadata } from "@/lib/seo";
import { ENROLL_HREF, siteConfig } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

// acompanha o cache do Notion; notícia nova ganha página na primeira visita
export const revalidate = 300;

export async function generateStaticParams() {
  return (await getNews()).map((item) => ({ slug: item.slug }));
}

const absolute = (path: string) => new URL(path, siteConfig.url).toString();

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getNewsArticle((await params).slug);
  if (!article) return {};
  const path = `/noticias/${article.slug}`;
  const base = pageMetadata({ title: article.title, description: article.summary || siteConfig.shortDescription, path });
  // foto do site vira a imagem de compartilhamento; foto do Notion tem URL que vence, então fica a padrão
  const image = article.imageUrl?.startsWith("/") ? { url: article.imageUrl, alt: article.imageAlt } : OG_IMAGE;
  return {
    ...base,
    openGraph: { ...base.openGraph, type: "article", publishedTime: `${article.date}T08:00:00-03:00`, images: [image] },
    twitter: { ...base.twitter, images: [image.url] },
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const article = await getNewsArticle((await params).slug);
  if (!article) notFound();

  const path = `/noticias/${article.slug}`;
  const related = (await getNews()).filter((item) => item.id !== article.id).slice(0, 3);
  const published = `${article.date}T08:00:00-03:00`;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Notícias", path: "/noticias" }, { name: article.title, path }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          description: article.summary,
          datePublished: published,
          dateModified: published,
          inLanguage: "pt-BR",
          mainEntityOfPage: absolute(path),
          image: absolute(article.imageUrl?.startsWith("/") ? article.imageUrl : OG_IMAGE.url),
          articleSection: article.category || undefined,
          author: { "@id": absolute("/#escola") },
          publisher: { "@id": absolute("/#escola") },
        }}
      />

      <article>
        <header className="surface-night overflow-hidden">
          <LightOrbs />
          <div className="mx-auto max-w-4xl px-4 pt-8 pb-10 sm:px-6 lg:px-8 lg:pt-10 lg:pb-12">
            <Link href="/noticias" className="inline-flex items-center gap-2 text-sm font-bold text-blue-100/80 hover:text-gold-300">
              <ArrowLeft size={16} aria-hidden="true" />
              Todas as notícias
            </Link>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-bold text-blue-100/85">
              {article.category && <span className="rounded-full bg-gold px-3 py-1 font-display text-xs font-black tracking-wide text-navy-950 uppercase">{article.category}</span>}
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={15} aria-hidden="true" />
                <time dateTime={article.date}>{formatNewsDate(article.date)}</time>
              </span>
            </p>
            <h1 className="mt-4 font-display text-[clamp(1.9rem,4.6vw,3.2rem)] leading-[1.06] font-black text-white">{article.title}</h1>
            {article.summary && <p className="mt-4 max-w-3xl text-lg leading-relaxed text-blue-100/90">{article.summary}</p>}
          </div>
          <div className="gold-line" aria-hidden="true" />
        </header>

        <div className="surface-day pt-8 pb-16 lg:pt-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {article.imageUrl && (
              <figure className="relative aspect-16/9 overflow-hidden rounded-[1.75rem] bg-blue-100 shadow-[0_26px_60px_-30px_rgb(6_22_58/0.7)]">
                <NewsImage src={article.imageUrl} alt={article.imageAlt} sizes="(min-width: 896px) 832px, 100vw" priority className="object-cover" />
              </figure>
            )}

            <div className="mx-auto mt-8 max-w-3xl">
              <NewsBody blocks={article.blocks} />

              {/* toda notícia termina com o convite para conhecer o colégio */}
              <aside className="surface-night mt-10 overflow-hidden rounded-[1.75rem] p-6 sm:p-8">
                <p className="font-display text-xs font-black tracking-widest text-gold-300 uppercase">Matrículas {siteConfig.admissionsYear} abertas</p>
                <p className="mt-1 font-display text-2xl leading-tight font-black text-white">Venha conhecer o {siteConfig.name} de perto.</p>
                <p className="mt-2 text-blue-100/85">Fé cristã, disciplina, estabilidade e liberdade, do 1º ano do Fundamental ao 3º ano do Ensino Médio.</p>
                <Link href={ENROLL_HREF} className="btn-gold mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 font-display font-black">
                  <ClipboardPen size={18} aria-hidden="true" />
                  Fazer inscrição
                </Link>
              </aside>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="border-l-4 border-gold pl-4 font-display text-2xl leading-tight font-black text-navy">Leia também</h2>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <li key={item.id}>
                    <NewsCard item={item} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
