import Image from "next/image";
import { Building2, ChevronDown, ShieldCheck } from "lucide-react";
import { LightOrbs } from "@/components/home/light-orbs";
import { CorporateForm } from "@/components/partners/corporate-form";
import { JsonLd } from "@/components/seo/json-ld";
import { corporateBenefits, corporateFaqs, corporateSteps } from "@/lib/corporate";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

/*
 * Página de destino do convênio empresarial, feita para tráfego pago:
 * a promessa e o formulário ficam no primeiro quadro, sem menu de escolhas no meio.
 */
export const metadata = pageMetadata({
  title: "Bolsa de estudo para os filhos dos seus funcionários — Colégio CPPEM",
  description: "Convênio empresarial do Colégio CPPEM, em Caruaru-PE: sua empresa oferece aos colaboradores bolsa de estudo para os filhos, do Fundamental ao Ensino Médio. Cadastre a empresa.",
  path: "/empresas",
});

export default function CompaniesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Para empresas", path: "/empresas" }])} />
      <JsonLd data={faqJsonLd(corporateFaqs)} />

      {/* ---------- topo: promessa + formulário ---------- */}
      <section className="surface-night overflow-hidden">
        <LightOrbs />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:px-8 lg:py-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-1.5 font-display text-xs font-black tracking-wider text-navy-950 uppercase shadow-[0_0_24px_rgb(242_176_30/0.45)]">
              <Building2 size={14} aria-hidden="true" />
              Convênio para empresas
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.04] font-black text-white">
              Bolsa de estudo para os{" "}
              <span className="bg-linear-to-r from-gold-300 via-gold to-gold-300 bg-clip-text text-transparent">filhos dos seus funcionários.</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-blue-100/90">
              Ofereça à sua equipe um benefício que faz diferença na vida da família: educação cristã, disciplina e preparação para o futuro no {siteConfig.name}, em Caruaru.
            </p>

            {/* no celular o formulário fica abaixo da dobra: atalho direto para ele */}
            <a href="#cadastro" className="btn-gold mt-6 flex items-center justify-center gap-2 rounded-full px-7 py-4 font-display text-lg font-black lg:hidden">
              <Building2 size={20} aria-hidden="true" />
              Cadastrar minha empresa
            </a>

            <ul className="mt-7 space-y-3">
              {corporateBenefits.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex items-start gap-3.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-gold-300 to-gold-600 text-navy-950">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span>
                    <strong className="block font-display leading-tight font-black text-white">{title}</strong>
                    <span className="block text-sm text-blue-100/80">{text}</span>
                  </span>
                </li>
              ))}
            </ul>

            <a href="#como-funciona" className="mt-8 hidden items-center gap-1.5 text-sm font-bold text-blue-100/75 hover:text-gold-300 lg:inline-flex">
              Como funciona
              <ChevronDown size={16} aria-hidden="true" />
            </a>
          </div>

          <div id="cadastro" className="scroll-mt-24 overflow-hidden rounded-[1.75rem] bg-white shadow-[0_30px_70px_-30px_rgb(0_0_0/0.75)] ring-2 ring-gold/60">
            <div className="bg-linear-to-br from-gold-300 via-gold to-gold-600 px-6 py-5">
              <p className="font-display text-xs font-black tracking-widest text-navy-950/70 uppercase">Cadastre sua empresa</p>
              <h2 className="mt-1 font-display text-2xl leading-tight font-black text-navy-950">Quero bolsas para minha equipe</h2>
              <p className="mt-1 text-sm font-bold text-navy-950/75">Leva cerca de 1 minuto. Sem compromisso.</p>
            </div>
            <CorporateForm />
          </div>
        </div>
        <div className="gold-line" aria-hidden="true" />
      </section>

      {/* ---------- como funciona ---------- */}
      <section id="como-funciona" className="surface-day scroll-mt-20 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-sm font-extrabold tracking-widest text-blue-600 uppercase">Como funciona</p>
            <h2 className="mt-1 font-display text-[clamp(1.8rem,3.8vw,2.7rem)] leading-tight font-black text-navy">
              Três passos até a <span className="text-gold-700">bolsa da sua equipe.</span>
            </h2>
          </div>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {corporateSteps.map((step, index) => (
              <li key={step.title} className="relative rounded-3xl bg-white p-6 pt-9 shadow-[0_18px_40px_-28px_rgb(16_48_122/0.6)] ring-1 ring-blue-100">
                <span className="btn-gold absolute -top-4 left-6 grid size-10 place-items-center rounded-full font-display text-lg font-black">{index + 1}</span>
                <h3 className="font-display text-xl leading-tight font-black text-navy">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div className="flex items-center gap-5 rounded-3xl bg-white p-6 shadow-[0_18px_40px_-28px_rgb(16_48_122/0.6)] ring-1 ring-blue-100">
              <Image src="/logo-cppem.png" alt={siteConfig.name} width={96} height={96} className="size-20 shrink-0 object-contain" />
              <div>
                <p className="font-display font-black text-navy">{siteConfig.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{siteConfig.shortDescription}</p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600">
                  <ShieldCheck size={14} aria-hidden="true" />
                  {siteConfig.accreditation}
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {corporateFaqs.map((faq) => (
                <details key={faq.question} className="group rounded-2xl bg-white ring-1 ring-blue-100 open:shadow-[0_14px_30px_-22px_rgb(16_48_122/0.6)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display leading-tight font-black text-navy [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <ChevronDown size={18} className="shrink-0 text-blue-600 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="px-5 pb-4 text-[15px] leading-relaxed text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <a href="#cadastro" className="btn-gold inline-flex items-center gap-2 rounded-full px-8 py-4 font-display text-lg font-black">
              <Building2 size={20} aria-hidden="true" />
              Cadastrar minha empresa
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
