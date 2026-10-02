"use client";

import { BookOpen, PiggyBank } from "lucide-react";
import { useState } from "react";
import { applyScholarship, formatCurrency, MAX_SCHOLARSHIP, MONTHS_PER_YEAR, SCHOLARSHIP_OPTIONS, type TuitionPlan } from "@/lib/matriculas";

const optionClass =
  "rounded-2xl border-2 px-3 py-2.5 text-center font-display leading-tight font-black transition-all aria-pressed:border-blue-500 aria-pressed:bg-linear-to-b aria-pressed:from-blue-500 aria-pressed:to-blue-700 aria-pressed:text-white aria-pressed:shadow-[0_10px_24px_-10px_rgb(47_127_240/0.9)] aria-[pressed=false]:border-blue-100 aria-[pressed=false]:bg-white aria-[pressed=false]:text-navy aria-[pressed=false]:hover:border-blue-400";

export function TuitionSimulator({ plans }: { plans: TuitionPlan[] }) {
  const [planId, setPlanId] = useState(plans[0].id);
  const [percent, setPercent] = useState<number>(MAX_SCHOLARSHIP);

  const plan = plans.find((item) => item.id === planId) ?? plans[0];
  const monthly = applyScholarship(plan.monthly, percent);
  const yearlySavings = (plan.monthly - monthly) * MONTHS_PER_YEAR;

  return (
    <div className="grid gap-5 md:grid-cols-[1fr_1.05fr]">
      <div className="space-y-5">
        {plans.length > 1 && (
          <fieldset>
            <legend className="font-display text-xs font-black tracking-widest text-blue-600 uppercase">Série</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {plans.map((item) => (
                <button type="button" key={item.id} aria-pressed={item.id === plan.id} onClick={() => setPlanId(item.id)} className={optionClass}>
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <fieldset>
          <legend className="font-display text-xs font-black tracking-widest text-blue-600 uppercase">Bolsa prevista</legend>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {SCHOLARSHIP_OPTIONS.map((option) => (
              <button type="button" key={option} aria-pressed={option === percent} onClick={() => setPercent(option)} className={optionClass}>
                {option ? `${option}%` : "Sem"}
                <small className="block text-[11px] font-bold opacity-80">{option ? "de bolsa" : "bolsa"}</small>
              </button>
            ))}
          </div>
          <p className="mt-2.5 text-xs leading-relaxed text-muted">
            Bolsas sujeitas à análise, critérios institucionais e disponibilidade de vagas.
          </p>
        </fieldset>
      </div>

      {/* resultado */}
      <div className="surface-night shine overflow-hidden rounded-3xl p-6" aria-live="polite">
        <p className="font-display text-xs font-black tracking-widest text-gold-300 uppercase">Mensalidade · {plan.label}</p>
        <p className="mt-2 font-display text-[clamp(2.2rem,5vw,3rem)] leading-none font-black text-white">
          {formatCurrency(monthly)}
          <span className="text-base font-extrabold text-blue-100/80"> /mês</span>
        </p>
        <p className="mt-2 text-sm text-blue-100/80">
          {percent ? (
            <>
              Valor normal: <s>{formatCurrency(plan.monthly)}</s>
            </>
          ) : (
            "Valor normal da mensalidade"
          )}
        </p>
        {percent > 0 && (
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold/15 px-3.5 py-1.5 text-sm font-bold text-gold-300 ring-1 ring-gold/40">
            <PiggyBank size={16} aria-hidden="true" />
            Economia de {formatCurrency(yearlySavings)} por ano
          </p>
        )}
        <div className="mt-5 flex items-start gap-3 border-t border-white/15 pt-4 text-sm text-blue-100/85">
          <BookOpen size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
          <p>
            <span className="font-bold text-white">Livros IRIUM:</span> {formatCurrency(plan.books.cash)} à vista ou 12x de{" "}
            {formatCurrency(plan.books.installment)} no cartão.
          </p>
        </div>
      </div>
    </div>
  );
}
