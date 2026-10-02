export type CampaignBanner = {
  id: string;
  name: string;
  desktopUrl: string;
  mobileUrl?: string | null;
  ctaLabel: string;
  callout: string;
  href: string;
};

export type Segment = {
  id: string;
  title: string;
  /** Linha curta com as séries atendidas, ex.: "1º ao 5º ano". */
  grades: string;
  description: string;
  /** Foto do card. Sem ela o card mostra o placeholder. */
  image?: string;
  href?: string;
};

export type EventItem = {
  id: string;
  name: string;
  description: string;
  /** Caminho interno do site ou endereço https. */
  href: string;
  status: string;
  /** Data de início no formato AAAA-MM-DD, ou null quando ainda não há data. */
  date: string | null;
  time: string;
  place: string;
  format: string;
  imageUrl: string | null;
  label: string;
  featured: boolean;
};
