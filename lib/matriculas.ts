/**
 * Dados das páginas de inscrição (/matriculas/[segmento]).
 *
 * As páginas não mostram valores em reais: mensalidade, material e farda são
 * apresentados pela equipe de matrículas. Não volte a colocar preços aqui.
 */

/** Maior bolsa da mensalidade; citada só como percentual, nunca como valor. */
export const MAX_SCHOLARSHIP = 40;

export const ATHLETES_SITE_URL = "https://atletas.cppem.com.br";

export type SegmentReason = {
  icon: "book" | "clock" | "heart" | "family" | "compass" | "shield" | "layers" | "target" | "landmark" | "trending" | "flag";
  title: string;
  text: string;
};

export type EnrollmentInfo = {
  /** Nome curto usado em títulos e no banco de inscrições. */
  shortName: string;
  mascot: { src: string; name: string };
  series: string[];
  highlights: string[];
  /** Por que o CPPEM nesta etapa: quatro motivos próprios do segmento. */
  reasons: SegmentReason[];
};

export const enrollmentInfo: Record<string, EnrollmentInfo> = {
  "fundamental-1": {
    shortName: "Fundamental 1",
    mascot: { src: "/mascotes/mascote-leao.jpg", name: "Léo Leão" },
    series: ["1º ano", "2º ano", "3º ano", "4º ano", "5º ano"],
    highlights: ["Alfabetização sólida", "Rotina e valores cristãos", "Salas amplas e climatizadas"],
    reasons: [
      { icon: "book", title: "Alfabetização com base sólida", text: "Leitura, escrita e raciocínio trabalhados desde o início, para o aluno avançar com segurança." },
      { icon: "clock", title: "Rotina que dá segurança", text: "Horários, combinados e responsabilidades claras desde os primeiros anos." },
      { icon: "heart", title: "Valores cristãos no dia a dia", text: "Respeito, caráter e propósito vividos na convivência com colegas e professores." },
      { icon: "family", title: "Família por perto", text: "Pelo sistema escolar, os responsáveis acompanham médias, frequência e tarefas." },
    ],
  },
  "fundamental-2": {
    shortName: "Fundamental 2",
    mascot: { src: "/mascotes/mascote-lobomax.jpg", name: "Lobo Max" },
    series: ["6º ano", "7º ano", "8º ano"],
    highlights: ["Autonomia e disciplina", "Base forte para o Médio", "Plataforma IRIUM com pré-aulas"],
    reasons: [
      { icon: "compass", title: "Autonomia nos estudos", text: "Com as pré-aulas e videoaulas da plataforma IRIUM, o aluno aprende a se preparar antes da aula." },
      { icon: "shield", title: "Disciplina que forma", text: "Respeito à hierarquia, postura e constância para transformar objetivos em resultados." },
      { icon: "layers", title: "Base forte para o Médio", text: "Conteúdo consolidado para chegar preparado ao 9º ano e ao Ensino Médio." },
      { icon: "family", title: "Acompanhamento de perto", text: "Médias, frequência, ocorrências e tarefas disponíveis para a família no sistema escolar." },
    ],
  },
  "ensino-medio": {
    shortName: "Ensino Médio",
    mascot: { src: "/mascotes/mascote-carcara.jpg", name: "Carcará" },
    // no CPPEM o 9º ano fica junto do Ensino Médio
    series: ["9º ano", "1ª série", "2ª série", "3ª série"],
    highlights: ["ENEM e vestibulares", "Preparação para concursos", "Educação financeira"],
    reasons: [
      { icon: "target", title: "ENEM e vestibulares", text: "Preparação ao longo de toda a etapa, com simulados e resultados acompanhados." },
      { icon: "landmark", title: "Concursos públicos desde cedo", text: "A preparação para carreiras estáveis começa na escola, antes da faculdade." },
      { icon: "trending", title: "Empreendedorismo e educação financeira", text: "Do 9º ano à 3ª série, com projeto real: gerir recursos, criar valor e escolher caminhos." },
      { icon: "flag", title: "Disciplina e liderança", text: "Rotina, hierarquia e postura que preparam o jovem para a vida adulta." },
    ],
  },
};

export const GENDER_OPTIONS = ["Masculino", "Feminino"] as const;

export const athleteTiers = [
  { percent: "80%", name: "Atleta Elite", tag: "Alto rendimento", note: "Destaque estadual ou nacional em competições oficiais." },
  { percent: "60%", name: "Atleta Performance", tag: "Performance comprovada", note: "Equipes oficiais e resultados municipais e locais." },
  { percent: "até 50%", name: "Atleta em Desenvolvimento", tag: "Potencial em evolução", note: "Dedicação aos treinos e compromisso com os estudos." },
];

export const enrollmentSteps = [
  { title: "Faça a inscrição", text: "Preencha o formulário desta página. É rápido." },
  { title: "Visite o CPPEM", text: "Conheça a proposta, a equipe e a nova sede." },
  { title: "Converse sobre valores e bolsas", text: "Analisamos juntos a melhor condição para a sua família." },
  { title: "Matrícula 2027", text: "Reserve a vaga, o material IRIUM e a farda." },
];

/** Perguntas frequentes — textos do site institucional. */
export const enrollmentFaqs = [
  {
    question: "Onde fica o Colégio CPPEM?",
    answer: "O Colégio CPPEM fica na Praça Presidente Getúlio Vargas, 119, no bairro Nossa Senhora das Dores, no centro de Caruaru-PE.",
  },
  {
    question: "Quais séries o Colégio CPPEM atende?",
    answer: "Do 1º ano do Ensino Fundamental ao 3º ano do Ensino Médio, com uma proposta contínua de formação escolar, moral e preparatória.",
  },
  {
    question: "Qual é a proposta pedagógica do CPPEM?",
    answer: "A proposta combina educação cristã, disciplina militarizada, excelência acadêmica, empreendedorismo, educação financeira e preparação para concursos públicos desde a base escolar.",
  },
  {
    question: "O que significa disciplina militarizada no Colégio CPPEM?",
    answer: "Significa rotina organizada, respeito à hierarquia, cumprimento de regras, responsabilidade pessoal e desenvolvimento de foco. A disciplina é apresentada como ferramenta de formação, não como punição.",
  },
  {
    question: "O Colégio CPPEM tem proposta cristã?",
    answer: "Sim. O CPPEM é uma escola cristã, com valores bíblicos aplicados à convivência escolar, à formação de caráter e ao relacionamento com alunos e famílias.",
  },
  {
    question: "Como fazer a matrícula no Colégio CPPEM?",
    answer: "A família preenche a inscrição nesta página. Depois do envio, a equipe do CPPEM entra em contato pelo telefone ou e-mail informado para orientar os próximos passos.",
  },
];
