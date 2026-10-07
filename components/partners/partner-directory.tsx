"use client";

import { BadgePercent, ChevronDown, Globe, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { InstagramIcon, WhatsappIcon } from "@/components/layout/brand-icons";
import { normalizePartnerKey, partnerInitials, type Partner, type PartnerCategory } from "@/lib/partners";

export function PartnerDirectory({ partners, categories }: { partners: Partner[]; categories: PartnerCategory[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("todos");
  const [activeId, setActiveId] = useState<string | null>(null);

  // só mostra as categorias que têm parceiro publicado
  const tabs = useMemo(() => {
    const used = new Map(partners.map((partner) => [partner.categoryKey, partner.categoryLabel]));
    const known = categories.filter((item) => used.has(item.key));
    const extras = [...used].filter(([key]) => key && !categories.some((item) => item.key === key)).map(([key, label]) => ({ key, label }));
    return [{ key: "todos", label: "Todos" }, ...known, ...extras];
  }, [categories, partners]);

  const filtered = useMemo(() => {
    const term = normalizePartnerKey(query);
    return partners.filter((partner) => {
      if (category !== "todos" && partner.categoryKey !== category) return false;
      return !term || normalizePartnerKey(`${partner.name} ${partner.categoryLabel} ${partner.description} ${partner.benefit}`).includes(term);
    });
  }, [partners, query, category]);

  if (partners.length === 0) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-blue-200 bg-white/70 px-6 py-12 text-center">
        <p className="font-display text-xl font-black text-navy">Nossa rede está começando.</p>
        <p className="mt-2 text-muted">Os primeiros parceiros aparecem aqui em breve. Que tal ser um deles?</p>
        <a href="#seja-parceiro" className="btn-gold mt-5 inline-flex rounded-full px-6 py-3 font-display font-black">
          Quero ser parceiro
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-sm">
          <span className="sr-only">Buscar parceiro</span>
          <Search size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Busque por parceiro ou benefício"
            className="w-full rounded-full border-2 border-blue-100 bg-white py-2.5 pr-4 pl-11 text-[15px] focus:border-blue-500 focus:outline-none"
          />
        </label>
        <span className="text-sm font-bold text-muted">
          {filtered.length} de {partners.length} {partners.length === 1 ? "parceiro" : "parceiros"}
        </span>
      </div>

      {tabs.length > 2 && (
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.key}
              aria-pressed={category === tab.key}
              onClick={() => { setCategory(tab.key); setActiveId(null); }}
              className="rounded-full px-4 py-2 font-display text-sm font-extrabold ring-1 transition aria-pressed:bg-linear-to-b aria-pressed:from-blue-500 aria-pressed:to-blue-700 aria-pressed:text-white aria-pressed:ring-blue-600 aria-[pressed=false]:bg-white aria-[pressed=false]:text-navy aria-[pressed=false]:ring-blue-100 aria-[pressed=false]:hover:ring-blue-400"
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <ul className="mt-6 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3" onMouseLeave={() => setActiveId(null)}>
          {filtered.map((partner) => {
            const open = activeId === partner.id;
            const panelId = `parceiro-${partner.id}`;
            return (
              <li
                key={partner.id}
                onMouseEnter={() => setActiveId(partner.id)}
                onFocusCapture={() => setActiveId(partner.id)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActiveId((current) => (current === partner.id ? null : current));
                }}
                className={`rounded-3xl bg-white shadow-[0_18px_40px_-28px_rgb(16_48_122/0.6)] ring-1 transition duration-300 ${open ? "-translate-y-1 shadow-[0_28px_50px_-26px_rgb(16_48_122/0.7)] ring-blue-400" : partner.featured ? "ring-gold/60" : "ring-blue-100"} ${activeId && !open ? "opacity-70" : ""}`}
              >
                {/* fechado: logo, nome e uma linha de descrição. Mouse, foco ou toque abre os benefícios */}
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setActiveId(open ? null : partner.id)}
                  className="flex w-full items-center gap-4 rounded-3xl p-5 text-left"
                >
                  <span className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-blue-50 font-display text-xl font-black text-blue-600 ring-1 ring-blue-100">
                    {partner.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element -- logo vem do Notion, com URL temporária
                      <img src={partner.logoUrl} alt="" loading="lazy" className="size-full object-contain p-1.5" />
                    ) : (
                      partnerInitials(partner.name)
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-xs font-black tracking-widest text-blue-600 uppercase">{partner.categoryLabel}</span>
                    <span className="block font-display text-lg leading-tight font-black text-navy">{partner.name}</span>
                    {partner.description && <span className={`mt-1 text-sm leading-snug text-muted ${open ? "block" : "line-clamp-2"}`}>{partner.description.split("\n")[0]}</span>}
                  </span>
                  <ChevronDown size={20} className={`shrink-0 text-blue-600 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>

                <div id={panelId} className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden" inert={!open}>
                    <div className="px-5 pb-5">
                      {partner.description.includes("\n") && (
                        <p className="text-sm leading-relaxed whitespace-pre-line text-muted">{partner.description.split("\n").slice(1).join("\n").trim()}</p>
                      )}
                      <div className="mt-3 flex items-start gap-2.5 rounded-2xl bg-gold-50 p-3.5 text-sm leading-relaxed whitespace-pre-line text-foreground ring-1 ring-gold/30">
                        <BadgePercent size={18} className="mt-0.5 shrink-0 text-gold-700" aria-hidden="true" />
                        <span>
                          <strong className="block font-display font-black text-navy">Benefício para a família CPPEM</strong>
                          {partner.benefit || "Consulte as condições diretamente com o parceiro."}
                        </span>
                      </div>
                      {(partner.siteUrl || partner.whatsappUrl || partner.instagramUrl) && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {partner.siteUrl && (
                            <a href={partner.siteUrl} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-display text-sm font-black">
                              <Globe size={16} aria-hidden="true" />
                              Visitar site
                            </a>
                          )}
                          {partner.whatsappUrl && (
                            <a href={partner.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[#25d366] px-4 py-2 font-display text-sm font-black text-white hover:brightness-95">
                              <WhatsappIcon size={16} />
                              WhatsApp
                            </a>
                          )}
                          {partner.instagramUrl && (
                            <a href={partner.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-display text-sm font-extrabold text-navy ring-1 ring-blue-200 hover:ring-blue-400">
                              <InstagramIcon size={16} />
                              Instagram
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-6 rounded-3xl bg-white px-6 py-10 text-center text-muted ring-1 ring-blue-100">Nenhum parceiro encontrado. Ajuste a busca ou escolha outra categoria.</p>
      )}
    </div>
  );
}
