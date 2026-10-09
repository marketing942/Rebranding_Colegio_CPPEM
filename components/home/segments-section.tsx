import Image from "next/image";
import Link from "next/link";
import { Backpack, BookOpen, GraduationCap, type LucideIcon } from "lucide-react";
import { segments } from "@/lib/segments";
import type { Segment } from "@/types/content";

// cada fase ganha um gradiente próprio: do azul vivo (pequenos) ao navy (Médio).
// O painel nunca é chapado — sempre tem luz vindo de cima.
const tones: Record<string, { panel: string; photo: string; glow: string; icon: LucideIcon }> = {
  "fundamental-1": {
    panel: "from-blue-500 to-blue-700",
    photo: "from-blue-400 via-blue-500 to-blue-700",
    glow: "hover:shadow-[0_30px_60px_-20px_rgb(47_127_240/0.75)]",
    icon: Backpack,
  },
  "fundamental-2": {
    panel: "from-blue-600 to-navy",
    photo: "from-blue-500 via-blue-600 to-navy",
    glow: "hover:shadow-[0_30px_60px_-20px_rgb(29_100_214/0.75)]",
    icon: BookOpen,
  },
  "ensino-medio": {
    panel: "from-navy to-navy-950",
    photo: "from-blue-700 via-navy to-navy-950",
    glow: "hover:shadow-[0_30px_60px_-20px_rgb(16_48_122/0.85)]",
    icon: GraduationCap,
  },
};

function SegmentCard({ segment }: { segment: Segment }) {
  const tone = tones[segment.id] ?? tones["fundamental-2"];
  const Icon = tone.icon;

  const content = (
    <>
      <div className={`shine relative aspect-square overflow-hidden bg-linear-to-br ${tone.photo}`}>
        {segment.image ? (
          <Image
            src={segment.image}
            alt={`Estudante do ${segment.title} do Colégio CPPEM`}
            fill
            sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            quality={100}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          // placeholder até chegarem as fotos dos alunos
          <div className={`dot-texture relative flex size-full flex-col items-center justify-center gap-3 bg-linear-to-br ${tone.photo}`}>
            <span className="absolute top-[18%] left-1/2 size-48 -translate-x-1/2 rounded-full bg-blue-400/40 blur-3xl" aria-hidden="true" />
            <span className="relative grid size-20 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/40 shadow-[0_0_30px_rgb(90_162_255/0.6)] backdrop-blur">
              <Icon size={40} strokeWidth={2.2} aria-hidden="true" />
            </span>
            <span className="relative text-xs font-bold tracking-wider text-white/80 uppercase">Foto em breve</span>
          </div>
        )}
        {/* a foto se funde no painel de baixo */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-navy-950/50 to-transparent" aria-hidden="true" />
      </div>

      <div className={`relative flex flex-1 flex-col items-center bg-linear-to-b px-5 pt-8 pb-7 text-center ${tone.panel}`}>
        {/* luz no topo do painel */}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent" aria-hidden="true" />
        <span className="pointer-events-none absolute inset-x-6 top-0 h-16 rounded-b-full bg-white/10 blur-xl" aria-hidden="true" />
        <span className="btn-gold absolute -top-4 rounded-full px-4 py-1.5 font-display text-xs font-black tracking-wide uppercase">
          {segment.grades}
        </span>
        <h3 className="relative font-display text-xl leading-tight font-black text-white uppercase">{segment.title}</h3>
        <p className="relative mt-2 text-sm leading-relaxed text-blue-100/90">{segment.description}</p>
      </div>
    </>
  );

  const cardClass = `group flex h-full flex-col overflow-hidden rounded-3xl bg-navy-950 shadow-[0_20px_40px_-22px_rgb(6_22_58/0.7)] ring-1 ring-navy/10 transition-all duration-300 hover:-translate-y-2 ${tone.glow}`;

  return segment.href ? (
    <Link href={segment.href} className={cardClass}>
      {content}
    </Link>
  ) : (
    <article className={cardClass}>{content}</article>
  );
}

export function SegmentsSection() {
  return (
    <section id="segmentos" className="surface-day scroll-mt-24 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="border-l-4 border-gold pl-4">
          <p className="font-display text-sm font-extrabold tracking-widest text-blue-600 uppercase">Nossos segmentos</p>
          <h2 className="mt-1 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] leading-tight font-black text-navy uppercase">
            Um CPPEM para cada fase do seu filho
          </h2>
        </div>

        <ul className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-7 md:grid-cols-3">
          {segments.map((segment) => (
            <li key={segment.id}>
              <SegmentCard segment={segment} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
