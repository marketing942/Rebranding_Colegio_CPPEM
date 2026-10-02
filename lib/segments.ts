import type { Segment } from "@/types/content";

/**
 * Segmentos exibidos na home. Para trocar a foto, coloque o arquivo em
 * public/segmentos/ e preencha `image` (ex.: "/segmentos/fundamental-1.webp").
 */
export const segments: Segment[] = [
  {
    id: "fundamental-1",
    title: "Ensino Fundamental 1",
    grades: "1º ao 5º ano",
    description: "Alfabetização sólida, rotina e valores desde os primeiros anos.",
    image: "/segmentos/fundamental-1.webp",
    href: "/matriculas/fundamental-1",
  },
  {
    id: "fundamental-2",
    title: "Ensino Fundamental 2",
    grades: "6º ao 9º ano",
    description: "Autonomia, disciplina e base forte para os desafios que vêm pela frente.",
    image: "/segmentos/fundamental-2.webp",
    href: "/matriculas/fundamental-2",
  },
  {
    id: "ensino-medio",
    title: "Ensino Médio",
    grades: "1ª à 3ª série",
    description: "Preparação para o ENEM, vestibulares e concursos públicos.",
    image: "/segmentos/ensino-medio.webp",
    href: "/matriculas/ensino-medio",
  },
];
