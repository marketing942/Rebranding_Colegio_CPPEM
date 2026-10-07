"use server";

import { isValidPhone } from "@/lib/lead-validation";
import { savePartnerProposal } from "@/lib/notion/partners";
import { partnerCategories } from "@/lib/partners";

export type PartnerField = "company" | "category" | "contact" | "phone" | "email" | "benefit" | "instagram" | "logo";

export type PartnerProposalState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<PartnerField, string>>;
  values?: Partial<Record<PartnerField, string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_LOGO_BYTES = 2 * 1024 * 1024;

function read(formData: FormData, name: string, max: number): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// confere o conteúdo do arquivo, não só a extensão
function sniffImage(bytes: Uint8Array) {
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return { ext: "png", mime: "image/png" };
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return { ext: "jpg", mime: "image/jpeg" };
  if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 && bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) return { ext: "webp", mime: "image/webp" };
  return null;
}

function normalizeInstagram(value: string): string {
  if (!value) return "";
  if (/^https:\/\//i.test(value)) return value;
  const handle = value.replace(/^@/, "").replace(/^(https?:\/\/)?(www\.)?instagram\.com\//i, "").replace(/\/.*$/, "");
  return handle ? `https://www.instagram.com/${handle}/` : "";
}

export async function submitPartnerProposal(_previous: PartnerProposalState, formData: FormData): Promise<PartnerProposalState> {
  // campo-isca: gente não preenche, robô preenche
  if (read(formData, "website", 200)) return { status: "success" };

  const values = {
    company: read(formData, "company", 120),
    category: read(formData, "category", 40),
    // nomes sem "name", "phone", "email" etc.: a PixelX capturaria estes campos como lead de matrícula
    contact: read(formData, "responsavel", 100),
    phone: read(formData, "contato", 30),
    email: read(formData, "correio", 160),
    benefit: read(formData, "benefit", 1200),
    instagram: read(formData, "instagram", 120),
  };

  const errors: PartnerProposalState["errors"] = {};
  if (values.company.length < 2) errors.company = "Informe o nome da empresa.";
  if (!partnerCategories.some((item) => item.label === values.category)) errors.category = "Selecione o segmento.";
  if (values.contact.length < 2) errors.contact = "Informe o nome do responsável.";
  if (!isValidPhone(values.phone)) errors.phone = "Informe o telefone com DDD.";
  if (!EMAIL_PATTERN.test(values.email)) errors.email = "Informe um e-mail válido.";

  let logo: Parameters<typeof savePartnerProposal>[0]["logo"] = null;
  const file = formData.get("logo");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_LOGO_BYTES) errors.logo = "A logo deve ter no máximo 2 MB.";
    else {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const type = sniffImage(bytes);
      if (!type) errors.logo = "Envie uma imagem PNG, JPG ou WebP.";
      else logo = { data: new Blob([bytes], { type: type.mime }), filename: `logo-${Date.now()}.${type.ext}`, contentType: type.mime };
    }
  }

  if (Object.keys(errors).length > 0) return { status: "error", message: "Confira os campos destacados.", errors, values };

  try {
    await savePartnerProposal({ ...values, instagram: normalizeInstagram(values.instagram), logo });
    return { status: "success" };
  } catch (error) {
    console.error("[parceiros] Falha ao gravar proposta:", error instanceof Error ? error.message : "erro desconhecido");
    return { status: "error", message: "Não conseguimos enviar sua proposta agora. Tente de novo em instantes.", values };
  }
}
