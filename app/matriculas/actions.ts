"use server";

import { after } from "next/server";
import { FIELD_NAMES, validateEnrollment, type EnrollmentErrors, type EnrollmentField } from "@/lib/lead-validation";
import { mirrorEnrollmentToSheet } from "@/lib/google-sheets";
import { ORIGIN_FIELDS } from "@/lib/lead-origin";
import { enrollmentInfo } from "@/lib/matriculas";
import { saveEnrollment } from "@/lib/notion/inscricoes";
import { notifyEnrollment } from "@/lib/notify-enrollment";
import { allowSubmission, fingerprint, isRecentDuplicate, RATE_LIMIT_MESSAGE, runOnce } from "@/lib/request-guard";

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
    series: read(formData, FIELD_NAMES.series, 20),
    notes: read(formData, FIELD_NAMES.notes, 1000),
    consent: read(formData, FIELD_NAMES.consent, 10),
  };

  const errors = validateEnrollment(values, info.series);

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Confira os campos destacados.", errors, values };
  }

  const success: EnrollmentState = { status: "success", values: { guardian: values.guardian, student: values.student, series: values.series } };

  // reenvio da mesma inscrição (duplo clique, nova tentativa após falha de conexão): responde sucesso sem gravar de novo
  const key = fingerprint("inscricao", [values.email, values.student, values.series]);
  if (isRecentDuplicate(key)) return success;
  if (!(await allowSubmission("inscricao"))) return { status: "error", message: RATE_LIMIT_MESSAGE, values };

  try {
    await runOnce(key, async () => {
      const { pageId, duplicate } = await saveEnrollment({ ...values, segment: info.shortName });
      if (duplicate) return "duplicate";
      await notifyEnrollment(pageId);
      // planilha central depois da resposta: a família vê a confirmação sem esperar o Apps Script
      after(() =>
        mirrorEnrollmentToSheet({
          guardian: values.guardian,
          email: values.email,
          phone: values.phone,
          series: `${info.shortName} · ${values.series}`,
          pageUrl: read(formData, ORIGIN_FIELDS.page, 2048),
          utmSource: read(formData, ORIGIN_FIELDS.utm_source, 255),
          utmCampaign: read(formData, ORIGIN_FIELDS.utm_campaign, 255),
        }),
      );
      return "created";
    });
    return success;
  } catch (error) {
    console.error("[inscricao] Falha ao gravar:", error instanceof Error ? error.message : "erro desconhecido");
    return {
      status: "error",
      message: "Não conseguimos registrar sua inscrição agora. Tente de novo ou fale com a gente pelo WhatsApp.",
      values,
    };
  }
}
