/** Dados estruturados para buscadores. O "<" é escapado para o JSON nunca fechar a tag por engano. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
