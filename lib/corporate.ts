import { BadgePercent, HeartHandshake, Users } from "lucide-react";

/** Convênio empresarial: bolsa de estudo para os filhos dos funcionários (página /empresas). */
export const CORPORATE_HREF = "/empresas";

export const corporateBenefits = [
  { icon: BadgePercent, title: "Bolsa de estudo", text: "Condições especiais de mensalidade para os filhos dos colaboradores." },
  { icon: HeartHandshake, title: "Benefício que retém talentos", text: "Um apoio concreto à família, que o funcionário valoriza no dia a dia." },
  { icon: Users, title: "Simples para a empresa", text: "A empresa indica os colaboradores; nossa equipe cuida do atendimento às famílias." },
];

export const corporateSteps = [
  { title: "A empresa se cadastra", text: "Preenche o formulário desta página. Leva cerca de 1 minuto." },
  { title: "Apresentamos a proposta", text: "Nossa equipe entra em contato com as condições para a sua empresa." },
  { title: "Funcionários matriculam os filhos", text: "As famílias indicadas fazem a matrícula com a bolsa do convênio." },
];

export const corporateFaqs = [
  { question: "Quem pode usar a bolsa?", answer: "Os filhos dos colaboradores indicados pela empresa conveniada, do 1º ano do Ensino Fundamental ao 3º ano do Ensino Médio." },
  { question: "Qual é o percentual da bolsa?", answer: "O percentual e as condições são definidos em proposta para cada empresa. Preencha o formulário e nossa equipe apresenta os detalhes." },
  { question: "Minha empresa é pequena. Pode participar?", answer: "Sim. O formulário atende empresas de todos os portes, a partir de poucos funcionários." },
];
