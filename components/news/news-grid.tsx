import { NewsCard } from "@/components/news/news-card";
import { splitFeatured, type NewsItem } from "@/lib/news";

/**
 * Grade "Fique ligado": o destaque grande à esquerda e até 4 notícias menores à direita.
 * Devolve também o que sobrou, para a página listar embaixo.
 */
export function pickHighlights(items: NewsItem[]): { featured: NewsItem | null; side: NewsItem[]; rest: NewsItem[] } {
  const { featured, others } = splitFeatured(items);
  return { featured, side: others.slice(0, 4), rest: others.slice(4) };
}

export function NewsGrid({ featured, side, priority }: { featured: NewsItem; side: NewsItem[]; priority?: boolean }) {
  // com poucas notícias a grade se ajusta: sozinho o destaque ocupa tudo; com 1 ou 2, divide a linha
  const sideColumns = side.length > 2 ? "sm:grid-cols-2" : "";
  return (
    <div className={`grid gap-4 lg:gap-5 ${side.length > 0 ? "lg:grid-cols-2" : ""}`}>
      <NewsCard item={featured} size="large" priority={priority} />
      {side.length > 0 && (
        <div className={`grid auto-rows-fr gap-4 lg:gap-5 ${sideColumns}`}>
          {side.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
