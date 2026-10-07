import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AxisCircle, curriculumTones } from "@/components/curriculum/curriculum-visuals";
import { LightOrbs } from "@/components/home/light-orbs";
import { JsonLd } from "@/components/seo/json-ld";
import { curriculum } from "@/lib/curriculum";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { ENROLL_HREF } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Grade curricular — Colégio CPPEM em Caruaru",
  description: "Conheça a grade curricular do Colégio CPPEM: foco em concursos, empreendedorismo, todas as disciplinas da base comum e formação cristã, do Fundamental 1 ao Ensino Médio.",
  path: "/grade-curricular",
});

export default function CurriculumPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Grade curricular", path: "/grade-curricular" }])} />

      {/* ---------- topo ---------- */}
      <section className="surface-night overflow-hidden">
        <LightOrbs />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-display text-xs font-black tracking-wider text-gold-300 uppercase">
              Grade curricular
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.1rem,5vw,3.7rem)] leading-[1.04] font-black text-white">
              Muito além do conteúdo: <span className="bg-linear-to-r from-gold-300 via-gold to-gold-300 bg-clip-text text-transparent">uma formação completa.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-blue-100/90">
              Além de todas as disciplinas da base comum, o CPPEM forma para concursos, para empreender e para a vida com fé. São quatro eixos que caminham juntos, do Fundamental 1 ao Ensino Médio.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#eixos" className="btn-gold inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display font-black">
                Conhecer os eixos
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <Link href={ENROLL_HREF} className="rounded-full border border-white/25 bg-white/5 px-7 py-3.5 font-display font-extrabold text-white backdrop-blur transition-colors hover:border-blue-400 hover:bg-blue-500/20">
                Matricule-se
              </Link>
            </div>
          </div>

          {/* os quatro círculos em constelação, ligados ao respectivo eixo */}
          <ul className="mx-auto grid w-full max-w-md grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10">
            {curriculum.map((axis, index) => (
              <li key={axis.id} className={index % 2 === 1 ? "translate-y-8" : ""}>
                <Link href={`/grade-curricular/${axis.id}`} className="group block text-center">
                  <AxisCircle tone={axis.tone} icon={axis.icon} number={axis.number} className="mx-auto w-[min(34vw,9.5rem)] transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:scale-105" />
                  <span className="mt-4 block font-display text-sm leading-tight font-black text-white">{axis.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="gold-line" aria-hidden="true" />
      </section>

      {/* ---------- os quatro eixos ---------- */}
      <section id="eixos" className="scroll-mt-24 bg-linear-to-b from-blue-50 via-white to-blue-50 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-sm font-extrabold tracking-widest text-blue-600 uppercase">Os quatro eixos</p>
            <h2 className="mt-1 font-display text-[clamp(1.8rem,3.8vw,2.9rem)] leading-tight font-black text-navy">
              Toque em um eixo para <span className="text-gold-700">ver tudo o que ele inclui.</span>
            </h2>
          </div>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {curriculum.map((axis) => (
              <li key={axis.id}>
                <Link
                  href={`/grade-curricular/${axis.id}`}
                  className="group flex h-full flex-col items-center rounded-[1.75rem] bg-white px-5 pt-8 pb-6 text-center shadow-[0_18px_44px_-28px_rgb(16_48_122/0.6)] ring-1 ring-blue-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_55px_-26px_rgb(16_48_122/0.7)] hover:ring-blue-300"
                >
                  <AxisCircle tone={axis.tone} icon={axis.icon} number={axis.number} className="w-36 transition-transform duration-300 group-hover:scale-105" />
                  <p className={`mt-6 font-display text-xs font-black tracking-widest uppercase ${curriculumTones[axis.tone].text}`}>Eixo {axis.number}</p>
                  <h3 className="mt-1 font-display text-xl leading-tight font-black text-navy">{axis.title}</h3>
                  <p className="mt-1 font-display text-sm font-extrabold text-muted">{axis.tagline}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{axis.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-black text-blue-600 group-hover:text-blue-700">
                    Ver detalhes
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
