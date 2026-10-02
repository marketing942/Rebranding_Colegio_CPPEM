/** Vídeo institucional do colégio no YouTube (canal @colegiocppem). */
export const institutionalVideo = {
  id: "0FoAumYuwcM",
  title: "Institucional — Colégio CPPEM, com Prof. Everton Mota e Andrezza Mota",
  poster: "/video/institucional-capa.webp",
};

const captions = [
  "Aluna do Colégio CPPEM fardada, a cavalo",
  "Aluno do Colégio CPPEM fardado, a cavalo",
  "Aluno do Colégio CPPEM fardado, a cavalo",
  "Aula no auditório do Colégio CPPEM",
  "Alunos do Colégio CPPEM com bandeiras em desfile",
  "Alunos do Colégio CPPEM em atividade no tatame",
  "Alunos do Colégio CPPEM em evento noturno",
  "Turmas do Colégio CPPEM reunidas em foto ao ar livre",
  "Alunos assistindo a uma aula no auditório",
  "Alunos do Colégio CPPEM em continência",
  "Alunas do Colégio CPPEM conduzindo bandeiras",
  "Alunos do Colégio CPPEM celebrando em evento",
  "Alunos do Colégio CPPEM em formação",
];

/** Fotos do dia a dia, usadas nos carrosséis infinitos. */
export const schoolLifePhotos = captions.map((alt, index) => ({ src: `/vida-escolar/foto-${String(index + 1).padStart(2, "0")}.webp`, alt }));
