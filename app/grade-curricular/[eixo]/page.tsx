import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight, Sparkles, Star } from "lucide-react";
import { AxisCircle, curriculumIcons, curriculumTones, TopicPhotos } from "@/components/curriculum/curriculum-visuals";
import { LightOrbs } from "@/components/home/light-orbs";
import { JsonLd } from "@/components/seo/json-ld";
import { curriculum, findAxis } from "@/lib/curriculum";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { ENROLL_HREF } from "@/lib/site";

type PageProps = { params: Promise<{ eixo: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return curriculum.map((axis) => ({ eixo: axis.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const axis = findAxis((await params).eixo);
  if (!axis) return {};
  return pageMetadata({ title: `${axis.title} — Grade curricular do Colégio CPPEM`, description: axis.summary, path: `/grade-curricular/${axis.id}` });
}

export default async function AxisPage({ params }: PageProps) {
  const axis = findAxis((await params).eixo);
  if (!axis) notFound();
  const tone = curriculumTones[axis.tone];
  const index = curriculum.findIndex((item) => item.id === axis.id);
  const next = curriculum[(index + 1) % curriculum.length];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Grade curricular", path: "/grade-curricular" }, { name: axis.title, path: `/grade-curricular/${axis.id}` }])} />

      {/* ---------- topo ---------- */}
      <section className="surface-night overflow-hidden">
        <LightOrbs />
        <div className="mx-auto max-w-6xl px-4 pt-6 pb-14 sm:px-6 lg:px-8 lg:pb-16">
          <nav aria-label="Trilha" className="flex flex-wrap items-center gap-1.5 text-sm text-blue-100/70">
            <Link href="/" className="hover:text-gold-300">Início</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href="/grade-curricular" className="hover:text-gold-300">Grade curricular</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="font-bold text-white">{axis.title}</span>
          </nav>

          <div className="mt-10 grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-display text-xs font-black tracking-wider text-gold-300 uppercase">
                Eixo {axis.number}
              </span>
              <h1 className="mt-5 font-display text-[clamp(2.2rem,5.4vw,4rem)] leading-[1.02] font-black text-white">{axis.title}</h1>
              <p className="mt-3 font-display text-xl font-extrabold text-gold">{axis.tagline}</p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-blue-100/90">{axis.summary}</p>
            </div>
            <AxisCircle tone={axis.tone} icon={axis.icon} number={axis.number} className="mx-auto w-[min(60vw,15rem)]" />
          </div>

          {/* troca de eixo */}
          <nav aria-label="Outros eixos" className="mt-12 flex flex-wrap gap-2">
            {curriculum.map((item) => {
              const current = item.id === axis.id;
              return (
                <Link
                  key={item.id}
                  href={`/grade-curricular/${item.id}`}
                  aria-current={current ? "page" : undefined}
                  className={`rounded-full px-4 py-2 font-display text-sm font-extrabold transition-colors ${current ? "bg-white text-navy" : "border border-white/20 text-white/85 hover:border-gold hover:text-gold-300"}`}
                >
                  {item.number} · {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="gold-line" aria-hidden="true" />
      </section>

      <section className="surface-day py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {axis.differential && (
            <div className="surface-night flex flex-col gap-4 overflow-hidden rounded-[1.75rem] p-6 shadow-[0_24px_50px_-26px_rgb(6_22_58/0.9)] sm:flex-row sm:items-center sm:p-8">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-gold-300 to-gold-600 text-navy-950 shadow-[0_0_24px_rgb(242_176_30/0.5)]">
                <Sparkles size={28} aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-xl leading-tight font-black text-white">{axis.differential.title}</h2>
                <p className="mt-1.5 leading-relaxed text-blue-100/90">{axis.differential.text}</p>
              </div>
            </div>
          )}

          {/* Disciplinas comuns: lista de matérias */}
          {axis.subjects && (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {axis.subjects.map((subject) => (
                <li key={subject} className={`flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-[0_14px_30px_-24px_rgb(16_48_122/0.6)] ring-1 ${tone.soft}`}>
                  <Star size={16} className="shrink-0 fill-gold text-gold" aria-hidden="true" />
                  <span className="font-display leading-tight font-black text-navy">{subject}</span>
                </li>
              ))}
            </ul>
          )}

          {/* tópicos do eixo: texto de um lado, fotos do outro, alternando */}
          <div className="mt-12 space-y-16 first:mt-0">
            {axis.topics.map((topic, topicIndex) => {
              const Icon = curriculumIcons[topic.icon];
              const flipped = topicIndex % 2 === 1;
              return (
                <article key={topic.id} id={topic.id} className="grid scroll-mt-24 items-center gap-8 lg:grid-cols-2 lg:gap-12">
                  <div className={flipped ? "lg:order-2" : undefined}>
                    <span className={`grid size-14 place-items-center rounded-2xl bg-linear-to-br text-white shadow-[0_10px_22px_-10px_rgb(16_48_122/0.8)] ${tone.circle}`}>
                      <Icon size={28} aria-hidden="true" />
                    </span>
                    <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-tight font-black text-navy">{topic.title}</h2>
                    {topic.text.map((paragraph) => (
                      <p key={paragraph} className="mt-3 text-lg leading-relaxed text-foreground">
                        {paragraph}
                      </p>
                    ))}
                    {topic.highlights && (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {topic.highlights.map((item) => (
                          <li key={item} className={`rounded-full px-4 py-1.5 font-display text-sm font-extrabold text-navy ring-1 ${tone.soft}`}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className={flipped ? "lg:order-1" : undefined}>
                    <TopicPhotos photos={topic.photos} slots={topic.photoSlots} tone={axis.tone} />
                  </div>
                </article>
              );
            })}
          </div>

          {/* navegação final */}
          <div className="mt-16 flex flex-col gap-3 border-t border-blue-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/grade-curricular" className="inline-flex items-center gap-2 font-display font-black text-blue-600 hover:text-blue-700">
              <ArrowLeft size={18} aria-hidden="true" />
              Todos os eixos
            </Link>
            <div className="flex flex-wrap gap-3">
              <Link href={`/grade-curricular/${next.id}`} className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-display font-extrabold text-navy ring-1 ring-blue-200 hover:ring-blue-400">
                Próximo: {next.title}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href={ENROLL_HREF} className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 font-display font-black">
                Matricule-se
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
