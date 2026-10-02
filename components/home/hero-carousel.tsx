"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { LightOrbs } from "@/components/home/light-orbs";
import type { CampaignBanner } from "@/types/content";

const MOBILE_QUERY = "(max-width: 800px)";
const INTERVALO_MS = 7000;

// uma proporção só para todo o carrossel: a mais frequente entre as artes. Assim
// a moldura não muda de altura a cada troca, e arte fora do padrão aparece
// inteira, com uma tarja fina, em vez de ser cortada.
function commonRatio(values: number[]) {
  if (!values.length) return null;
  const tally = new Map<number, number>();
  for (const value of values) {
    const key = Math.round(value * 100) / 100;
    tally.set(key, (tally.get(key) ?? 0) + 1);
  }
  return [...tally.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0])[0][0];
}

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export function HeroCarousel({ banners }: { banners: CampaignBanner[] }) {
  const [active, setActive] = useState(0);
  const [ratios, setRatios] = useState<Record<string, number>>({});

  // o contador reinicia a cada troca, inclusive nas manuais: quem clicou na seta
  // ganha o intervalo inteiro para ver a campanha antes de o carrossel seguir
  useEffect(() => {
    if (banners.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((value) => (value + 1) % banners.length), INTERVALO_MS);
    return () => window.clearInterval(id);
  }, [banners.length, active]);

  // as artes são medidas fora da tela: no onLoad da imagem exibida a medida se
  // perdia quando o arquivo vinha do cache e carregava antes da hidratação
  useEffect(() => {
    const mobile = window.matchMedia(MOBILE_QUERY);
    let alive = true;
    const measure = () => {
      setRatios({});
      for (const banner of banners) {
        const image = new window.Image();
        image.onload = () => {
          if (!alive || !image.naturalWidth || !image.naturalHeight) return;
          setRatios((current) => ({ ...current, [banner.id]: image.naturalWidth / image.naturalHeight }));
        };
        image.src = mobile.matches && banner.mobileUrl ? banner.mobileUrl : banner.desktopUrl;
      }
    };
    measure();
    mobile.addEventListener("change", measure);
    return () => {
      alive = false;
      mobile.removeEventListener("change", measure);
    };
  }, [banners]);

  const ratio = useMemo(() => commonRatio(Object.values(ratios)), [ratios]);
  const banner = banners[active];
  if (!banner) return null;

  const go = (step: number) => setActive((value) => (value + step + banners.length) % banners.length);
  const hasOverlay = Boolean(banner.callout || banner.ctaLabel);

  return (
    <section className="surface-night overflow-hidden pt-5 pb-8 sm:pt-8 sm:pb-10" aria-roledescription="carrossel" aria-label="Destaques">
      <LightOrbs />
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="group relative">
          {/* halo azul/dourado atrás da arte */}
          <span
            className="pointer-events-none absolute inset-x-[4%] inset-y-[6%] -z-10 rounded-4xl bg-[radial-gradient(60%_70%_at_30%_50%,rgb(47_127_240/0.55),transparent_70%),radial-gradient(50%_60%_at_75%_60%,rgb(242_176_30/0.35),transparent_70%)] blur-3xl"
            aria-hidden="true"
          />
          <Link
            href={banner.href}
            target={isExternal(banner.href) ? "_blank" : undefined}
            rel={isExternal(banner.href) ? "noopener noreferrer" : undefined}
            aria-label={`${banner.name}: saiba mais`}
            // formato vertical no celular só quando o banner tem arte mobile; sem ela a arte
            // horizontal ficaria pequena no meio de uma moldura alta
            className={`relative block aspect-video overflow-hidden rounded-2xl bg-navy-950 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)] ring-1 ring-white/15 transition-[aspect-ratio] duration-300 sm:rounded-3xl ${banner.mobileUrl ? "max-[800px]:aspect-4/5" : ""}`}
            style={ratio ? { aspectRatio: String(ratio) } : undefined}
          >
            <picture className="absolute inset-0 block">
              {banner.mobileUrl && <source media={MOBILE_QUERY} srcSet={banner.mobileUrl} />}
              <img src={banner.desktopUrl} alt={banner.name} className="size-full object-contain" />
            </picture>
            {hasOverlay && (
              <>
                <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy-950/85 via-navy-950/10 to-transparent" />
                <div className="absolute bottom-[clamp(1rem,3vw,2rem)] left-[clamp(1rem,3vw,2.5rem)] z-10 flex max-w-[min(760px,calc(100%-6rem))] flex-wrap items-center gap-4">
                  {banner.callout && (
                    <strong className="font-display text-[clamp(1.1rem,2.4vw,2.2rem)] leading-tight font-black text-white uppercase drop-shadow-lg">
                      {banner.callout}
                    </strong>
                  )}
                  {banner.ctaLabel && (
                    <span className="btn-gold rounded-full px-5 py-2.5 font-display text-sm font-black">
                      {banner.ctaLabel}
                    </span>
                  )}
                </div>
              </>
            )}
          </Link>

          {banners.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Banner anterior"
                className="absolute top-1/2 left-2 z-20 grid size-9 sm:left-3 sm:size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-navy-950/60 text-white shadow-lg backdrop-blur transition group-hover:opacity-100 hover:border-gold hover:text-gold-300 sm:opacity-70"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Próximo banner"
                className="absolute top-1/2 right-2 z-20 grid size-9 sm:right-3 sm:size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-navy-950/60 text-white shadow-lg backdrop-blur transition group-hover:opacity-100 hover:border-gold hover:text-gold-300 sm:opacity-70"
              >
                <ChevronRight size={24} />
              </button>
              <div className="mt-4 flex justify-center gap-2" aria-label="Selecionar banner">
                {banners.map((item, index) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setActive(index)}
                    aria-label={`Mostrar banner ${index + 1}`}
                    aria-current={index === active}
                    className={`h-2.5 rounded-full transition-all ${index === active ? "w-8 bg-gold shadow-[0_0_12px_rgb(242_176_30/0.8)]" : "w-2.5 bg-white/30 hover:bg-blue-400"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
