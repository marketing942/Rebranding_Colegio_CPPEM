import Image from "next/image";
import { ArrowUpRight, Camera, Heart, Megaphone } from "lucide-react";
import { LightOrbs } from "@/components/home/light-orbs";
import { InstagramIcon } from "@/components/layout/brand-icons";
import { siteConfig } from "@/lib/site";

const INSTAGRAM_HANDLE = "@colegiocppem";

const reasons = [
  { icon: Camera, title: "O dia a dia da escola", text: "Aulas, formaturas, eventos e bastidores." },
  { icon: Megaphone, title: "Avisos em primeira mão", text: "Matrículas, datas e novidades do colégio." },
  { icon: Heart, title: "Conquistas dos alunos", text: "Cada resultado comemorado com a família." },
];

export function InstagramSection() {
  return (
    <section id="instagram" className="scroll-mt-24 bg-linear-to-b from-blue-50 via-white to-blue-50 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="surface-night grid items-center gap-8 overflow-hidden rounded-4xl p-6 shadow-[0_30px_70px_-34px_rgb(6_22_58/0.9)] sm:p-10 md:grid-cols-[1.15fr_0.85fr] md:gap-10">
          <LightOrbs />
          <div className="text-center md:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-display text-xs font-black tracking-wider text-gold-300 uppercase">
              <InstagramIcon size={16} />
              Instagram
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,2.8rem)] leading-tight font-black text-white">
              Venha nos conhecer <span className="text-gold">melhor.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-lg leading-relaxed text-blue-100/85 md:mx-0">Acompanhe nosso dia a dia e veja de perto o ambiente do CPPEM.</p>

            <ul className="mt-6 space-y-3 text-left">
              {reasons.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex items-center gap-3.5 rounded-2xl border border-white/12 bg-white/6 px-4 py-3 backdrop-blur">
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

            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-display font-black"
            >
              <InstagramIcon size={20} />
              Seguir {INSTAGRAM_HANDLE}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>

          {/* celular com o perfil */}
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir o Instagram ${INSTAGRAM_HANDLE}`}
            className="group relative mx-auto block w-56 sm:w-64"
          >
            <span className="absolute inset-[-12%] rounded-full bg-[radial-gradient(circle,rgb(242_176_30/0.35),rgb(47_127_240/0.3)_50%,transparent_72%)] blur-2xl" aria-hidden="true" />
            <span className="pillar-float-slow relative block rounded-[2.6rem] bg-[#111214] p-2 shadow-[0_30px_70px_-20px_rgb(0_0_0/0.8)] ring-1 ring-white/20">
              <span className="pointer-events-none absolute top-4 left-1/2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-zinc-800" aria-hidden="true" />
              <Image src="/instagram/perfil.webp" alt="Perfil do Colégio CPPEM no Instagram" width={622} height={1280} sizes="256px" className="w-full rounded-[2.1rem]" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
