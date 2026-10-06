"use client";

import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WhatsappIcon } from "@/components/layout/brand-icons";
import { siteConfig, whatsappUrl } from "@/lib/site";

// cada balão abre a conversa já com a mensagem correspondente
const bubbles = [
  { text: "Agende uma visita! 👋", message: "Olá! Gostaria de agendar uma visita ao Colégio CPPEM." },
  { text: "Ficou com dúvida? Fale com a gente.", message: "Olá! Tenho uma dúvida sobre o Colégio CPPEM." },
  { text: `Matrículas ${siteConfig.admissionsYear} abertas!`, message: `Olá! Quero saber sobre as matrículas ${siteConfig.admissionsYear} do Colégio CPPEM.` },
  { text: "Quer saber sobre bolsas?", message: "Olá! Gostaria de saber sobre as bolsas do Colégio CPPEM." },
  { text: "Estamos online. Chama no WhatsApp!", message: "Olá, gostaria de falar sobre o Colégio CPPEM." },
];

const PRIMEIRO_BALAO_MS = 4000;
const VISIVEL_MS = 6000;
const PAUSA_MS = 5000;

export function WhatsappFloat() {
  const pathname = usePathname();
  // passo par = balão escondido, passo ímpar = balão visível; a cada dois passos troca a mensagem
  const [step, setStep] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const visible = step % 2 === 1;
  const index = Math.floor(step / 2) % bubbles.length;

  useEffect(() => {
    if (dismissed) return;
    const delay = visible ? VISIVEL_MS : step === 0 ? PRIMEIRO_BALAO_MS : PAUSA_MS;
    const id = window.setTimeout(() => setStep((value) => value + 1), delay);
    return () => window.clearTimeout(id);
  }, [step, visible, dismissed]);

  const bubble = bubbles[index];
  const phone = siteConfig.telephones[0].e164;
  // nas páginas de inscrição o celular já tem o botão fixo "Fazer inscrição" embaixo
  const raised = pathname.startsWith("/matriculas");

  return (
    <div className={`fixed right-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6 ${raised ? "bottom-22 lg:bottom-6" : "bottom-4"}`}>
      {!dismissed && (
        <div
          className={`relative max-w-[min(16rem,calc(100vw-6rem))] origin-bottom-right transition duration-300 ${visible ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"}`}
          aria-hidden={!visible}
        >
          <a
            href={whatsappUrl(phone, bubble.message)}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={visible ? undefined : -1}
            className="block rounded-2xl rounded-br-md bg-white py-3 pr-9 pl-4 font-display text-sm leading-snug font-extrabold text-navy shadow-[0_18px_40px_-14px_rgb(6_22_58/0.55)] ring-1 ring-blue-100 hover:text-blue-700"
          >
            {bubble.text}
          </a>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            tabIndex={visible ? undefined : -1}
            aria-label="Fechar mensagens"
            className="absolute top-1.5 right-1.5 grid size-6 place-items-center rounded-full text-muted hover:bg-blue-50 hover:text-navy"
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>
      )}

      <a
        href={whatsappUrl(phone, "Olá, gostaria de falar sobre o Colégio CPPEM.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com o Colégio CPPEM no WhatsApp"
        className="relative grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_14px_30px_-8px_rgb(37_211_102/0.75)] ring-4 ring-white transition-transform hover:scale-105 sm:size-16"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366]/45 motion-reduce:animate-none" aria-hidden="true" />
        <WhatsappIcon size={30} className="relative" />
      </a>
    </div>
  );
}
