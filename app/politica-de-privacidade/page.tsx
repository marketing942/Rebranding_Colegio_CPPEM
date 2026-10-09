import { CalendarDays, Mail, ShieldCheck } from "lucide-react";
import { LightOrbs } from "@/components/home/light-orbs";
import { WhatsappIcon } from "@/components/layout/brand-icons";
import { JsonLd } from "@/components/seo/json-ld";
import { PRIVACY_POLICY_UPDATED, privacyPolicy, type PolicyBlock, type PolicySpan } from "@/lib/privacy-policy";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { slugify } from "@/lib/news";
import { siteConfig, whatsappUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Política de Privacidade",
  description: `Como a ${siteConfig.legalName} trata os dados pessoais de alunos, responsáveis e visitantes do site do Colégio CPPEM, conforme a LGPD.`,
  path: "/politica-de-privacidade",
});

// Canais de privacidade informados na própria política (seção 19).
const PRIVACY_EMAIL = "pedagogico@cppem.com.br";
const PRIVACY_WHATSAPP = { display: "(81) 97310-5354", e164: "+5581973105354" };

const headings = privacyPolicy.filter((block): block is Extract<PolicyBlock, { type: "heading" }> => block.type === "heading" && block.level === 2);

function Spans({ spans }: { spans: PolicySpan[] }) {
  return spans.map((span, index) =>
    span.bold ? (
      <strong key={index} className="font-bold text-navy">{span.text}</strong>
    ) : (
      <span key={index}>{span.text}</span>
    ),
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Política de Privacidade", path: "/politica-de-privacidade" }])} />

      <section className="surface-night overflow-hidden">
        <LightOrbs />
        <div className="mx-auto max-w-5xl px-4 pt-10 pb-12 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-display text-xs font-black tracking-wider text-gold-300 uppercase">
            <ShieldCheck size={14} aria-hidden="true" />
            LGPD
          </span>
          <h1 className="mt-4 font-display text-[clamp(2rem,4.8vw,3.4rem)] leading-[1.05] font-black text-white">
            Política de <span className="bg-linear-to-r from-gold-300 via-gold to-gold-300 bg-clip-text text-transparent">Privacidade</span>
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-blue-100/85">
            Como a {siteConfig.legalName} cuida dos dados de alunos, responsáveis e visitantes, de acordo com a Lei Geral de Proteção de Dados.
          </p>
          <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-100/80">
            <CalendarDays size={16} aria-hidden="true" />
            Atualizada em {PRIVACY_POLICY_UPDATED}
          </p>
        </div>
        <div className="gold-line" aria-hidden="true" />
      </section>

      <section className="surface-day pt-10 pb-20 lg:pt-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start lg:gap-12 lg:px-8">
          {/* índice: fixo ao lado no computador, recolhível no celular */}
          <aside className="lg:sticky lg:top-24">
            <details className="group rounded-3xl bg-white p-5 shadow-[0_18px_44px_-28px_rgb(16_48_122/0.55)] ring-1 ring-blue-100 lg:hidden">
              <summary className="cursor-pointer list-none font-display font-black text-navy [&::-webkit-details-marker]:hidden">Nesta página</summary>
              <PolicyIndex />
            </details>
            <nav aria-label="Seções da política" className="hidden max-h-[calc(100dvh-8rem)] overflow-y-auto rounded-3xl bg-white p-5 shadow-[0_18px_44px_-28px_rgb(16_48_122/0.55)] ring-1 ring-blue-100 lg:block">
              <p className="font-display text-xs font-black tracking-widest text-blue-600 uppercase">Nesta página</p>
              <PolicyIndex />
            </nav>
          </aside>

          <article className="min-w-0 rounded-[1.75rem] bg-white p-6 shadow-[0_18px_44px_-28px_rgb(16_48_122/0.55)] ring-1 ring-blue-100 sm:p-9">
            <div className="space-y-4 text-[1.0625rem] leading-relaxed text-foreground">
              {privacyPolicy.map((block, index) => {
                if (block.type === "heading") {
                  return block.level === 2 ? (
                    <h2 key={index} id={slugify(block.text)} className="scroll-mt-28 border-l-4 border-gold pt-1 pl-4 font-display text-2xl leading-tight font-black text-navy not-first:mt-10">
                      {block.text}
                    </h2>
                  ) : (
                    <h3 key={index} className="pt-3 font-display text-xl leading-tight font-black text-navy">{block.text}</h3>
                  );
                }
                if (block.type === "paragraph") {
                  return (
                    <p key={index} className="whitespace-pre-line"><Spans spans={block.spans} /></p>
                  );
                }
                if (block.type === "list") {
                  return (
                    <ul key={index} className="list-disc space-y-2 pl-6 marker:text-gold-700">
                      {block.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="pl-1"><Spans spans={item} /></li>
                      ))}
                    </ul>
                  );
                }
                return (
                  // tabela larga: rola de lado no celular, sem empurrar a página
                  <div key={index} className="overflow-x-auto rounded-2xl ring-1 ring-blue-100">
                    <table className="w-full min-w-176 border-collapse text-left text-[0.95rem]">
                      <thead>
                        <tr className="bg-navy text-white">
                          {block.head.map((cell) => (
                            <th key={cell} scope="col" className="px-4 py-3 font-display font-black">{cell}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows.map((row, rowIndex) => (
                          <tr key={rowIndex} className="border-t border-blue-100 align-top odd:bg-blue-50/50">
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className={`px-4 py-3 ${cellIndex === 0 ? "font-bold text-navy" : ""}`}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>

            {/* atalho para exercer os direitos: os mesmos canais da seção 19 */}
            <aside className="surface-night mt-10 overflow-hidden rounded-[1.5rem] p-6 sm:p-7">
              <p className="font-display text-xs font-black tracking-widest text-gold-300 uppercase">Seus direitos</p>
              <p className="mt-1 font-display text-xl leading-tight font-black text-white">Quer consultar, corrigir ou excluir seus dados?</p>
              <p className="mt-2 text-blue-100/85">Escreva com o assunto “Privacidade/LGPD”. Não envie senha nem dados de cartão.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={`mailto:${PRIVACY_EMAIL}?subject=${encodeURIComponent("Privacidade/LGPD")}`} className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 font-display font-black">
                  <Mail size={18} aria-hidden="true" />
                  {PRIVACY_EMAIL}
                </a>
                <a
                  href={whatsappUrl(PRIVACY_WHATSAPP.e164, "Olá! Tenho uma solicitação sobre privacidade/LGPD.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 font-display font-extrabold text-white transition-colors hover:border-gold hover:text-gold-300"
                >
                  <WhatsappIcon size={18} />
                  {PRIVACY_WHATSAPP.display}
                </a>
              </div>
            </aside>
          </article>
        </div>
      </section>
    </>
  );
}

function PolicyIndex() {
  return (
    <ol className="mt-3 space-y-1.5 text-sm">
      {headings.map((heading) => (
        <li key={heading.text}>
          <a href={`#${slugify(heading.text)}`} className="block rounded-lg px-2 py-1 leading-snug font-bold text-muted transition-colors hover:bg-blue-50 hover:text-navy">
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );
}
