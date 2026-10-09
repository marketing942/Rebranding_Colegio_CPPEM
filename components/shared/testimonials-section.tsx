import { Quote } from "lucide-react";
import { InstagramIcon } from "@/components/layout/brand-icons";
import { testimonials, type Testimonial } from "@/lib/testimonials";

function TestimonialCard({ item }: { item: Testimonial }) {
  const fromInstagram = item.author.startsWith("@");
  return (
    // o espaço de cima fica dentro do bloco que não quebra: assim as aspas não são cortadas no topo de cada coluna
    <div className="break-inside-avoid pt-4 pb-2">
      <figure className="relative rounded-3xl bg-white p-6 shadow-[0_18px_44px_-28px_rgb(16_48_122/0.55)] ring-1 ring-blue-100">
        <span className="btn-gold absolute -top-3 left-6 grid size-9 place-items-center rounded-full" aria-hidden="true">
          <Quote size={16} className="fill-navy-950" />
        </span>
        <blockquote className="pt-2 text-[1.0625rem] leading-relaxed text-foreground">“{item.quote}”</blockquote>
        <figcaption className="mt-4 flex items-center gap-3 border-t border-blue-100 pt-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-linear-to-br from-blue-400 to-blue-700 text-white">
            {fromInstagram ? <InstagramIcon size={17} /> : <span className="font-display text-sm font-black">{item.author.charAt(0)}</span>}
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display leading-tight font-black text-navy">{item.author}</span>
            <span className="block text-xs text-muted">{[item.role, fromInstagram ? "no Instagram" : "por mensagem"].filter(Boolean).join(" · ")}</span>
          </span>
        </figcaption>
      </figure>
    </div>
  );
}

/** O que as famílias e a comunidade dizem do colégio: comentários reais, transcritos em cartões. */
export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="surface-day scroll-mt-20 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="border-l-4 border-gold pl-4">
          <p className="font-display text-sm font-extrabold tracking-widest text-blue-600 uppercase">Depoimentos</p>
          <h2 className="mt-1 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] leading-tight font-black text-navy">
            O que as famílias <span className="text-gold-700">dizem do CPPEM.</span>
          </h2>
          <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted">Comentários reais de pais, responsáveis e da comunidade, recebidos nas nossas redes.</p>
        </div>

        {/* colunas no estilo mural: cada cartão tem a altura do próprio texto */}
        <div className="mt-6 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {testimonials.map((item) => (
            <TestimonialCard key={item.author} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
