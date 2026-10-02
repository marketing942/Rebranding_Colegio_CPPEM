"use server";

import { enrollmentInfo, GENDER_OPTIONS } from "@/lib/matriculas";
import { saveEnrollment } from "@/lib/notion/inscricoes";

export type EnrollmentField = "guardian" | "student" | "email" | "phone" | "gender" | "series" | "notes";

export type EnrollmentState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<EnrollmentField, string>>;
  values?: Partial<Record<EnrollmentField, string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function read(formData: FormData, name: string, max: number): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function submitEnrollment(_previous: EnrollmentState, formData: FormData): Promise<EnrollmentState> {
  const segmentId = read(formData, "segment", 40);
  const info = enrollmentInfo[segmentId];
  if (!info) return { status: "error", message: "Segmento inválido. Recarregue a página e tente de novo." };

  // campo-isca invisível: gente não preenche, robô preenche
  if (read(formData, "website", 200)) return { status: "success" };

  const values = {
    guardian: read(formData, "guardian", 120),
    student: read(formData, "student", 120),
    email: read(formData, "email", 160).toLowerCase(),
    phone: read(formData, "phone", 30),
    gender: read(formData, "gender", 20),
    series: read(formData, "series", 20),
    notes: read(formData, "notes", 1000),
  };

  const errors: EnrollmentState["errors"] = {};
  if (values.guardian.length < 3) errors.guardian = "Informe o nome do responsável.";
  if (values.student.length < 3) errors.student = "Informe o nome do aluno.";
  if (!EMAIL_PATTERN.test(values.email)) errors.email = "Informe um e-mail válido.";
  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) errors.phone = "Informe o telefone com DDD.";
  if (!(GENDER_OPTIONS as readonly string[]).includes(values.gender)) errors.gender = "Selecione uma opção.";
  if (!info.series.includes(values.series)) errors.series = "Selecione a série.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Confira os campos destacados.", errors, values };
  }

  try {
    await saveEnrollment({ ...values, segment: info.shortName });
    return { status: "success", values: { guardian: values.guardian, student: values.student, series: values.series } };
  } catch (error) {
    console.error("[inscricao] Falha ao gravar:", error instanceof Error ? error.message : "erro desconhecido");
    return {
      status: "error",
      message: "Não conseguimos registrar sua inscrição agora. Tente de novo ou fale com a gente pelo WhatsApp.",
      values,
    };
  }
}
