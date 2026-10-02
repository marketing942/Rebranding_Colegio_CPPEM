import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { YoutubeEmbed } from "@/components/shared/youtube-embed";
import { institutionalVideo } from "@/lib/media";

/** Vídeo institucional. Com `showAboutLink`, a seção leva para a página Sobre (usado na home). */
export function VideoSection({ showAboutLink = false }: { showAboutLink?: boolean }) {
  return (
    <section id="video" className="surface-day scroll-mt-24 py-14 sm:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 lg:px-8">
        <div className="text-center lg:text-left">
          <div className="inline-block border-l-4 border-gold pl-4 text-left">
            <p className="font-display text-sm font-extrabold tracking-widest text-blue-600 uppercase">Vídeo institucional</p>
            <h2 className="mt-1 font-display text-[clamp(1.7rem,3.2vw,2.5rem)] leading-tight font-black text-navy uppercase">Conheça o CPPEM por dentro</h2>
          </div>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted lg:mx-0">
            O Prof. Everton Mota e Andrezza Mota apresentam o Colégio CPPEM e a proposta que orienta o dia a dia da escola.
          </p>
          {showAboutLink && (
            <Link href="/sobre" className="mt-5 inline-flex items-center gap-2 font-display font-black text-blue-600 hover:text-blue-700 hover:underline">
              Saiba mais sobre o colégio
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          )}
        </div>
        <YoutubeEmbed videoId={institutionalVideo.id} title={institutionalVideo.title} poster={institutionalVideo.poster} />
      </div>
    </section>
  );
}
