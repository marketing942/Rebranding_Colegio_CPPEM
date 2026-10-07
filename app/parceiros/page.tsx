import { ArrowRight, Building2, GraduationCap, Handshake, Send, ShieldCheck, Sparkles, Store } from "lucide-react";
import { LightOrbs } from "@/components/home/light-orbs";
import { PartnerDirectory } from "@/components/partners/partner-directory";
import { PartnerForm } from "@/components/partners/partner-form";
import { JsonLd } from "@/components/seo/json-ld";
import { CORPORATE_HREF, corporateBenefits } from "@/lib/corporate";
import { getPartners } from "@/lib/notion/partners";
import { partnerCategories } from "@/lib/partners";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Parceiros do Colégio CPPEM — benefícios para as famílias",
  description: "Conheça as empresas parceiras do Colégio CPPEM, em Caruaru-PE, e os benefícios para as famílias. Empresas também podem oferecer bolsa de estudo para os filhos dos funcionários.",
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

      {/* ---------- topo: duas portas claras (família e empresa) ---------- */}
      <section className="surface-night overflow-hidden">
        <LightOrbs />
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-display text-xs font-black tracking-wider text-gold-300 uppercase">
              <Handshake size={14} aria-hidden="true" />
              Parceiros CPPEM
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.04] font-black text-white">
              Benefícios para famílias <span className="bg-linear-to-r from-gold-300 via-gold to-gold-300 bg-clip-text text-transparent">e para empresas.</span>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-blue-100/90">Escolha o que você procura:</p>
          </div>

          <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2 md:gap-5">
            {/* família primeiro: é quem chega pelo menu */}
            <a
              href="#rede"
              className="group flex flex-col rounded-[1.75rem] border border-white/15 bg-white/8 p-6 text-white backdrop-blur transition-[transform,background-color] hover:-translate-y-1 hover:bg-white/12 sm:p-7"
            >
              <span className="grid size-14 place-items-center rounded-2xl bg-linear-to-br from-blue-400 to-blue-700 text-white">
                <GraduationCap size={28} aria-hidden="true" />
              </span>
              <p className="mt-5 font-display text-sm font-black tracking-widest text-gold-300 uppercase">Sou família CPPEM</p>
              <h2 className="mt-1 font-display text-2xl leading-tight font-black sm:text-[1.7rem]">Descontos nas empresas parceiras</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-blue-100/85">Saúde, comércio e serviços em Caruaru com condições especiais para alunos e famílias.</p>
              <span className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 font-display font-black transition-colors group-hover:border-gold group-hover:text-gold-300 md:mt-auto">
                Ver parceiros
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </a>

            {/* empresa: mesmo peso visual, com o dourado na borda e no botão */}
            <a
              href={CORPORATE_HREF}
              className="group flex flex-col rounded-[1.75rem] border border-gold/60 bg-navy-950/60 p-6 text-white shadow-[0_0_40px_-12px_rgb(242_176_30/0.45)] backdrop-blur transition-[transform,border-color] hover:-translate-y-1 hover:border-gold sm:p-7"
            >
              <span className="grid size-14 place-items-center rounded-2xl bg-linear-to-br from-gold-300 to-gold-600 text-navy-950">
                <Building2 size={28} aria-hidden="true" />
              </span>
              <p className="mt-5 font-display text-sm font-black tracking-widest text-gold-300 uppercase">Sou empresa</p>
              <h2 className="mt-1 font-display text-2xl leading-tight font-black sm:text-[1.7rem]">Bolsa de estudo para os filhos dos meus funcionários</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-blue-100/85">Ofereça à sua equipe um benefício que faz diferença na vida da família.</p>
              <span className="btn-gold mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display font-black md:mt-auto">
                Cadastrar minha empresa
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </a>
          </div>

          <p className="mt-6 text-center text-sm text-blue-100/75">
            Tem um negócio e quer oferecer desconto às famílias?{" "}
            <a href="#seja-parceiro" className="inline-flex items-center gap-1 font-bold text-gold-300 underline-offset-4 hover:underline">
              <Store size={15} aria-hidden="true" />
              Quero ser parceiro
            </a>
          </p>
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

      {/* ---------- para empresas: chamada para a página do convênio ---------- */}
      <section id="empresas" className="scroll-mt-20 bg-linear-to-br from-gold-300 via-gold to-gold-600 py-12 sm:py-14">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 font-display text-sm font-black tracking-widest text-navy-950/70 uppercase">
              <Building2 size={16} aria-hidden="true" />
              Convênio para empresas
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.7rem,3.6vw,2.6rem)] leading-tight font-black text-navy-950">
              Sua empresa pode dar bolsa de estudo para os filhos dos funcionários.
            </h2>
            <a href={CORPORATE_HREF} className="group mt-6 inline-flex items-center gap-2 rounded-full bg-navy-950 px-7 py-4 font-display text-lg font-black text-white transition-colors hover:bg-navy">
              Quero bolsas para minha equipe
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
          <ul className="grid gap-3">
            {corporateBenefits.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-start gap-3.5 rounded-2xl bg-white/85 p-4 shadow-[0_14px_30px_-24px_rgb(16_48_122/0.6)]">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-navy-950 text-gold-300">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span>
                  <strong className="block font-display leading-tight font-black text-navy">{title}</strong>
                  <span className="mt-0.5 block text-sm leading-snug text-muted">{text}</span>
                </span>
              </li>
            ))}
          </ul>
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
