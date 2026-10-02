"use client";

import { ClipboardPen } from "lucide-react";
import { useEffect, useState } from "react";

/** Atalho fixo no celular. Some quando o formulário já está na tela, para não cobrir os campos. */
export function MobileEnrollCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("inscricao");
    if (!form) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting));
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#inscricao"
      className="btn-gold fixed inset-x-4 bottom-4 z-40 flex items-center justify-center gap-2 rounded-full py-3.5 font-display font-black shadow-[0_14px_30px_-8px_rgb(6_22_58/0.7)] lg:hidden"
    >
      <ClipboardPen size={18} aria-hidden="true" />
      Fazer inscrição
    </a>
  );
}
