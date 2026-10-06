import { PhotoMarquee } from "@/components/shared/photo-marquee";
import { schoolLifePhotos } from "@/lib/media";

const midpoint = Math.ceil(schoolLifePhotos.length / 2);

/** "Nossos alunos em ação": duas faixas de fotos deslizando em sentidos opostos. Usada na home e na página Sobre. */
export function StudentsSection() {
  return (
    <section id="alunos" className="surface-day scroll-mt-24 overflow-hidden py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="border-l-4 border-gold pl-4">
          <p className="font-display text-sm font-extrabold tracking-widest text-blue-600 uppercase">Vida no CPPEM</p>
          <h2 className="mt-1 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] leading-tight font-black text-navy uppercase">Nossos alunos em ação</h2>
        </div>
        <p className="mt-4 max-w-2xl text-lg text-muted">Formaturas, desfiles, aulas e momentos que fazem parte da rotina de quem estuda aqui.</p>
      </div>
      <div className="mt-8 space-y-4">
        <PhotoMarquee photos={schoolLifePhotos.slice(0, midpoint)} seconds={70} />
        <PhotoMarquee photos={schoolLifePhotos.slice(midpoint)} seconds={60} reverse />
      </div>
    </section>
  );
}
