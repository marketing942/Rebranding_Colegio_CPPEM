/**
 * Depoimentos de famílias e da comunidade, transcritos dos comentários e mensagens
 * recebidos no Instagram do colégio (os prints originais estavam no site anterior).
 *
 * Regras ao acrescentar: texto fiel ao original (só ortografia e pontuação ajustadas),
 * sem nome de aluno, e autoria como apareceu em público — o @ do Instagram para comentário
 * público; primeiro nome e inicial para mensagem privada.
 */
export type Testimonial = {
  quote: string;
  /** "@usuario" (comentário público) ou "Nome S." (mensagem privada). */
  author: string;
  /** Quem é a pessoa em relação ao colégio, quando o próprio texto diz. */
  role?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "Coisa linda de se ver. Caruaru merece uma escola desse nível. Muito sucesso para o Colégio CPPEM, que Deus continue abençoando e prosperando.",
    author: "@tacii_almeida",
  },
  {
    quote: "Meu filho chegou bastante empolgado com o colégio. Parabéns pela organização.",
    author: "@emersonliras",
    role: "Pai de aluno",
  },
  {
    quote: "A gente vê no semblante deles o quanto estão orgulhosos em fazer parte da escola. Vejo isso todos os dias quando vou buscar minha pequena.",
    author: "@barbosaelaine29",
    role: "Mãe de aluna",
  },
  {
    quote: "Como mãe, estou super feliz de Deus me dar a honra e a sabedoria de ter meus dois filhos na escola de vocês. O que vocês vêm trazendo para transformar a vida de cada criança, juntamente com as famílias, é de Deus!",
    author: "Edna B.",
    role: "Mãe de alunos",
  },
  {
    quote: "Em meio a um momento de nossa história em que a sociedade deixou de cultivar valores essenciais, esse projeto surge para renovar nossas esperanças na nossa juventude. Parabéns a todos que fazem o Colégio CPPEM.",
    author: "@rogeriogouveiaprof",
  },
  {
    quote: "Já é sucesso! Meu filhote amou e ficou radiante de alegria. Parabéns a toda a equipe.",
    author: "@midudah",
    role: "Mãe de aluno",
  },
  {
    quote: "Parabéns! Fico orgulhosa em ter minha neta neste colégio. Ela está muito feliz. Que Deus abençoe vocês.",
    author: "@ritta_henrique",
    role: "Avó de aluna",
  },
  {
    quote: "Fui aluno do Colégio Militar do Recife e era desse jeito mesmo: chefe e subchefe de turma, alternados a cada semana, ordem unida o tempo todo. Bons tempos. Parabéns!",
    author: "@ruanifilipe",
  },
  {
    quote: "Meu filho está muito feliz aí. Ele me falou que gostou muito.",
    author: "@aquilesfariasof",
    role: "Pai de aluno",
  },
  {
    quote: "Um colégio assim é um sonho. Deus abençoe esse projeto lindo.",
    author: "Úrsula J.",
  },
  {
    quote: "Foi gratificante presenciar cada momento dessa solenidade. Acreditamos e estaremos aqui confiando nesse grande propósito na vida de todos que fazem parte dele.",
    author: "@rafaavliss",
  },
  {
    quote: "Eu amo acompanhar vocês! Me faz sentir saudades da escola.",
    author: "@kanrocha",
  },
];
