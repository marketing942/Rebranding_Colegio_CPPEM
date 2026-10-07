/** Rede de parceiros do Colégio CPPEM (página /parceiros). */
export type PartnerCategory = { key: string; label: string };

export type Partner = {
  id: string;
  name: string;
  categoryKey: string;
  categoryLabel: string;
  description: string;
  benefit: string;
  whatsappUrl: string | null;
  siteUrl: string | null;
  instagramUrl: string | null;
  logoUrl: string | null;
  featured: boolean;
};

/** Mesmas opções do campo Categoria no Notion. */
export const partnerCategories: PartnerCategory[] = [
  { key: "saude", label: "Saúde" },
  { key: "esporte", label: "Esporte" },
  { key: "alimentacao", label: "Alimentação" },
  { key: "papelaria e livros", label: "Papelaria e livros" },
  { key: "transporte escolar", label: "Transporte escolar" },
  { key: "educacao", label: "Educação" },
  { key: "servicos", label: "Serviços" },
];

export function normalizePartnerKey(value: string) {
  return value.trim().toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function partnerInitials(name: string) {
  const words = name.replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean);
  return words.length ? words.slice(0, 2).map((word) => word[0]).join("").toUpperCase() : "?";
}
