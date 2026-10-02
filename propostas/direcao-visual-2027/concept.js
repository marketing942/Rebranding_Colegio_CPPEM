const pillars = [
  {
    image: "assets/pilar-fe.jpg",
    alt: "Cerimônia e símbolos cívicos do Colégio CPPEM",
    index: "01",
    word: "PROPÓSITO",
    kicker: "Pilar I · Fé Cristã",
    title: "Caráter antes da conquista.",
    description: "Princípios bíblicos, respeito e propósito são vivenciados nas relações, nas escolhas e na forma como cada aluno aprende a servir.",
    quote: "“Formação espiritual que se revela em atitudes.”",
  },
  {
    image: "assets/pilar-disciplina.jpg",
    alt: "Alunos do CPPEM em formação cívica",
    index: "02",
    word: "CONSTÂNCIA",
    kicker: "Pilar II · Disciplina",
    title: "O objetivo ganha rotina.",
    description: "Disciplina é cuidado com o futuro: organização, hierarquia, responsabilidade e firmeza para seguir até o fim sem desistir.",
    quote: "“Não é punição. É a construção diária da autonomia.”",
  },
  {
    image: "assets/pilar-estabilidade.jpg",
    alt: "Alunos estudando na biblioteca do Colégio CPPEM",
    index: "03",
    word: "PREPARAÇÃO",
    kicker: "Pilar III · Estabilidade",
    title: "Base acadêmica para caminhos seguros.",
    description: "Conteúdo consistente, preparação para concursos e acompanhamento de resultados ajudam o aluno a ampliar possibilidades profissionais.",
    quote: "“Conhecimento que sustenta decisões de longo prazo.”",
  },
  {
    image: "assets/pilar-liberdade.jpg",
    alt: "Aluna do CPPEM em atividade de equitação",
    index: "04",
    word: "ESCOLHAS",
    kicker: "Pilar IV · Liberdade",
    title: "Autonomia para criar o próprio caminho.",
    description: "Educação financeira e empreendedorismo desenvolvem visão, responsabilidade sobre recursos e coragem para transformar oportunidades em valor.",
    quote: "“Liberdade é poder escolher com consciência.”",
  },
];

const experience = document.querySelector("[data-pillar-experience]");

if (experience) {
  const tabs = [...experience.querySelectorAll("[data-pillar]")];
  const image = experience.querySelector("[data-pillar-image]");
  const index = experience.querySelector("[data-pillar-index]");
  const word = experience.querySelector("[data-pillar-word]");
  const kicker = experience.querySelector("[data-pillar-kicker]");
  const title = experience.querySelector("[data-pillar-title]");
  const description = experience.querySelector("[data-pillar-description]");
  const quote = experience.querySelector("[data-pillar-quote]");

  const selectPillar = (position) => {
    const item = pillars[position];
    if (!item) return;

    tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === position;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    image.classList.add("is-changing");
    window.setTimeout(() => {
      image.src = item.image;
      image.alt = item.alt;
      index.textContent = item.index;
      word.textContent = item.word;
      kicker.textContent = item.kicker;
      title.textContent = item.title;
      description.textContent = item.description;
      quote.textContent = item.quote;
      image.classList.remove("is-changing");
    }, 160);
  };

  tabs.forEach((tab, position) => {
    tab.addEventListener("click", () => selectPillar(position));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(event.key)) return;
      event.preventDefault();
      const direction = ["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1;
      const next = (position + direction + tabs.length) % tabs.length;
      selectPillar(next);
      tabs[next].focus();
    });
  });
}
