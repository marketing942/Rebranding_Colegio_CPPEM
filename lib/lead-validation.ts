/**
 * Validação do formulário de inscrição. A mesma regra roda no navegador (antes
 * de o evento de envio chegar ao rastreamento) e no servidor.
 */
export type EnrollmentField = "guardian" | "student" | "email" | "phone" | "series" | "notes";
export type EnrollmentValues = Record<EnrollmentField, string>;
export type EnrollmentErrors = Partial<Record<EnrollmentField, string>>;

/**
 * Nome de cada campo no HTML. Responsável, e-mail e telefone seguem a
 * nomenclatura que a PixelX exige (`name`, `email`, `phone`); não renomeie.
 */
export const FIELD_NAMES: Record<EnrollmentField, string> = {
  guardian: "name",
  student: "student",
  email: "email",
  phone: "phone",
  series: "series",
  notes: "notes",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Celular ou fixo brasileiro com DDD. O telefone chega como a PixelX o deixa no
 * campo (mascarado, cru ou já com "+55"), então o "+55" sai pelo "+" literal
 * antes de contar os dígitos — tirar pelos dígitos confundiria com o DDD 55.
 */
export function isValidPhone(value: string): boolean {
  const digits = value.trim().replace(/^\+\s*55\s*/, "").replace(/\D/g, "");
  return digits.length === 10 || digits.length === 11;
}

export function validateEnrollment(values: EnrollmentValues, series: readonly string[]): EnrollmentErrors {
  const errors: EnrollmentErrors = {};
  if (values.guardian.trim().length < 3) errors.guardian = "Informe o nome do responsável.";
  if (values.student.trim().length < 3) errors.student = "Informe o nome do aluno.";
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Informe um e-mail válido.";
  if (!isValidPhone(values.phone)) errors.phone = "Informe o telefone com DDD.";
  if (!series.includes(values.series)) errors.series = "Selecione a série.";
  return errors;
}
