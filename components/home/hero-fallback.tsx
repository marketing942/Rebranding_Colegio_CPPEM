import Image from "next/image";
import { LightOrbs } from "@/components/home/light-orbs";
import { siteConfig, whatsappPrincipal } from "@/lib/site";

/** Hero institucional exibido quando não há banner ativo no Notion. */
export function HeroFallback() {
  return (
    <section className="surface-night overflow-hidden">
      <LightOrbs />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr] lg:px-8 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-display text-xs font-black tracking-wider text-gold-300 uppercase shadow-[0_0_20px_rgb(242_176_30/0.25)]">
            <span className="size-2 animate-pulse rounded-full bg-gold" aria-hidden="true" />
            Matrículas {siteConfig.admissionsYear} abertas
          </span>
          <h1 className="mt-6 font-display text-[clamp(2.1rem,4.8vw,3.8rem)] leading-[1.05] font-black text-white">
            Fé, disciplina e{" "}
            <span className="bg-linear-to-r from-gold-300 via-gold to-gold-300 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgb(242_176_30/0.35)]">
              excelência
            </span>{" "}
            em cada fase da vida escolar.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-blue-100/85">
            Do 1º ano do Ensino Fundamental ao 3º ano do Ensino Médio, no centro de Caruaru.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
              className="rounded-full border border-white/25 bg-white/5 px-7 py-3.5 font-display font-extrabold text-white backdrop-blur transition-colors hover:border-blue-400 hover:bg-blue-500/20"
            >
              Conheça os segmentos
            </a>
          </div>
        </div>

        <div className="relative mx-auto hidden w-full max-w-80 md:block">
          {/* halo atrás do brasão */}
          <span className="absolute inset-[-15%] rounded-full bg-[radial-gradient(circle,rgb(242_176_30/0.35),rgb(47_127_240/0.25)_45%,transparent_70%)] blur-2xl" aria-hidden="true" />
          <Image
            src="/logo-cppem.png"
            alt="Brasão do Colégio CPPEM"
            width={360}
            height={360}
            priority
            className="relative w-full drop-shadow-[0_20px_40px_rgb(0_0_0/0.5)]"
          />
        </div>
      </div>
    </section>
  );
}
