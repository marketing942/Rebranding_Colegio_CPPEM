import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsGrid, pickHighlights } from "@/components/news/news-grid";
import { getNews } from "@/lib/notion/news";

/** "Fique ligado" na home: o destaque e as 4 notícias mais recentes. Sem notícias publicadas, a seção não aparece. */
export async function NewsSection() {
  const { featured, side } = pickHighlights(await getNews());
  if (!featured) return null;

  return (
    <section id="noticias" className="surface-day scroll-mt-20 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="border-l-4 border-gold pl-4">
            <p className="font-display text-sm font-extrabold tracking-widest text-blue-600 uppercase">Notícias</p>
            <h2 className="mt-1 font-display text-[clamp(1.9rem,4vw,3rem)] leading-none font-black text-navy">Fique ligado</h2>
          </div>
          <Link href="/noticias" className="group inline-flex items-center gap-2 rounded-full border-2 border-blue-200 bg-white px-5 py-2.5 font-display text-sm font-black text-navy transition-colors hover:border-gold">
            Ver todas as notícias
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8">
          <NewsGrid featured={featured} side={side} />
        </div>
      </div>
    </section>
  );
}
