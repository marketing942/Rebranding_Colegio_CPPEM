import Image from "next/image";
import { Cross, Landmark, Shield, TrendingUp, type LucideIcon } from "lucide-react";
import { pillars, type Pillar, type PillarTone } from "@/lib/pillars";

const icons: Record<string, LucideIcon> = {
  "fe-crista": Cross,
  disciplina: Shield,
  estabilidade: Landmark,
  liberdade: TrendingUp,
};

// cada pilar tem a sua cor de círculo; o resto do bloco (frase, etiquetas) acompanha
const tones: Record<PillarTone, { circle: string; glow: string; tagline: string; tag: string; number: string; ghost: string }> = {
  gold: {
    circle: "from-gold-300 via-gold to-gold-600",
    glow: "bg-gold/40",
    tagline: "text-gold-700",
    tag: "bg-gold-50 text-navy ring-gold/50",
    number: "text-gold-700",
    ghost: "text-navy-950/25",
  },
  navy: {
    circle: "from-blue-700 via-navy to-navy-950",
    glow: "bg-navy/35",
    tagline: "text-navy",
    tag: "bg-blue-50 text-navy ring-navy/20",
    number: "text-navy",
    ghost: "text-white/25",
  },
  blue: {
    circle: "from-blue-400 via-blue-500 to-blue-700",
    glow: "bg-blue-500/40",
    tagline: "text-blue-600",
    tag: "bg-blue-50 text-blue-700 ring-blue-200",
    number: "text-blue-600",
    ghost: "text-white/30",
  },
  sky: {
    circle: "from-blue-200 via-blue-400 to-blue-500",
    glow: "bg-blue-400/40",
    tagline: "text-blue-500",
    tag: "bg-blue-50 text-blue-700 ring-blue-200",
    number: "text-blue-500",
    ghost: "text-white/40",
  },
};

function PillarCircle({ pillar, index }: { pillar: Pillar; index: number }) {
  const tone = tones[pillar.tone];
  const Icon = icons[pillar.id] ?? Shield;

  return (
    <div className="relative mx-auto aspect-square w-[min(74vw,18rem)] sm:w-full sm:max-w-88">
      {/* brilho colorido no chão do círculo */}
      <span className={`absolute inset-x-[12%] -bottom-[4%] h-[18%] rounded-[50%] blur-2xl ${tone.glow}`} aria-hidden="true" />
      {/* anel tracejado girando devagar */}
      <span className="pillar-spin absolute inset-[-7%] rounded-full border-2 border-dashed border-blue-200" aria-hidden="true" />

      <div className={`absolute inset-0 overflow-hidden rounded-full bg-linear-to-br shadow-[inset_0_-18px_40px_rgb(0_0_0/0.18),inset_0_14px_30px_rgb(255_255_255/0.3)] ${tone.circle}`}>
        {pillar.photo ? (
          // a cor do pilar vira a moldura da foto; o ícone fica por baixo enquanto ela carrega
          <span className="absolute inset-[3.5%] overflow-hidden rounded-full bg-navy-950/20 shadow-[0_0_0_3px_rgb(255_255_255/0.55)]">
            <Icon className={`absolute inset-0 m-auto size-[46%] ${tone.ghost}`} strokeWidth={1.6} aria-hidden="true" />
            <Image
              src={pillar.photo.src}
              alt={pillar.photo.alt}
              fill
              sizes="(min-width: 640px) 352px, 74vw"
              className={`object-cover ${pillar.photo.className ?? ""}`}
            />
          </span>
        ) : (
          <>
            <span className="dot-texture absolute inset-0 opacity-70" aria-hidden="true" />
            {/* reflexo de luz no alto do círculo */}
            <span className="absolute top-[7%] left-[14%] h-[26%] w-[46%] -rotate-12 rounded-[50%] bg-white/25 blur-xl" aria-hidden="true" />
            {/* sem foto nem mascote, o ícone do pilar ocupa o lugar */}
            {!pillar.mascot && <Icon className={`absolute inset-0 m-auto size-[46%] ${tone.ghost}`} strokeWidth={1.6} aria-hidden="true" />}
          </>
        )}
      </div>

      {pillar.mascot && (
        <Image
          src={pillar.mascot.src}
          alt={pillar.mascot.alt}
          width={520}
          height={620}
          className={`absolute bottom-0 left-1/2 h-[112%] w-auto max-w-none -translate-x-1/2 object-contain drop-shadow-[0_18px_24px_rgb(6_22_58/0.35)] ${pillar.mascot.className ?? ""}`}
        />
      )}

      {/* objetos flutuando em volta, como os enfeites da mesa */}
      <span className="pillar-float absolute -top-[2%] right-[2%] grid size-[24%] place-items-center rounded-[28%] bg-white text-navy shadow-[0_16px_30px_-12px_rgb(6_22_58/0.5)] ring-1 ring-blue-100" aria-hidden="true">
        <Icon className="size-1/2" strokeWidth={2.2} />
      </span>
      <span className="pillar-float-slow btn-gold absolute bottom-[6%] -left-[3%] grid size-[21%] place-items-center rounded-full font-display text-[clamp(1.1rem,2.6vw,1.6rem)] font-black" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="pillar-float-slow absolute top-[18%] -left-[5%] size-[7%] rounded-full bg-blue-400 shadow-[0_0_18px_rgb(90_162_255/0.9)]" aria-hidden="true" />
      <span className="pillar-float absolute right-[-4%] bottom-[22%] size-[5%] rounded-full bg-gold shadow-[0_0_16px_rgb(242_176_30/0.9)]" aria-hidden="true" />
    </div>
  );
}

export function PillarsSection() {
  return (
    <section id="pilares" className="scroll-mt-24 overflow-hidden bg-linear-to-b from-blue-50 via-white to-blue-50 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-extrabold tracking-widest text-blue-600 uppercase">Nossos pilares</p>
          <h2 className="mt-1 font-display text-[clamp(1.8rem,3.8vw,2.9rem)] leading-tight font-black text-navy">
            Quatro pilares. <span className="text-gold-700">Uma formação completa.</span>
          </h2>
          <p className="mt-3 text-lg text-muted">O jeito CPPEM de formar gente boa, preparada e dona do próprio futuro.</p>
        </div>

        <ol className="mt-12 space-y-16 sm:mt-16 md:space-y-24">
          {pillars.map((pillar, index) => {
            const tone = tones[pillar.tone];
            const flipped = index % 2 === 1;
            return (
              <li key={pillar.id} className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                <div className={flipped ? "md:order-2" : undefined}>
                  <PillarCircle pillar={pillar} index={index} />
                </div>
                <div className={`text-center md:text-left ${flipped ? "md:order-1" : ""}`}>
                  <p className={`font-display text-sm font-black tracking-widest uppercase ${tone.number}`}>
                    Pilar {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-none font-black text-navy">{pillar.name}</h3>
                  <p className={`mt-3 font-display text-xl leading-tight font-extrabold ${tone.tagline}`}>{pillar.tagline}</p>
                  <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-foreground md:mx-0">{pillar.text}</p>
                  <ul className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
                    {pillar.tags.map((tag) => (
                      <li key={tag} className={`rounded-full px-4 py-1.5 font-display text-sm font-extrabold ring-1 ${tone.tag}`}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
