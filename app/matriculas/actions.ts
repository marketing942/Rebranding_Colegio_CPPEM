"use server";

import { FIELD_NAMES, validateEnrollment, type EnrollmentErrors, type EnrollmentField } from "@/lib/lead-validation";
import { enrollmentInfo } from "@/lib/matriculas";
import { saveEnrollment } from "@/lib/notion/inscricoes";

export type EnrollmentState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: EnrollmentErrors;
  values?: Partial<Record<EnrollmentField, string>>;
};

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
    guardian: read(formData, FIELD_NAMES.guardian, 120),
    student: read(formData, FIELD_NAMES.student, 120),
    email: read(formData, FIELD_NAMES.email, 160),
    // o telefone é gravado como chegou: a formatação é a que a PixelX aplica no campo
    phone: read(formData, FIELD_NAMES.phone, 30),
    gender: read(formData, FIELD_NAMES.gender, 20),
    series: read(formData, FIELD_NAMES.series, 20),
    notes: read(formData, FIELD_NAMES.notes, 1000),
  };

  const errors = validateEnrollment(values, info.series);

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
