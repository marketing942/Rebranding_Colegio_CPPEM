import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

// página de espera: fica fora do Google até ter conteúdo
export const metadata: Metadata = { title: "Grade curricular", robots: { index: false, follow: true } };

// TODO: conteúdo da grade curricular ainda não foi definido
export default function CurriculumPage() {
  return <ComingSoon eyebrow="Grade curricular" title="Estamos preparando esta página." text="Em breve você vai ver aqui as disciplinas e a carga de cada etapa. Enquanto isso, fale com a nossa equipe." />;
}
