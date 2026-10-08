"use client";

import { CircleCheck, LoaderCircle, Send, TriangleAlert, Upload } from "lucide-react";
import { useActionState, useState, type ChangeEvent } from "react";
import { submitPartnerProposal, type PartnerField, type PartnerProposalState } from "@/app/parceiros/actions";
import { ConsentCheckbox } from "@/components/forms/consent-checkbox";
import { partnerCategories } from "@/lib/partners";

const initialState: PartnerProposalState = { status: "idle" };

const labelClass = "font-display text-sm font-extrabold text-navy";
const inputClass =
  "mt-1.5 w-full rounded-2xl border-2 border-blue-100 bg-blue-50/60 px-4 py-2.5 text-[15px] text-foreground transition-colors placeholder:text-muted/60 hover:border-blue-200 focus:border-blue-500 focus:bg-white focus:outline-none aria-invalid:border-red-400 aria-invalid:bg-red-50";

/*
 * Propostas de empresas, não matrículas: os nomes dos campos evitam de propósito
 * "name", "phone", "email" e parecidos, para a PixelX não registrar isto como lead.
 */
export function PartnerForm() {
  const [state, formAction, pending] = useActionState(submitPartnerProposal, initialState);
  const [logoError, setLogoError] = useState<string | null>(null);
  const errors = state.errors ?? {};
  const values = state.values ?? {};

  function checkLogo(event: ChangeEvent<HTMLInputElement>) {
    setLogoError(null);
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setLogoError("Use uma imagem PNG, JPG ou WebP.");
      event.target.value = "";
    } else if (file.size > 2 * 1024 * 1024) {
      setLogoError("A logo deve ter no máximo 2 MB.");
      event.target.value = "";
    }
  }

  if (state.status === "success") {
    return (
      <div className="px-6 py-12 text-center" role="status">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50">
          <CircleCheck size={34} aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-black text-navy">Proposta recebida!</h3>
        <p className="mt-2 text-muted">Nossa equipe vai avaliar a parceria e entrar em contato.</p>
      </div>
    );
  }

  const field = (key: PartnerField, name: string) => ({
    id: `parceiro-${key}`,
    name,
    defaultValue: values[key] ?? "",
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `parceiro-${key}-erro` : undefined,
  });
  const fieldError = (key: PartnerField) =>
    errors[key] && (
      <p id={`parceiro-${key}-erro`} className="mt-1 text-xs font-bold text-red-600">
        {errors[key]}
      </p>
    );

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
          <label htmlFor="parceiro-company" className={labelClass}>Empresa</label>
          <input {...field("company", "company")} type="text" autoComplete="organization" required placeholder="Nome da empresa" className={inputClass} />
          {fieldError("company")}
        </div>
        <div>
          <label htmlFor="parceiro-category" className={labelClass}>Segmento</label>
          <select {...field("category", "category")} required className={inputClass}>
            <option value="">Selecione</option>
            {partnerCategories.map((item) => (
              <option key={item.key} value={item.label}>{item.label}</option>
            ))}
          </select>
          {fieldError("category")}
        </div>
      </div>

      <div>
        <label htmlFor="parceiro-contact" className={labelClass}>Responsável</label>
        <input {...field("contact", "responsavel")} type="text" required placeholder="Quem fala pela empresa" className={inputClass} />
        {fieldError("contact")}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="parceiro-phone" className={labelClass}>Telefone / WhatsApp</label>
          <input {...field("phone", "contato")} type="text" inputMode="tel" required placeholder="(81) 90000-0000" className={inputClass} />
          {fieldError("phone")}
        </div>
        <div>
          <label htmlFor="parceiro-email" className={labelClass}>E-mail</label>
          <input {...field("email", "correio")} type="text" inputMode="email" required placeholder="contato@empresa.com" className={inputClass} />
          {fieldError("email")}
        </div>
      </div>

      <div>
        <label htmlFor="parceiro-benefit" className={labelClass}>
          Benefício proposto <span className="font-sans text-xs font-normal text-muted">(opcional)</span>
        </label>
        <textarea {...field("benefit", "benefit")} rows={3} maxLength={1200} placeholder="Ex.: 10% de desconto para famílias de alunos do CPPEM" className={`${inputClass} resize-y`} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="parceiro-instagram" className={labelClass}>
            Instagram <span className="font-sans text-xs font-normal text-muted">(opcional)</span>
          </label>
          <input {...field("instagram", "instagram")} type="text" placeholder="@suaempresa" className={inputClass} />
        </div>
        <div>
          <label htmlFor="parceiro-logo" className={labelClass}>
            Logo <span className="font-sans text-xs font-normal text-muted">(opcional)</span>
          </label>
          <label className="mt-1.5 flex cursor-pointer items-center gap-2 rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/60 px-4 py-2.5 text-sm text-muted hover:border-blue-400">
            <Upload size={16} className="shrink-0 text-blue-600" aria-hidden="true" />
            <input id="parceiro-logo" name="logo" type="file" accept="image/png,image/jpeg,image/webp" onChange={checkLogo} className="w-full text-xs file:hidden" />
          </label>
          <p className="mt-1 text-xs text-muted">PNG, JPG ou WebP, até 2 MB.</p>
          {(logoError || errors.logo) && <p className="mt-1 text-xs font-bold text-red-600">{logoError || errors.logo}</p>}
        </div>
      </div>

      <ConsentCheckbox id="parceiro-consent" purpose="a parceria" defaultChecked={values.consent === "on"} error={errors.consent} />

      {/* campo-isca contra robôs */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="parceiro-website">Não preencha este campo</label>
        <input id="parceiro-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="btn-gold flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display text-base font-black disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? <LoaderCircle size={20} className="animate-spin" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
        {pending ? "Enviando…" : "Enviar proposta"}
      </button>
      <p className="text-center text-xs leading-relaxed text-muted">Ao enviar, você autoriza o contato da equipe do Colégio CPPEM sobre esta parceria.</p>
    </form>
  );
}
