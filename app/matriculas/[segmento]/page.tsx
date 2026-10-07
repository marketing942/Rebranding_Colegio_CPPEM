import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  BookOpenCheck,
  ChevronDown,
  CircleHelp,
  ClipboardPen,
  Clock,
  Columns4,
  Compass,
  Cross,
  Flag,
  Footprints,
  HeartHandshake,
  Landmark,
  Layers,
  MonitorPlay,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { LightOrbs } from "@/components/home/light-orbs";
import { JsonLd } from "@/components/seo/json-ld";
import { MobileEnrollCta } from "@/components/matriculas/mobile-enroll-cta";
import { EnrollmentForm } from "@/components/matriculas/enrollment-form";
import { enrollmentFaqs, enrollmentInfo, enrollmentSteps, type SegmentReason } from "@/lib/matriculas";
import { pillars, type PillarTone } from "@/lib/pillars";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, programJsonLd } from "@/lib/seo";
import { segments } from "@/lib/segments";
import { siteConfig } from "@/lib/site";

const reasonIcons: Record<SegmentReason["icon"], LucideIcon> = {
  book: BookOpenCheck,
  clock: Clock,
  heart: HeartHandshake,
  family: Users,
  compass: Compass,
  shield: Shield,
  layers: Layers,
  target: Target,
  landmark: Landmark,
  trending: TrendingUp,
  flag: Flag,
};

// ícone e cor da moldura de cada pilar, iguais aos da seção de pilares da home
const pillarIcons: Record<string, LucideIcon> = { "fe-crista": Cross, disciplina: Shield, estabilidade: Landmark, liberdade: TrendingUp };
const pillarRings: Record<PillarTone, string> = {
  gold: "from-gold-300 via-gold to-gold-600",
  navy: "from-blue-700 via-navy to-navy-950",
  blue: "from-blue-400 via-blue-500 to-blue-700",
  sky: "from-blue-200 via-blue-400 to-blue-500",
};

const platforms = [
  {
    eyebrow: "Plataforma IRIUM",
    title: "O estudo segue além da aula",
    text: "Pré-aulas, videoaulas e atividades organizadas por módulo, para revisar e praticar.",
    image: "/plataformas/irium-tablet-3d.png",
    alt: "Tablet com a plataforma IRIUM aberta em uma videoaula",
  },
  {
    eyebrow: "Sistema escolar CPPEM",
    title: "Escola e família mais próximas",
    text: "Médias, frequência, tarefas e resultados em um só lugar, para alunos e responsáveis.",
    image: "/plataformas/sistema-macbook-iphone-3d.png",
    alt: "Notebook e celular com o sistema escolar do CPPEM",
  },
];

