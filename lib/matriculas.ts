/**
 * Dados da campanha de Matrículas 2027 — espelham o guia oficial
 * (projeto Matriculas2027-CPPEM). Ao mudar um valor lá, mude aqui também.
 */

export const SCHOLARSHIP_OPTIONS = [0, 20, 30, 40] as const;
export const MAX_SCHOLARSHIP = 40;
export const MONTHS_PER_YEAR = 12;

export const ATHLETES_SITE_URL = "https://atletas.cppem.com.br";
export const ATHLETES_URL = `${ATHLETES_SITE_URL}/#inscricao`;
export const GUIDE_PDF = "/guias/guia-matriculas-2027.pdf";

/** Uma faixa de preço dentro do segmento. Hoje cada segmento tem uma só; a lista permite mais de uma. */
export type TuitionPlan = {
  id: string;
  label: string;
  monthly: number;
  books: { cash: number; installment: number };
};

export type EnrollmentInfo = {
  /** Nome curto usado em títulos e no banco de inscrições. */
  shortName: string;
  mascot: { src: string; name: string };
  series: string[];
  plans: TuitionPlan[];
  highlights: string[];
};

const BOOKS = {
  fundamental1: { cash: 1397, installment: 145.75 },
  fundamental2: { cash: 1697, installment: 177.05 },
  medio: { cash: 1897, installment: 197 },
};

export const enrollmentInfo: Record<string, EnrollmentInfo> = {
  "fundamental-1": {
    shortName: "Fundamental 1",
    mascot: { src: "/mascotes/mascote-leao.jpg", name: "Léo Leão" },
    series: ["1º ano", "2º ano", "3º ano", "4º ano", "5º ano"],
    plans: [{ id: "f1", label: "1º ao 5º ano", monthly: 1297, books: BOOKS.fundamental1 }],
    highlights: ["Alfabetização sólida", "Rotina e valores cristãos", "Salas amplas e climatizadas"],
  },
  "fundamental-2": {
    shortName: "Fundamental 2",
    mascot: { src: "/mascotes/mascote-lobomax.jpg", name: "Lobo Max" },
    series: ["6º ano", "7º ano", "8º ano"],
    plans: [{ id: "f2", label: "6º ao 8º ano", monthly: 1497, books: BOOKS.fundamental2 }],
    highlights: ["Autonomia e disciplina", "Base forte para o Médio", "Plataforma IRIUM com pré-aulas"],
  },
  "ensino-medio": {
    shortName: "Ensino Médio",
    mascot: { src: "/mascotes/mascote-carcara.jpg", name: "Carcará" },
    // no CPPEM o 9º ano fica junto do Ensino Médio: mesma tabela de valores e mesmo material
    series: ["9º ano", "1ª série", "2ª série", "3ª série"],
    plans: [{ id: "em", label: "9º ano à 3ª série", monthly: 1597, books: BOOKS.medio }],
    highlights: ["ENEM e vestibulares", "Preparação para concursos", "Educação financeira"],
  },
};

export const GENDER_OPTIONS = ["Masculino", "Feminino"] as const;

export const athleteTiers = [
  { percent: "80%", name: "Atleta Elite", tag: "Alto rendimento", note: "Destaque estadual ou nacional em competições oficiais." },
  { percent: "60%", name: "Atleta Performance", tag: "Performance comprovada", note: "Equipes oficiais e resultados municipais e locais." },
  { percent: "até 50%", name: "Atleta em Desenvolvimento", tag: "Potencial em evolução", note: "Dedicação aos treinos e compromisso com os estudos." },
];

export const uniformGroups = [
  {
    title: "Farda",
    items: [
      { name: "Blusa azul gandola", price: 99.7 },
      { name: "Calça azul", price: 99.7 },
      { name: "Saia", price: 99.7 },
      { name: "Blusa branca UV", price: 69.9 },
    ],
  },
  {
    title: "Educação física",
    items: [
      { name: "Blusa de educação física", price: 69.9 },
      { name: "Short de educação física", price: 74.9 },
    ],
  },
  {
    title: "Acessórios",
    items: [
      { name: "Cinto", price: 35 },
      { name: "Tarjeta", price: 35 },
      { name: "Mochila", price: 174.9 },
      { name: "Casaco e calça de moletom", price: null },
    ],
  },
];

export const enrollmentSteps = [
  { title: "Faça a inscrição", text: "Preencha o formulário desta página. É rápido." },
  { title: "Visite o CPPEM", text: "Conheça a proposta, a equipe e a nova sede." },
  { title: "Converse sobre bolsas", text: "Analisamos juntos a melhor condição para a sua família." },
  { title: "Matrícula 2027", text: "Reserve a vaga, o material IRIUM e a farda." },
];

export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function applyScholarship(monthly: number, percent: number): number {
  return Math.round(monthly * (100 - percent)) / 100;
}
