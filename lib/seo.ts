/**
 * SEO: palavras-chave, imagem de compartilhamento e dados estruturados (JSON-LD).
 * Tudo sai de siteConfig, para o que o Google lê bater com o que a página mostra.
 */
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const OG_IMAGE = { url: "/og-colegio-cppem.jpg", width: 1200, height: 630, alt: "Alunos do Colégio CPPEM — formando jovens com fé, disciplina e direcionamento" };

/** Coordenadas da sede (Praça Getúlio Vargas). Atualize junto com o endereço na mudança de sede. */
const GEO = { latitude: -8.2844, longitude: -35.9699 };

export const keywords = [
  "Colégio CPPEM",
  "colégio em Caruaru",
  "escola em Caruaru",
  "escola particular em Caruaru",
  "colégio particular em Caruaru",
  "melhor colégio de Caruaru",
  "escola cristã em Caruaru",
  "colégio cristão em Caruaru",
  "colégio militarizado em Caruaru",
  "escola militarizada em Pernambuco",
  "ensino fundamental em Caruaru",
  "ensino médio em Caruaru",
  "matrículas 2027 Caruaru",
  "colégio preparatório para concursos",
  "escola com disciplina",
  "escola com educação financeira",
  "bolsa atleta Caruaru",
  "bolsa de estudos colégio Caruaru",
];

/** Metadados de uma página: título, descrição, endereço canônico e cartões de compartilhamento. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: siteConfig.name, locale: "pt_BR", type: "website", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}

const absolute = (path: string) => new URL(path, siteConfig.url).toString();
const { address } = siteConfig;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: `${address.street}, ${address.neighborhood}`,
  addressLocality: address.locality,
  addressRegion: address.region,
  postalCode: address.postalCode,
  addressCountry: "BR",
};

/** A escola como entidade: é o que alimenta o painel do Google e as buscas locais. */
export const schoolJsonLd = {
  "@context": "https://schema.org",
  "@type": ["School", "LocalBusiness"],
  "@id": absolute("/#escola"),
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  alternateName: ["CPPEM Colégio", "Colégio CPPEM Caruaru"],
  url: absolute("/"),
  logo: absolute("/logo-cppem.png"),
  image: absolute(OG_IMAGE.url),
  description: siteConfig.longDescription,
  slogan: "Formando jovens com fé, disciplina e direcionamento",
  email: siteConfig.email,
  telephone: siteConfig.telephones[0].e164,
  taxID: siteConfig.cnpj,
  address: postalAddress,
  geo: { "@type": "GeoCoordinates", ...GEO },
  hasMap: `https://www.google.com/maps/search/?api=1&query=${GEO.latitude},${GEO.longitude}`,
  areaServed: [
    { "@type": "City", name: "Caruaru" },
    { "@type": "AdministrativeArea", name: "Agreste de Pernambuco" },
  ],
  knowsAbout: ["Ensino Fundamental", "Ensino Médio", "Educação cristã", "Disciplina militarizada", "Preparação para concursos públicos", "Educação financeira", "Empreendedorismo"],
  contactPoint: siteConfig.telephones.map((phone) => ({
    "@type": "ContactPoint",
    telephone: phone.e164,
    contactType: "admissions",
    areaServed: "BR",
    availableLanguage: "Portuguese",
  })),
  sameAs: Object.values(siteConfig.social).filter(Boolean),
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absolute("/#site"),
  url: absolute("/"),
  name: siteConfig.name,
  inLanguage: "pt-BR",
  publisher: { "@id": absolute("/#escola") },
};

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absolute(item.path) })),
  };
}

export function faqJsonLd(faqs: ReadonlyArray<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  };
}

/** Uma etapa de ensino como oferta da escola. */
export function programJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: `${name} — ${siteConfig.name}`,
    description,
    url: absolute(path),
    provider: { "@id": absolute("/#escola") },
  };
}
