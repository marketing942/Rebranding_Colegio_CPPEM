/** Caixa de consentimento LGPD (obrigatória). Marcada, envia "on" no campo `lgpd_consent`. */
export function ConsentCheckbox({ id, purpose, defaultChecked, error }: { id: string; purpose: string; defaultChecked?: boolean; error?: string }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-blue-100 bg-blue-50/60 px-4 py-3 transition-colors has-checked:border-blue-500 has-checked:bg-white has-aria-invalid:border-red-400 has-aria-invalid:bg-red-50"
      >
        <input
          id={id}
          name="lgpd_consent"
          type="checkbox"
          required
          defaultChecked={defaultChecked}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-erro` : undefined}
          className="mt-0.5 size-4 shrink-0 accent-blue-600"
        />
        <span className="text-sm leading-snug text-foreground">
          Autorizo o Colégio CPPEM a usar estes dados para entrar em contato comigo sobre {purpose}, conforme a Lei Geral de Proteção de Dados (LGPD).
        </span>
      </label>
      {error && (
        <p id={`${id}-erro`} className="mt-1 text-xs font-bold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