type PageProps = { params: Promise<{ segmento: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return segments.map((segment) => ({ segmento: segment.id }));
}

function findSegment(id: string) {
  const segment = segments.find((item) => item.id === id);
  const info = enrollmentInfo[id];
  return segment && info ? { segment, info } : null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const found = findSegment((await params).segmento);
  if (!found) return {};
  const { segment } = found;
  return pageMetadata({
    title: `${segment.title} em Caruaru — Matrículas ${siteConfig.admissionsYear}`,
    description: `${segment.title} (${segment.grades}) no Colégio CPPEM, em Caruaru-PE: escola cristã e militarizada, disciplina, valores cristãos e plataforma IRIUM. Faça a inscrição para ${siteConfig.admissionsYear}.`,
    path: `/matriculas/${segment.id}`,
  });
}

/** Bloco numerado da coluna de informações. */
function InfoBlock({ step, icon: Icon, title, lead, id, children }: { step: number; icon: LucideIcon; title: string; lead?: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="scroll-mt-28 rounded-[1.75rem] bg-white p-5 shadow-[0_18px_44px_-28px_rgb(16_48_122/0.55)] ring-1 ring-blue-100 sm:p-7">
      <header className="flex items-start gap-4">
        <span className="relative grid size-13 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-blue-400 to-blue-700 text-white shadow-[0_10px_22px_-10px_rgb(47_127_240/0.9)]">
          <Icon size={26} aria-hidden="true" />
          <span className="btn-gold absolute -top-2 -right-2 grid size-6 place-items-center rounded-full font-display text-xs font-black">{step}</span>
        </span>
        <div>
          <h2 id={`${id}-titulo`} className="font-display text-[1.35rem] leading-tight font-black text-navy">{title}</h2>
          {lead && <p className="mt-1 text-[15px] leading-relaxed text-muted">{lead}</p>}
        </div>
      </header>
      <div className="mt-6">{children}</div>
    </section>
  );
}


export default async function EnrollmentPage({ params }: PageProps) {
  const found = findSegment((await params).segmento);
  if (!found) notFound();
  const { segment, info } = found;


  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Segmentos de ensino", path: "/#segmentos" }, { name: segment.title, path: `/matriculas/${segment.id}` }])} />
      <JsonLd data={programJsonLd({ name: segment.title, description: `${segment.grades}. ${segment.description}`, path: `/matriculas/${segment.id}` })} />
      <JsonLd data={faqJsonLd(enrollmentFaqs)} />
      {/* ---------- topo ---------- */}
      <section className="surface-night overflow-hidden">
        <LightOrbs />
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid items-center gap-8 md:grid-cols-[1.6fr_1fr] md:gap-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-display text-xs font-black tracking-wider text-gold-300 uppercase shadow-[0_0_20px_rgb(242_176_30/0.25)]">
                <span className="size-2 animate-pulse rounded-full bg-gold" aria-hidden="true" />
                Matrículas {siteConfig.admissionsYear} abertas
              </span>
              <h1 className="mt-5 font-display text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.03] font-black text-white">
                {segment.title}
                <span className="mt-2 block bg-linear-to-r from-gold-300 via-gold to-gold-300 bg-clip-text text-[0.55em] text-transparent">
                  {segment.grades}
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-lg text-blue-100/85">{segment.description}</p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {info.highlights.map((item) => (
                  <li key={item} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-bold text-white backdrop-blur">
                    <Star size={14} className="fill-gold text-gold" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <ul className="mt-6 grid max-w-xl grid-cols-3 gap-3">
                {[
                  { value: "4 pilares", label: "fé, disciplina, estabilidade e liberdade" },
                  { value: "1 min", label: "para fazer a inscrição" },
                  { value: "IRIUM", label: "plataforma de estudos na rotina" },
                ].map((stat) => (
                  <li key={stat.label} className="rounded-2xl border border-white/12 bg-white/6 px-3 py-3.5 text-center backdrop-blur">
                    <p className="font-display text-[clamp(1.05rem,2.4vw,1.5rem)] leading-none font-black text-gold-300">{stat.value}</p>
                    <p className="mt-1.5 text-xs leading-tight text-blue-100/80">{stat.label}</p>
                  </li>
                ))}
              </ul>

              <a href="#inscricao" className="btn-gold mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display font-black lg:hidden">
                <ClipboardPen size={18} aria-hidden="true" />
                Fazer inscrição
              </a>
            </div>

            {/* mascote do segmento */}
            <figure className="relative mx-auto w-40 md:w-full md:max-w-60">
              <span className="absolute inset-[-12%] rounded-full bg-[radial-gradient(circle,rgb(242_176_30/0.4),rgb(47_127_240/0.3)_50%,transparent_72%)] blur-2xl" aria-hidden="true" />
              <div className="relative rotate-3 overflow-hidden rounded-[2.25rem] shadow-[0_0_0_4px_var(--gold),0_30px_60px_-20px_rgb(0_0_0/0.7)]">
                <Image src={info.mascot.src} alt={`${info.mascot.name}, mascote do Colégio CPPEM`} width={700} height={560} priority className="aspect-square w-full origin-top scale-125 object-cover object-top" />
              </div>
              <figcaption className="btn-gold absolute -bottom-3 left-1/2 -translate-x-1/2 -rotate-2 rounded-full px-4 py-1.5 font-display text-sm font-black whitespace-nowrap">
                Oi! Eu sou o {info.mascot.name}
              </figcaption>
            </figure>
          </div>

        </div>
        <div className="gold-line" aria-hidden="true" />
      </section>

      {/* ---------- informações + formulário ---------- */}
      <section className="surface-day pt-10 pb-24 lg:pt-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-start lg:gap-10 lg:px-8">
          <div className="space-y-6">
            <InfoBlock id="por-que" step={1} icon={Sparkles} title={`Por que o CPPEM no ${info.shortName}`} lead="O que o aluno vive nesta etapa, dentro e fora da sala.">
              <ul className="grid gap-3 sm:grid-cols-2">
                {info.reasons.map((reason) => {
                  const Icon = reasonIcons[reason.icon];
                  return (
                    <li key={reason.title} className="flex gap-3.5 rounded-2xl bg-blue-50/70 p-4 ring-1 ring-blue-100">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-blue-600 ring-1 ring-blue-100">
                        <Icon size={22} aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display leading-tight font-black text-navy">{reason.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{reason.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </InfoBlock>

            <InfoBlock id="pilares" step={2} icon={Columns4} title="Os quatro pilares" lead="A base de tudo o que acontece no colégio, em qualquer série.">
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {pillars.map((pillar) => {
                  const PillarIcon = pillarIcons[pillar.id] ?? Shield;
                  return (
                  <li key={pillar.id} className="flex flex-col items-center rounded-2xl bg-linear-to-b from-blue-50 to-white px-3 pt-5 pb-4 text-center ring-1 ring-blue-100">
                    {/* a foto do pilar em círculo, com a moldura na cor dele e o ícone, como na home */}
                    <span className={`relative block size-24 rounded-full bg-linear-to-br p-1 shadow-[0_12px_24px_-12px_rgb(6_22_58/0.55)] sm:size-28 ${pillarRings[pillar.tone]}`}>
                      <span className="relative block size-full overflow-hidden rounded-full bg-blue-100 ring-2 ring-white/70">
                        {pillar.photo && <Image src={pillar.photo.src} alt="" fill sizes="112px" className="object-cover" />}
                      </span>
                      <span className="absolute -right-1 -bottom-1 grid size-9 place-items-center rounded-full bg-white text-navy shadow-[0_6px_14px_-6px_rgb(6_22_58/0.6)] ring-1 ring-blue-100">
                        <PillarIcon size={18} strokeWidth={2.2} aria-hidden="true" />
                      </span>
                    </span>
                    <h3 className="mt-4 font-display leading-tight font-black text-navy">{pillar.name}</h3>
                    <p className="mt-1 text-xs leading-snug text-muted">{pillar.tagline}</p>
                  </li>
                  );
                })}
              </ul>
            </InfoBlock>

            <InfoBlock id="plataformas" step={3} icon={MonitorPlay} title="Plataformas de estudo e acompanhamento" lead="Ferramentas digitais que apoiam as aulas e aproximam a família da vida escolar.">
              <ul className="grid gap-3 sm:grid-cols-2">
                {platforms.map((platform) => (
                  <li key={platform.title} className="overflow-hidden rounded-2xl bg-blue-50/70 ring-1 ring-blue-100">
                    <div className="relative aspect-16/10 bg-linear-to-br from-blue-100 to-blue-200">
                      <Image src={platform.image} alt={platform.alt} fill sizes="(min-width: 640px) 320px, 90vw" className="object-contain p-3" />
                    </div>
                    <div className="p-4">
                      <p className="font-display text-xs font-black tracking-widest text-blue-600 uppercase">{platform.eyebrow}</p>
                      <h3 className="mt-1 font-display leading-tight font-black text-navy">{platform.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{platform.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </InfoBlock>

            <InfoBlock id="passos" step={4} icon={Footprints} title="Como garantir a vaga">
              <ol className="grid gap-3 sm:grid-cols-2">
                {enrollmentSteps.map((item, index) => (
                  <li key={item.title} className="flex gap-3 rounded-2xl bg-blue-50/70 p-4 ring-1 ring-blue-100">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-linear-to-br from-blue-500 to-blue-700 font-display font-black text-white">{index + 1}</span>
                    <div>
                      <p className="font-display leading-tight font-black text-navy">{item.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </InfoBlock>

            <InfoBlock id="duvidas" step={5} icon={CircleHelp} title="Perguntas frequentes">
              <div className="space-y-2.5">
                {enrollmentFaqs.map((faq) => (
                  <details key={faq.question} className="group rounded-2xl bg-blue-50/70 ring-1 ring-blue-100 open:bg-white open:shadow-[0_14px_30px_-22px_rgb(16_48_122/0.6)]">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5 font-display leading-tight font-black text-navy [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <ChevronDown size={18} className="shrink-0 text-blue-600 transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <p className="px-4 pb-4 text-[15px] leading-relaxed text-muted">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </InfoBlock>
          </div>

          {/* formulário */}
          <aside id="inscricao" aria-labelledby="inscricao-titulo" className="scroll-mt-24 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_30px_70px_-30px_rgb(16_48_122/0.7)] ring-1 ring-blue-100 lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto">
              <header className="surface-night px-6 py-5">
                <p className="font-display text-xs font-black tracking-widest text-gold-300 uppercase">Inscrição · {siteConfig.admissionsYear}</p>
                <h2 id="inscricao-titulo" className="mt-1 font-display text-2xl leading-tight font-black text-white">{segment.title}</h2>
                <p className="mt-1 text-sm text-blue-100/80">Preencha e nossa equipe entra em contato.</p>
              </header>
              <div className="gold-line" aria-hidden="true" />
              <EnrollmentForm segmentId={segment.id} segmentName={segment.title} series={info.series} />
            </div>
          </aside>
        </div>
      </section>

      <MobileEnrollCta />
    </>
  );
}
