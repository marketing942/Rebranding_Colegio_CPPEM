import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, MapPin, ShieldCheck } from "lucide-react";
import { LightOrbs } from "@/components/home/light-orbs";
import { VideoSection } from "@/components/home/video-section";
import { JsonLd } from "@/components/seo/json-ld";
import { InstagramSection } from "@/components/shared/instagram-section";
import { LeadershipSection } from "@/components/shared/leadership-section";
import { StudentsSection } from "@/components/shared/students-section";
import { pillars } from "@/lib/pillars";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { ENROLL_HREF, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Sobre o Colégio CPPEM — escola cristã e militarizada em Caruaru",
  description: "Conheça o Colégio CPPEM, em Caruaru-PE: os quatro pilares (Fé Cristã, Disciplina, Estabilidade e Liberdade), a equipe diretiva e o dia a dia dos alunos.",
  path: "/sobre",
});

const facts = [
  { icon: GraduationCap, title: "Do 1º ano ao 3º do Médio", text: "Ensino Fundamental 1, Fundamental 2 e Ensino Médio." },
  { icon: MapPin, title: "Em Caruaru-PE", text: "Uma escola cristã, militarizada e preparatória." },
  { icon: ShieldCheck, title: "Credenciado", text: siteConfig.accreditation },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Sobre", path: "/sobre" }])} />
      {/* ---------- topo ---------- */}
      <section className="surface-night overflow-hidden">
        <LightOrbs />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr] lg:px-8 lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-display text-xs font-black tracking-wider text-gold-300 uppercase">
              Sobre o colégio
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.1rem,5vw,3.8rem)] leading-[1.04] font-black text-white">
              Formando líderes,{" "}
              <span className="bg-linear-to-r from-gold-300 via-gold to-gold-300 bg-clip-text text-transparent">transformando vidas.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-blue-100/90">{siteConfig.longDescription}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={ENROLL_HREF} className="btn-gold inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display font-black">
                Matricule-se
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a
                href="#pilares"
                className="rounded-full border border-white/25 bg-white/5 px-7 py-3.5 font-display font-extrabold text-white backdrop-blur transition-colors hover:border-blue-400 hover:bg-blue-500/20"
              >
                Nossos pilares
              </a>
            </div>
          </div>
          <div className="relative mx-auto hidden w-full max-w-72 md:block">
            <span className="absolute inset-[-15%] rounded-full bg-[radial-gradient(circle,rgb(242_176_30/0.35),rgb(47_127_240/0.25)_45%,transparent_70%)] blur-2xl" aria-hidden="true" />
            <Image src="/logo-cppem.png" alt="Brasão do Colégio CPPEM" width={320} height={320} priority className="relative w-full drop-shadow-[0_20px_40px_rgb(0_0_0/0.5)]" />
          </div>
        </div>

        <ul className="mx-auto grid max-w-6xl gap-3 px-4 pb-12 sm:grid-cols-3 sm:px-6 lg:px-8">
          {facts.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-3.5 rounded-2xl border border-white/12 bg-white/6 p-4 backdrop-blur">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-linear-to-br from-gold-300 to-gold-600 text-navy-950">
                <Icon size={22} aria-hidden="true" />
              </span>
              <span>
                <strong className="block font-display leading-tight font-black text-white">{title}</strong>
                <span className="mt-0.5 block text-sm leading-snug text-blue-100/80">{text}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="gold-line" aria-hidden="true" />
      </section>

      <VideoSection />

      {/* ---------- pilares em detalhe ---------- */}
      <section id="pilares" className="surface-night scroll-mt-20 overflow-hidden py-14 sm:py-20">
        <LightOrbs />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-sm font-extrabold tracking-widest text-gold-300 uppercase">Nossos pilares</p>
            <h2 className="mt-1 font-display text-[clamp(1.8rem,3.8vw,2.9rem)] leading-tight font-black text-white">
              Os quatro pilares de uma <span className="text-gold">vida bem construída.</span>
            </h2>
            <p className="mt-3 text-lg text-blue-100/85">Fé Cristã, Disciplina, Estabilidade e Liberdade: é sobre essa base que tudo no CPPEM acontece.</p>
          </div>

          <ol className="mt-12 space-y-6">
            {pillars.map((pillar, index) => {
              const flipped = index % 2 === 1;
              return (
                <li key={pillar.id} className="grid overflow-hidden rounded-4xl border border-white/12 bg-white/5 backdrop-blur md:grid-cols-[0.8fr_1.2fr]">
                  <div className={`relative aspect-4/3 md:aspect-auto md:min-h-80 ${flipped ? "md:order-2" : ""}`}>
                    {pillar.photo && <Image src={pillar.photo.src} alt={pillar.photo.alt} fill sizes="(min-width: 768px) 420px, 100vw" className="object-cover object-[50%_25%]" />}
                    <span className="btn-gold absolute top-4 left-4 grid size-12 place-items-center rounded-full font-display text-lg font-black">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className={`flex flex-col justify-center p-6 sm:p-9 ${flipped ? "md:order-1" : ""}`}>
                    <p className="font-display text-xs font-black tracking-widest text-gold-300 uppercase">Pilar {String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-1 font-display text-[clamp(1.9rem,3.6vw,2.7rem)] leading-none font-black text-white">{pillar.name}</h3>
                    <p className="mt-2 font-display text-lg font-extrabold text-gold">{pillar.tagline}</p>
                    {pillar.about.map((paragraph) => (
                      <p key={paragraph} className="mt-3 leading-relaxed text-blue-100/90">
                        {paragraph}
                      </p>
                    ))}
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {pillar.tags.map((tag) => (
                        <li key={tag} className="rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 font-display text-sm font-extrabold text-white">
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

      <StudentsSection />

      <LeadershipSection />

      <InstagramSection />
    </>
  );
}
