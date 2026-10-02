"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { segments } from "@/lib/segments";
import { ENROLL_HREF, navItems, SEGMENTS_DEFAULT_HREF, siteConfig } from "@/lib/site";
import type { EventItem } from "@/types/content";

type OpenMenu = "segmentos" | "eventos" | null;

const navLinkClass = "rounded-full px-4 py-2 font-display text-[15px] font-extrabold text-white/85 transition-colors hover:bg-white/10 hover:text-gold-300";
const triggerClass = `${navLinkClass} inline-flex items-center gap-1.5 aria-expanded:bg-white/10 aria-expanded:text-gold-300`;
const mobileLinkClass = "flex min-h-12 items-center font-display text-base font-extrabold text-white";
const mobileTriggerClass = "flex min-h-12 w-full items-center justify-between font-display text-base font-extrabold text-white";

const statusTone: Record<string, string> = {
  "Ao vivo": "bg-red-600 text-white",
  "Inscrições abertas": "bg-emerald-400/20 text-emerald-200",
  "Em breve": "bg-gold/20 text-gold-300",
  "Lista de espera": "bg-orange-400/20 text-orange-200",
  Encerrado: "bg-white/10 text-blue-100/70",
};

// a data vem como AAAA-MM-DD; ler os pedaços direto evita o dia "voltar" por fuso
function formatEventDate(date: string | null) {
  if (!date) return null;
  const [, month, day] = date.split("-").map(Number);
  const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  return month && day ? { day: String(day).padStart(2, "0"), month: months[month - 1] } : null;
}

function isExternal(href: string) {
  return !href.startsWith("/");
}

/** Bolinha dourada pulsando: chama atenção para o menu Eventos. */
function EventsDot() {
  return (
    <span className="relative flex size-2" aria-hidden="true">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-75 motion-reduce:animate-none" />
      <span className="relative inline-flex size-2 rounded-full bg-gold shadow-[0_0_8px_rgb(242_176_30/0.9)]" />
    </span>
  );
}

function EventCard({ event, onNavigate, focusable }: { event: EventItem; onNavigate: () => void; focusable: boolean }) {
  const date = formatEventDate(event.date);
  const external = isExternal(event.href);
  const meta = [event.time, event.place].filter(Boolean).join(" · ") || event.format;

  return (
    <Link
      href={event.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={onNavigate}
      tabIndex={focusable ? undefined : -1}
      className={`group flex overflow-hidden rounded-2xl border bg-white/5 transition hover:-translate-y-0.5 hover:border-gold/60 hover:bg-white/8 ${event.featured ? "border-gold/40" : "border-white/12"}`}
    >
      <span className="relative block w-36 shrink-0 overflow-hidden bg-navy-900">
        {event.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- a imagem vem do Notion, de qualquer origem
          <img src={event.imageUrl} alt="" className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <Image src="/logo-cppem.png" alt="" width={72} height={72} className="absolute inset-0 m-auto size-16 object-contain opacity-80" />
        )}
        {date && (
          <span className="btn-gold absolute top-2 left-2 grid min-w-11 place-items-center rounded-lg px-1.5 py-1 font-display text-[0.6rem] leading-none font-black tracking-wider uppercase">
            <strong className="text-lg leading-none">{date.day}</strong>
            {date.month}
          </span>
        )}
      </span>
      <span className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 px-4 py-3.5">
        <span className="flex flex-wrap items-center gap-1.5">
          <span className={`rounded-md px-2 py-0.5 font-display text-[0.6rem] font-black tracking-widest uppercase ${statusTone[event.status] ?? statusTone["Em breve"]}`}>{event.status}</span>
          {event.label && <span className="rounded-md bg-blue-500/25 px-2 py-0.5 font-display text-[0.6rem] font-black tracking-widest text-blue-100 uppercase">{event.label}</span>}
        </span>
        <strong className="font-display leading-tight font-black text-white">{event.name}</strong>
        {meta && (
          <span className="flex items-center gap-1.5 text-xs text-blue-100/75">
            <CalendarDays size={13} className="shrink-0" aria-hidden="true" />
            <span className="truncate">{meta}</span>
          </span>
        )}
      </span>
    </Link>
  );
}

