import type { ReactNode } from "react";
import Link from "next/link";
import type { NewsBlock, NewsSpan } from "@/lib/news";

function Spans({ spans }: { spans: NewsSpan[] }) {
  return spans.map((span, index) => {
    let node: ReactNode = span.text;
    if (span.bold) node = <strong className="font-bold text-navy">{node}</strong>;
    if (span.italic) node = <em>{node}</em>;
    if (span.href) {
      const className = "font-bold text-blue-600 underline underline-offset-4 hover:text-blue-700";
      node = span.href.startsWith("/") ? (
        <Link href={span.href} className={className}>{node}</Link>
      ) : (
        <a href={span.href} target="_blank" rel="noopener noreferrer" className={className}>{node}</a>
      );
    }
    return <span key={index}>{node}</span>;
  });
}

/** Texto da notícia, a partir dos blocos da página do Notion. */
export function NewsBody({ blocks }: { blocks: NewsBlock[] }) {
  return (
    <div className="space-y-5 text-[1.0625rem] leading-relaxed text-foreground">
      {blocks.map((block, index) => {
        if (block.type === "paragraph") return <p key={index}><Spans spans={block.spans} /></p>;
        if (block.type === "heading") {
          const Tag = block.level === 2 ? "h2" : "h3";
          return (
            <Tag key={index} className={`pt-3 font-display leading-tight font-black text-navy ${block.level === 2 ? "text-2xl" : "text-xl"}`}>
              <Spans spans={block.spans} />
            </Tag>
          );
        }
        if (block.type === "list") {
          const Tag = block.ordered ? "ol" : "ul";
          return (
            <Tag key={index} className={`space-y-2 pl-6 marker:font-bold marker:text-gold-700 ${block.ordered ? "list-decimal" : "list-disc"}`}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="pl-1"><Spans spans={item} /></li>
              ))}
            </Tag>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote key={index} className="rounded-r-2xl border-l-4 border-gold bg-gold-50 px-5 py-4 font-display text-lg leading-snug font-extrabold text-navy">
              <Spans spans={block.spans} />
            </blockquote>
          );
        }
        if (block.type === "image") {
          return (
            <figure key={index} className="overflow-hidden rounded-3xl bg-blue-50 ring-1 ring-blue-100">
              {/* imagem do corpo vem do Notion com URL temporária: sem otimizador */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={block.src} alt={block.caption} loading="lazy" className="w-full" />
              {block.caption && <figcaption className="px-4 py-2.5 text-center text-sm text-muted">{block.caption}</figcaption>}
            </figure>
          );
        }
        return <hr key={index} className="border-blue-100" />;
      })}
    </div>
  );
}
