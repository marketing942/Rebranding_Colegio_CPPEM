import { Handshake, ShieldCheck, Sparkles, Send } from "lucide-react";
import { LightOrbs } from "@/components/home/light-orbs";
import { PartnerDirectory } from "@/components/partners/partner-directory";
import { PartnerForm } from "@/components/partners/partner-form";
import { JsonLd } from "@/components/seo/json-ld";
import { getPartners } from "@/lib/notion/partners";
import { partnerCategories } from "@/lib/partners";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Parceiros do Colégio CPPEM — benefícios para as famílias",
  description: "Conheça as empresas parceiras do Colégio CPPEM, em Caruaru-PE, e os benefícios para alunos e famílias. Sua empresa também pode fazer parte da rede.",
  path: "/parceiros",
});

// acompanha o cache do Notion: parceiro marcado como Ativo aparece em até 5 min
export const revalidate = 300;

const steps = [
  { icon: Send, title: "Proposta", text: "Você apresenta a empresa e o benefício." },
  { icon: ShieldCheck, title: "Análise", text: "Nossa equipe avalia a parceria e as condições." },
  { icon: Sparkles, title: "Publicação", text: "Parceiros aprovados entram na rede, nesta página." },
];

export default async function PartnersPage() {
  const partners = await getPartners();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Parceiros", path: "/parceiros" }])} />

      {/* ---------- topo ---------- */}
      <section className="surface-night overflow-hidden">
        <LightOrbs />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr] lg:px-8 lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-display text-xs font-black tracking-wider text-gold-300 uppercase">
              Rede de parceiros
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.04] font-black text-white">
              Benefícios para toda a <span className="bg-linear-to-r from-gold-300 via-gold to-gold-300 bg-clip-text text-transparent">família CPPEM.</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-blue-100/90">
              Empresas de Caruaru que oferecem condições especiais para os alunos e as famílias do colégio.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#rede" className="btn-gold rounded-full px-7 py-3.5 font-display font-black">Ver parceiros</a>
              <a href="#seja-parceiro" className="rounded-full border border-white/25 bg-white/5 px-7 py-3.5 font-display font-extrabold text-white backdrop-blur transition-colors hover:border-blue-400 hover:bg-blue-500/20">
                Quero ser parceiro
              </a>
            </div>
          </div>
          <div className="relative mx-auto hidden size-60 md:grid md:place-items-center">
            <span className="absolute inset-[-12%] rounded-full bg-[radial-gradient(circle,rgb(242_176_30/0.35),rgb(47_127_240/0.3)_50%,transparent_72%)] blur-2xl" aria-hidden="true" />
            <span className="pillar-spin absolute inset-0 rounded-full border-2 border-dashed border-gold/40" aria-hidden="true" />
            <span className="pillar-float-slow relative grid size-36 place-items-center rounded-full bg-linear-to-br from-gold-300 via-gold to-gold-600 text-navy-950 shadow-[0_0_40px_rgb(242_176_30/0.5)]">
              <Handshake size={64} aria-hidden="true" />
            </span>
          </div>
        </div>
        <div className="gold-line" aria-hidden="true" />
      </section>

      {/* ---------- diretório ---------- */}
      <section id="rede" className="scroll-mt-24 bg-linear-to-b from-blue-50 via-white to-blue-50 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="border-l-4 border-gold pl-4">
            <p className="font-display text-sm font-extrabold tracking-widest text-blue-600 uppercase">Nossa rede</p>
            <h2 className="mt-1 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] leading-tight font-black text-navy uppercase">Encontre o benefício certo</h2>
          </div>
          <div className="mt-8">
            <PartnerDirectory partners={partners} categories={partnerCategories} />
          </div>
        </div>
      </section>

      {/* ---------- seja parceiro ---------- */}
      <section id="seja-parceiro" className="surface-night scroll-mt-20 overflow-hidden py-14 sm:py-20">
        <LightOrbs />
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="font-display text-sm font-extrabold tracking-widest text-gold-300 uppercase">Faça parte da rede</p>
            <h2 className="mt-1 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] leading-tight font-black text-white">
              Sua empresa perto de <span className="text-gold">centenas de famílias.</span>
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-blue-100/85">
              Envie sua proposta uma vez. Nossa equipe avalia a parceria antes de publicar.
            </p>
            <ol className="mt-7 space-y-3">
              {steps.map(({ icon: Icon, title, text }, index) => (
                <li key={title} className="flex items-center gap-4 rounded-2xl border border-white/12 bg-white/6 p-4 backdrop-blur">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-linear-to-br from-gold-300 to-gold-600 text-navy-950">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span>
                    <strong className="block font-display leading-tight font-black text-white">{String(index + 1).padStart(2, "0")} · {title}</strong>
                    <span className="block text-sm text-blue-100/80">{text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_30px_70px_-30px_rgb(0_0_0/0.7)]">
            <div className="surface-night px-6 py-5">
              <p className="font-display text-xs font-black tracking-widest text-gold-300 uppercase">Pré-cadastro</p>
              <h3 className="mt-1 font-display text-2xl leading-tight font-black text-white">Quero ser parceiro</h3>
            </div>
            <div className="gold-line" aria-hidden="true" />
            <PartnerForm />
          </div>
        </div>
      </section>
    </>
  );
}