export function SiteHeaderClient({ events }: { events: EventItem[] }) {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<OpenMenu>(null);

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu]);

  const closeMenus = () => setOpenMenu(null);
  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSection(null);
  };
  const toggle = (menu: Exclude<OpenMenu, null>) => setOpenMenu((current) => (current === menu ? null : menu));
  const toggleMobile = (menu: Exclude<OpenMenu, null>) => setMobileSection((current) => (current === menu ? null : menu));

  const panelClass = (menu: OpenMenu) =>
    `absolute inset-x-0 top-full hidden border-b border-gold/30 bg-navy-950/97 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] backdrop-blur transition duration-200 lg:block ${openMenu === menu ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`;

  return (
    <header
      className="sticky top-0 z-50 bg-[linear-gradient(90deg,var(--navy-950),var(--navy-900)_45%,var(--blue-700))] shadow-[0_10px_30px_-12px_rgb(6_22_58/0.8)]"
      onMouseLeave={closeMenus}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.name} — página inicial`} onMouseEnter={closeMenus}>
          <Image src="/logo-cppem.png" alt="" width={52} height={52} priority className="size-13 object-contain drop-shadow-[0_0_12px_rgb(242_176_30/0.45)]" />
          <span className="font-display text-lg leading-none font-black tracking-wide text-white uppercase">
            Colégio <span className="text-gold">CPPEM</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass} onMouseEnter={closeMenus}>
              {item.label}
            </Link>
          ))}
          {/* o clique leva direto ao segmento principal; o dropdown (hover ou foco) deixa escolher outro */}
          <Link
            href={SEGMENTS_DEFAULT_HREF}
            className={triggerClass}
            aria-haspopup="true"
            aria-expanded={openMenu === "segmentos"}
            aria-controls="menu-segmentos"
            onClick={closeMenus}
            onMouseEnter={() => setOpenMenu("segmentos")}
            onFocus={() => setOpenMenu("segmentos")}
          >
            Segmentos de ensino
            <ChevronDown size={15} className={`transition-transform ${openMenu === "segmentos" ? "rotate-180" : ""}`} aria-hidden="true" />
          </Link>
          <button
            type="button"
            className={`${triggerClass} gap-2 text-gold-300`}
            aria-expanded={openMenu === "eventos"}
            aria-controls="menu-eventos"
            onClick={() => toggle("eventos")}
            onMouseEnter={() => setOpenMenu("eventos")}
          >
            <EventsDot />
            Eventos
            <ChevronDown size={15} className={`transition-transform ${openMenu === "eventos" ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <Link href={ENROLL_HREF} className="btn-gold hidden rounded-full px-5 py-2.5 font-display text-sm font-black sm:inline-block" onMouseEnter={closeMenus}>
            Matricule-se
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-white hover:bg-white/10 lg:hidden"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            onClick={() => (mobileOpen ? closeMobile() : setMobileOpen(true))}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className="gold-line" aria-hidden="true" />

      {/* dropdown: segmentos de ensino (desktop) */}
      <div id="menu-segmentos" aria-hidden={openMenu !== "segmentos"} className={panelClass("segmentos")}>
        <div className="mx-auto grid max-w-7xl gap-6 px-8 py-7 lg:grid-cols-[17rem_minmax(0,1fr)]">
          <div className="flex flex-col justify-end rounded-2xl border border-white/12 bg-[radial-gradient(120%_90%_at_0%_0%,rgb(47_127_240/0.35),transparent_60%)] p-5">
            <p className="font-display text-xs font-black tracking-widest text-gold-300 uppercase">Matrículas {siteConfig.admissionsYear}</p>
            <p className="mt-2 font-display text-2xl leading-[1.05] font-black text-white">
              Um CPPEM para <span className="text-gold">cada fase.</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-blue-100/80">Escolha o segmento para ver valores, bolsas e fazer a inscrição.</p>
          </div>
          <ul className="grid gap-3 lg:grid-cols-3">
            {segments.map((segment) => (
              <li key={segment.id}>
                <Link
                  href={segment.href ?? ENROLL_HREF}
                  onClick={closeMenus}
                  tabIndex={openMenu === "segmentos" ? undefined : -1}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/12 bg-white/5 transition hover:-translate-y-0.5 hover:border-gold/60 hover:bg-white/8"
                >
                  {segment.image && (
                    <span className="relative block aspect-5/2 overflow-hidden bg-navy-900">
                      <Image src={segment.image} alt="" fill sizes="300px" className="object-cover object-[50%_28%] transition-transform duration-500 group-hover:scale-105" />
                    </span>
                  )}
                  <span className="flex flex-1 items-center justify-between gap-3 px-4 py-3.5">
                    <span>
                      <span className="block font-display text-[0.65rem] font-black tracking-widest text-gold-300 uppercase">{segment.grades}</span>
                      <strong className="block font-display leading-tight font-black text-white">{segment.title}</strong>
                    </span>
                    <ArrowRight size={18} className="shrink-0 text-gold transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* dropdown: eventos (desktop) */}
      <div id="menu-eventos" aria-hidden={openMenu !== "eventos"} className={panelClass("eventos")}>
        <div className="mx-auto grid max-w-7xl gap-6 px-8 py-7 lg:grid-cols-[17rem_minmax(0,1fr)]">
          <div className="flex flex-col justify-end rounded-2xl border border-white/12 bg-[radial-gradient(120%_90%_at_0%_0%,rgb(242_176_30/0.28),transparent_60%)] p-5">
            <p className="font-display text-xs font-black tracking-widest text-gold-300 uppercase">Agenda do colégio</p>
            <p className="mt-2 font-display text-2xl leading-[1.05] font-black text-white">
              Eventos e <span className="text-gold">novidades.</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-blue-100/80">O que está acontecendo no Colégio CPPEM e o que vem por aí.</p>
          </div>

          {events.length > 0 ? (
            <ul className="grid content-start gap-3 xl:grid-cols-2">
              {events.map((event) => (
                <li key={event.id}>
                  <EventCard event={event} onNavigate={closeMenus} focusable={openMenu === "eventos"} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="grid place-items-center rounded-2xl border border-dashed border-white/20 p-6 text-center text-blue-100/80">
              Nenhum evento na agenda agora. Fique de olho: as próximas novidades saem em breve.
            </p>
          )}
        </div>
      </div>

      {/* menu mobile */}
      {mobileOpen && (
        <nav className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/10 bg-navy-950 px-4 pb-4 lg:hidden" aria-label="Principal (mobile)">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMobile} className={mobileLinkClass}>
              {item.label}
            </Link>
          ))}

          <button type="button" className={mobileTriggerClass} aria-expanded={mobileSection === "segmentos"} onClick={() => toggleMobile("segmentos")}>
            Segmentos de ensino
            <ChevronDown size={18} className={`transition-transform ${mobileSection === "segmentos" ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
          {mobileSection === "segmentos" && (
            <ul className="mb-2 space-y-1 border-l-2 border-gold/40 pl-4">
              {segments.map((segment) => (
                <li key={segment.id}>
                  <Link href={segment.href ?? ENROLL_HREF} onClick={closeMobile} className="flex min-h-11 items-center justify-between gap-3 text-[15px] font-bold text-white">
                    <span>
                      {segment.title}
                      <span className="block text-xs font-normal text-blue-100/70">{segment.grades}</span>
                    </span>
                    <ArrowRight size={16} className="shrink-0 text-gold" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <button type="button" className={`${mobileTriggerClass} text-gold-300`} aria-expanded={mobileSection === "eventos"} onClick={() => toggleMobile("eventos")}>
            <span className="inline-flex items-center gap-2.5">
              <EventsDot />
              Eventos
            </span>
            <ChevronDown size={18} className={`transition-transform ${mobileSection === "eventos" ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
          {mobileSection === "eventos" && (
            <ul className="mb-2 space-y-1 border-l-2 border-gold/40 pl-4">
              {events.length > 0 ? (
                events.map((event) => (
                  <li key={event.id}>
                    <Link
                      href={event.href}
                      target={isExternal(event.href) ? "_blank" : undefined}
                      rel={isExternal(event.href) ? "noopener noreferrer" : undefined}
                      onClick={closeMobile}
                      className="flex min-h-11 items-center justify-between gap-3 text-[15px] font-bold text-white"
                    >
                      <span>
                        {event.name}
                        <span className="block text-xs font-normal text-blue-100/70">{event.status}</span>
                      </span>
                      <ArrowUpRight size={16} className="shrink-0 text-gold" aria-hidden="true" />
                    </Link>
                  </li>
                ))
              ) : (
                <li className="py-2 text-sm text-blue-100/75">Nenhum evento na agenda agora.</li>
              )}
            </ul>
          )}

          <Link href={ENROLL_HREF} onClick={closeMobile} className="btn-gold mt-2 block rounded-full py-3 text-center font-display font-black">
            Matricule-se
          </Link>
        </nav>
      )}
    </header>
  );
}
