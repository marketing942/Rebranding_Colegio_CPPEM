import Image from "next/image";
import {
  BookOpen,
  Bot,
  Briefcase,
  CalendarHeart,
  Church,
  Compass,
  Cross,
  ImagePlus,
  PenLine,
  Rocket,
  Scale,
  Sigma,
  Sun,
  Target,
  type LucideIcon,
} from "lucide-react";
import type { CurriculumIcon, CurriculumPhoto, CurriculumTone } from "@/lib/curriculum";

export const curriculumIcons: Record<CurriculumIcon, LucideIcon> = {
  target: Target,
  scale: Scale,
  sigma: Sigma,
  pen: PenLine,
  rocket: Rocket,
  compass: Compass,
  bot: Bot,
  briefcase: Briefcase,
  book: BookOpen,
  cross: Cross,
  sun: Sun,
  church: Church,
  calendar: CalendarHeart,
};

/** As mesmas quatro cores dos pilares: dourado, navy, azul e azul-claro. */
export const curriculumTones: Record<CurriculumTone, { circle: string; glow: string; text: string; soft: string }> = {
  gold: { circle: "from-gold-300 via-gold to-gold-600", glow: "bg-gold/45", text: "text-gold-700", soft: "bg-gold-50 ring-gold/40" },
  navy: { circle: "from-blue-700 via-navy to-navy-950", glow: "bg-navy/40", text: "text-navy", soft: "bg-blue-50 ring-navy/20" },
  blue: { circle: "from-blue-400 via-blue-500 to-blue-700", glow: "bg-blue-500/45", text: "text-blue-600", soft: "bg-blue-50 ring-blue-200" },
  sky: { circle: "from-blue-200 via-blue-400 to-blue-500", glow: "bg-blue-400/45", text: "text-blue-500", soft: "bg-blue-50 ring-blue-200" },
};

/** Círculo com gradiente, reflexo de luz e ícone — a "arte" de cada eixo. */
export function AxisCircle({ tone, icon, number, className = "" }: { tone: CurriculumTone; icon: CurriculumIcon; number: string; className?: string }) {
  const Icon = curriculumIcons[icon];
  const t = curriculumTones[tone];
  return (
    <span className={`relative block aspect-square ${className}`} aria-hidden="true">
      <span className={`absolute inset-x-[14%] -bottom-[5%] h-[18%] rounded-[50%] blur-2xl ${t.glow}`} />
      <span className="pillar-spin absolute inset-[-7%] rounded-full border-2 border-dashed border-blue-200/70" />
      <span className={`absolute inset-0 overflow-hidden rounded-full bg-linear-to-br shadow-[inset_0_-18px_40px_rgb(0_0_0/0.18),inset_0_14px_30px_rgb(255_255_255/0.3)] ${t.circle}`}>
        <span className="dot-texture absolute inset-0 opacity-70" />
        <span className="absolute top-[8%] left-[14%] h-[26%] w-[46%] -rotate-12 rounded-[50%] bg-white/25 blur-xl" />
        <Icon className="absolute inset-0 m-auto size-[44%] text-white drop-shadow-[0_6px_14px_rgb(6_22_58/0.35)]" strokeWidth={1.8} />
      </span>
      <span className="btn-gold absolute bottom-[4%] -left-[4%] grid size-[28%] place-items-center rounded-full font-display text-[clamp(0.9rem,2.2vw,1.35rem)] font-black">{number}</span>
    </span>
  );
}

/** Fotos do tópico; sem foto, mostra o espaço reservado. */
export function TopicPhotos({ photos, slots = 1, tone }: { photos: CurriculumPhoto[]; slots?: number; tone: CurriculumTone }) {
  if (photos.length > 0) {
    return (
      <div className={`grid gap-3 ${photos.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {photos.map((photo) => (
          <figure key={photo.src} className="relative aspect-4/3 overflow-hidden rounded-3xl bg-blue-100 shadow-[0_18px_40px_-24px_rgb(6_22_58/0.6)]">
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
          </figure>
        ))}
      </div>
    );
  }
  const t = curriculumTones[tone];
  return (
    <div className={`grid gap-3 ${slots > 1 ? "sm:grid-cols-2" : ""}`}>
      {Array.from({ length: slots }, (_, index) => (
        <div key={index} className={`grid aspect-4/3 place-items-center rounded-3xl border-2 border-dashed border-blue-200 ring-1 ${t.soft}`}>
          <span className="flex flex-col items-center gap-2 text-center text-muted">
            <ImagePlus size={30} className={t.text} aria-hidden="true" />
            <span className="text-xs font-bold tracking-wider uppercase">Foto em breve</span>
          </span>
        </div>
      ))}
    </div>
  );
}
