/**
 * Grade curricular do Colégio CPPEM: 4 eixos, cada um com a sua página
 * (/grade-curricular/[eixo]).
 *
 * FOTOS: cada tópico tem `photos`. Coloque os arquivos em public/grade/ e
 * preencha, por exemplo:
 *   photos: [{ src: "/grade/etica-e-justica-1.webp", alt: "Prof. Everton Mota em aula de Ética e Justiça" }]
 * Enquanto a lista estiver vazia, a página mostra um espaço "Foto em breve".
 */
export type CurriculumTone = "gold" | "navy" | "blue" | "sky";
export type CurriculumIcon = "target" | "scale" | "sigma" | "pen" | "rocket" | "compass" | "bot" | "briefcase" | "book" | "cross" | "sun" | "church" | "calendar";

export type CurriculumPhoto = { src: string; alt: string };

export type CurriculumTopic = {
  id: string;
  title: string;
  icon: CurriculumIcon;
  text: string[];
  highlights?: string[];
  /** Espaços para fotos. Vazio = mostra o espaço reservado. */
  photos: CurriculumPhoto[];
  /** Quantos espaços reservados mostrar enquanto não houver fotos. */
  photoSlots?: number;
};

export type CurriculumAxis = {
  id: string;
  number: string;
  title: string;
  tagline: string;
  summary: string;
  tone: CurriculumTone;
  icon: CurriculumIcon;
  /** Destaque em faixa no topo da página do eixo. */
  differential?: { title: string; text: string };
  topics: CurriculumTopic[];
  /** Usado só em Disciplinas comuns: a lista de matérias em "etiquetas". */
  subjects?: string[];
};

