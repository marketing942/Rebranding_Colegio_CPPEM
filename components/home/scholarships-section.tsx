import Image from "next/image";
import { ArrowUpRight, BadgePercent } from "lucide-react";
import { ATHLETES_SITE_URL, athleteTiers, MAX_SCHOLARSHIP } from "@/lib/matriculas";
import { ENROLL_HREF } from "@/lib/site";
import Link from "next/link";

/** Faixa curta sobre bolsas, com a chamada para o site do Programa Bolsa Atleta. */
export function ScholarshipsSection() {
  return (
    <section id="bolsas" className="surface-day scroll-mt-24 pt-2 pb-16 sm:pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="surface-night grid overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-34px_rgb(6_22_58/0.9)] lg:grid-cols-[1.35fr_0.65fr]">
          <div className="p-6 sm:p-9">
            <p className="font-display text-sm font-extrabold tracking-widest text-gold-300 uppercase">Bolsas de estudo</p>
            <h2 className="mt-1 font-display text-[clamp(1.6rem,3vw,2.3rem)] leading-tight font-black text-white">
              Talento em movimento. <span className="text-gold">Caráter para toda a vida.</span>
            </h2>
            <p className="mt-3 max-w-lg leading-relaxed text-blue-100/85">
              No Programa Bolsa Atleta, desempenho esportivo, rendimento escolar e postura exemplar contam juntos. A comissão avaliadora define a categoria e o percentual.
            </p>

            <ul className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
              {athleteTiers.map((tier) => (
                <li key={tier.name} className="rounded-2xl border border-white/12 bg-white/6 px-1 py-3 text-center backdrop-blur sm:px-3">
                  <p className="font-display text-[clamp(1.2rem,2.6vw,1.7rem)] leading-none font-black text-gold-300">{tier.percent}</p>
                  <p className="mt-1.5 text-[0.62rem] leading-tight font-bold text-white sm:text-xs">{tier.name}</p>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={ATHLETES_SITE_URL} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 font-display font-black">
                Conhecer o Bolsa Atleta
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <span className="text-sm text-blue-100/70">atletas.cppem.com.br</span>
            </div>

            <p className="mt-6 flex items-start gap-2.5 border-t border-white/12 pt-5 text-sm leading-relaxed text-blue-100/85">
              <BadgePercent size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <span>
                Não é atleta? A mensalidade também tem bolsas de até {MAX_SCHOLARSHIP}%.{" "}
                <Link href={ENROLL_HREF} className="font-bold text-gold-300 underline-offset-4 hover:underline">
                  Faça a inscrição e fale com a equipe
                </Link>
                .
              </span>
            </p>
          </div>

          {/* no celular a arte aparece inteira; no desktop a coluna é alta e mostra só o corredor */}
          <div className="relative aspect-35/19 lg:aspect-auto lg:min-h-full">
            <Image
              src="/bolsas/bolsa-atleta.webp"
              alt="Programa Bolsa Atleta: talento em movimento, caráter para toda a vida. Categorias Elite, Performance e Desenvolvimento."
              fill
              sizes="(min-width: 1024px) 760px, 100vw"
              className="object-cover lg:object-right"
            />
            {/* funde a arte no painel escuro */}
            <span className="absolute inset-0 hidden bg-linear-to-r from-navy-950/80 via-transparent to-transparent lg:block" aria-hidden="true" />
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-muted">Bolsas sujeitas à análise, critérios institucionais e disponibilidade de vagas. A inscrição não garante a bolsa.</p>
      </div>
    </section>
  );
}
