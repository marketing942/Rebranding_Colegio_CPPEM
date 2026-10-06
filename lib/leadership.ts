/**
 * Equipe diretiva, exibida na home e na página Sobre.
 * As fotos em public/diretores/*.webp são recortes quadrados (720px) dos retratos originais.
 */
export type Leader = {
  id: string;
  name: string;
  role: string;
  /** Texto curto mostrado ao passar o mouse sobre a foto (cabe dentro do círculo). */
  description: string;
  photo: string;
};

export const leadership: Leader[] = [
  {
    id: "andrezza",
    name: "Andrezza Mota",
    role: "Diretora",
    description: "Diretora do Colégio CPPEM.",
    photo: "/diretores/andrezza-direcao.webp",
  },
  {
    id: "everton",
    name: "Prof. Everton Mota",
    role: "Professor",
    description: "Professor e Fundador do Colégio CPPEM.",
    photo: "/diretores/everton-direcao.webp",
  },
  {
    id: "jane",
    name: "Jane",
    role: "Coordenadora",
    description: "Coordenadora do Colégio CPPEM.",
    photo: "/diretores/jane-direcao.webp",
  },
  {
    id: "tais",
    name: "Tais",
    role: "Aux. de coordenação",
    description: "Auxiliar de coordenação do Colégio CPPEM.",
    photo: "/diretores/tais-direcao-com-brasao.webp",
  },
];
