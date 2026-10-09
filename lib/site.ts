/**
 * Configuração central do site — fonte única para URL, contato e identidade.
 * Dados herdados do site atual (SiteColegioCPPEM).
 */
export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://colegio.cppem.com.br",
  name: "Colégio CPPEM",
  legalName: "CPPEM Colégio e Cursos LTDA",
  cnpj: "57.347.872/0001-48",
  accreditation: "Portaria de Credenciamento Nº 9097 — Secretaria Estadual de Pernambuco",
  shortDescription:
    "Escola cristã, militarizada e preparatória em Caruaru-PE, do 1º ano do Ensino Fundamental ao 3º ano do Ensino Médio.",
  longDescription:
    "O Colégio CPPEM é uma escola cristã, militarizada e preparatória no centro de Caruaru-PE. A proposta une formação escolar, disciplina, valores cristãos, educação financeira, empreendedorismo e preparação para concursos públicos.",
  email: "colegiocppem@gmail.com",
  telephones: [
    { display: "+55 (81) 99707-6388", e164: "+5581997076388" },
    { display: "+55 (81) 99408-6174", e164: "+5581994086174" },
  ],
  admissionsYear: "2027",
  address: {
    street: "Praça Presidente Getúlio Vargas, 119",
    neighborhood: "Nossa Senhora das Dores",
    locality: "Caruaru",
    region: "PE",
    postalCode: "55004-140",
  },
  // Rede sem link fica com "" e não aparece no rodapé.
  social: {
    instagram: "https://www.instagram.com/colegiocppem/",
    youtube: "https://www.youtube.com/@colegiocppem",
    tiktok: "https://www.tiktok.com/@colegiocppem",
    // o Threads usa o mesmo usuário do Instagram
    threads: "https://www.threads.com/@colegiocppem",
    // TODO: faltam os endereços do colégio nestas duas redes
    linkedin: "",
    facebook: "",
  },
} as const;

/** Vagas e banco de currículos do grupo CPPEM (mesmo link do site antigo). */
export const CAREERS_URL = "https://links.cppem.com.br/trabalhe-conosco";

/** Programa de indicação do colégio (site próprio). */
export const REFERRAL_URL = "https://indica.colegio.cppem.com.br";

/** Política de Privacidade (LGPD). */
export const PRIVACY_HREF = "/politica-de-privacidade";

/** Link que sai do site: abre em outra aba. */
export const isExternalHref = (href: string) => /^https?:\/\//.test(href);

/** Site próprio da nova sede (Zona Norte). */
export const NEW_CAMPUS_URL = "https://novasede.cppem.com.br";

/** Links simples do menu. Segmentos de ensino e Eventos são dropdowns montados no header. "Indique" leva ao site de indicações. */
export const navItems = [
  { label: "Sobre", href: "/sobre" },
  { label: "Grade curricular", href: "/grade-curricular" },
  { label: "Parceiros", href: "/parceiros" },
  { label: "Notícias", href: "/noticias" },
  { label: "Indique", href: REFERRAL_URL },
] as const;

/**
 * Clique direto em "Segmentos de ensino": vai para o Fundamental 2, a etapa que
 * mais recebe alunos novos. Quem quer outra etapa escolhe no dropdown.
 */
export const SEGMENTS_DEFAULT_HREF = "/matriculas/fundamental-2";

/** Para onde o botão "Matricule-se" leva: a escolha do segmento, que abre a inscrição. */
export const ENROLL_HREF = "/#segmentos";

/** Navegação do rodapé. */
export const footerNavItems = [...navItems, { label: "Segmentos de ensino", href: ENROLL_HREF }, { label: "Para empresas", href: "/empresas" }] as const;

const { address } = siteConfig;
export const enderecoCompleto = `${address.street}, ${address.neighborhood}, ${address.locality}-${address.region}, ${address.postalCode}`;
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Colégio CPPEM, ${enderecoCompleto}`)}`;

const MENSAGEM_WHATSAPP = "Olá, gostaria de falar sobre o Colégio Cppem";

export function whatsappUrl(e164: string, mensagem?: string): string {
  const base = `https://wa.me/${e164.replace(/\D/g, "")}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

export const whatsappPrincipal = whatsappUrl(siteConfig.telephones[0].e164, MENSAGEM_WHATSAPP);
