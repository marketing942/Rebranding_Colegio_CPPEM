import Image from "next/image";

type Photo = { src: string; alt: string };

/**
 * Faixa de fotos que desliza sem parar. As fotos entram duas vezes na trilha:
 * quando a primeira metade sai da tela, a segunda está exatamente no lugar dela.
 */
export function PhotoMarquee({ photos, reverse = false, seconds = 60 }: { photos: Photo[]; reverse?: boolean; seconds?: number }) {
  return (
    <div className="marquee">
      <ul className="marquee-track" data-reverse={reverse} style={{ animationDuration: `${seconds}s` }}>
        {[...photos, ...photos].map((photo, index) => {
          const copy = index >= photos.length;
          return (
            // o espaçamento vai no item (e não em gap) para a trilha ter exatamente o dobro da largura
            <li key={`${photo.src}-${index}`} className="shrink-0 pr-4" aria-hidden={copy || undefined}>
              <span className="relative block h-44 w-66 overflow-hidden rounded-3xl bg-blue-100 shadow-[0_18px_36px_-22px_rgb(6_22_58/0.7)] ring-1 ring-blue-100 sm:h-56 sm:w-84">
                {/* eager: com a faixa em movimento, o carregamento preguiçoso deixava quadros em branco entrando na tela */}
                <Image src={photo.src} alt={copy ? "" : photo.alt} fill sizes="336px" loading="eager" className="object-cover" />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
