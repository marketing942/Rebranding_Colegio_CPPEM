import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BookOpenCheck,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardPen,
  Clock,
  Columns4,
  Compass,
  Cross,
  Flag,
  Footprints,
  HandCoins,
  HeartHandshake,
  Landmark,
  Layers,
  MapPin,
  Medal,
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
import { WhatsappIcon } from "@/components/layout/brand-icons";
import { MobileEnrollCta } from "@/components/matriculas/mobile-enroll-cta";
import { EnrollmentForm } from "@/components/matriculas/enrollment-form";
import { ATHLETES_URL, athleteTiers, enrollmentFaqs, enrollmentInfo, enrollmentSteps, MAX_SCHOLARSHIP, type SegmentReason } from "@/lib/matriculas";
import { pillars, type PillarTone } from "@/lib/pillars";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, programJsonLd } from "@/lib/seo";
import { segments } from "@/lib/segments";
import { NEW_CAMPUS_URL, siteConfig, whatsappUrl } from "@/lib/site";

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
    description: `${segment.title} (${segment.grades}) no Colégio CPPEM, em Caruaru-PE: escola cristã e militarizada, plataforma IRIUM e Programa Bolsa Atleta. Faça a inscrição para ${siteConfig.admissionsYear}.`,
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

function QrCode({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="block shrink-0 rounded-2xl bg-white p-2 shadow-[0_0_0_3px_var(--gold),0_14px_30px_-12px_rgb(0_0_0/0.6)]">
      <Image src={src} alt={alt} width={120} height={120} unoptimized className="size-28" />
    </span>
  );
}

