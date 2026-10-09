import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Mail, MapPin, Navigation, ShieldCheck } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon, ThreadsIcon, TiktokIcon, WhatsappIcon, YoutubeIcon } from "@/components/layout/brand-icons";
import { LightOrbs } from "@/components/home/light-orbs";
import { CAREERS_URL, footerNavItems, isExternalHref, mapsUrl, NEW_CAMPUS_URL, PRIVACY_HREF, siteConfig, whatsappPrincipal, whatsappUrl } from "@/lib/site";

// só entram as redes que têm link em lib/site.ts
const socialLinks = [
  { label: "Instagram", href: siteConfig.social.instagram, icon: InstagramIcon },
  { label: "YouTube", href: siteConfig.social.youtube, icon: YoutubeIcon },
  { label: "TikTok", href: siteConfig.social.tiktok, icon: TiktokIcon },
  { label: "Threads", href: siteConfig.social.threads, icon: ThreadsIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedinIcon },
  { label: "Facebook", href: siteConfig.social.facebook, icon: FacebookIcon },
  { label: "WhatsApp", href: whatsappPrincipal, icon: WhatsappIcon },
].filter((item) => item.href);

const headingClass = "font-display text-sm font-black tracking-widest text-gold-300 uppercase";
const linkClass = "inline-flex items-center gap-2.5 text-blue-100/85 transition-colors hover:text-gold-300";

export function SiteFooter() {
  const { address } = siteConfig;

  return (
    <footer id="contato" className="surface-night scroll-mt-20 overflow-hidden">
      <LightOrbs />
      <div className="gold-line" aria-hidden="true" />

      {/* chamada para matrícula */}
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="shine flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-[linear-gradient(120deg,rgb(47_127_240/0.35),rgb(16_48_122/0.35)_55%,rgb(242_176_30/0.18))] p-7 backdrop-blur md:flex-row md:items-center md:p-9">
          <div>
            <p className="font-display text-xs font-black tracking-widest text-gold-300 uppercase">
              Matrículas {siteConfig.admissionsYear} abertas
            </p>
            <p className="mt-2 font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-tight font-black text-white">
              Venha conhecer o CPPEM de perto.
            </p>
            <p className="mt-1 text-blue-100/80">Agende uma visita e tire suas dúvidas com a nossa equipe.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappPrincipal}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 font-display font-black"
            >
              <WhatsappIcon size={20} />
              Falar no WhatsApp
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 font-display font-extrabold text-white transition-colors hover:border-blue-400 hover:bg-blue-500/20"
            >
              <Navigation size={18} aria-hidden="true" />
              Como chegar
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1.1fr] lg:px-8">
        {/* marca */}
        <div>
          <Link href="/" className="relative inline-block" aria-label={`${siteConfig.name} — página inicial`}>
            <span className="absolute inset-[-20%] rounded-full bg-[radial-gradient(circle,rgb(242_176_30/0.3),transparent_65%)] blur-xl" aria-hidden="true" />
            <Image src="/logo-cppem.png" alt={siteConfig.name} width={128} height={128} className="relative size-32 object-contain drop-shadow-[0_12px_24px_rgb(0_0_0/0.45)]" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-blue-100/75">{siteConfig.shortDescription}</p>
          <ul className="mt-5 flex max-w-xs flex-wrap gap-2.5" aria-label="Redes sociais">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} do Colégio CPPEM`}
                  title={label}
                  className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:-translate-y-0.5 hover:border-gold hover:text-gold-300 hover:shadow-[0_0_18px_rgb(242_176_30/0.45)]"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* navegação */}
        <nav aria-label="Rodapé">
          <p className={headingClass}>Navegação</p>
          <ul className="mt-4 space-y-3 text-sm">
            {footerNavItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} target={isExternalHref(item.href) ? "_blank" : undefined} rel={isExternalHref(item.href) ? "noopener noreferrer" : undefined} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* contato */}
        <div>
          <p className={headingClass}>Fale com a gente</p>
          <ul className="mt-4 space-y-3 text-sm">
            {siteConfig.telephones.map((phone) => (
              <li key={phone.e164}>
                <a href={whatsappUrl(phone.e164)} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <WhatsappIcon size={16} className="shrink-0 text-gold" />
                  {phone.display}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                <Mail size={16} className="shrink-0 text-gold" aria-hidden="true" />
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={CAREERS_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <BriefcaseBusiness size={16} className="shrink-0 text-gold" aria-hidden="true" />
                Trabalhe conosco
              </a>
            </li>
          </ul>
        </div>

        {/* endereço */}
        <div>
          <p className={headingClass}>Onde estamos</p>
          <address className="mt-4 flex gap-2.5 text-sm leading-relaxed text-blue-100/85 not-italic">
            <MapPin size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
            <span>
              {address.street}
              <br />
              {address.neighborhood} — {address.locality}-{address.region}
              <br />
              CEP {address.postalCode}
            </span>
          </address>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} mt-3 flex w-fit text-sm font-bold`}>
            Abrir no mapa
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href={NEW_CAMPUS_URL} target="_blank" rel="noopener noreferrer" className={`${linkClass} mt-2 flex w-fit text-sm font-bold`}>
            <span className="rounded-full bg-gold px-2 py-0.5 text-[0.65rem] font-black tracking-wider text-navy-950 uppercase">Novo</span>
            Conheça a nova sede
          </a>
        </div>
      </div>

      {/* linha institucional */}
      <div className="border-t border-white/10 bg-navy-950/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-blue-100/60 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName} · CNPJ {siteConfig.cnpj} ·{" "}
            <Link href={PRIVACY_HREF} className="font-bold text-blue-100/85 underline underline-offset-4 hover:text-gold-300">
              Política de Privacidade
            </Link>
          </p>
          <p className="inline-flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-gold" aria-hidden="true" />
            {siteConfig.accreditation}
          </p>
        </div>
      </div>
    </footer>
  );
}
