"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";

type Props = { videoId: string; title: string; poster: string };

/**
 * Mostra só a capa até o clique; o player do YouTube (e os scripts dele) só
 * carrega quando a pessoa decide assistir.
 */
export function YoutubeEmbed({ videoId, title, poster }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl bg-navy-950 shadow-[0_30px_70px_-30px_rgb(6_22_58/0.85)] ring-1 ring-white/15">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Assistir: ${title}`} className="group absolute inset-0 block size-full cursor-pointer">
          <Image src={poster} alt="" fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute inset-0 bg-linear-to-t from-navy-950/70 via-navy-950/10 to-transparent" aria-hidden="true" />
          <span className="btn-gold absolute top-1/2 left-1/2 grid size-18 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full sm:size-22">
            <span className="absolute inset-0 animate-ping rounded-full bg-gold/50 motion-reduce:animate-none" aria-hidden="true" />
            <Play className="relative ml-1 size-8 fill-current sm:size-10" aria-hidden="true" />
          </span>
          <span className="absolute bottom-4 left-5 font-display text-sm font-black tracking-widest text-white uppercase drop-shadow">Assistir ao vídeo</span>
        </button>
      )}
    </div>
  );
}
