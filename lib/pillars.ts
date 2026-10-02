/**
 * Os quatro pilares do Colégio CPPEM, exibidos na home e na página Sobre.
 *
 * `photo` preenche o círculo inteiro (arte quadrada). `className` é opcional e
 * ajusta o enquadramento, ex.: "object-top".
 *
 * `mascot` fica de pé na borda do círculo, entre a foto e o texto. As imagens
 * estão em public/mascotes/pilar-*.webp: fundo transparente, bordas vazias
 * recortadas e 720px de altura (`width` é a largura que resultou disso).
 * `flip` espelha o mascote quando o gesto dele aponta para longe da foto.
 */
export type PillarTone = "gold" | "navy" | "blue" | "sky";

type PillarImage = { src: string; alt: string; className?: string };
type PillarMascot = { src: string; alt: string; width: number; flip?: boolean };

export type Pillar = {
  id: string;
  name: string;
  /** Frase curta e divertida, o "apelido" do pilar. */
  tagline: string;
  text: string;
  /** Explicação completa, exibida na página Sobre (textos do site institucional). */
  about: string[];
  tags: string[];
  tone: PillarTone;
  photo?: PillarImage;
  mascot?: PillarMascot;
};

export const pillars: Pillar[] = [
  {
    id: "fe-crista",
    name: "Fé Cristã",
    tagline: "Coração no lugar certo",
    text: "Antes de qualquer nota, vem o caráter. Princípios bíblicos, propósito e respeito fazem parte do dia a dia da escola, do bom-dia até a despedida.",
    about: [
      "A fé cristã é a base para construir uma vida com caráter. Bem estruturado na formação espiritual, o jovem encontra propósito, discernimento e resiliência.",
      "Os princípios bíblicos são vivenciados em cada interação, em cada regra de conduta e na forma como tratamos nossos alunos, com dignidade e propósito.",
    ],
    tags: ["Caráter", "Propósito", "Respeito"],
    tone: "gold",
    photo: { src: "/pilares/fe-crista.webp", alt: "Aluna do Colégio CPPEM em oração, com uma cruz e a Bíblia ao fundo" },
    mascot: { src: "/mascotes/pilar-fe-crista.webp", alt: "Mascote leão do Colégio CPPEM apontando para a aluna", width: 481 },
  },
  {
    id: "disciplina",
    name: "Disciplina Militarizada",
    tagline: "Quem tem rotina vai longe",
    text: "Horário certo, tarefa feita e palavra cumprida. Aqui disciplina não é bronca: é o treino que transforma um objetivo em resultado.",
    about: [
      "Com disciplina, o aluno fica mais firme para seguir até o fim dos seus objetivos, sem desistir.",
      "A disciplina não é punição: é o maior presente que um jovem pode receber. Com respeito à hierarquia, o aluno aprende a ser um bom ouvinte e a respeitar os líderes.",
    ],
    tags: ["Rotina", "Responsabilidade", "Constância"],
    tone: "navy",
    photo: { src: "/pilares/disciplina.webp", alt: "Aluno do Colégio CPPEM em formação, com relógio e lista de tarefas ao fundo" },
    mascot: { src: "/mascotes/pilar-disciplina.webp", alt: "Mascote lobo do Colégio CPPEM, em posição de sentido", width: 345 },
  },
  {
    id: "estabilidade",
    name: "Estabilidade",
    tagline: "Futuro com chão firme",
    text: "Preparação acadêmica e para concursos desde a base. Quanto mais cedo começa o preparo, mais caminhos profissionais seguros se abrem lá na frente.",
    about: [
      "A estabilidade financeira deve ser um dos primeiros objetivos de um jovem. Não é luxo: é segurança para viver com dignidade.",
      "Por meio dos concursos públicos, o aluno pode ter uma carreira estável, e se prepara desde cedo para a vida adulta.",
    ],
    tags: ["Base forte", "Concursos", "Carreira"],
    tone: "blue",
    photo: { src: "/pilares/estabilidade.webp", alt: "Aluno do Colégio CPPEM fazendo uma prova, cercado de livros, cronograma e folha de respostas" },
    mascot: { src: "/mascotes/pilar-estabilidade.webp", alt: "Mascote carcará do Colégio CPPEM segurando um caderno", width: 447 },
  },
  {
    id: "liberdade",
    name: "Liberdade",
    tagline: "Dono do próprio caminho",
    text: "Empreendedorismo e educação financeira para aprender a cuidar do dinheiro, criar valor e escolher o que quer ser.",
    about: [
      "A verdadeira liberdade financeira acontece quando o jovem expande seus investimentos e sua renda variável.",
      "No CPPEM, o empreendedorismo e a educação financeira são disciplinas reais. Ensinamos a pensar como empreendedores: identificar oportunidades, gerir recursos e criar valor.",
    ],
    tags: ["Empreender", "Educação financeira", "Autonomia"],
    tone: "sky",
    photo: { src: "/pilares/liberdade.webp", alt: "Aluna do Colégio CPPEM estudando finanças, com moedas, calculadora e um gráfico em alta" },
    // a leoa estende a mão para a esquerda; aqui a foto fica à direita dela
    mascot: { src: "/mascotes/pilar-liberdade.webp", alt: "Mascote leoa do Colégio CPPEM apresentando a aluna", width: 544, flip: true },
  },
];
