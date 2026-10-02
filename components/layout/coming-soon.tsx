import Link from "next/link";
import { Hammer } from "lucide-react";
import { LightOrbs } from "@/components/home/light-orbs";
import { WhatsappIcon } from "@/components/layout/brand-icons";
import { whatsappPrincipal } from "@/lib/site";

/** Página de espera para rotas que já estão no menu mas ainda não têm conteúdo. */
export function ComingSoon({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="surface-night overflow-hidden">
      <LightOrbs />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-linear-to-br from-gold-300 to-gold-600 text-navy-950 shadow-[0_0_30px_rgb(242_176_30/0.5)]">
          <Hammer size={30} aria-hidden="true" />
        </span>
        <p className="mt-6 font-display text-sm font-extrabold tracking-widest text-gold-300 uppercase">{eyebrow}</p>
        <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3.4rem)] leading-tight font-black text-white">{title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-blue-100/85">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={whatsappPrincipal} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 font-display font-black">
            <WhatsappIcon size={20} />
            Falar com a escola
          </a>
          <Link href="/" className="rounded-full border border-white/25 bg-white/5 px-6 py-3 font-display font-extrabold text-white transition-colors hover:border-blue-400 hover:bg-blue-500/20">
            Voltar ao início
          </Link>
        </div>
      </div>
    </section>
  );
}
