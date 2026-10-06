"use client";

import { CircleCheck, LoaderCircle, Send, TriangleAlert } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { submitEnrollment, type EnrollmentState } from "@/app/matriculas/actions";
import { WhatsappIcon } from "@/components/layout/brand-icons";
import { FIELD_NAMES, validateEnrollment, type EnrollmentErrors, type EnrollmentField, type EnrollmentValues } from "@/lib/lead-validation";
import { GENDER_OPTIONS } from "@/lib/matriculas";
import { siteConfig, whatsappUrl } from "@/lib/site";
import { PIXELX_FORM_ID } from "@/lib/tracking";

const initialState: EnrollmentState = { status: "idle" };

/*
 * RASTREAMENTO (PixelX, Lead disparado pelo painel no envio do formulário).
 * Os valores abaixo são o vínculo com o painel, não estilo: não renomeie.
 *   <form>    id = PIXELX_FORM_ID, name = "lead_form"
 *   nome      id = "lead_name",  name = "name"
 *   e-mail    id = "lead_email", name = "email"
 *   telefone  id = "lead_phone", name = "phone", class "pxa_mask_phone", type "text"
 *   botão     id = "lead_submit"
 * O site não formata o telefone nem chama send_event: a máscara e o Lead são da PixelX.
 */
const FIELD_IDS: Record<EnrollmentField, string> = {
  guardian: "lead_name",
  email: "lead_email",
  phone: "lead_phone",
  student: "inscricao-student",
  gender: "inscricao-gender",
  series: "inscricao-series",
  notes: "inscricao-notes",
};

const labelClass = "font-display text-sm font-extrabold text-navy";
const inputClass =
  "mt-1.5 w-full rounded-2xl border-2 border-blue-100 bg-blue-50/60 px-4 py-2.5 text-[15px] text-foreground transition-colors placeholder:text-muted/60 hover:border-blue-200 focus:border-blue-500 focus:bg-white focus:outline-none aria-invalid:border-red-400 aria-invalid:bg-red-50";

type Props = { segmentId: string; segmentName: string; series: string[] };

