import { siteConfig, whatsappPrincipal } from "@/lib/site";

const pilares = ["Fé Cristã", "Disciplina", "Estabilidade", "Liberdade"];

/** Capa institucional exibida somente quando não há banner ativo no Notion. */
export function HeroFallback() {
  return (
    <section className="relative isolate overflow-hidden bg-[#061a44] text-white">
      <picture className="absolute inset-x-0 top-0 h-[min(92vw,460px)] lg:inset-0 lg:h-full">
        <source media="(min-width: 1024px)" srcSet="/banners/hero-institucional-desktop.webp" />
        <img
          src="/banners/hero-institucional-mobile.webp"
          alt=""
          width={1024}
          height={1536}
          fetchPriority="high"
          className="size-full object-cover object-top lg:object-left"
        />
      </picture>
      <div className="pointer-events-none absolute inset-x-0 top-[min(72vw,355px)] h-32 bg-linear-to-b from-transparent to-[#061a44] lg:hidden" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 hidden bg-linear-to-r from-[#061a44]/50 via-[#061a44]/10 to-transparent lg:block" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-[min(94vw,470px)] pb-14 sm:px-6 lg:flex lg:min-h-[650px] lg:items-center lg:px-8 lg:py-20">
        <div className="max-w-xl lg:max-w-[440px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-[#061a44]/55 px-4 py-1.5 font-display text-xs font-black tracking-wider text-gold-300 uppercase backdrop-blur-sm">
            <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
            Matrículas {siteConfig.admissionsYear} abertas
          </span>
          <h1 className="mt-5 font-display text-[clamp(2.25rem,4.3vw,3.5rem)] leading-[1.06] font-black drop-shadow-[0_2px_16px_rgb(0_0_0/0.28)]">
            Fé, disciplina e <span className="text-gold-300">excelência</span> em cada fase da vida escolar.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-blue-50/95 sm:text-lg">
            Do 1º ano do Ensino Fundamental ao 3º ano do Ensino Médio, no centro de Caruaru.
          </p>
          <ul className="mt-5 flex max-w-lg flex-wrap gap-2" aria-label="Os quatro pilares do CPPEM">
            {pilares.map((pilar) => (
              <li key={pilar} className="rounded-full border border-white/25 bg-white/10 px-3 py-1 font-display text-xs font-bold text-white backdrop-blur-sm">
                {pilar}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={whatsappPrincipal}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold rounded-full px-7 py-3.5 font-display font-black"
            >
              Garantir minha vaga
            </a>
            <a
              href="#segmentos"
              className="rounded-full border border-white/35 bg-white/10 px-7 py-3.5 font-display font-extrabold text-white backdrop-blur-sm transition-colors hover:border-blue-400 hover:bg-blue-500/25"
            >
              Conheça os segmentos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
