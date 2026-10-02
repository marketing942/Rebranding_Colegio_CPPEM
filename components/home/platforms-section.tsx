import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";

const SCHOOL_SYSTEM_URL = "https://escola.cppem.com.br";

const schoolFeatures = ["Médias", "Frequência", "Tarefas", "Resultados"];
const iriumFeatures = ["Trilhas de estudo por conteúdo", "Videoaulas integradas", "Prática e revisão"];

const numberClass = "font-display text-xs font-black tracking-[0.18em] text-blue-700 uppercase";
const titleClass = "mt-2 font-display text-[clamp(1.6rem,2.8vw,2.25rem)] leading-[1.08] font-black text-navy";
const textClass = "mx-auto mt-3 max-w-md leading-relaxed text-muted md:mx-0";

export function PlatformsSection() {
  return (
    <section id="plataformas" className="surface-day scroll-mt-24 overflow-hidden py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="border-l-4 border-gold pl-4">
          <p className="font-display text-sm font-extrabold tracking-widest text-blue-600 uppercase">Plataformas</p>
          <h2 className="mt-1 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] leading-tight font-black text-navy uppercase">
            Aprender na escola. Continuar em qualquer lugar.
          </h2>
        </div>

        {/* 01 — sistema escolar */}
        <article className="mt-8 grid items-center gap-6 text-center md:grid-cols-[0.9fr_1.1fr] md:gap-10 md:text-left">
          <div>
            <p className={numberClass}>01 / Sistema escolar CPPEM</p>
            <h3 className={titleClass}>Escola e família mais próximas.</h3>
            <p className={textClass}>
              No sistema desenvolvido pelo CPPEM, alunos e responsáveis acompanham médias, frequência, tarefas e resultados em um só lugar.
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
              {schoolFeatures.map((item) => (
                <li key={item} className="rounded-full bg-blue-50 px-3.5 py-1.5 font-display text-sm font-extrabold text-blue-700 ring-1 ring-blue-200">
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={SCHOOL_SYSTEM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-black text-blue-600 hover:text-blue-700 hover:underline"
            >
              escola.cppem.com.br
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>

          <div className="devices-stage">
            <span className="devices-halo" aria-hidden="true" />
            <Image
              className="devices-render"
              src="/plataformas/sistema-macbook-iphone-3d.png"
              alt="MacBook e iPhone 13 Pro Max exibindo prévias do sistema escolar CPPEM"
              width={1536}
              height={1024}
              sizes="(min-width: 768px) 540px, 100vw"
            />
            <span className="device-label top-[6%] right-0" aria-hidden="true">Sistema CPPEM</span>
            <span className="device-label bottom-[5%] left-0" aria-hidden="true">Família conectada</span>
          </div>
        </article>

        {/* 02 — IRIUM */}
        <article className="mt-10 grid items-center gap-6 border-t border-blue-100 pt-10 text-center md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:text-left">
          <div className="device-blob md:order-1">
            <Image
              className="tablet-render"
              src="/plataformas/irium-tablet-3d.png"
              alt="Tablet 3D exibindo prévia da plataforma IRIUM, com pré-aula e videoaula de Matemática"
              width={1536}
              height={1024}
              sizes="(min-width: 768px) 500px, 100vw"
            />
            <span className="absolute right-0 bottom-[8%] rounded-full bg-gold px-3.5 py-2 font-display text-[0.7rem] leading-none font-black tracking-widest text-navy-950 uppercase shadow-[0_10px_22px_-10px_rgb(242_176_30/0.9)]">
              Prévia da plataforma
            </span>
          </div>

          <div className="order-first md:order-2">
            <p className={numberClass}>02 / Plataforma de aprendizagem</p>
            <p className="mt-3 font-display text-xs font-black tracking-[0.18em] text-gold-700 uppercase">IRIUM</p>
            <h3 className={`${titleClass} mt-1`}>O estudo segue além da aula.</h3>
            <p className={textClass}>
              Pré-aulas, videoaulas e atividades organizadas por módulo ajudam o estudante a revisar, praticar e chegar mais preparado ao próximo encontro.
            </p>
            <ul className="mx-auto mt-4 grid w-fit gap-2 text-left md:mx-0">
              {iriumFeatures.map((item) => (
                <li key={item} className="flex items-center gap-2.5 font-display font-extrabold text-navy">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-gold text-navy-950">
                    <Check size={13} strokeWidth={3.5} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}
