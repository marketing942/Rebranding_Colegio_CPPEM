"use client";

import { CircleCheck, LoaderCircle, Send, TriangleAlert } from "lucide-react";
import { useActionState } from "react";
import { submitEnrollment, type EnrollmentField, type EnrollmentState } from "@/app/matriculas/actions";
import { WhatsappIcon } from "@/components/layout/brand-icons";
import { GENDER_OPTIONS } from "@/lib/matriculas";
import { siteConfig, whatsappUrl } from "@/lib/site";

const initialState: EnrollmentState = { status: "idle" };

const labelClass = "font-display text-sm font-extrabold text-navy";
const inputClass =
  "mt-1.5 w-full rounded-2xl border-2 border-blue-100 bg-blue-50/60 px-4 py-2.5 text-[15px] text-foreground transition-colors placeholder:text-muted/60 hover:border-blue-200 focus:border-blue-500 focus:bg-white focus:outline-none aria-invalid:border-red-400 aria-invalid:bg-red-50";

type Props = { segmentId: string; segmentName: string; series: string[] };

export function EnrollmentForm({ segmentId, segmentName, series }: Props) {
  const [state, formAction, pending] = useActionState(submitEnrollment, initialState);
  const { errors = {}, values = {} } = state;

  if (state.status === "success") {
    const message = `Olá! Acabei de fazer a inscrição no site para o ${segmentName}${values.series ? ` (${values.series})` : ""}${values.student ? `, aluno(a) ${values.student}` : ""}. Gostaria de agendar uma visita.`;
    return (
      <div className="px-6 py-10 text-center" role="status">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50">
          <CircleCheck size={34} aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-black text-navy">Inscrição recebida!</h3>
        <p className="mt-2 text-muted">
          Nossa equipe de matrículas vai entrar em contato pelo telefone ou e-mail informado.
        </p>
        <a
          href={whatsappUrl(siteConfig.telephones[0].e164, message)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 font-display font-black"
        >
          <WhatsappIcon size={20} />
          Adiantar pelo WhatsApp
        </a>
      </div>
    );
  }

  const field = (name: EnrollmentField) => ({
    id: `inscricao-${name}`,
    name,
    defaultValue: values[name] ?? "",
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `inscricao-${name}-erro` : undefined,
  });
  const fieldError = (name: EnrollmentField) =>
    errors[name] && (
      <p id={`inscricao-${name}-erro`} className="mt-1 text-xs font-bold text-red-600">
        {errors[name]}
      </p>
    );

  return (
    <form action={formAction} className="space-y-4 px-6 pt-5 pb-6" noValidate>
      {/* segmento vai como campo oculto: com .bind() na action o envio sem JavaScript travava o servidor no re-render */}
      <input type="hidden" name="segment" value={segmentId} />
      {state.status === "error" && state.message && (
        <p className="flex items-start gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700" role="alert">
          <TriangleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="inscricao-guardian" className={labelClass}>Nome do responsável</label>
        <input {...field("guardian")} type="text" autoComplete="name" required placeholder="Quem cuida da matrícula" className={inputClass} />
        {fieldError("guardian")}
      </div>

      <div>
        <label htmlFor="inscricao-student" className={labelClass}>Nome do aluno</label>
        <input {...field("student")} type="text" required placeholder="Nome completo do aluno" className={inputClass} />
        {fieldError("student")}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="inscricao-series" className={labelClass}>Série em {siteConfig.admissionsYear}</label>
          <select {...field("series")} required className={inputClass}>
            <option value="">Selecione</option>
            {series.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          {fieldError("series")}
        </div>
        <div>
          <label htmlFor="inscricao-gender" className={labelClass}>Gênero do aluno</label>
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
          <label htmlFor="inscricao-email" className={labelClass}>E-mail</label>
          <input {...field("email")} type="email" autoComplete="email" required placeholder="voce@email.com" className={inputClass} />
          {fieldError("email")}
        </div>
        <div>
          <label htmlFor="inscricao-phone" className={labelClass}>Telefone / WhatsApp</label>
          <input {...field("phone")} type="tel" inputMode="tel" autoComplete="tel" required placeholder="(81) 90000-0000" className={inputClass} />
          {fieldError("phone")}
        </div>
      </div>

      <div>
        <label htmlFor="inscricao-notes" className={labelClass}>
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
  );
}