export default async function EnrollmentPage({ params }: PageProps) {
  const found = findSegment((await params).segmento);
  if (!found) notFound();
  const { segment, info } = found;

  const whatsappValues = whatsappUrl(
    siteConfig.telephones[0].e164,
    `Olá! Quero receber os valores e as condições do ${segment.title} (${segment.grades}) para ${siteConfig.admissionsYear}.`,
  );
  const whatsappVisit = whatsappUrl(
    siteConfig.telephones[0].e164,
    `Olá! Vi a página de Matrículas ${siteConfig.admissionsYear} do ${segment.title} e quero agendar uma visita.`,
  );

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Segmentos de ensino", path: "/#segmentos" }, { name: segment.title, path: `/matriculas/${segment.id}` }])} />
      <JsonLd data={programJsonLd({ name: segment.title, description: `${segment.grades}. ${segment.description}`, path: `/matriculas/${segment.id}` })} />
      <JsonLd data={faqJsonLd(enrollmentFaqs)} />
      {/* ---------- topo ---------- */}
      <section className="surface-night overflow-hidden">
        <LightOrbs />
        <div className="mx-auto max-w-7xl px-4 pt-6 pb-12 sm:px-6 lg:px-8 lg:pb-16">
          <nav aria-label="Trilha" className="flex flex-wrap items-center gap-1.5 text-sm text-blue-100/70">
            <Link href="/" className="hover:text-gold-300">Início</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href="/#segmentos" className="hover:text-gold-300">Segmentos</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="font-bold text-white">{info.shortName}</span>
          </nav>

          <div className="mt-8 grid items-center gap-12 md:grid-cols-[1.5fr_1fr] md:gap-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-display text-xs font-black tracking-wider text-gold-300 uppercase shadow-[0_0_20px_rgb(242_176_30/0.25)]">
                <span className="size-2 animate-pulse rounded-full bg-gold" aria-hidden="true" />
                Matrículas {siteConfig.admissionsYear} abertas
              </span>
              <h1 className="mt-5 font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.03] font-black text-white">
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

              <ul className="mt-8 grid max-w-xl grid-cols-3 gap-3">
                {[
                  { value: "4 pilares", label: "fé, disciplina, estabilidade e liberdade" },
                  { value: "até 80%", label: "no Programa Bolsa Atleta" },
                  { value: "IRIUM", label: "plataforma de estudos na rotina" },
                ].map((stat) => (
                  <li key={stat.label} className="rounded-2xl border border-white/12 bg-white/6 px-3 py-3.5 text-center backdrop-blur">
                    <p className="font-display text-[clamp(1.05rem,2.4vw,1.5rem)] leading-none font-black text-gold-300">{stat.value}</p>
                    <p className="mt-1.5 text-xs leading-tight text-blue-100/80">{stat.label}</p>
                  </li>
                ))}
              </ul>

              <a href="#inscricao" className="btn-gold mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display font-black lg:hidden">
                <ClipboardPen size={18} aria-hidden="true" />
                Fazer inscrição
              </a>
            </div>

            {/* mascote do segmento */}
            <figure className="relative mx-auto w-48 md:w-full md:max-w-72">
              <span className="absolute inset-[-12%] rounded-full bg-[radial-gradient(circle,rgb(242_176_30/0.4),rgb(47_127_240/0.3)_50%,transparent_72%)] blur-2xl" aria-hidden="true" />
              <div className="relative rotate-3 overflow-hidden rounded-[2.25rem] shadow-[0_0_0_4px_var(--gold),0_30px_60px_-20px_rgb(0_0_0/0.7)]">
                <Image src={info.mascot.src} alt={`${info.mascot.name}, mascote do Colégio CPPEM`} width={700} height={560} priority className="aspect-square w-full origin-top scale-125 object-cover object-top" />
              </div>
              <figcaption className="btn-gold absolute -bottom-3 left-1/2 -translate-x-1/2 -rotate-2 rounded-full px-4 py-1.5 font-display text-sm font-black whitespace-nowrap">
                Oi! Eu sou o {info.mascot.name}
              </figcaption>
            </figure>
          </div>

          {/* troca de segmento */}
          <nav aria-label="Outros segmentos" className="mt-10 flex flex-wrap gap-2">
            {segments.map((item) => {
              const current = item.id === segment.id;
              return (
                <Link
                  key={item.id}
                  href={`/matriculas/${item.id}`}
                  aria-current={current ? "page" : undefined}
                  className={`rounded-full px-4 py-2 font-display text-sm font-extrabold transition-colors ${current ? "bg-white text-navy" : "border border-white/20 text-white/85 hover:border-gold hover:text-gold-300"}`}
                >
                  {enrollmentInfo[item.id]?.shortName ?? item.title}
                </Link>
              );
            })}
          </nav>
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
              <Link href="/sobre#pilares" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline">
                Conheça cada pilar em detalhe
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </InfoBlock>

            {/* Bolsa Atleta: bloco escuro para se destacar dos demais */}
            <section id="bolsa-atleta" aria-labelledby="bolsa-atleta-titulo" className="surface-night scroll-mt-28 overflow-hidden rounded-[1.75rem] p-5 shadow-[0_24px_50px_-26px_rgb(6_22_58/0.9)] sm:p-7">
              <header className="flex items-start gap-4">
                <span className="relative grid size-13 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-gold-300 to-gold-600 text-navy-950 shadow-[0_0_24px_rgb(242_176_30/0.55)]">
                  <Medal size={26} aria-hidden="true" />
                  <span className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-white font-display text-xs font-black text-navy">3</span>
                </span>
                <div>
                  <h2 id="bolsa-atleta-titulo" className="font-display text-[1.35rem] leading-tight font-black text-white">Programa Bolsa Atleta</h2>
                  <p className="mt-1 text-[15px] leading-relaxed text-blue-100/85">
                    Talento no esporte, compromisso na escola. Bolsas de <strong className="text-gold-300">até 80%</strong> — a comissão avaliadora define a categoria.
                  </p>
                </div>
              </header>

              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {athleteTiers.map((tier) => (
                  <li key={tier.name} className="rounded-2xl border border-white/12 bg-white/6 p-4 backdrop-blur">
                    <p className="text-[11px] font-bold tracking-widest text-blue-100/70 uppercase">{tier.tag}</p>
                    <p className="mt-1 font-display text-3xl leading-none font-black text-gold-300">{tier.percent}</p>
                    <p className="mt-1.5 font-display leading-tight font-extrabold text-white">{tier.name}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-blue-100/75">{tier.note}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-col items-center gap-5 rounded-2xl border border-gold/30 bg-gold/8 p-4 sm:flex-row">
                <QrCode src="/qr/qr-atletas.svg" alt="QR Code para a pré-candidatura do Programa Bolsa Atleta" />
                <div className="text-center sm:text-left">
                  <p className="font-display text-xs font-black tracking-widest text-gold-300 uppercase">Inscrições abertas</p>
                  <p className="mt-1 font-display text-lg leading-tight font-black text-white">Faça a pré-candidatura em atletas.cppem.com.br</p>
                  <p className="mt-1 text-sm leading-relaxed text-blue-100/80">
                    Preenchida pelo responsável legal. A inscrição não garante a bolsa.
                  </p>
                  <a href={ATHLETES_URL} target="_blank" rel="noopener noreferrer" className="btn-gold mt-3 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-sm font-black">
                    Inscrever atleta
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </section>

            <InfoBlock id="plataformas" step={4} icon={MonitorPlay} title="Plataformas de estudo e acompanhamento" lead="Ferramentas digitais que apoiam as aulas e aproximam a família da vida escolar.">
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

            {/* Valores: sem preço na página; quem quer saber o valor conversa com a equipe */}
            <section id="valores" aria-labelledby="valores-titulo" className="surface-night scroll-mt-28 overflow-hidden rounded-[1.75rem] p-5 shadow-[0_24px_50px_-26px_rgb(6_22_58/0.9)] sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <span className="relative grid size-13 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-gold-300 to-gold-600 text-navy-950 shadow-[0_0_24px_rgb(242_176_30/0.55)]">
                  <HandCoins size={26} aria-hidden="true" />
                  <span className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-white font-display text-xs font-black text-navy">5</span>
                </span>
                <div className="flex-1">
                  <h2 id="valores-titulo" className="font-display text-[1.35rem] leading-tight font-black text-white">Valores e condições</h2>
                  <p className="mt-1 text-[15px] leading-relaxed text-blue-100/85">
                    Mensalidade, bolsas de <strong className="text-gold-300">até {MAX_SCHOLARSHIP}%</strong>, material didático e farda são apresentados pela equipe de matrículas, de acordo com a série do aluno.
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a href={whatsappValues} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 font-display font-black">
                  <WhatsappIcon size={20} />
                  Receber valores pelo WhatsApp
                </a>
                <a href="#inscricao" className="rounded-full border border-white/25 bg-white/5 px-6 py-3 font-display font-extrabold text-white transition-colors hover:border-blue-400 hover:bg-blue-500/20 lg:hidden">
                  Preencher a inscrição
                </a>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-blue-100/65">Bolsas sujeitas à análise, critérios institucionais e disponibilidade de vagas.</p>
            </section>

            <InfoBlock id="passos" step={6} icon={Footprints} title="Como garantir a vaga">
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

              <div className="mt-5 flex flex-col items-center gap-5 rounded-2xl bg-linear-to-br from-blue-600 to-navy p-5 sm:flex-row">
                <QrCode src="/qr/qr-whatsapp.svg" alt="QR Code para o WhatsApp da equipe de matrículas" />
                <div className="text-center sm:text-left">
                  <p className="font-display text-lg leading-tight font-black text-white">Prefere conversar?</p>
                  <p className="mt-1 text-sm text-blue-100/85">Escaneie e fale com a equipe de matrículas, ou toque no botão.</p>
                  <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                    <a href={whatsappVisit} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-sm font-black">
                      <WhatsappIcon size={18} />
                      Agendar visita
                    </a>
                  </div>
                </div>
              </div>

              <a href={NEW_CAMPUS_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline">
                <MapPin size={16} aria-hidden="true" />
                Conheça a estrutura da nova sede
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </InfoBlock>

            <InfoBlock id="duvidas" step={7} icon={CircleHelp} title="Perguntas frequentes">
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
