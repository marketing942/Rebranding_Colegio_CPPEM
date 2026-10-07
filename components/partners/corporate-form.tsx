"use client";

import { CircleCheck, LoaderCircle, Send, TriangleAlert } from "lucide-react";
import { useActionState } from "react";
import { submitCorporateRequest, type CorporateField, type CorporateState } from "@/app/parceiros/corporate-actions";

const initialState: CorporateState = { status: "idle" };
const EMPLOYEE_RANGES = ["Até 20", "21 a 50", "51 a 100", "101 a 300", "Mais de 300"];

const labelClass = "font-display text-sm font-extrabold text-navy";
const inputClass =
  "mt-1.5 w-full rounded-2xl border-2 border-blue-100 bg-blue-50/60 px-4 py-2.5 text-[15px] text-foreground transition-colors placeholder:text-muted/60 hover:border-blue-200 focus:border-blue-500 focus:bg-white focus:outline-none aria-invalid:border-red-400 aria-invalid:bg-red-50";

/*
 * Pedido de convênio empresarial (bolsa para os funcionários). Os nomes dos campos evitam
 * "name", "phone", "email" e parecidos, para a PixelX não registrar isto como lead de matrícula.
 */
export function CorporateForm() {
  const [state, formAction, pending] = useActionState(submitCorporateRequest, initialState);
  const errors = state.errors ?? {};
  const values = state.values ?? {};

  if (state.status === "success") {
    return (
      <div className="px-6 py-12 text-center" role="status">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50">
          <CircleCheck size={34} aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-black text-navy">Pedido recebido!</h3>
        <p className="mt-2 text-muted">Nossa equipe vai entrar em contato para apresentar a proposta de bolsas para a sua empresa.</p>
      </div>
    );
  }

  const field = (key: CorporateField, name: string) => ({
    id: `convenio-${key}`,
    name,
    defaultValue: values[key] ?? "",
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `convenio-${key}-erro` : undefined,
  });
  const fieldError = (key: CorporateField) =>
    errors[key] && (
      <p id={`convenio-${key}-erro`} className="mt-1 text-xs font-bold text-red-600">
        {errors[key]}
      </p>
    );
  const optional = <span className="font-sans text-xs font-normal text-muted">(opcional)</span>;

  return (
    <form action={formAction} className="space-y-4 px-6 pt-5 pb-6" noValidate>
      {state.status === "error" && state.message && (
        <p className="flex items-start gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700" role="alert">
          <TriangleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          {state.message}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="convenio-company" className={labelClass}>Empresa</label>
          <input {...field("company", "empresa_conv")} type="text" autoComplete="organization" required placeholder="Nome da empresa" className={inputClass} />
          {fieldError("company")}
        </div>
        <div>
          <label htmlFor="convenio-cnpj" className={labelClass}>CNPJ {optional}</label>
          <input {...field("cnpj", "cnpj")} type="text" inputMode="numeric" placeholder="00.000.000/0000-00" className={inputClass} />
          {fieldError("cnpj")}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="convenio-industry" className={labelClass}>Ramo de atuação {optional}</label>
          <input {...field("industry", "ramo")} type="text" placeholder="Ex.: comércio, indústria, saúde" className={inputClass} />
        </div>
        <div>
          <label htmlFor="convenio-employees" className={labelClass}>Nº de funcionários</label>
          <select {...field("employees", "porte")} required className={inputClass}>
            <option value="">Selecione</option>
            {EMPLOYEE_RANGES.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          {fieldError("employees")}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="convenio-contact" className={labelClass}>Responsável</label>
          <input {...field("contact", "responsavel_conv")} type="text" required placeholder="Quem fala pela empresa" className={inputClass} />
          {fieldError("contact")}
        </div>
        <div>
          <label htmlFor="convenio-role" className={labelClass}>Cargo {optional}</label>
          <input {...field("role", "cargo")} type="text" placeholder="Ex.: RH, diretor, sócio" className={inputClass} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="convenio-phone" className={labelClass}>Telefone / WhatsApp</label>
          <input {...field("phone", "contato_conv")} type="text" inputMode="tel" required placeholder="(81) 90000-0000" className={inputClass} />
          {fieldError("phone")}
        </div>
        <div>
          <label htmlFor="convenio-email" className={labelClass}>E-mail</label>
          <input {...field("email", "correio_conv")} type="text" inputMode="email" required placeholder="rh@empresa.com" className={inputClass} />
          {fieldError("email")}
        </div>
      </div>

      <div>
        <label htmlFor="convenio-message" className={labelClass}>Mensagem {optional}</label>
        <textarea {...field("message", "mensagem")} rows={3} maxLength={1200} placeholder="Conte um pouco sobre a empresa e quantos funcionários têm filhos em idade escolar" className={`${inputClass} resize-y`} />
      </div>

      {/* campo-isca contra robôs */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="convenio-website">Não preencha este campo</label>
        <input id="convenio-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="btn-gold flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display text-base font-black disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? <LoaderCircle size={20} className="animate-spin" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
        {pending ? "Enviando…" : "Quero bolsas para minha equipe"}
      </button>
      <p className="text-center text-xs leading-relaxed text-muted">Ao enviar, você autoriza o contato da equipe do Colégio CPPEM sobre o convênio.</p>
    </form>
  );
}
