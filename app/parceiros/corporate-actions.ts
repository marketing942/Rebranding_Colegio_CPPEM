"use server";

import { isValidPhone } from "@/lib/lead-validation";
import { EMPLOYEE_RANGES, saveCorporateRequest } from "@/lib/notion/corporate";

export type CorporateField = "company" | "cnpj" | "industry" | "employees" | "contact" | "role" | "phone" | "email" | "message";

export type CorporateState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<CorporateField, string>>;
  values?: Partial<Record<CorporateField, string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function read(formData: FormData, name: string, max: number): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function submitCorporateRequest(_previous: CorporateState, formData: FormData): Promise<CorporateState> {
  // campo-isca: gente não preenche, robô preenche
  if (read(formData, "website", 200)) return { status: "success" };

  // nomes sem "name", "phone", "email" etc.: a PixelX capturaria estes campos como lead de matrícula
  const values = {
    company: read(formData, "empresa_conv", 120),
    cnpj: read(formData, "cnpj", 20),
    industry: read(formData, "ramo", 80),
    employees: read(formData, "porte", 20),
    contact: read(formData, "responsavel_conv", 100),
    role: read(formData, "cargo", 60),
    phone: read(formData, "contato_conv", 30),
    email: read(formData, "correio_conv", 160),
    message: read(formData, "mensagem", 1200),
  };

  const errors: CorporateState["errors"] = {};
  if (values.company.length < 2) errors.company = "Informe o nome da empresa.";
  if (values.cnpj && values.cnpj.replace(/\D/g, "").length !== 14) errors.cnpj = "Confira o CNPJ (14 números).";
  if (!(EMPLOYEE_RANGES as readonly string[]).includes(values.employees)) errors.employees = "Selecione o número de funcionários.";
  if (values.contact.length < 2) errors.contact = "Informe o nome do responsável.";
  if (!isValidPhone(values.phone)) errors.phone = "Informe o telefone com DDD.";
  if (!EMAIL_PATTERN.test(values.email)) errors.email = "Informe um e-mail válido.";

  if (Object.keys(errors).length > 0) return { status: "error", message: "Confira os campos destacados.", errors, values };

  try {
    await saveCorporateRequest(values);
    return { status: "success" };
  } catch (error) {
    console.error("[convenios] Falha ao gravar:", error instanceof Error ? error.message : "erro desconhecido");
    return { status: "error", message: "Não conseguimos enviar agora. Tente de novo em instantes.", values };
  }
}