export function EnrollmentForm({ segmentId, segmentName, series }: Props) {
  const [state, formAction, pending] = useActionState(submitEnrollment, initialState);
  const [clientErrors, setClientErrors] = useState<EnrollmentErrors | null>(null);

  /*
   * Barreira de validação. O envio é capturado no document, em fase de captura,
   * para rodar antes do listener da PixelX (que ela registra no <form>, em
   * momento que não controlamos). Inválido: o evento morre aqui e nenhum Lead é
   * contado. Válido: segue normalmente para a PixelX e para a action do React.
   */
  useEffect(() => {
    const onSubmit = (event: Event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement) || form.id !== PIXELX_FORM_ID) return;

      const data = new FormData(form);
      const read = (field: EnrollmentField) => String(data.get(FIELD_NAMES[field]) ?? "");
      const values: EnrollmentValues = {
        guardian: read("guardian"),
        student: read("student"),
        email: read("email"),
        phone: read("phone"),
        gender: read("gender"),
        series: read("series"),
        notes: read("notes"),
      };
      const errors = validateEnrollment(values, series);

      if (Object.keys(errors).length > 0) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setClientErrors(errors);
        const first = (Object.keys(FIELD_IDS) as EnrollmentField[]).find((field) => errors[field]);
        if (first) document.getElementById(FIELD_IDS[first])?.focus();
        return;
      }
      setClientErrors(null);
    };
    document.addEventListener("submit", onSubmit, true);
    return () => document.removeEventListener("submit", onSubmit, true);
  }, [series]);

  const errors = clientErrors ?? state.errors ?? {};
  const values = state.values ?? {};
  const succeeded = state.status === "success";
  const errorMessage = clientErrors ? "Confira os campos destacados." : state.status === "error" ? state.message : undefined;

  const field = (name: EnrollmentField) => ({
    id: FIELD_IDS[name],
    name: FIELD_NAMES[name],
    defaultValue: values[name] ?? "",
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${FIELD_IDS[name]}-erro` : undefined,
  });
  const fieldError = (name: EnrollmentField) =>
    errors[name] && (
      <p id={`${FIELD_IDS[name]}-erro`} className="mt-1 text-xs font-bold text-red-600">
        {errors[name]}
      </p>
    );

  const successMessage = `Olá! Acabei de fazer a inscrição no site para o ${segmentName}${values.series ? ` (${values.series})` : ""}${values.student ? `, aluno(a) ${values.student}` : ""}. Gostaria de agendar uma visita.`;

  return (
    <>
      {succeeded && (
        <div className="px-6 py-10 text-center" role="status">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50">
            <CircleCheck size={34} aria-hidden="true" />
          </span>
          <h3 className="mt-5 font-display text-2xl font-black text-navy">Inscrição recebida!</h3>
          <p className="mt-2 text-muted">Nossa equipe de matrículas vai entrar em contato pelo telefone ou e-mail informado.</p>
          <a
            href={whatsappUrl(siteConfig.telephones[0].e164, successMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 font-display font-black"
          >
            <WhatsappIcon size={20} />
            Adiantar pelo WhatsApp
          </a>
        </div>
      )}

      {/* depois do envio o formulário fica escondido, não removido: a PixelX termina de enviar o Lead alguns instantes depois */}
      <form id={PIXELX_FORM_ID} name="lead_form" action={formAction} className="space-y-4 px-6 pt-5 pb-6" noValidate hidden={succeeded}>
        {/* segmento vai como campo oculto: com .bind() na action o envio sem JavaScript travava o servidor no re-render */}
        <input type="hidden" name="segment" value={segmentId} />
        {errorMessage && (
          <p className="flex items-start gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700" role="alert">
            <TriangleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            {errorMessage}
          </p>
        )}

        <div>
          <label htmlFor={FIELD_IDS.guardian} className={labelClass}>Nome do responsável</label>
          <input {...field("guardian")} type="text" autoComplete="name" required placeholder="Quem cuida da matrícula" className={inputClass} />
          {fieldError("guardian")}
        </div>

        <div>
          <label htmlFor={FIELD_IDS.student} className={labelClass}>Nome do aluno</label>
          <input {...field("student")} type="text" required placeholder="Nome completo do aluno" className={inputClass} />
          {fieldError("student")}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor={FIELD_IDS.series} className={labelClass}>Série em {siteConfig.admissionsYear}</label>
            <select {...field("series")} required className={inputClass}>
              <option value="">Selecione</option>
              {series.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            {fieldError("series")}
          </div>
          <div>
            <label htmlFor={FIELD_IDS.gender} className={labelClass}>Gênero do aluno</label>
            <select {...field("gender")} required className={inputClass}>
              <option value="">Selecione</option>
              {GENDER_OPTIONS.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            {fieldError("gender")}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 xl:gap-3">
          <div>
            <label htmlFor={FIELD_IDS.email} className={labelClass}>E-mail</label>
            <input {...field("email")} type="email" autoComplete="email" required placeholder="voce@email.com" className={inputClass} />
            {fieldError("email")}
          </div>
          <div>
            <label htmlFor={FIELD_IDS.phone} className={labelClass}>Telefone / WhatsApp</label>
            {/* sem máscara nem formatação do site: quem formata este campo é a PixelX (classe pxa_mask_phone) */}
            <input {...field("phone")} type="text" inputMode="tel" autoComplete="tel" required className={`pxa_mask_phone ${inputClass}`} />
            {fieldError("phone")}
          </div>
        </div>

        <div>
          <label htmlFor={FIELD_IDS.notes} className={labelClass}>
            Observações <span className="font-sans text-xs font-normal text-muted">(opcional)</span>
          </label>
          <textarea {...field("notes")} rows={2} maxLength={1000} placeholder="Algo que a gente deva saber?" className={`${inputClass} resize-y`} />
        </div>

        {/* campo-isca contra robôs: fica fora da tela e fora da navegação por teclado */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="inscricao-website">Não preencha este campo</label>
          <input id="inscricao-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <button
          id="lead_submit"
          type="submit"
          disabled={pending}
          className="btn-gold flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display text-base font-black disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? <LoaderCircle size={20} className="animate-spin" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
          {pending ? "Enviando…" : "Enviar inscrição"}
        </button>

        <p className="text-center text-xs leading-relaxed text-muted">
          A inscrição não garante a vaga. Usamos seus dados só para o contato da equipe de matrículas.
        </p>
      </form>
    </>
  );
}
