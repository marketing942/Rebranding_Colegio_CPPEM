const segmentContent = {
  "fundamental-1": {
    label: "Ensino Fundamental I · 1º ao 5º ano",
    title: "Base forte.<br><em>Curiosidade viva.</em>",
    description: "Uma etapa para consolidar alfabetização, raciocínio lógico, rotina e valores — com acompanhamento próximo da escola e da família.",
    image: "assets/segmento-fundamental-1.png",
    highlights: ["Alfabetização", "Raciocínio lógico", "Rotina e valores"],
    grades: ["1º ano", "2º ano", "3º ano", "4º ano", "5º ano"],
    outcomes: [
      ["01", "Aprender a aprender", "Leitura, escrita e investigação como hábitos."],
      ["02", "Rotina que acolhe", "Organização com clareza e acompanhamento próximo."],
      ["03", "Valores na prática", "Respeito, responsabilidade e propósito no cotidiano."],
      ["04", "Família por perto", "Informações escolares reunidas no sistema CPPEM."],
    ],
    heading: "Os primeiros anos pedem presença, método e encantamento.",
    intro: "A página do Fundamental I fala primeiro com a família: mostra como o CPPEM cria segurança para a criança explorar, errar, descobrir e ganhar autonomia.",
    promises: [
      ["Base acadêmica", "Alfabetização com sentido", "Leitura, escrita e matemática apresentadas de forma progressiva e conectada à vida.", "assets/sala-cheia.jpg"],
      ["Formação humana", "Valores que viram atitudes", "Fé, respeito, cuidado e responsabilidade presentes na convivência escolar.", "assets/pilar-fe.jpg"],
      ["Acompanhamento", "Escola e família no mesmo caminho", "Rotina, frequência, tarefas e resultados com comunicação mais clara.", "assets/escola-painel.jpg"],
    ],
    journey: [
      ["Conhecer", "A família entende a proposta pedagógica e a rotina."],
      ["Visitar", "Equipe, espaços e expectativas são apresentados."],
      ["Conversar", "Série, turno e necessidades da criança são alinhados."],
      ["Matricular", "A equipe orienta documentação e próximos passos."],
    ],
  },
  "fundamental-2": {
    label: "Ensino Fundamental II · 6º ao 9º ano",
    title: "Autonomia.<br><em>Com direção.</em>",
    description: "Mais disciplinas, professores especializados e desafios crescentes, sem perder o acompanhamento que ajuda o estudante a organizar escolhas e resultados.",
    image: "assets/segmento-fundamental-2.png",
    highlights: ["Professores por disciplina", "Plataforma IRIUM", "Ponte para o Ensino Médio"],
    grades: ["6º ano", "7º ano", "8º ano", "9º ano"],
    outcomes: [
      ["06–09", "Progressão consciente", "Cada ano prepara o estudante para o próximo desafio."],
      ["+", "Autonomia acompanhada", "Mais responsabilidade com orientação e rotina."],
      ["9º", "Ano de transição", "Uma ponte intencional para o ritmo do Ensino Médio."],
      ["360°", "Visão de desempenho", "Médias, tarefas e frequência reunidas no sistema."],
    ],
    heading: "O aluno cresce quando desafio e acompanhamento avançam juntos.",
    intro: "A página do Fundamental II mostra a mudança de ritmo dessa fase e dá destaque especial ao 9º ano como preparação acadêmica, emocional e organizacional para o Ensino Médio.",
    promises: [
      ["Profundidade", "Conhecimento por áreas", "Professores especializados ampliam repertório, pensamento crítico e capacidade de argumentação.", "assets/pilar-estabilidade.jpg"],
      ["Método", "Trilhas antes e depois da aula", "A plataforma IRIUM organiza pré-aulas, videoaulas e prática por módulo.", "assets/irium-preaula.jpg"],
      ["Direção", "Disciplina que constrói autonomia", "Rotina, responsabilidade e constância preparam o estudante para decisões maiores.", "assets/pilar-disciplina.jpg"],
    ],
    journey: [
      ["Diagnosticar", "A família compartilha histórico e objetivos do estudante."],
      ["Conhecer", "Proposta, rotina e recursos da etapa são apresentados."],
      ["Planejar", "Série, turno e adaptação acadêmica são alinhados."],
      ["Ingressar", "A equipe orienta matrícula e início da jornada."],
    ],
  },
  "ensino-medio": {
    label: "Ensino Médio · 1ª à 3ª série",
    title: "Preparação.<br><em>Com propósito.</em>",
    description: "Conteúdo aprofundado, simulados, tecnologia e disciplina para ENEM, vestibulares, concursos públicos e escolhas de futuro.",
    image: "assets/segmento-ensino-medio.png",
    highlights: ["ENEM e vestibulares", "Concursos públicos", "Projeto de vida"],
    grades: ["1ª série", "2ª série", "3ª série"],
    outcomes: [
      ["ENEM", "Treino com estratégia", "Conteúdo, revisão e leitura de desempenho."],
      ["01", "Projeto de vida", "Escolhas acadêmicas e profissionais com mais clareza."],
      ["+", "Concursos públicos", "Preparação conectada a caminhos profissionais seguros."],
      ["360°", "Acompanhamento", "Médias, frequência, tarefas e resultados visíveis."],
    ],
    heading: "O futuro deixa de ser abstrato quando o aluno aprende a planejar.",
    intro: "A página do Ensino Médio precisa falar diretamente com estudante e família: resultado importa, mas método, estabilidade emocional, autonomia e propósito sustentam a preparação.",
    promises: [
      ["Desempenho", "Conteúdo que vira estratégia", "Revisões, simulados e leitura de resultados ajudam a transformar esforço em evolução.", "assets/formatura.jpg"],
      ["Tecnologia", "Uma trilha para continuar estudando", "IRIUM e sistema escolar próprio conectam conteúdo, tarefas, frequência e desempenho.", "assets/irium-preaula.jpg"],
      ["Futuro", "Vestibular, concurso e carreira", "O estudante amplia possibilidades e aprende a escolher caminhos com responsabilidade.", "assets/pilar-liberdade.jpg"],
    ],
    journey: [
      ["Objetivos", "A conversa começa pelas metas do estudante."],
      ["Proposta", "Método, simulados e acompanhamento são apresentados."],
      ["Planejamento", "Série, turno e histórico acadêmico são alinhados."],
      ["Matrícula", "A equipe orienta documentos e próximos passos."],
    ],
  },
};

