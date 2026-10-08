import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClipboardPen, Home } from "lucide-react";
import { LightOrbs } from "@/components/home/light-orbs";
import { ENROLL_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

/** 404 do site todo: endereço que não existe ou página que saiu do ar. */
export default function NotFound() {
  return (
    <section className="surface-night overflow-hidden">
      <LightOrbs />
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:py-24">
        <span className="relative block size-36 -rotate-3 overflow-hidden rounded-[2rem] shadow-[0_0_0_4px_var(--gold),0_24px_50px_-18px_rgb(0_0_0/0.7)] sm:size-44">
          <Image src="/mascotes/mascote-lobomax.jpg" alt="Lobo Max, mascote do Colégio CPPEM" width={352} height={352} priority className="size-full origin-top scale-125 object-cover object-top" />
        </span>
        <p className="mt-8 font-display text-7xl leading-none font-black text-gold-300 sm:text-8xl">404</p>
        <h1 className="mt-3 font-display text-[clamp(1.7rem,4vw,2.4rem)] leading-tight font-black text-white">Ops! Esta página não foi encontrada.</h1>
        <p className="mt-3 max-w-md text-lg leading-relaxed text-blue-100/85">
          O endereço pode estar errado ou a página saiu do ar. Que tal voltar para o início ou garantir a vaga para 2027?
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-gold inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display font-black">
            <Home size={18} aria-hidden="true" />
            Voltar para o início
          </Link>
          <Link
            href={ENROLL_HREF}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 font-display font-extrabold text-white backdrop-blur transition-colors hover:border-gold hover:text-gold-300"
          >
            <ClipboardPen size={18} aria-hidden="true" />
            Fazer inscrição
          </Link>
        </div>
      </div>
      <div className="gold-line" aria-hidden="true" />
    </section>
  );
}
