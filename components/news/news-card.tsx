import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEFAULT_NEWS_COVER, formatNewsDate, type NewsItem } from "@/lib/news";

/** Foto do site passa pelo otimizador; foto do Notion (URL temporária) vai direto, sem cache de imagem. */
export function NewsImage({ src, alt, sizes, priority, className }: { src: string; alt: string; sizes: string; priority?: boolean; className?: string }) {
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} unoptimized={!src.startsWith("/")} className={className} />;
}

/**
 * Cartão de notícia: a capa em cima, inteira (16:9), e o texto embaixo.
 * `size="large"` é o destaque da grade "Fique ligado"; nele a capa cresce para ocupar a altura da grade.
 */
export function NewsCard({ item, size = "small", priority }: { item: NewsItem; size?: "large" | "small"; priority?: boolean }) {
  const large = size === "large";
  const image = item.imageUrl ?? DEFAULT_NEWS_COVER;
  return (
    <Link
      href={`/noticias/${item.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-navy-950 shadow-[0_22px_50px_-28px_rgb(6_22_58/0.75)] ring-1 ring-white/10 outline-offset-4 focus-visible:outline-2 focus-visible:outline-gold"
    >
      <span className={`relative block w-full shrink-0 overflow-hidden bg-blue-100 ${large ? "aspect-video lg:aspect-auto lg:min-h-72 lg:flex-1" : "aspect-video"}`}>
        <NewsImage
          src={image}
          alt={item.imageAlt}
          sizes={large ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </span>
      <span className="gold-line shrink-0" aria-hidden="true" />

      <div className={`surface-night flex flex-col ${large ? "p-6 sm:p-7" : "flex-1 p-5"}`}>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold text-blue-100/85">
          {item.category && <span className="rounded-full bg-gold px-2.5 py-0.5 font-display font-black tracking-wide text-navy-950 uppercase">{item.category}</span>}
          <time dateTime={item.date}>{formatNewsDate(item.date)}</time>
        </p>
        <h3 className={`mt-2 font-display leading-tight font-black text-white ${large ? "text-[clamp(1.4rem,2.3vw,1.9rem)]" : "line-clamp-3 text-lg"}`}>{item.title}</h3>
        {item.summary && <p className={`mt-2 leading-snug text-blue-100/85 ${large ? "line-clamp-3 max-w-2xl text-base" : "line-clamp-2 text-sm"}`}>{item.summary}</p>}
        <span className={`inline-flex items-center gap-1.5 font-display text-sm font-black text-gold-300 ${large ? "mt-3" : "mt-auto pt-3"}`}>
          Ler notícia
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