const segmentKey = document.body.dataset.segment;
const content = segmentContent[segmentKey];

if (content) {
  document.title = `${content.label.split(" · ")[0]} | Proposta CPPEM`;
  document.querySelector("[data-segment-bg]").src = content.image;
  document.querySelector("[data-segment-bg]").alt = `Conceito visual para ${content.label}`;
  document.querySelector("[data-segment-label]").textContent = content.label;
  document.querySelector("[data-segment-title]").innerHTML = content.title;
  document.querySelector("[data-segment-description]").textContent = content.description;
  document.querySelector("[data-segment-highlights]").innerHTML = content.highlights.map((item) => `<span>${item}</span>`).join("");
  document.querySelector("[data-grade]").innerHTML = `<option value="">Selecione</option>${content.grades.map((grade) => `<option>${grade}</option>`).join("")}`;
  document.querySelector("[data-outcomes]").innerHTML = content.outcomes.map(([number, title, description]) => `<article class="outcome"><span>${number}</span><strong>${title}</strong><p>${description}</p></article>`).join("");
  document.querySelector("[data-internal-heading]").textContent = content.heading;
  document.querySelector("[data-internal-intro]").textContent = content.intro;
  document.querySelector("[data-promises]").innerHTML = content.promises.map(([label, title, description, image]) => `<article class="promise-card"><img src="${image}" alt=""><div><span>${label}</span><h3>${title}</h3><p>${description}</p></div></article>`).join("");
  document.querySelector("[data-journey]").innerHTML = content.journey.map(([title, description]) => `<li><strong>${title}</strong>${description}</li>`).join("");
}

const form = document.querySelector("[data-interest-form]");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector("[data-form-status]");
    status.textContent = "Protótipo: nenhum dado foi enviado. Na versão final, este fluxo deve integrar CRM/Notion/n8n com consentimento LGPD.";
  });
}