export const curriculum: CurriculumAxis[] = [
  {
    id: "foco-em-concursos",
    number: "01",
    title: "Foco em Concursos",
    tagline: "O diferencial que nasce da casa CPPEM",
    summary: "Ética e justiça, matemática para concursos e redação: a preparação para concursos públicos começa na escola, desde o Fundamental 1.",
    tone: "gold",
    icon: "target",
    differential: {
      title: "Por que isso é diferente",
      text: "O Colégio CPPEM nasceu de uma referência em preparação para concursos. Por isso, enquanto a maioria das escolas só pensa nisso no fim do Ensino Médio, aqui o aluno convive com a lógica dos concursos desde cedo — e chega mais preparado para qualquer prova da vida.",
    },
    topics: [
      {
        id: "etica-e-justica",
        title: "Ética e Justiça",
        icon: "scale",
        text: [
          "Nas aulas de Ética e Justiça, os alunos estudam a Constituição Brasileira e conhecem os seus direitos e deveres como cidadãos.",
          "A disciplina é conduzida pelo Prof. Everton Mota, fundador do CPPEM, e aproxima o aluno do conteúdo cobrado nos concursos públicos de forma clara e aplicada ao dia a dia.",
        ],
        highlights: ["Constituição Federal", "Direitos e deveres", "Com o Prof. Everton Mota"],
        photos: [],
        photoSlots: 2,
      },
      {
        id: "matematica-para-concursos",
        title: "Matemática para concursos",
        icon: "sigma",
        text: [
          "Além da matemática regular, os alunos resolvem questões, provas e simulados com o estilo cobrado nos concursos públicos.",
          "O treino constante com questões reais desenvolve raciocínio, agilidade e confiança para encarar qualquer prova.",
        ],
        highlights: ["Questões de concursos", "Provas", "Simulados"],
        photos: [],
        photoSlots: 1,
      },
      {
        id: "redacao",
        title: "Redação",
        icon: "pen",
        text: [
          "A redação é trabalhada do Fundamental 1 ao Ensino Médio, com prática contínua de escrita.",
          "O aluno aprende a organizar ideias e argumentar com clareza — habilidade decisiva em concursos, vestibulares e no ENEM.",
        ],
        highlights: ["Do Fundamental 1 ao Médio", "Escrita e argumentação"],
        photos: [],
        photoSlots: 1,
      },
    ],
  },
  {
    id: "empreendedorismo",
    number: "02",
    title: "Empreendedorismo",
    tagline: "Do projeto de vida à empresa própria",
    summary: "Projeto de Vida e Empreendedorismo (PVE) e aulas de Inteligência Artificial, com um objetivo concreto: sair da escola com uma empresa própria.",
    tone: "navy",
    icon: "rocket",
    differential: {
      title: "Sair da escola com uma empresa",
      text: "Os alunos, principalmente do Ensino Médio, são orientados a concluir a escola com um projeto de empresa própria, sozinhos ou com colegas. Dependendo do projeto, o próprio Colégio CPPEM investe e entra como sócio.",
    },
    topics: [
      {
        id: "pve",
        title: "Projeto de Vida e Empreendedorismo (PVE)",
        icon: "compass",
        text: [
          "No PVE, o aluno reflete sobre quem é, aonde quer chegar e como transformar ideias em projetos reais.",
          "A disciplina une planejamento de vida, educação financeira e as bases do empreendedorismo: identificar oportunidades, organizar recursos e criar valor.",
        ],
        highlights: ["Projeto de vida", "Educação financeira", "Plano de negócio"],
        photos: [],
        photoSlots: 2,
      },
      {
        id: "inteligencia-artificial",
        title: "Inteligência Artificial",
        icon: "bot",
        text: [
          "Nas aulas de Inteligência Artificial, os alunos aprendem a usar a tecnologia a favor dos estudos e dos próprios projetos.",
          "É a preparação para um mercado de trabalho em que saber usar IA já faz diferença.",
        ],
        highlights: ["Ferramentas de IA", "Tecnologia aplicada a projetos"],
        photos: [],
        photoSlots: 1,
      },
      {
        id: "empresa-propria",
        title: "Empresa própria, com o CPPEM como sócio",
        icon: "briefcase",
        text: [
          "O caminho do PVE termina em um projeto de empresa, criado pelo aluno sozinho ou em grupo.",
          "Conforme o projeto, a empresa e a proposta, o Colégio CPPEM financia a ideia e entra como sócio — o aluno sai da escola empreendendo de verdade.",
        ],
        highlights: ["Sozinho ou com colegas", "O colégio pode investir"],
        photos: [],
        photoSlots: 2,
      },
    ],
  },
  {
    id: "disciplinas-comuns",
    number: "03",
    title: "Disciplinas comuns",
    tagline: "A base completa da Educação Básica",
    summary: "Todas as disciplinas da grade do CPPEM, da base comum às matérias próprias do colégio, do Fundamental 1 ao Ensino Médio.",
    tone: "blue",
    icon: "book",
    subjects: [
      "Português e Literatura",
      "Matemática",
      "Ciências",
      "Biologia",
      "Física",
      "Química",
      "História",
      "Geografia",
      "Filosofia e Sociologia",
      "Inglês",
      "Artes",
      "Atualidades",
      "Educação Física",
      "Educação Digital",
      "Redação",
      "Projeto de Vida",
      "Matemática de Concursos",
      "Ética e Justiça",
      "Ensino Religioso",
    ],
    topics: [],
  },
  {
    id: "religioso",
    number: "04",
    title: "Religioso",
    tagline: "Fé vivida todos os dias",
    summary: "Devocional diário com a Palavra de Deus e oração, devocional especial às sextas, aulas de ensino religioso e eventos em datas como a Páscoa.",
    tone: "sky",
    icon: "cross",
    topics: [
      {
        id: "devocional-diario",
        title: "Devocional todos os dias",
        icon: "sun",
        text: [
          "Todos os dias começam com um devocional: leitura da Palavra de Deus e oração.",
          "É um momento de pausa, propósito e cuidado com o coração antes das aulas.",
        ],
        highlights: ["Palavra de Deus", "Oração"],
        photos: [],
        photoSlots: 1,
      },
      {
        id: "devocional-de-sexta",
        title: "Devocional de sexta-feira",
        icon: "church",
        text: [
          "Toda sexta-feira o devocional recebe pastores, pregadores e convidados de fora, voltados à pregação da Palavra de Deus.",
        ],
        highlights: ["Pastores e pregadores", "Convidados especiais"],
        photos: [],
        photoSlots: 2,
      },
      {
        id: "ensino-religioso-e-eventos",
        title: "Ensino religioso e datas especiais",
        icon: "calendar",
        text: [
          "Além das aulas de ensino religioso, em alguns períodos do ano o colégio promove eventos para viver as datas religiosas, como a Páscoa.",
        ],
        highlights: ["Aulas de ensino religioso", "Páscoa e outras datas"],
        photos: [],
        photoSlots: 2,
      },
    ],
  },
];

export function findAxis(id: string) {
  return curriculum.find((axis) => axis.id === id);
}
